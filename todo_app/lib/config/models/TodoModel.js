import mongoose from 'mongoose'


const TodoSchema = new mongoose.Schema({
  task : {
    type : String,
    required : true,
  },
  status : {
    type : Boolean,
    default : false
  },
  Date : {
    type : Date,
    default : Date.now()
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'users',

  }
})

const TodoModel = mongoose.models.todoes || mongoose.model("todoes", TodoSchema)
export default TodoModel