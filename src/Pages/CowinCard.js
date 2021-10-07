import React, { useContext, useEffect, useState } from "react"
import { makeStyles } from "@mui/styles"
import Control from "../Components/Controls/Control"
import { AuthContext } from "../Context/AuthContext"
import Spinner from "../Components/Spinner/Spinner"

const CowinCard = ({ onClick }) => {

  const classes = useStyles()

  const [loading, setLoading] = useState(true)
  const [cardData, setCardData] = useState()

  const { GetCovidCertificate } = useContext(AuthContext)


  useEffect(() => {
    getCertificate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getCertificate = async () => {
    const res = await GetCovidCertificate()
    console.log(res)
    setCardData(res)
    setLoading(false)
    new window.QRious({
      element: document.getElementById('qr-code'),
      size: 200,
      value: res.QRCode
    })
  }

  return (
    <>
      { loading ? (
        <Spinner/>
      ) : (
        <>
          <div className={ classes.cowinCard }>
            <div>
              <div className={ classes.header }>
                <h2 className={ classes.color }>Vaccination Card</h2>
                <h2 className={ classes.color }>COVID-19</h2>
              </div>
              <p>Name</p>
              <h3 className={ classes.color }>
                { cardData && cardData['Beneficiary Name'] }
              </h3>
              <p>Vaccine</p>
              <h3 className={ classes.color }>
                { cardData && cardData['Vaccine Name'] }
              </h3>
              <div className={ classes.dose }>
                <div>
                  <p>Dose 1</p>
                  <h3 className={ classes.color }>
                    { cardData && cardData['Date of Dose 1'] && cardData['Date of Dose 1'].split("(")[0] }
                  </h3>
                </div>
                <div>
                  <p>Dose 2</p>
                  <h3 className={ classes.color }>
                    { cardData && cardData['Date of Dose 2'] && cardData['Date of Dose 2'].split("(")[0] }
                  </h3>
                </div>
              </div>
              <canvas className={ classes.code } id="qr-code"/>
            </div>
          </div>
          <div className={ classes.action }>
            <Control.Button
              text="Continue"
              onClick={ () => onClick() }
              style={ { width: '25%' } }
            />
          </div>
        </>
      ) }
    </>
  )
}

const useStyles = makeStyles(() => ({
  cowinCard: {
    width: '45%',
    margin: '5% auto',
    backgroundColor: '#EE626F',
    borderRadius: '20px',
    padding: '30px',
    '@media (max-width: 600px)': {
      width: '80%'
    }
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dose: {
    width: '60%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '@media (max-width: 600px)': {
      width: '80%'
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
  action: {
    textAlign: 'center',
    marginTop: '20px'
  },
  color: {
    color: '#ffffff'
  }
}))

export default CowinCard
