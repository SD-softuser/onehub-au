import { configureStore } from '@reduxjs/toolkit'
import loaderReducer from './slices/loaderSlice'

export default configureStore({
  reducer: {
    loader: loaderReducer
  },
})