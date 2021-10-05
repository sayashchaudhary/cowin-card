import React, { useContext, useEffect, useState } from "react"
import Card from "../Components/Card/Card"
import { CardContent } from "@mui/material"
import { makeStyles } from "@mui/styles"
import Control from "../Components/Controls/Control"
import { AuthContext } from "../Context/AuthContext"
import Spinner from "../Components/Spinner/Spinner"

const CowinCard = ({ onClick }) => {

  const classes = useStyles()

  const [loading, setLoading] = useState(true)

  const { GetCovidCertificate, cardData } = useContext(AuthContext)


  useEffect(() => {
    GetCovidCertificate().then(() => {
      setLoading(false)
    })
  })


  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className={ classes.cowinCard }>
          <Card>
            <CardContent style={ { padding: '20px' } }>
              <div className={ classes.content }>
                <canvas className={ classes.code } id="qr-code"/>
                <div className={classes.detailWrapper}>
                  <div className={ classes.details }>
                    <h4>Beneficiary Name</h4>
                    <h4 className={classes.detail}>{ cardData && cardData['Beneficiary Name'] }</h4>
                  </div>
                  <div className={ classes.details }>
                    <h4>Age</h4>
                    <h4>{ cardData?.Age }</h4>
                  </div>
                  <div className={ classes.details }>
                    <h4>Gender</h4>
                    <h4>{ cardData?.Gender }</h4>
                  </div>
                  <div className={ classes.details }>
                    <h4>Vaccine Name</h4>
                    <h4>{ cardData && cardData['Vaccine Name'] }</h4>
                  </div>
                  <div className={ classes.details }>
                    <h4>Dose 1</h4>
                    <h4>{ cardData && cardData['Date of Dose 1'] && cardData['Date of Dose 1'].split("(")[0] }</h4>
                  </div>
                  <div className={ classes.details }>
                    <h4>Dose 2</h4>
                    <h4>{ cardData && cardData['Date of Dose 2'] && cardData['Date of Dose 2'].split("(")[0] }</h4>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className={ classes.action }>
            <Control.Button
              text="Continue"
              onClick={ () => onClick() }
              style={ { width: '25%' } }
            />
          </div>
        </div>
      )}
    </>
  )
}

const useStyles = makeStyles(() => ({
  cowinCard: {
    width: '45%',
    margin: '5% auto',
    '@media (max-width: 600px)': {
      width: '90%'
    }
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '@media (max-width: 600px)': {
      flexDirection: 'column'
    }
  },
  code: {
    width: '35%',
    border: '1px solid black',
    height: '300px',
    '@media (max-width: 600px)': {
      width: '100%'
    }
  },
  detailWrapper: {
    width: '50%',
    '@media (max-width: 600px)': {
      width: '100%'
    }
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  detail: {
    textAlign: 'right'
  },
  action: {
    textAlign: 'center',
    marginTop: '20px'
  }
}))

export default CowinCard
