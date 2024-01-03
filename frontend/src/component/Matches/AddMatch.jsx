import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

async function getTeams() {
    const response = await fetch('https://match-reservation-system.vercel.app/teams');
    return response.json();
}

async function getStadiums() {
    const response = await fetch('https://match-reservation-system.vercel.app/stadiums');
    return response.json();
}

export default function AddMatch({close}) {
    const [teams, setTeams] = useState([]);
    const [stadiums, setStadiums] = useState([]);
    const [homeTeam, setHomeTeam] = useState(null);
    const [awayTeam, setAwayTeam] = useState(null);
    const [stadium, setStadium] = useState(null);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0] + 'T' + new Date().toISOString().split('T')[1].split('.')[0]);
    const [ticketPrice, setTicketPrice] = useState(0);
    const [referee, setReferee] = useState(null);
    const [linesman1, setLinesman1] = useState(null);
    const [linesman2, setLinesman2] = useState(null);

    useEffect(() => {
        getTeams().then((data) => {
            setTeams(data);
        });
        getStadiums().then((data) => {
            setStadiums(data);
        });
    }, []);
    return (
        <>
            <IconButton size={'large'} onClick={() => close(false)}
                        sx={{mr: 3, color: 'white', position: 'absolute', top: 0, right: 0}}>
                <CloseIcon fontSize={'large'}/>
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
                <Grid container spacing={10} direction={'column'} justifyContent={"space-between"}
                      alignItems={'center'}>
                    <Grid item>
                        <Typography variant='h3' fontFamily={'quicksand'} marginBottom={0}>
                            Add Match:
                        </Typography>
                    </Grid>
                    <Grid container item spacing={1} justifyContent={'center'}>
                        <Grid item md={6} lg={4} container justifyContent={'center'}>
                            <FormControl sx={{width: '50%'}}>
                                <InputLabel id="Hometeam">HomeTeam</InputLabel>
                                <Select
                                    labelId="Hometeam"
                                    label="Hometeam"
                                    value={homeTeam}
                                    onChange={(event) => setHomeTeam(event.target.value)}
                                >
                                    {teams.map((team) => (
                                        <MenuItem value={team._id}>{team.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={6} lg={4} container justifyContent={'center'}>
                            <FormControl sx={{width: '50%'}}>
                                <InputLabel id="Awayteam">AwayTeam</InputLabel>
                                <Select
                                    labelId="Awayteam"
                                    label="Awayteam"
                                    value={awayTeam}
                                    onChange={(event) => setAwayTeam(event.target.value)}
                                >
                                    {teams.map((team) => (
                                        <MenuItem value={team._id}>{team.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item md={6} lg={4} container justifyContent={'center'}>
                            <FormControl sx={{width: '50%'}}>
                                <InputLabel id="Stadiums">Stadiums</InputLabel>
                                <Select
                                    labelId="Stadiums"
                                    label="Stadiums"
                                    value={stadium}
                                    onChange={(event) => setStadium(event.target.value)}
                                >
                                    {stadiums.map((stad) => (
                                        <MenuItem value={stad._id}>{stad.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item md={6} lg={4} container justifyContent={'center'}>
                            <TextField
                                label="Match Date"
                                type="datetime-local"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                            />
                        </Grid>

                        <Grid item md={6} lg={4} container justifyContent={'center'}>
                            <TextField
                                label="Ticket Price"
                                type="number"
                                value={ticketPrice}
                                onChange={(event) => setTicketPrice(event.target.value)}
                            />
                        </Grid>

                        <Grid item md={6} lg={4} container justifyContent={'center'}>
                            <TextField
                                label="referee"
                                value={referee}
                                onChange={(event) => setReferee(event.target.value)}
                            />
                        </Grid>

                        <Grid item md={6} lg={4} container justifyContent={'center'}>
                            <TextField
                                label={"Linesman 1"}
                                value={linesman1}
                                onChange={(event) => setLinesman1(event.target.value)}
                            />
                        </Grid>

                        <Grid item md={6} lg={4} container justifyContent={'center'}>
                            <TextField
                                label={"Linesman 2"}
                                value={linesman2}
                                onChange={(event) => setLinesman2(event.target.value)}
                            />
                        </Grid>

                    </Grid>
                    <Grid item>
                        <Button variant={'contained'} onClick={() => {
                            fetch('https://match-reservation-system.vercel.app/matches', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    homeTeam: homeTeam,
                                    awayTeam: awayTeam,
                                    stadium: stadium,
                                    date: date,
                                    ticketPrice: ticketPrice,
                                    referee: referee,
                                    linesman: [linesman1, linesman2]
                                }),
                            })
                                .then(response => response.text())
                                .then(data => {
                                    console.log('Success:', data);
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                        }}>Add Match</Button>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}