import React from "react"
import { Card, CardContent } from "@mui/material"
import { makeStyles } from "@mui/styles"
import Control from "../Components/Controls/Control"
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
    marginTop: '3%',
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

const Shipping = ({ onClick }) => {
  const classes = useStyles();

  const formData = {
    name: '',
    address: '',
    city: '',
    pincode: '',
    state: ''
  }

  const validate = (fieldValues) => {
    const temp = { ...errors }
    if ('name' in fieldValues)
      temp.mobile = fieldValues.mobile ? '' : 'Enter a name'
    if ('address' in fieldValues)
      temp.mobile = fieldValues.mobile ? '' : 'Enter a address'
    if ('city' in fieldValues)
      temp.mobile = fieldValues.mobile ? '' : 'Enter a city name'
    if ('pincode' in fieldValues)
      temp.mobile = fieldValues.mobile ? '' : 'Enter a valid pincode'
    if ('state' in fieldValues)
      temp.mobile = fieldValues.mobile ? '' : 'Enter a state'

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
    resetForm()
    onClick()
  }

  return (
    <div>
      <Card className={ classes.card }>
        <CardContent>
          <div className={ classes.cardHeading }>
            <h1>Enter Shipping Address</h1>
          </div>
          <div className={ classes.form }>
            <Control.Input
              type="text"
              name="name"
              value={ values.name }
              onChange={ handleInputChange }
              placeholder="Enter name"
              error={ errors.name }
              style={ { width: '100%', padding: '40px 0' } }
            />
            <Control.Input
              type="text"
              name="address"
              value={ values.address }
              onChange={ handleInputChange }
              placeholder="Enter address"
              error={ errors.address }
              style={ { width: '100%', padding: '40px 0' } }
            />
            <Control.Input
              type="text"
              name="city"
              value={ values.city }
              onChange={ handleInputChange }
              placeholder="Enter city"
              error={ errors.city }
              style={ { width: '100%', padding: '40px 0' } }
            />
            <Control.Input
              type="text"
              name="pincode"
              value={ values.pincode }
              onChange={ handleInputChange }
              placeholder="Enter pincode"
              error={ errors.pincode }
              style={ { width: '100%', padding: '40px 0' } }
            />
            <Control.Input
              type="text"
              name="state"
              value={ values.state }
              onChange={ handleInputChange }
              placeholder="Enter state"
              error={ errors.state }
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

export default Shipping
