import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk('createOrder', async (order,{rejectWithValue,getState}) => {

  try {
    const state = getState();
    const token = state.user.userInfo.user.token;

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const {data} = await axios.post(
      '/api/orders',
      order,
      config
    )
    return data
  } catch (error) {
    const message = error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message;
    return rejectWithValue(message);
  }

})

export const orderDetailsThunk = createAsyncThunk('orderDetails', async(id,{rejectWithValue,getState}) => {

  try {
    const state = getState();
    const token = state.user.userInfo.user.token;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    };

    const {data}  = await axios.get(
      `/api/orders/${id}`,
      config
    )
    return data
    
  } catch (error) {
    const message = error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message;
    return rejectWithValue(message);
  }
})

export const payOrder  = createAsyncThunk('payOrder', async({id,paymentResult},{rejectWithValue,getState}) => {

  try {
    const state = getState();
    const token = state.user.userInfo.user.token;

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const {data} = await axios.put(
      `/api/orders/${id}/pay`,
      paymentResult,
      config
    )
    return data
    
  } catch (error) {
    const message = error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message;
    return rejectWithValue(message);
  }
})

export const deliverOrder = createAsyncThunk('deliverOrder', async(id,{rejectWithValue,getState}) => {

  try {
    const state = getState();
    const token = state.user.userInfo.user.token;

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    const {data} = await axios.put(
      `/api/orders/${id}/deliver`,
      {},
      config
    ) 

    return data;
    
  } catch (error) {
    const message = error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message;
    return rejectWithValue(message);
  }
})

export const ListOrders = createAsyncThunk('orderList', async(_,{rejectWithValue,getState}) => {

  try {

    const state = getState();
    const token = state.user.userInfo.user.token;

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    const {data} = await axios.get(
      `/api/orders`,
      config
    )

    return data;
    
  } catch (error) {
    const message = error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message;
    return rejectWithValue(message);
    
  }
})

export const ListMyOrders = createAsyncThunk('orderMyList', async(_,{rejectWithValue,getState}) => {

  try {

    const state = getState();
    const token = state.user.userInfo.user.token;

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    const {data} = await axios.get(
      `/api/orders/myorders`,
      config
    )
    return data;
    
  } catch (error) {
    const message = error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message;
    return rejectWithValue(message);
    
  }
})