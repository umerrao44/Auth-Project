import { configureStore } from '@reduxjs/toolkit'
import tokenSliceReducer from './tokenSlice'

export const store = configureStore({
    reducer: {
        token: tokenSliceReducer,
      },
})