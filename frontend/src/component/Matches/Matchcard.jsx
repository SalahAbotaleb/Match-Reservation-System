import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Team from "./Team";
import Typography from "@mui/material/Typography";
import StadiumIcon from '@mui/icons-material/Stadium';
import SportsIcon from '@mui/icons-material/Sports';
import FlagIcon from '@mui/icons-material/Flag';
import {useNavigate} from "react-router-dom";
export default function Matchcard({match, reserve, edit, role}) {
    const navigate = useNavigate();
    const handleViewMatch = () => {
        role === 'Unauthorized' ? navigate('/login') : role === 'fan'? reserve(match) : edit(match);
        // edit(match);
    }
    const reservematch = () => {
        reserve(match);
    }
    return (
        <Paper elevation={3} sx={{
            bgcolor: '#dddddd',
            p: 2,
            marginX: 'auto',
            maxWidth: 600,
            marginY: 3,
            textAlign: 'center'
        }}>
            <Grid item container direction='column' rowSpacing={3}>
                <Grid item container alignItems='center'>

                    <Team name={match.homeTeam.name} logo={match.homeTeam.logo}/>

                    <Grid item xs={12} sm={4}>
                        {/*<h1 style={{fontFamily: 'quicksand'}}>VS</h1>*/}
                        <Typography variant='h1' fontFamily='quicksand' fontSize={60}> vs </Typography>
                        <Typography variant='h6' fontFamily='quicksand' color={'grey'}> {match.date.split('T')[0]} </Typography>
                        <Typography variant='h7' fontFamily='quicksand' color={'grey'}> {match.date.split('T')[1].split('.')[0]} </Typography>
                        {/*<h3 style={{color: 'grey', margin: 1, marginBottom:10}}>referee: {match.referee}</h3>*/}
                    </Grid>

                    <Team name={match.awayTeam.name} logo={match.awayTeam.logo}/>

                </Grid>

                <Grid item container direction='column' spacing={1}>
                    <Grid item>
                        <Button onClick={handleViewMatch} variant='contained' size={'large'} >View match</Button>
                    </Grid>
                    <Grid item>
                        <Typography variant='p' fontFamily='quicksand' color={'grey'}>
                            remaining {match.reservationMap.length}/{match.stadium.dimensions.rows * match.stadium.dimensions.columns} seats
                        </Typography>
                    </Grid>
                    <Grid item container spacing={1} justifyContent='space-between'>
                        <Grid item sx={{display: 'flex', alignItems: 'center'}}>
                            <StadiumIcon/>
                            <Typography variant='p' fontFamily='quicksand' color={'grey'}>
                                {match.stadium.name}
                            </Typography>
                        </Grid>
                        <Grid item sx={{display: 'flex', alignItems: 'center'}}>
                            <SportsIcon/>
                            <Typography variant='p' fontFamily='quicksand' color={'grey'}>
                                {match.referee}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={1} justifyContent='space-between'>
                        <Grid item sx={{display: 'flex', alignItems: 'center'}}>
                            <FlagIcon/>
                            <Typography variant='p' fontFamily='quicksand' color={'grey'}>
                                {match.linesman[0]}
                            </Typography>
                        </Grid>
                        <Grid item sx={{display: 'flex', alignItems: 'center'}}>
                            <FlagIcon/>
                            <Typography variant='p' fontFamily='quicksand' color={'grey'}>
                                {match.linesman[1]}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}