import { createSlice } from '@reduxjs/toolkit'

const customerAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem('isAuth')

  if (isAuth && JSON.parse(isAuth) === true) {
    return true
  }

  return false
}

const initialState = {
  isAuth: customerAuthFromLocalStorage()
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateCustomer: (state) => {
        state.isAuth = true
    },
    unauthenticateCustomer: (state) => {
        state.isAuth = false
    }
  },
})

export const { authenticateCustomer, unauthenticateCustomer } = authSlice.actions

export default authSlice.reducer