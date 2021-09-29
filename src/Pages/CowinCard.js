import React from "react"
import Card from "../Components/Card/Card"
import { CardContent } from "@mui/material"
import { makeStyles } from "@mui/styles"

const CowinCard = () => {

  const classes = useStyles()

  return (
    <div className={ classes.cowinCard }>
      <Card>
        <CardContent style={ { padding: '20px' } }>
          <div>
            <h3 className={ classes.heading }>Beneficiary Details</h3>
            <div className={ classes.details }>
              <h4>Beneficiary Name</h4>
              <h4>John Doe</h4>
            </div>
            <div className={ classes.details }>
              <h4>Age</h4>
              <h4>25</h4>
            </div>
            <div className={ classes.details }>
              <h4>Gender</h4>
              <h4>Male</h4>
            </div>
            <div className={ classes.details }>
              <h4>Id</h4>
              <h4>Aadhaar XXXXXXXX0000</h4>
            </div>
            <div className={ classes.details }>
              <h4>Beneficiary Reference ID</h4>
              <h4>99999999999</h4>
            </div>
          </div>
          <div>
            <h3 className={ classes.heading }>Vaccination Details</h3>
            <div className={ classes.details }>
              <h4>Vaccine Name</h4>
              <h4>Covishield</h4>
            </div>
            <div className={ classes.details }>
              <h4>1st Dose</h4>
              <h4>25/06/2021</h4>
            </div>
            <div className={ classes.details }>
              <h4>2nd Dose</h4>
              <h4>03/09/2021</h4>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  cowinCard: {
    width: '35%',
    margin: '5% auto'
  },
  heading: {
    color: '#000066'
  },
  details: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}))

export default CowinCard
