import { configureStore } from '@reduxjs/toolkit'
import loaderReducer from './slices/loaderSlice'
import partnerReducer from "./slices/partnerSlice"

export default configureStore({
  reducer: {
    loader: loaderReducer,
    partner:partnerReducer
  },
})