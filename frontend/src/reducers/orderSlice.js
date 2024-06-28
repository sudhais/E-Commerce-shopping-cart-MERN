import { createSlice } from "@reduxjs/toolkit"
import { ListMyOrders, ListOrders, createOrder, deliverOrder, orderDetailsThunk, payOrder } from "../actions/orderThunk"

const orderCreate = {
  success:false,
  order: null,
  loading: false,
  error: false  
}

const orderDetails = {
  details: {
    orderItems: [],
    user: {
      name: '',
      email: ''
    },
    shippingAddress: {
      address:'',
      city:'',
      postalCode:'',
      country:''
    },
    isDelivered:false,
    deliveredAt:'',
    paymentMethod:'',
    paidAt:'',

  },
  loading: false,
  error: false
}

const orderPay = {
  loading: false,
  error: false,
  success: false
}

const orderDeliver = {
  success: false,
  loading: false,
  error: false
}

const orderList = {
  list: [],
  loading: false,
  error: false
}

const orderMyList = {
  list: [],
  loading: false,
  error: false
}

const initialState = {
  orderList,
  orderCreate,
  orderDetails,
  orderPay,
  orderDeliver,
  orderMyList
}

const orderSlice = createSlice({
  name:'order',
  initialState,
  reducers: {
    orderCreateReset : (state) => {
      state.orderCreate = orderCreate;
    },
    orderReset : (state) => {
      state.orderCreate = orderCreate;
      state.orderDetails = orderDetails;
      state.orderPay = orderPay;
      state.orderDeliver = orderDeliver;
      state.orderList = orderList;
      state.orderMyList = orderMyList;
    },
    orderPayReset: (state) => {
      state.orderPay = orderPay;
    },
    orderDeliverReset : (state) => {
      state.orderDeliver = orderDeliver
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
      state.orderMyList.list = [...state.orderMyList.list, action.payload]
    })
    .addCase(createOrder.rejected, (state,action) => {
      state.orderCreate.error = action.payload;
      state.orderCreate.loading = false;
    })

    .addCase(orderDetailsThunk.pending, (state) => {
      state.orderDetails.loading = true;
      state.orderDetails.error = false;
    })
    .addCase(orderDetailsThunk.fulfilled, (state,action) => {
      state.orderDetails.details = action.payload;
      state.orderDetails.loading = false;
    })
    .addCase(orderDetailsThunk.rejected, (state,action) => {
      state.orderDetails.error = action.payload;
      state.orderDetails.loading = false;
    })

    .addCase(payOrder.pending, (state) => {
      state.orderPay.loading = true;
      state.orderPay.error = false;
      state.orderPay.success = false;
    })
    .addCase(payOrder.fulfilled, (state,action) => {
      state.orderPay.success = true;
      state.orderPay.loading = false;
    })
    .addCase(payOrder.rejected, (state,action) => {
      state.orderPay.error = action.payload;
      state.orderPay.loading = false;
    })

    .addCase(ListOrders.pending, (state) => {
      state.orderList.loading = true;
      state.orderList.error = false;
    })
    .addCase(ListOrders.fulfilled, (state,action) => {
      state.orderList.list = action.payload;
      state.orderList.loading = false;
    })
    .addCase(ListOrders.rejected, (state,action) => {
      state.orderList.error = action.payload;
      state.orderList.loading = false;
    })

    .addCase(deliverOrder.pending, (state) => {
      state.orderDeliver.loading = true;
      state.orderDeliver.error = false;
      state.orderDeliver.success = false;
    })
    .addCase(deliverOrder.fulfilled, (state,action) => {
      state.orderDeliver.success = true;
      state.orderDeliver.loading = false;
    })
    .addCase(deliverOrder.rejected, (state,action) => {
      state.orderDeliver.error = action.payload;
      state.orderDeliver.loading = false;
    })

    .addCase(ListMyOrders.pending, (state) => {
      state.orderMyList.loading = true;
      state.orderMyList.error = false;
    })
    .addCase(ListMyOrders.fulfilled, (state,action) => {
      state.orderMyList.list = action.payload;
      state.orderMyList.loading = false;
    })
    .addCase(ListMyOrders.rejected, (state,action) => {
      state.orderMyList.error = action.payload;
      state.orderMyList.loading = false;
    })
  }
})

export const {
  orderCreateReset,
  orderReset,
  orderPayReset,
  orderDeliverReset
} = orderSlice.actions

export default orderSlice.reducer

