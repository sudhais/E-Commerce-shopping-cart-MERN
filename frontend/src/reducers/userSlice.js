import {createSlice} from "@reduxjs/toolkit"
import {
  signIn, 
  signUp,
  listUser} from '../actions/userThunk'

const initialState = {
  userInfo: null,
  userList: [],
  loading: false,
  error: false
}

const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    logoutSuccess: (state) => {
      state.userInfo = null;
      state.userList = []
      state.loading = null;
      state.error = null;
    },
    testing: (state) => {
      console.log('working');
    }
  },
  extraReducers: (build) => {
    build
      .addCase(signIn.pending, (state)=> {
        state.loading = true;
        state.error = false;
      })
      .addCase(signIn.fulfilled, (state,action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(signIn.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(signUp.pending, (state)=> {
        state.loading = true;
        state.error = false;
      })
      .addCase(signUp.fulfilled, (state,action)=> {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(listUser.pending, (state)=> {
        state.loading = true;
        state.error = false;
      })
      .addCase(listUser.fulfilled, (state,action)=> {
        state.userList = action.payload;
        state.loading = false;
      })
      .addCase(listUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
  } 
  
})

export const {
  logoutSuccess,
  testing
} = userSlice.actions;

export default userSlice.reducer;