import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  userName:null,
  userEmail:null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData:(state,action) =>{
      state.userName = action.payload.userName
      state.userEmail = action.payload.userEmail
    },
    setSignOutUser:(state,action) =>{
      state.userName = action.payload.name
      state.userEmail = action.payload.email
    }
  },

  extraReducers:{
    [HYDRATE]:(state,action)=> {
      //TODO handle client side data override
      return state.userName = action.payload.name
    }
  }
});

export const {setUserData, setSignOutUser} = userSlice.actions
export const selectUserName = (state:any) => state.user.userName

export default userSlice.reducer