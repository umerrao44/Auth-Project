import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    token: "",
  }
  export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
      tokenFecth: (state,action) => {
       
        state.token = action.payload
        localStorage.setItem('token',state.token)
        // console.log('state.token====>',state.token)
      }
    },
  })
  export const { tokenFecth } = tokenSlice.actions
  export default tokenSlice.reducer