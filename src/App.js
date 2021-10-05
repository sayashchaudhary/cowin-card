import React from "react"
import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom"
import Control from "./Components/Controls/Control"

const App = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>Covid-19 Vaccination Card</Toolbar>
      </AppBar>
      <div style={ { textAlign: 'center', margin: '20% auto' } }>
        <h1>Get Your Covid-19 Vaccination Card</h1>
        <Link to="/covid19-card" style={ { textDecoration: 'none' } }>
          <Control.Button
            size="large"
            text="Order Now"
            style={ { width: '40%' } }
          />
        </Link>
      </div>
    </>
  )
}

export default App
