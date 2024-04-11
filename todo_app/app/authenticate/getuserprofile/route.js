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
  console.log('dsfsfsfdsfgsdgsdgsdgvsdgsdgsdfgdfgvsf11111');
  try {
    const {token} = await request.json()
    console.log(token, 'Token');

    const tokenValidate = await jwt.verify(token,SECRET_KEY)
    console.log(tokenValidate, 'token after validate');

    if (!tokenValidate) {
      return NextResponse.json({msg: 'token is invalid', success : false})
    }

    const user = await UserModel.findById(tokenValidate.user).populate('todoList')
    console.log(user ,'user got');

    if (!user) {
      return NextResponse.json({msg: 'User profile not found', success : false})
    }

    return NextResponse.json({msg:'Found user profile', success : true, user})
  } catch (error) {
    console.log(error, 'erererererererrererer');
  }
}