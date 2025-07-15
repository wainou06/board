import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import boardReducer from '../features/boardSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      boards: boardReducer,
   },
})

export default store
