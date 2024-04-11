import { connectDB } from '@/lib/config/db';
import TodoModel from '@/lib/config/models/TodoModel';
import UserModel from '@/lib/config/models/UserModel';
import {NextResponse} from 'next/server';

const LoadDb = async () => {
  await connectDB()
}

LoadDb()

export async function GET(request){
  try {
    const allTodoData = await TodoModel.find().populate('user');

    if (!allTodoData) {
      return NextResponse.json({msg : 'No task', success : false})
    }


    return NextResponse.json({msg : 'Task found', success : true , allTodoData})
  } catch (error) {
    return NextResponse.json({msg : error.message })
  }
}

export async function POST(request){
  try {

    const {task} = await request.json()


    const user = await UserModel.findById(task.userId)


    let createdTask = await TodoModel.create({
      task : task.task,
      user : user._id
    })

    await user.todoList.push(createdTask._id)
    await user.save()

    return NextResponse.json({msg: 'Todo created', success : true, createdTask})
  } catch (error) {

  }
  
}


export async function PUT(request) {

  try {
    const {isDone, id} = await request.json() 
    if (isDone) {
      const Task = await TodoModel.findById(id)

      if (Task.status == true) {
        return NextResponse.json({msg : 'Task already completed', success : true})
      }

      const updatedTask = await TodoModel.findByIdAndUpdate(id, { status: isDone })

      return NextResponse.json({msg : 'Todo Task Completed', success : true, updatedTask})

    }
  } catch (error) {
    return NextResponse.json({msg : error.message, success : false})
  }
}

export async function anotherPut() {

  try {

    
  } catch (error) {
    
  }
}



export async function DELETE(request) {


  try {

    const {id} = await request.json()


    const deletedTask = await TodoModel.findByIdAndDelete(id)

    // Example response indicating success
    return NextResponse.json({ msg: 'Todo Task deleted', success: true , deletedTask});
  } catch (error) {
    console.error('Error:', error);
    // Handle errors appropriately
    return NextResponse.error('An error occurred while processing the request');
  }
}

