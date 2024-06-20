import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const listProducts = createAsyncThunk('listProducts', async (_, {rejectWithValue}) => {

  try {

    // keyword = keyword ? keyword : ''
    // pageNumber = pageNumber ? pageNumber : ''
    console.log('work');

    const res = await axios.get(`/api/products`)
    const {products} = res.data
    return products
    
  } catch (error) {
    const message = error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message;
    return rejectWithValue(message);
  }
})
