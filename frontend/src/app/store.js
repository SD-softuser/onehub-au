import { configureStore } from '@reduxjs/toolkit'
import loaderReducer from './slices/loaderSlice'
import partnerReducer from "./slices/partnerSlice"
import partnerCAReducer from "./slices/partnerCASlice"
import currentPartnerReducer from "./slices/currentPartnerSlice"

export default configureStore({
  reducer: {
    loader: loaderReducer,
    partner:partnerReducer,
    partnerCA:partnerCAReducer,
    currentPartner:currentPartnerReducer
  },
})