import { createSlice } from "@reduxjs/toolkit";
import {listProducts} from '../actions/productThunk'

const productList = {
  list: [],
  error: false,
  loading: false
}
const initialState = {
  productList,
}

const productSlice = createSlice({
  name:'product',
  initialState,
  reducers:{
    productListReset:(state) => {
      state.productList = productList;
    }
  },
  extraReducers: (build) => {
    build
      .addCase(listProducts.pending, (state) => {
        state.productList.loading = true;
        state.productList.error = false;
      })
      .addCase(listProducts.fulfilled, (state,action) => {
        state.productList.list = action.payload;
        state.productList.loading = false
      })
      .addCase(listProducts.rejected, (state,action) => {
        state.productList.error = action.payload;
        state.productList.loading = false
      })
  }
})

export const {

} = productSlice.actions

export default productSlice.reducer