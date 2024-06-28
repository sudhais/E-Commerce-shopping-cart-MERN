import {createSlice} from "@reduxjs/toolkit"
import {
  signIn, 
  signUp,
  listUser,
  userDelete,
  getUserDetails,
  updateUser,
  getUserProfile,
  updateUserProfile
} from '../actions/userThunk'

const userInfo = {
  error:false,
  loading:false,
  user:null
}

const userList = {
  error:false,
  loading:false,
  list: []
}

const userDetails = {
  error:false,
  loading:false,
  details: {
    name:'',
    email:'',
    isAdmin:''
  }
}

const userUpdate = {
  error:false,
  loading:false,
  successUpdate:false
}

const initialState = {
  userInfo,
  userList,
  userDetails,
  userUpdate
}

const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    userReset: (state) => {
      state.userInfo = userInfo;
      state.userList = userList;
      state.userDetails = userDetails;
      state.userUpdate = userUpdate;
    },
    userDetailsReset: (state) => {
      state.userDetails = userDetails;
    },
    userUpdateReset: (state) => {
      state.userUpdate = userUpdate;
    },
    testing: (state) => {
      // console.log('working');
    }
  },
  extraReducers: (build) => {
    build
      .addCase(signIn.pending, (state)=> {
        state.userInfo.loading = true;
        state.userInfo.error = false;
      })
      .addCase(signIn.fulfilled, (state,action) => {
        state.userInfo.user = action.payload;
        state.userInfo.loading = false;
      })
      .addCase(signIn.rejected, (state,action) => {
        state.userInfo.loading = false;
        state.userInfo.error = action.payload
      })

      .addCase(signUp.pending, (state)=> {
        state.userInfo.loading = true;
        state.userInfo.error = false;
      })
      .addCase(signUp.fulfilled, (state,action)=> {
        state.userInfo.user = action.payload;
        state.userInfo.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.userInfo.loading = false;
        state.userInfo.error = action.payload
      })

      .addCase(listUser.pending, (state)=> {
        state.userList.loading = true;
        state.userList.error = false;
      })
      .addCase(listUser.fulfilled, (state,action)=> {
        state.userList.list = action.payload;
        state.userList.loading = false;
      })
      .addCase(listUser.rejected, (state, action) => {
        state.userList.loading = false;
        state.userList.error = action.payload
      })

      .addCase(userDelete.pending, (state)=> {
        state.userList.loading = true;
        state.userList.error = false;
      })
      .addCase(userDelete.fulfilled, (state,action)=> {
        state.userList.list = action.payload;
        state.userList.loading = false;
      })
      .addCase(userDelete.rejected, (state, action) => {
        state.userList.loading = false;
        state.userList.error = action.payload
      })
      
      .addCase(getUserDetails.pending, (state)=> {
        state.userDetails.loading = true;
        state.userDetails.error = false;
      })
      .addCase(getUserDetails.fulfilled, (state,action)=> {
        state.userDetails.details = action.payload;
        state.userDetails.loading = false;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.userDetails.loading = false;
        state.userDetails.error = action.payload
      })
      
      .addCase(updateUser.pending, (state)=> {
        state.userUpdate.loading = true;
        state.userUpdate.error = false;
      })
      .addCase(updateUser.fulfilled, (state,action)=> {
        state.userList.list = state.userList.list.map((user)=> {
          if(user._id === action.payload._id){
            return user = action.payload
          }
          return user
        } )
        state.userDetails.details = action.payload
        state.userUpdate.successUpdate = true;
        state.userUpdate.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userUpdate.loading = false;
        state.userUpdate.error = action.payload
      })

      .addCase(getUserProfile.pending, (state)=> {
        state.userDetails.loading = true;
        state.userDetails.error = false;
      })
      .addCase(getUserProfile.fulfilled, (state,action)=> {
        state.userDetails.details = action.payload;
        state.userDetails.loading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.userDetails.loading = false;
        state.userDetails.error = action.payload
      })

      .addCase(updateUserProfile.pending, (state)=> {
        state.userUpdate.loading = true;
        state.userUpdate.error = false;
        state.userUpdate.successUpdate = false;
      })
      .addCase(updateUserProfile.fulfilled, (state,action)=> {
        state.userDetails.details = action.payload;
        state.userUpdate.successUpdate = true;
        state.userUpdate.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.userUpdate.loading = false;
        state.userUpdate.error = action.payload
      })
  } 
  
})

export const {
  userReset,
  userUpdateReset,
  testing
} = userSlice.actions;

export default userSlice.reducer;