import React, { createContext, useState } from "react"
import axios from "axios"
import jwt from "jsonwebtoken"

export const AuthContext = createContext()

const AuthContextProvider = (props) => {

  const initialState = {
    token: '',
  }

  const [txnId, setTxnId] = useState('')
  const [authState, setAuthState] = useState(initialState)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cardData, setCardData] = useState()

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

  const blobToBase64 = (blob) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result)
      }
    })
  }

  const GetCovidCertificate = async () => {
    const decodeToken = jwt.decode(authState.token)

    let beneficiary_reference_id

    try {
      beneficiary_reference_id = decodeToken.beneficiary_reference_id
    } catch (e) {
      console.log(e)
    }

    await axios.get(`https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=${ beneficiary_reference_id }`, {
      headers: {
        "Content-Type": "application/pdf",
        "Authorization": `Bearer ${ authState.token }`,
      },
      responseType: 'blob'
    }).then((res) => {
      const blobData = res.data
      let blob = new Blob([blobData], { type: 'text/plain' })

      blobToBase64(blob).then((res) => {
        const data = res.replace(/^data:application\/[a-z]+;base64,/, "")
        axios.post('https://pextract.herokuapp.com/v1/GetPDFDetails', {
          headers: {
            "Content-Type": "text/plain",
          },
          data
        }).then((response) => {
          new window.QRious({
            element: document.getElementById('qr-code'),
            size: 200,
            value: response.data.QRCode
          });
          setCardData(response.data)
          console.log(response.data)
        });
      })
    })
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
        isLoggedIn,
        GetCovidCertificate,
        cardData
      } }
    >
      { props.children }
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
