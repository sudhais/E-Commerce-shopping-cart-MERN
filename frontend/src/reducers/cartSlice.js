import { createSlice } from "@reduxjs/toolkit"

const cartList = []

const shippingAddress = {
  address: '',
  city: '',
  postalCode: '',
  country: ''
}

const paymentMethod = ''

const initialState = {
  cartList,
  shippingAddress,
  paymentMethod

}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartReset : (state) => {
      state.cartList = cartList
      state.shippingAddress = shippingAddress
      state.paymentMethod = paymentMethod
    },
    addToCart : (state,action) => {
      const isExists = state.cartList.some((item) => item._id === action.payload._id)
      if(!isExists)
        state.cartList = [...state.cartList, action.payload]
    },
    addQty: (state,action) => {
      state.cartList = state.cartList.map((item) => 
        item._id === action.payload._id
          ? { ...item, qty: action.payload.qty }
          : item
      );
    },
    removeCart: (state,action) => {
      state.cartList = state.cartList.filter((item) => item._id !== action.payload)
    },
    addShippingAddress : (state,action) => {
      state.shippingAddress = action.payload
    },
    addPaymentMethod : (state,action) => {
      state.paymentMethod = action.payload
    }

  },
  extraReducers: (build) => {
    build
  }
})

export const {
  cartReset,
  addToCart,
  addQty,
  removeCart,
  addShippingAddress,
  addPaymentMethod
} = cartSlice.actions

export default cartSlice.reducer