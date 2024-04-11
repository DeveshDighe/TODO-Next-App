import mongoose from 'mongoose'

const UserShema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  todoList : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'todoes'
  }]
})


const UserModel = mongoose.models.users || mongoose.model("users", UserShema)
export default UserModel