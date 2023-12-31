import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from '@mui/material/StepLabel';
import {useState, Fragment} from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import EventSeatIcon from '@mui/icons-material/EventSeat';
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';

const steps = ['Select Your Seat', 'Pay', 'Summary'];
export default function Reserve({reserve, match}) {
    const closereserve = () => {
        reserve(null);
    }

    const [activeStep, setActiveStep] = useState(0);
    const [tprice, setTprice] = useState(0);

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

    const [seatcolor, setSeatcolor] = useState([{}]);
    const seats = match => {
        let seat = [];
        for (let i = 0; i < match.stadium.dimensions.rows; i++) {
            let ro = [];
            for (let j = 0; j < match.stadium.dimensions.columns; j++) {
                setSeatcolor((prev) => {
                    if (match.reservationMap.find((seat) => seat.row === i && seat.column === j)) {
                        return [...prev, {id: (10 * i + j).toString(), color: 'error'}];
                    } else {
                        return [...prev, {id: (10 * i + j).toString(), color: 'success'}];
                    }
                });

                ro.push(<EventSeatIcon key={10 * i + j} sx={{fontSize: 10}} onClick={
                    (e) => {
                        setTprice(tprice + 10);
                    }
                } color={seatcolor}/>)

            }
            seat.push(ro);
        }
        return seat;
    }

    return (<>
            <IconButton size={'large'} onClick={closereserve}
                        sx={{m: 3, color: 'white', position: 'absolute', top: 0, right: 0}}>
                <CloseIcon onClick={closereserve} fontSize={'large'}/>
            </IconButton>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                bgcolor: '#eeeeee',
                transform: 'translate(-50%, -50%)',
                width: 0.9,
                height: 0.72,
                boxShadow: 24,
                p: 4,
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
                    <Grid item hidden={activeStep === 1} position={'absolute'} top={-5} mr={5}>
                        <TransformWrapper
                            minScale={0.1}
                            maxScale={5}
                            initialScale={150 / match.stadium.dimensions.rows}
                            centerOnInit={true}
                        >
                            {({zoomIn, zoomOut, centerView, ...rest}) => (
                                <Fragment>
                                    <div className="tools">
                                        <IconButton onClick={() => zoomIn()}><ZoomInIcon/></IconButton>
                                        <IconButton onClick={() => zoomOut()}><ZoomOutIcon/></IconButton>
                                        <IconButton onClick={() => centerView()}><CenterFocusStrongIcon/></IconButton>
                                    </div>
                                    <TransformComponent wrapperStyle={{
                                        border: "2px solid black",
                                        borderRadius: '10px',
                                    }}>
                                        {seats(match).map((row) => (
                                            <Grid container justifyContent='center' wrap spacing={0.5}>
                                                {row.map((seat) => (
                                                    <Grid item>
                                                        {seat}
                                                    </Grid>
                                                ))}
                                            < /Grid>))
                                        }
                                    </TransformComponent>
                                </Fragment>
                            )}
                        </TransformWrapper>
                    </Grid>
                    {activeStep !== steps.length ? (
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
                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Done' : activeStep === steps.length - 2 ? 'Reserve' : 'Next'}
                                </Button>
                            </Grid>
                        </Grid>) : null
                    }
                </Grid>
            </Box>
        </>


    )
}