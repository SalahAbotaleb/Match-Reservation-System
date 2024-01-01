import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import Button from "@mui/material/Button";

export default function PayReservation({hidden, reservedSeats, handleBack, handleNext}) {
    const [creditcard, setCreditcard] = useState('');
    const [cvv, setCvv] = useState('');

    const handleReserve = () => {
        if (creditcard && cvv) {
            alert('Reservation Successful');
            handleNext();
        }
    }

    return (<>
        <Grid item hidden={hidden}>
            <Typography variant={"subtitle1"}>Selected Seats:</Typography>
            <Grid container spacing={1}>
                {reservedSeats.map((seat) => (
                    <Grid item>
                        <Typography variant={"subtitle1"}>[Row: {seat.row + 1} Column: {seat.column + 1}]</Typography>
                    </Grid>
                ))}
            </Grid>
            <TextField value={creditcard} onChange={
                (event) => {
                    setCreditcard(event.target.value);
                }
            } id="outlined-basic" label="Credit Card" variant="outlined" required={true} error={!creditcard}
                       margin={'normal'}/>
            <TextField value={cvv} onChange={
                (event) => {
                    setCvv(event.target.value);
                }
            } id="outlined-basic" label="CVV" variant="outlined" error={!cvv} required={true} margin={'normal'}/>
        </Grid>

        {!hidden &&
            <Grid item container justifyContent='end' position='absolute' bottom={0} right={0} mr={5} p={2}>
                <Grid item>
                    <Button
                        color="inherit"
                        onClick={handleBack}
                        sx={{mr: 1}}
                    >
                        Back
                    </Button>
                </Grid>
                <Grid item>
                    <Button onClick={handleReserve}>Reserve</Button>
                </Grid>
            </Grid>
        }

    </>)
}