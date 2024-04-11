import { connectDB } from '@/lib/config/db';
import TodoModel from '@/lib/config/models/TodoModel';
import UserModel from '@/lib/config/models/UserModel';
import {NextResponse} from 'next/server';

const LoadDb = async () => {
  await connectDB()
}

LoadDb()



// export async function GET


