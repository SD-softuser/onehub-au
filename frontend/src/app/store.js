import { configureStore } from '@reduxjs/toolkit'
import loaderReducer from './slices/loaderSlice'
import countryReducer from './slices/countrySlice'
import partnersReducer from './slices/partnersSlice'
import partnersDetailsReducer from './slices/partnerDetailsSlice'
import bannersReducer from './slices/bannersSlice'
import dataReducer from './slices/dataSlice'
import weeklyReducer from './slices/weeklySlice'

export default configureStore({
  reducer: {
    loader: loaderReducer,
    country: countryReducer,
    partners: partnersReducer,
    partnerDetails: partnersDetailsReducer,
    banners: bannersReducer,
    data: dataReducer,
    weekly: weeklyReducer,
  },
})