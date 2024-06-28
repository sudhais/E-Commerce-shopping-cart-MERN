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

export const listUser = createAsyncThunk('userlist', async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const token = state.user.userInfo.user.token;

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    };

    const res = await axios.get('/api/users',config);
    const {users} = res.data;
    return users;
  } catch (error) {
    const message = error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message;
    return rejectWithValue(message);
  }
});

export const userDelete = createAsyncThunk('userDelete', async(id, {rejectWithValue, getState}) => {
  try {

    const state = getState();
    const token = state.user.userInfo.user.token;

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    };

    const res = await axios.delete(`/api/users/${id}`,config)
    const {success} = res.data
    let users = state.user.userList.list
    if(success){
      users =  users.filter((user)=> user._id !== id)
    }
    return users

  } catch (error) {

    const message = error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message;
    return rejectWithValue(message);
    
  }
})

export const getUserDetails = createAsyncThunk('userDetails', async(id,{rejectWithValue,getState}) => {

  try {
    const state = getState();
    const token = state.user.userInfo.user.token;

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    };

    const res = await axios.get(`/api/users/${id}`,config)
    const data = res.data
    return data
    
  } catch (error) {
    const message = error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message;
    return rejectWithValue(message);
  }

})

export const updateUser = createAsyncThunk('updateUser', async({id,user},{rejectWithValue,getState}) => {

  try {

    const state = getState();
    const token = state.user.userInfo.user.token;

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      `/api/users/${id}`,
      user,
      config
    )

    const data = res.data
    return data
    
  } catch (error) {
    const message = error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message;
    return rejectWithValue(message);
  }
})