"use client"
import React from 'react'

const TaskInfo = () => {
  return (
    <div className=' border w-[600px] m-auto flex flex-col gap-y-4 p-2 max-sm:w-[96%]'>
     <div className=' grid grid-cols-4 gap-x-1 h-9 items-center max-sm:grid-cols-3'>
          <div className=' grid grid-cols-3 col-span-2'>
           <p className=' col-span-2 text-center font-semibold text-lg'>Task</p>
           <div className='grid-cols-1 text-center'>
              <p className=' ml-1 font-semibold text-lg'>Status</p> 
           </div>
          </div>
          <div className=''>
            <p className='text-center font-semibold text-lg'>Date</p>
          </div>
          <div className=' max-sm:hidden'>
            <h1 className=' text-center font-semibold text-lg'>Action</h1>
          </div>
        </div>
        </div>
  )
}

export default TaskInfo