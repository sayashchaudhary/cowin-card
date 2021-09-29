import React, { useContext } from "react"
import { Card, CardContent } from "@mui/material"
import { makeStyles } from "@mui/styles"
import shajs from "sha.js"
import Control from "../Components/Controls/Control"
import { AuthContext } from "../Context/AuthContext"
import useForm from "../Hooks/useForm"

const useStyles = makeStyles(() => ({
  menuButton: {
    marginRight: '20px',
  },
  title: {
    flexGrow: 1,
  },
  card: {
    margin: '0 auto',
    width: '50%',
    marginTop: '10%',
    '@media (max-width: 600px)': {
      width: '90%'
    }
  },
  cardHeading: {
    textAlign: 'center'
  },
  form: {
    width: '90%',
    margin: '0 auto',
    paddingBottom: '40px'
  },
}));

const Otp = ({ onClick }) => {
  const classes = useStyles();

  const { ConfirmOtp } = useContext(AuthContext)

  const formData = {
    otp: ''
  }

  const validate = (fieldValues) => {
    const temp = { ...errors }
    if ('otp' in fieldValues)
      temp.mobile = fieldValues.mobile ? '' : 'Enter a valid otp'

    setErrors({
      ...errors
    })

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '')
  }

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    formData,
    true,
    validate
  )

  const handleSubmit = () => {
    if (validate) {
      const data = shajs('sha256').update(values.otp).digest('hex')
      ConfirmOtp(data).then((res) => {
        if (res.success) {
          resetForm()
          onClick()
        }
      })
    }
  }

  return (
    <div>
      <Card className={ classes.card }>
        <CardContent>
          <div className={ classes.cardHeading }>
            <h1>Enter Otp</h1>
          </div>
          <div className={ classes.form }>
            <Control.Input
              type="text"
              name="otp"
              value={ values.otp }
              onChange={ handleInputChange }
              placeholder="Enter otp"
              error={ errors.otp }
              style={ { width: '100%', padding: '40px 0' } }
            />
            <Control.Button
              size="large"
              text="Submit"
              onClick={ handleSubmit }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Otp
