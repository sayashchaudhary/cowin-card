import React from "react"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import { AppBar, Toolbar } from "@mui/material"
import { makeStyles } from "@mui/styles"
import Login from "../Pages/Login"
import AuthContextProvider from "../Context/AuthContext";
import Otp from "../Pages/Otp";
import CowinCard from "../Pages/CowinCard";
import Shipping from "../Pages/Shipping";
import Confirm from "../Pages/Confirm";

const steps = [
  'Enter Phone Number',
  'Enter OTP',
  'Covid-19 Card',
  'Enter Address',
  'Confirm'
]

const Process = () => {

  const classes = useStyles()

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const getContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Login onClick={ handleNext }/>
        )

      case 1:
        return (
          <Otp onClick={ handleNext }/>
        )

      case 2:
        return (
          <CowinCard onClick={ handleNext }/>
        )

      case 3:
        return (
          <Shipping onClick={ handleNext }/>
        )

      case 4:
        return (
          <Confirm onClick={ handleReset }/>
        )

      default:
        return (
          <h1>Enter a valid step</h1>
        )
    }
  }

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <AuthContextProvider>
      <React.Fragment>
        <AppBar position="fixed">
          <Toolbar>Covid-19 Vaccination Card</Toolbar>
        </AppBar>
        <Toolbar/>
        <Box sx={ { width: '100%', paddingTop: '50px' } }>
          <div className={ classes.stepper }>
            <Stepper activeStep={ activeStep }>
              { steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={ label } { ...stepProps }>
                    <StepLabel { ...labelProps }>{ label }</StepLabel>
                  </Step>
                );
              }) }
            </Stepper>
          </div>
          <React.Fragment>
            { getContent() }
          </React.Fragment>
        </Box>
      </React.Fragment>
    </AuthContextProvider>
  )
}

const useStyles = makeStyles(() => ({
  stepper: {
    '@media (max-width: 600px)': {
      display: 'none'
    }
  }
}))

export default Process
