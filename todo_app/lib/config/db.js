import mongoose from 'mongoose'

let DBlink = 'mongodb+srv://deveshdighe30:deve789@cluster0.uy5bogz.mongodb.net/todoApp'

export const connectDB = async () => {
  await mongoose.connect(DBlink).then(()=>{
    console.log('Db connected');
  }).catch((err)=>{
    console.log(err);
  })
}