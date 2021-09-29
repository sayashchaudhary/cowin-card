import React from "react"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { AppBar, Toolbar } from "@mui/material"
import Login from "./Pages/Login"
import AuthContextProvider from "./Context/AuthContext";
import Otp from "./Pages/Otp";
import CowinCard from "./Pages/CowinCard";

const steps = ['Enter Phone Number', 'Enter OTP', 'Download Certificate'];

const App = () => {
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
          <CowinCard/>
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
          <Toolbar>Cowid Certificate</Toolbar>
        </AppBar>
        <Toolbar/>
        <Box sx={ { width: '100%', paddingTop: '50px' } }>
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
          { activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={ { mt: 2, mb: 1 } }>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={ { display: 'flex', flexDirection: 'row', pt: 2 } }>
                <Box sx={ { flex: '1 1 auto' } }/>
                <Button onClick={ handleReset }>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              { getContent() }
              <Box sx={ { display: 'flex', flexDirection: 'row', pt: 2 } }>
                <Box sx={ { flex: '1 1 auto' } }/>
                <Button onClick={ handleNext }>
                  { activeStep === steps.length - 1 ? 'Finish' : null }
                </Button>
              </Box>
            </React.Fragment>
          ) }
        </Box>
      </React.Fragment>
    </AuthContextProvider>
  )
}

export default App
