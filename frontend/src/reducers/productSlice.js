import { createSlice } from "@reduxjs/toolkit";
import {
  listProducts,
  createProduct,
  proDetails,
  editProduct,
  deleteProduct,
  topRatedProducts,
  createProductReview
} from '../actions/productThunk'

const productList = {
  list: [],
  page:1,
  pages:1,
  error: false,
  loading: false
}

const productTopRated =  {
  products: [],
  error:false,
  loading:false
}

const productDetails = {
  details: {
    name:'',
    image: '',
    brand: '',
    category: '',
    description: '',
    rating: '',
    numReviews: '',
    price: '',
    countInStock: '',
    reviews: [],
  },
  error: false,
  loading: false
}

const productCreate = {
  loading: false,
  error: false,
  successCreate: false
}

const productDelete = {
  loading: false,
  error: false
}

const productReviewCreate = {
  success: false,
  error: false
}

const initialState = {
  productList,
  productTopRated,
  productDetails,
  productCreate,
  productDelete,
  productReviewCreate
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
    productReviewCreateReset: (state) => {
      state.productReviewCreate = productReviewCreate
    },
    productReset: (state) => {
      state.productList = productList;
      state.productDetails = productDetails;
      state.productCreate = productCreate;
      state.productDelete = productDelete;
      state.productTopRated = productTopRated;
      state.productReviewCreate = productReviewCreate;
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

      .addCase(topRatedProducts.pending, (state) => {
        state.productTopRated.loading = true;
        state.productTopRated.error = false;
      })
      .addCase(topRatedProducts.fulfilled, (state,action) => {
        state.productTopRated.products = action.payload;
        state.productTopRated.loading = false;
      })
      .addCase(topRatedProducts.rejected, (state,action) => {
        state.productTopRated.error = action.payload;
        state.productTopRated.loading = false;
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
        state.productDetails.details = action.payload
        state.productCreate.loading = false
        state.productCreate.successCreate = true
      })
      .addCase(editProduct.rejected, (state,action) => {
        state.productCreate.error = action.payload;
        state.productCreate.loading = false
      })

      .addCase(deleteProduct.pending, (state) => {
        state.productDelete.loading = true;
        state.productDelete.error = false;
      })
      .addCase(deleteProduct.fulfilled, (state,action) => {
        state.productList.list = state.productList.list.filter((product) => product._id !== action.payload._id)
        state.productDelete.loading = false
      })
      .addCase(deleteProduct.rejected, (state,action) => {
        state.productDelete.loading = false
        state.productDelete.error = action.payload;
      })

      .addCase(createProductReview.pending, (state) => {
        state.productReviewCreate.success = false;
        state.productReviewCreate.error = false;
      })
      .addCase(createProductReview.fulfilled, (state) => {
        state.productReviewCreate.success = true
      })
      .addCase(createProductReview.rejected, (state,action) => {
        state.productReviewCreate.error = action.payload;
      })

  }
})

export const {
  productCreateReset,
  productReset,
  productListReset,
  productReviewCreateReset
} = productSlice.actions

export default productSlice.reducer