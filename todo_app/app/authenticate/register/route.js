import { connectDB } from '@/lib/config/db';
import TodoModel from '@/lib/config/models/TodoModel';
import UserModel from '@/lib/config/models/UserModel';
import {NextResponse} from 'next/server';
import bcrypt from 'bcrypt'

const LoadDb = async () => {
  await connectDB()
}

LoadDb()



export async function POST(request) {
  try {
    const {name , email, password} = await request.json(); 

    const hashhedPass = await bcrypt.hash(password, 10)


    const createdUser = await UserModel({
      name,
      email,
      password : hashhedPass,
    })

    await createdUser.save()

    if (createdUser) {
      return NextResponse.json({msg : 'user is created' , success: true})
    }
  } catch (error) {
    return NextResponse.json({msg : 'user did not created' , success: false})
  }
}


