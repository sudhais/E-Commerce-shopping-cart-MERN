import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const listProducts = createAsyncThunk('listProducts', async (pageNumber, {rejectWithValue}) => {

  try {

    const keyword = ''
    pageNumber = pageNumber ? pageNumber : 1

    const {data:products} = await axios.get(`/api/products?${keyword}&${pageNumber}`)
    // const {products} = res.data
    return products
    
  } catch (error) {
    const message = error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message;
    return rejectWithValue(message);
  }
})

export const createProduct = createAsyncThunk('createProduct', async({formData:product},{rejectWithValue, getState}) => {

  try {

    const state = getState();
    const token = state.user.userInfo.user.token;

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      `/api/products`,
      product,
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

export const proDetails = createAsyncThunk('productDetails', async(id,{rejectWithValue}) => {

  try {

    const {data} = await axios.get(`/api/products/${id}`)
    return data;

  } catch (error) {
    const message = error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message;
    return rejectWithValue(message);
  }
}) 


export const editProduct = createAsyncThunk('editProduct', async({id,formData},{rejectWithValue,getState}) => {

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
      `/api/products/${id}`,
      formData,
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

export const deleteProduct = createAsyncThunk('deleteProduct', async(id,{rejectWithValue,getState}) => {

  try {
    const state = getState();
    const token = state.user.userInfo.user.token;

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    };

    const {data} = await axios.delete(
      `/api/products/${id}`,
      config
    )
    return data.product;
    
  } catch (error) {

    const message = error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message;
    return rejectWithValue(message);
    
  }
})