import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  userInfo: null,
  loading: false,
  error: false
}

export const signIn= createAsyncThunk('api/user/login', async ({email,password}, {rejectWithValue}) => {
  try {

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.post(
      'api/users/login',
      {email,password},
      config)
      const data = res.data
      return data
    
  } catch (error) {
    const message = error.response.data.message
    return rejectWithValue(message)
    
  }
})

const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    signInRequest:(state) => {
      state.loading = true;
    },
    signInSuccess: (state,action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    signInFailure: (state,action) => {
      state.loading = false;
      state.error = action.payload
    },
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
  } 
  
})

export const {
  signInRequest,
  signInFailure,
  signInSuccess,
  logoutSuccess
} = userSlice.actions;

export default userSlice.reducer;