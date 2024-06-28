import { createSlice } from "@reduxjs/toolkit"

const cartList = []

const shippingAddress = {
  address: '',
  city: '',
  postalCode: '',
  country: ''
}

const price = {
  itemsPrice : '',
  shippingPrice : '',
  taxPrice: '',
  totalPrice: ''
}

const paymentMethod = ''

const initialState = {
  cartList,
  shippingAddress,
  paymentMethod,
  price

}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartReset : (state) => {
      state.cartList = cartList
      state.shippingAddress = shippingAddress
      state.paymentMethod = paymentMethod
      state.price = price
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
    },
    calculatePrice : (state) => {
      const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
      }

      state.price.itemsPrice = addDecimals(
        state.cartList.reduce((acc,item) => acc + (item.price * item.qty), 0)
      )

      state.price.shippingPrice = addDecimals(state.price.itemsPrice > 600 ? 100 : 0)
      state.price.taxPrice = addDecimals(Number((0.15 * state.price.itemsPrice).toFixed(2)))
      state.price.totalPrice = (
        Number(state.price.itemsPrice) +
        Number(state.price.shippingPrice) +
        Number(state.price.taxPrice)
      ).toFixed(2)
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
  addPaymentMethod,
  calculatePrice
} = cartSlice.actions

export default cartSlice.reducer