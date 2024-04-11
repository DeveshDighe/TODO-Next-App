import {createSlice} from '@reduxjs/toolkit'

export const TodoReducer = createSlice({
  initialState : {TodoData : []},

  name : 'Todo',

  reducers : {
    addTodo : (state, action) => {
      console.log('Hit hua kya');
      state.TodoData = action.payload
    },
    removeTodo : (state) => {
      state.TodoData = []
    }
  }
})

export const {addTodo, removeTodo} = TodoReducer.actions;
export default TodoReducer.reducer;