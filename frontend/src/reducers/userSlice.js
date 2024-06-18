import {createSlice} from "@reduxjs/toolkit"
import {signIn, signUp} from '../actions/userThunk'

const initialState = {
  userInfo: null,
  loading: false,
  error: false
}

const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    logoutSuccess: (state) => {
      state.userInfo = null;
      state.loading = null;
      state.error = null;
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
  } 
  
})

export const {
  logoutSuccess
} = userSlice.actions;

export default userSlice.reducer;