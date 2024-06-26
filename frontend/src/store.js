import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './reducers/userSlice'
import { thunk } from 'redux-thunk'
import productReducer from  './reducers/productSlice'
import orderReducer from './reducers/orderSlice'
import cartSlice from './reducers/cartSlice'

const rootReducer = combineReducers({
  user:userReducer,
  product: productReducer,
  cart: cartSlice,
  order: orderReducer
})

const persistconfig = {
  key: 'root',
  version:1,
  storage,
}

const persistedReducer = persistReducer(persistconfig, rootReducer)

export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:false,
  }).concat(thunk)
})

export const persitor = persistStore(store)
