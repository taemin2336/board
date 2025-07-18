import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import boardReducer from '../features/boardSlice'
import commentReducer from '../features/commentSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      boards: boardReducer,
      comments: commentReducer,
   },
})

export default store
