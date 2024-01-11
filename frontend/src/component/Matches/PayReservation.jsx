import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import Button from "@mui/material/Button";

export default function PayReservation({setMatches, matchId, hidden, reservedSeats, handleBack, handleNext}) {
    const [creditcard, setCreditcard] = useState('');
    const [cvv, setCvv] = useState('');

    const reserveMatch = async () => {
        const response = await fetch('http://localhost:3000/matches/' + matchId + '/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                locations: reservedSeats.map((seat) => ({
                    row: seat.row,
                    column: seat.column
                })),
                cardNumber: creditcard,
                cardPin: cvv
            }),
            credentials: 'include'
        });
        return response.status;
    }
    const handleReserve = () => {
        if (!creditcard || creditcard.length !== 16 || !cvv || cvv.length !== 3) {
            return;
        }
        if (reservedSeats.length === 0) {
            alert('Please select at least one seat!');
            return;
        }
        reserveMatch().then((data) => {
            if (data === 201) {
                setMatches((prevMatches) => {
                    return prevMatches.map((match) => {
                        if (match._id === matchId) {
                            match.reservationMap = [...match.reservationMap, ...reservedSeats];
                        }
                        return match;
                    });
                });
                alert('Reservation successful!')

                handleNext();
            } else {
                alert('Reservation failed!')
            }
        });

    }

    return (<>
        <Grid item hidden={hidden}>
            <Typography variant={"subtitle1"}>Selected Seats:</Typography>
            <Grid container spacing={1}>
                {reservedSeats.map((seat) => (
                    <Grid item>
                        <Typography variant={"subtitle1"}>[Row: {seat.row} Column: {seat.column}]</Typography>
                    </Grid>
                ))}
            </Grid>
            <TextField value={creditcard} onChange={
                (event) => {
                    if (isNaN(event.target.value)) {
                        return;
                    }
                    setCreditcard(event.target.value);
                }
            } id="outlined-basic" label="Credit Card" variant="outlined" required={true}
                       error={!creditcard || creditcard.length !== 16}
                       margin={'normal'}/>
            <TextField value={cvv} onChange={
                (event) => {
                    if (isNaN(event.target.value)) {
                        return;
                    }
                    setCvv(event.target.value);
                }
            } id="outlined-basic" label="CVV" variant="outlined" error={!cvv || cvv.length !== 3} required={true}
                       margin={'normal'}/>
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