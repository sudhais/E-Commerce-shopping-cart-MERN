import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import {testing} from '../reducers/userSlice'
export const signIn= createAsyncThunk('user/login', async ({email,password}, {rejectWithValue,dispatch}) => {
  try {

    dispatch(testing())
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

export const signUp = createAsyncThunk('/users', async (user,{rejectWithValue}) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.post(
      'api/users',
      user,
      config)

    const data = res.data
    return data
    
  } catch (error) {
    const message = error.response.data.message
    return rejectWithValue(message)
  }
})