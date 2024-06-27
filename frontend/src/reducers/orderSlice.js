import { createSlice } from "@reduxjs/toolkit"
import { createOrder } from "../actions/orderThunk"

const orderCreate = {
  success:false,
  order: null,
  loading: false,
  error: false  
}

const initialState = {
  orderCreate
}

const orderSlice = createSlice({
  name:'order',
  initialState,
  reducers: {
    orderCreateReset : (state) => {
      state.orderCreate = orderCreate;
    }

  },
  extraReducers: (build) => {
    build
    .addCase(createOrder.pending, (state) => {
      state.orderCreate.loading = true;
      state.orderCreate.error = false;
      state.orderCreate.success = false
    })
    .addCase(createOrder.fulfilled, (state,action) => {
      state.orderCreate.order = action.payload;
      state.orderCreate.success = true;
      state.orderCreate.loading = false;
    })
    .addCase(createOrder.rejected, (state,action) => {
      state.orderCreate.error = action.payload;
      state.orderCreate.loading = false;
    })
  }
})

export const {
  orderCreateReset
} = orderSlice.actions

export default orderSlice.reducer

