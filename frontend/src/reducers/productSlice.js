import { createSlice } from "@reduxjs/toolkit";
import {
  listProducts,
  createProduct,
  proDetails,
  editProduct
} from '../actions/productThunk'

const productList = {
  list: [],
  page:1,
  pages:1,
  error: false,
  loading: false
}

const productDetails = {
  details: null,
  error: false,
  loading: false
}

const productCreate = {
  loading: false,
  error: false,
  successCreate: false
}

const initialState = {
  productList,
  productDetails,
  productCreate
}

const productSlice = createSlice({
  name:'product',
  initialState,
  reducers:{
    productListReset:(state) => {
      state.productList = productList;
    },
    productCreateReset:(state) => {
      state.productCreate = productCreate
    },
    productReset: (state) => {
      state.productList = productList;
      state.productDetails = productDetails;
      state.productCreate = productCreate;
    }
  },
  extraReducers: (build) => {
    build
      .addCase(listProducts.pending, (state) => {
        state.productList.loading = true;
        state.productList.error = false;
      })
      .addCase(listProducts.fulfilled, (state,action) => {
        state.productList.list = action.payload.products;
        state.productList.page = action.payload.page;
        state.productList.pages = action.payload.pages;
        state.productList.loading = false;
      })
      .addCase(listProducts.rejected, (state,action) => {
        state.productList.error = action.payload;
        state.productList.loading = false;
      })

      .addCase(createProduct.pending, (state) => {
        state.productCreate.loading = true;
        state.productCreate.error = false;
        state.productCreate.successCreate = false;
      })
      .addCase(createProduct.fulfilled, (state,action) => {
        state.productList.list = [...state.productList.list, action.payload]
        state.productCreate.loading = false
        state.productCreate.successCreate = true
      })
      .addCase(createProduct.rejected, (state,action) => {
        state.productCreate.error = action.payload;
        state.productCreate.loading = false
      })

      .addCase(proDetails.pending, (state) => {
        state.productDetails.loading = true;
        state.productDetails.error = false;
      })
      .addCase(proDetails.fulfilled, (state,action) => {
        state.productDetails.loading = false
        state.productDetails.details = action.payload
      })
      .addCase(proDetails.rejected, (state,action) => {
        state.productDetails.error = action.payload;
        state.productDetails.loading = false
      })

      .addCase(editProduct.pending, (state) => {
        state.productCreate.loading = true;
        state.productCreate.error = false;
        state.productCreate.successCreate = false;
      })
      .addCase(editProduct.fulfilled, (state,action) => {
        state.productList.list = state.productList.list.map((product) => {
          if(product._id === action.payload._id)
            return action.payload
          else
            return product
        })
        state.productCreate.loading = false
        state.productCreate.successCreate = true
      })
      .addCase(editProduct.rejected, (state,action) => {
        state.productCreate.error = action.payload;
        state.productCreate.loading = false
      })

  }
})

export const {
  productCreateReset,
  productReset,
  productListReset
} = productSlice.actions

export default productSlice.reducer