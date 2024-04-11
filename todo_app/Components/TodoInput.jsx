"use client"

import React, {  useContext, useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { addTodo } from '@/ReduxToolkit/Reducer/TodoReducer';
import { MyContext } from '@/Context/authContext.jsx';


const TodoInput = ({ editVal }) => {
  const todoTask = useRef('')
  const editTaskId = useRef(null)
  const [id, setid] = useState(null)


  const {state , dispatch } = useContext(MyContext)

  const GetUserProfile = async (token) => {
    try {
      const responce = await axios.post('/authenticate/getuserprofile',{token} )
      if (responce.data.success) {
        dispatch({type : 'LOGIN', payload : responce.data.user})
        dispatchT(addTodo(responce.data.user.todoList))
      }
    } catch (error) {
      toast.error(error.responce.msg)
    }
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('UserToken')) 
    if (token) {
      GetUserProfile(token)
    }
  }, [])




  useEffect(() => {
    if (editVal) {
      todoTask.current.value = editVal.task;
      editTaskId.current = editVal.id;
      setid(editVal.id)
    }
  }, [editVal]);

  const dispatchT = useDispatch()

  const handleAdd = async () => {
    let task = { task: todoTask.current.value, userId : state.user._id };


    try {
      const responce = await axios.post('/api', {task})
      if (responce.data.success) {
        const token = JSON.parse(localStorage.getItem('UserToken'))
        GetUserProfile(token)
        todoTask.current.value = ''
        toast.success('Task is added')
      }
    } catch (error) {

    }
  }

const handleEdit = async () => {
  try {
    const responce = await axios.put('/api/editTask', { todoTask: todoTask.current.value, editTaskId: editTaskId.current });
    if (responce.data.success) {
      setid(null)
      const token = await JSON.parse(localStorage.getItem('UserToken')) 
      GetUserProfile(token)
      todoTask.current.value = ''
      toast.success('Task is added')
    }
  } catch (error) {

  }
}

  return (
    <>
      {/* <ToastContainer/> */}
      <div className='  w-[600px] max-md:w-[350px] m-auto mb-4 mt-12 pr-2 max-sm:w-full'>
        <div className=' grid grid-cols-4 gap-x-1 h-9'>
          <input className=' border outline-none col-span-3 h-full px-1' type="text" placeholder={'Enter Task'} ref={todoTask} />
          {id !== null ? (
            <button className='bg-green-300 rounded-sm cursor-pointer' onClick={handleEdit}>Edit</button>
          ) : (
            <button className={`bg-green-300 rounded-sm ${state?.user?.name ? ' cursor-pointer' : 'cursor-not-allowed'}`} disabled={state?.user?.name ? false : true} onClick={handleAdd}>Add</button>
          )}

        </div>
      </div>
    </>
  )
}

export default TodoInput