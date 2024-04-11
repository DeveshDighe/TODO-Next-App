"use client"

import React, { useContext, useEffect, useState } from 'react'
import TodoInput from './TodoInput'
import TaskInfo from './TaskInfo'
import axios from 'axios'
import { toast } from 'react-toastify';
import { MyContext } from '@/Context/authContext'
import {useDispatch, useSelector} from 'react-redux'
import { addTodo } from '@/ReduxToolkit/Reducer/TodoReducer'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdIncompleteCircle } from "react-icons/md";
import Footer from './Footer'

const Todolist = () => {
  let tasks = ['Go to gym','Take bath', 'Eat breakfast',  'Go to job']
  const [isAdded, setisAdded] = useState(false)
  const list = useSelector((state)=> state.TodoReducer.TodoData)

  const [allTodoData, setallTodoData] = useState([])
  const [editTodoData, seteditTodoData] = useState('')

  const {state, dispatch} = useContext(MyContext)

  console.log(state?.user, 'userstate');

  const dispatchT = useDispatch()

  const handleDone =async (id) => {
    let updateData = {isDone : true, id}
    console.log(updateData, 'updateData');
    try {  
      const responce = await axios.put('/api',updateData )
      if (responce.data.success) {
        console.log(responce, 'This is my updated responce');
        const token = JSON.parse(localStorage.getItem('UserToken')) 
        GetUserProfile(token)
        toast.success(responce.data.msg)
      }
    } catch (error) {
      toast.error(error.responce.message)
    }
  }

  const getTodoData = async () => {
    try {
      const response = await axios.get('/api')
      if (response.data.success) {
        dispatchT(addTodo(response.data.allTodoData))
        // setallTodoData(response.data.allTodoData)
        console.log(response.data.allTodoData ,'resrsrsresr');
      }
    } catch (error) {
      
    }
  }

  const GetUserProfile = async (token) => {
    try {
      console.log(token, 'Token');
      const responce = await axios.post('/authenticate/getuserprofile',{token} )
      if (responce.data.success) {
        console.log(responce.data , 'Log responce data');
        dispatch({type : 'LOGIN', payload : responce.data.user})
        console.log(responce.data.user.todoList, 'responce.data.todoListresponce.data.todoList');
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
  

  const handleDelete = async (id) => {
    let updateData = {isDone : true, id}
    try {
      console.log(updateData, 'deleteID');
      const responce = await axios.delete('/api',{ data: { id } })
      if (responce.data.success) {
        toast.success('Task is deleted')
        const token = JSON.parse(localStorage.getItem('UserToken')) 
        GetUserProfile(token)
        console.log(responce.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = async (id, task) => {
    try {
      seteditTodoData({task, id})
      console.log(editTodoData, 'editTodoData');
    } catch (error) {
      
    }
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });
    return formattedDate;
  };

  // useEffect(() => {
  //   getTodoData()
  // }, [])
  

  return (
    <>
    <h1 className=' text-center text-2xl mt-14'>{state?.user?.name ? `Welcome ${state?.user?.name}` : 'Hey User Login Please'}</h1>
    <TodoInput editVal = {editTodoData}  />
    <TaskInfo/>
    
    <div className=' border w-[600px] m-auto flex flex-col  gap-y-5 p-2 max-sm:w-[96%]'>
      {list.length > 0 ? (
      list.map((task)=>(
        <div key={task._id} className=' grid grid-cols-4 max-sm:grid-cols-3 gap-x-1  max-sm:gap-y-3 '>
          <div className=' grid grid-cols-3 col-span-2'>
          <p className=' flex items-center col-span-2'>{task.task}</p>
          <div className='flex items-center justify-center '>
          <p className=' '>{task.status == false ? 'Pending' : 'Completed'}</p>
          </div>
          </div>

          <div className='items-center justify-center grid grid-cols-1 gap-x-2 max-sm:justify-between'>   
          <p className=' text-center'>{formatDate(task.Date)}</p> 
          </div>
          
          <div className=' grid grid-cols-3 gap-x-2 max-sm:col-span-3 max-sm:h-8'>
          <button className={` bg-green-500 text-white rounded-md mr-2 max-sm:text-sm flex justify-center items-center ${task.status ? 'cursor-not-allowed' : '' }`} onClick={()=>handleDone(task._id)} disabled={task.status}>{task.status == false ? <MdIncompleteCircle size={20}/> : <IoCheckmarkDoneCircle size={20} />}</button>
          <button className=' bg-blue-400 text-white max-sm:text-sm rounded-md flex justify-center items-center px-1 py-2' onClick={()=>{handleEdit(task._id, task.task)}} ><FaEdit /></button>
          <button className=' bg-red-500 text-white rounded-md max-sm:text-sm flex items-center justify-center' onClick={()=>handleDelete(task._id)} ><MdDelete  color={'white'} size={20} /></button>
          </div>
        </div>
      ))
    )
    :
    (
      
      <div className=' h-48 flex justify-center items-center'>
        <p className=' text-2xl'>Add Some Task</p>
      </div>
    )
    }
    </div>
    <Footer/>
    </>
  )
}

export default Todolist