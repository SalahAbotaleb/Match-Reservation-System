import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from '@mui/material/StepLabel';
import {useState, Fragment, useEffect} from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SeatGrid from "./SeatGrid.jsx";
import PayReservation from "./PayReservation.jsx";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import TextField from "@mui/material/TextField";

const steps = ['Select Your Seat', 'Pay'];
export default function Reserve({reserve, match, setMatches}) {
    const closereserve = () => {
        reserve(null);
    }

    const [activeStep, setActiveStep] = useState(0);
    const [tprice, setTprice] = useState(0);
    const [reservedseats, setReservedseats] = useState([]);


    const handleNext = () => {
        if (activeStep !== steps.length - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            closereserve();
        }

    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (<>
            <IconButton size={'large'} onClick={closereserve}
                        sx={{mr: 3, color: 'white', position: 'absolute', top: 0, right: 0}}>
                <CloseIcon onClick={closereserve} fontSize={'large'}/>
            </IconButton>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                bgcolor: '#eeeeee',
                transform: 'translate(-50%, -50%)',
                width: 0.9,
                height: 0.8,
                boxShadow: 24,
                borderRadius: 2,
                p: 4,
                m: 'auto',
                overflowX: 'auto',
                overflowY: 'auto'
            }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        return (<Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>);
                    })}
                </Stepper>

                <Typography variant={"subtitle1"}>Total Price: {tprice}</Typography>

                <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'} height={0.9}
                      position={'absolute'}>

                    <SeatGrid hidden={activeStep !== 0} match={match} setReservedSeats={setReservedseats}
                              setTprice={setTprice}/>

                    <PayReservation setMatches={setMatches} matchId={match._id} hidden={activeStep !== 1}
                                    reservedSeats={reservedseats}
                                    handleBack={handleBack} handleNext={handleNext}/>

                    {activeStep !== steps.length && activeStep !== steps.length - 1 ? (
                        <Grid item container justifyContent='end' position='absolute' bottom={0} right={0} mr={5} p={2}>
                            <Grid item>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{mr: 1}}
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={handleNext}>Next</Button>
                            </Grid>
                        </Grid>) : null
                    }
                </Grid>
            </Box>
        </>


    )
}