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

    console.log('name', name, email , 'email', password, 'password');

    const hashhedPass = await bcrypt.hash(password, 10)


    const createdUser = await UserModel({
      name,
      email,
      password : hashhedPass,
    })

    await createdUser.save()
    console.log(createdUser , 'createdUser');

    if (createdUser) {
      return NextResponse.json({msg : 'user is created' , success: true})
    }
  } catch (error) {
    return NextResponse.json({msg : 'user did not created' , success: false})
  }
}


