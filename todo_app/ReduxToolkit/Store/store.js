import {configureStore} from '@reduxjs/toolkit'
import TodoReducer from '../Reducer/TodoReducer.js'

export const store = configureStore({
  reducer : {
    TodoReducer
  }
})