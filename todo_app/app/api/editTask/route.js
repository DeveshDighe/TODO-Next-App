import { connectDB } from '@/lib/config/db';
import TodoModel from '@/lib/config/models/TodoModel';
import {NextResponse} from 'next/server';

const LoadDb = async () => {
  await connectDB()
}

LoadDb()

export async function PUT(request){
  try {
    const {editTaskId , todoTask} = await request.json();

    const updatedTask = await TodoModel.findByIdAndUpdate(editTaskId, {task : todoTask})
    
    return NextResponse.json({msg: 'Task Updated', success : true})
  } catch (error) {
    return NextResponse.json({msg: 'Error is Task Updation', success : false})
  }
}