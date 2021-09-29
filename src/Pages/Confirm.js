import React from "react"
import Card from "../Components/Card/Card"
import { CardContent, IconButton } from "@mui/material"
import { makeStyles } from "@mui/styles"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Control from "../Components/Controls/Control";

const Confirm = ({ onClick }) => {

  const classes = useStyles()

  return (
    <div className={ classes.cowinCard }>
      <Card>
        <CardContent style={ { padding: '20px', textAlign: 'center' } }>
          <IconButton>
            <CheckCircleOutlineIcon style={ { fill: 'green' } }/>
          </IconButton>
          <h1>Your order is placed !!!</h1>
          <h3>It will be delivered by 08/10/2021</h3>
        </CardContent>
      </Card>
      <div className={ classes.action }>
        <Control.Button
          text="Done"
          onClick={ () => onClick() }
          style={ { width: '25%' } }
        />
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  cowinCard: {
    width: '35%',
    margin: '5% auto',
    '@media (max-width: 600px)': {
      width: '90%'
    }
  },
  heading: {
    color: '#000066'
  },
  details: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  action: {
    textAlign: 'center',
    marginTop: '20px'
  }
}))

export default Confirm
