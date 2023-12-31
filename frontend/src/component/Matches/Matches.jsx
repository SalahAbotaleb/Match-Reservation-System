import Matchcard from "./Matchcard.jsx";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import Modal from '@mui/material/Modal';
import Reserve from "./Reserve.jsx";

async function getmatches() {
    const response = await fetch('http://localhost:3000/matches');
    return response.json();
}

export default function Matches() {
    const [matches, setMatches] = useState([]);
    const [reservematch, setReservematch] = useState(null);
    useEffect(() => {
        getmatches().then((data) => {
            setMatches(data);
        });
    }, []);

    return (
        <Box minwidth={1} height={'100%'} sx={{p: 2, bgcolor: '#3876BF'}}>
            <Typography color='#eeeeee' variant='h3' fontFamily={'quicksand'} marginBottom={0}>
                Upcoming Matches:
            </Typography>
            <Grid container spacing={2}>
                {matches.map((match) => (
                    <Grid item xs={12} md={6} xl={6}>
                        <Matchcard match={match} reserve={setReservematch}/>
                    </Grid>
                ))}
            </Grid>
            {/*<Backdrop sx={{color: '#fff'}} open={matches.length === 0}>*/}
            {/*    <Typography variant='h3' fontFamily={'quicksand'}>No matches available</Typography>*/}
            {/*</Backdrop>*/}
            <Modal open={reservematch !== null}>
                <Reserve reserve={setReservematch} match={reservematch} />
            </Modal>
        </Box>
    );
}