import {createSlice} from "@reduxjs/toolkit"
import {
  signIn, 
  signUp,
  listUser,
  userDelete
} from '../actions/userThunk'

const userInfo = {
  error:false,
  loading:false,
  user:null
}

const userList = {
  error:false,
  loading:false,
  list: []
}

const initialState = {
  userInfo,
  userList
}

const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    userReset: (state) => {
      state.userInfo = userInfo;
      state.userList = userList
    },
    testing: (state) => {
      console.log('working');
    }
  },
  extraReducers: (build) => {
    build
      .addCase(signIn.pending, (state)=> {
        state.userInfo.loading = true;
        state.userInfo.error = false;
      })
      .addCase(signIn.fulfilled, (state,action) => {
        state.userInfo.user = action.payload;
        state.userInfo.loading = false;
      })
      .addCase(signIn.rejected, (state,action) => {
        state.userInfo.loading = false;
        state.userInfo.error = action.payload
      })
      .addCase(signUp.pending, (state)=> {
        state.userInfo.loading = true;
        state.userInfo.error = false;
      })
      .addCase(signUp.fulfilled, (state,action)=> {
        state.userInfo.user = action.payload;
        state.userInfo.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.userInfo.loading = false;
        state.userInfo.error = action.payload
      })
      .addCase(listUser.pending, (state)=> {
        state.userList.loading = true;
        state.userList.error = false;
      })
      .addCase(listUser.fulfilled, (state,action)=> {
        state.userList.list = action.payload;
        state.userList.loading = false;
      })
      .addCase(listUser.rejected, (state, action) => {
        state.userList.loading = false;
        state.userList.error = action.payload
      })
      .addCase(userDelete.pending, (state)=> {
        state.userList.loading = true;
        state.userList.error = false;
      })
      .addCase(userDelete.fulfilled, (state,action)=> {
        state.userList.list = action.payload;
        state.userList.loading = false;
      })
      .addCase(userDelete.rejected, (state, action) => {
        state.userList.loading = false;
        state.userList.error = action.payload
      })
  } 
  
})

export const {
  userReset,
  testing
} = userSlice.actions;

export default userSlice.reducer;