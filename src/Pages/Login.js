import React, { useContext } from "react"
import { Card, CardContent } from "@mui/material"
import { makeStyles } from "@mui/styles"
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
    marginTop: '10%'
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

const Login = ({ onClick }) => {
  const classes = useStyles();

  const { GenerateOtp } = useContext(AuthContext)

  const formData = {
    mobile: ''
  }

  const validate = (fieldValues) => {
    const temp = { ...errors }
    if ('mobile' in fieldValues)
      temp.mobile = fieldValues.mobile ? '' : 'Enter a valid phone number'

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
      const payload = {
        mobile: values.mobile
      }
      GenerateOtp(payload).then((res) => {
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
            <h1>Enter Phone Number</h1>
          </div>
          <div className={ classes.form }>
            <Control.Input
              type="text"
              name="mobile"
              value={ values.mobile }
              onChange={ handleInputChange }
              placeholder="Enter mobile no"
              error={ errors.mobile }
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

export default Login
