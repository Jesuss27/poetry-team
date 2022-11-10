import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'


export type UsersArray = {
    usersArray:[]
}


const initialState:UsersArray = {
    usersArray:[]
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersArray: (state,action) =>{
        state.usersArray = action.payload
    }
  },
  extraReducers:{
    [HYDRATE]:(state,action)=> {
      //TODO handle client side data override
      return state.usersArray = action.payload.name
    }
}
});

export const {setUsersArray} = usersSlice.actions

export default usersSlice.reducer

export const selectUsersArray = (state:any) => state.users.usersArray