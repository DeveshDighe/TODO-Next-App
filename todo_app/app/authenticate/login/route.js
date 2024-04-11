import { connectDB } from '@/lib/config/db';
import TodoModel from '@/lib/config/models/TodoModel';
import UserModel from '@/lib/config/models/UserModel';
import {NextResponse} from 'next/server';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const LoadDb = async () => {
  await connectDB()
}

LoadDb()

const SECRET_KEY = "SECRETKEY"


export async function POST(request){
  try {
    const {email, password} = await request.json()

    const user = await UserModel.findOne({email : email})
    console.log(user, 'This is user');

  if (!user) {
    return NextResponse.json({msg: 'Incorrect email', success: false})
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect, 'This is a user');

    if (!isPasswordCorrect) {
      return NextResponse.json({msg: 'Incorrect Password', success: false})
    }

    const token = await jwt.sign({user : user._id}, SECRET_KEY)
    console.log(token, 'Token');

    return NextResponse.json({msg: "Login Successfull", success : true, token})
  } catch (error) {
    return NextResponse.json({msg: "Login UnSuccessfull", success : false})
  }
}