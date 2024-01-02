import Matchcard from "./Matchcard.jsx";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import Modal from '@mui/material/Modal';
import Reserve from "./Reserve.jsx";
import AddMatch from "./AddMatch.jsx";
import Button from "@mui/material/Button";
import EditMatch from "./EditMatch.jsx";

async function getmatches() {
    const response = await fetch('http://localhost:3000/matches');
    return response.json();
}

async function getRole() {
    const response = await fetch('http://localhost:3000/userRole', {
        credentials: 'include'
    });
    return response.text();
}

export default function Matches() {
    const [matches, setMatches] = useState([]);
    const [reservematch, setReservematch] = useState(null);
    const [editmatch, setEditmatch] = useState(null);
    const [addmatch, setAddmatch] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        getRole().then((data) => {
            setRole(data);
        });
        getmatches().then((data) => {
            setMatches(data);
        });
    }, []);


    return (
        <Box minwidth={1} height={'100%'} sx={{p: 2, bgcolor: '#3876BF'}}>
            <Typography color='#eeeeee' variant='h3' fontFamily={'quicksand'} marginBottom={0}>
                Upcoming Matches:
            </Typography>
            {role === 'manager' && <Button onClick={() => setAddmatch(true)} variant='contained' size={'large'} sx={{margin: 1}}>Add match</Button>}
            <Grid container spacing={2}>
                {matches.map((match) => (
                    <Grid item xs={12} md={6} xl={6}>
                        <Matchcard role={role} match={match} reserve={setReservematch} edit={setEditmatch}/>
                    </Grid>
                ))}
            </Grid>
            {/*<Backdrop sx={{color: '#fff'}} open={matches.length === 0}>*/}
            {/*    <Typography variant='h3' fontFamily={'quicksand'}>No matches available</Typography>*/}
            {/*</Backdrop>*/}
            <Modal open={reservematch !== null}>
                <Reserve reserve={setReservematch} match={reservematch} setMatches={setMatches}/>
            </Modal>
            <Modal open={editmatch !== null}>
                <EditMatch match={editmatch} close={setEditmatch} setMatches={setMatches}/>
            </Modal>
            <Modal open={addmatch}>
                <AddMatch close={setAddmatch}/>
            </Modal>
        </Box>
    );
}