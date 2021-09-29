import React, { createContext, useState } from "react"
import axios from "axios";

export const AuthContext = createContext()

const AuthContextProvider = (props) => {

  const initialState = {
    token: '',
  }

  const [txnId, setTxnId] = useState('')
  const [authState, setAuthState] = useState(initialState)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const GenerateOtp = async (payload) => {
    try {
      const res = await axios.post(`https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`, payload)
      setTxnId(res.data.txnId)
      if (res.status === 200) {
        return {
          success: true
        }
      } else {
        return {
          success: false
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const ConfirmOtp = async (data) => {
    const payload = {
      otp: data,
      txnId: txnId
    }
    try {
      const res = await axios.post('https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP', payload)
      setAuthState((state) => ({ ...state, token: res.data.token }))
      setIsLoggedIn(true)
      if (res.status === 200) {
        return {
          success: true
        }
      } else {
        return {
          success: false
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <AuthContext.Provider
      value={ {
        GenerateOtp,
        ConfirmOtp,
        authState,
        isLoggedIn
      } }
    >
      { props.children }
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
