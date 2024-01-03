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
    const response = await fetch('http://localhost:3000/teams');
    return response.json();
}

async function getStadiums() {
    const response = await fetch('http://localhost:3000/stadiums');
    return response.json();
}

export default function AddMatch({close, setMatches}) {
    const [teams, setTeams] = useState([]);
    const [stadiums, setStadiums] = useState([]);
    const [homeTeam, setHomeTeam] = useState(null);
    const [awayTeam, setAwayTeam] = useState(null);
    const [stadium, setStadium] = useState(null);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0] + 'T' + new Date().toISOString().split('T')[1].split('.')[0]);
    const [ticketPrice, setTicketPrice] = useState(0);
    const [referee, setReferee] = useState('');
    const [linesman1, setLinesman1] = useState('');
    const [linesman2, setLinesman2] = useState('');

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
                            <FormControl error={homeTeam === null} required sx={{width: '50%'}}>
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
                            <FormControl error={awayTeam === null} required sx={{width: '50%'}}>
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
                            <FormControl error={stadium === null} required sx={{width: '50%'}}>
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
                                error={date < new Date().toISOString().split('.')[0]}
                                required
                                label="Match Date"
                                type="datetime-local"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                            />
                        </Grid>

                        <Grid item md={6} lg={4} container justifyContent={'center'}>
                            <TextField
                                error={ticketPrice === ''}
                                required
                                label="Ticket Price"
                                type="number"
                                value={ticketPrice}
                                onChange={(event) => {
                                    if (event.target.value < 0) return;
                                    setTicketPrice(event.target.value);
                                }}
                            />
                        </Grid>

                        <Grid item md={6} lg={4} container justifyContent={'center'}>
                            <TextField
                                error={referee === ''}
                                required
                                label="referee"
                                value={referee}
                                onChange={(event) => {
                                    if (!/^[a-zA-Z\s]+$/.test(event.target.value) && event.target.value !== '') return;
                                    setReferee(event.target.value)
                                }}
                            />
                        </Grid>

                        <Grid item md={6} lg={4} container justifyContent={'center'}>
                            <TextField
                                error={linesman1 === ''}
                                required
                                label={"Linesman 1"}
                                value={linesman1}
                                onChange={(event) => {
                                    if (!/^[a-zA-Z\s]+$/.test(event.target.value) && event.target.value !== '') return;
                                    setLinesman1(event.target.value)
                                }}
                            />
                        </Grid>

                        <Grid item md={6} lg={4} container justifyContent={'center'}>
                            <TextField
                                error={linesman2 === ''}
                                required
                                label={"Linesman 2"}
                                value={linesman2}
                                onChange={(event) => {
                                    if (!/^[a-zA-Z\s]+$/.test(event.target.value) && event.target.value !== '') return;
                                    setLinesman2(event.target.value)
                                }}
                            />
                        </Grid>

                    </Grid>
                    <Grid item>
                        <Button variant={'contained'} onClick={() => {
                            if (date < new Date().toISOString().split('.')[0]) {
                                console.log(date);
                                console.log(new Date().toISOString().split('.')[0]);
                                alert("Date is in the past");
                                return;
                            }
                            if (referee === '' || linesman1 === '' || linesman2 === '' || homeTeam === null || awayTeam === null || stadium === null || date === null || ticketPrice === '') {
                                alert("fill all required fields");
                                return;
                            }
                            if (homeTeam === awayTeam) {
                                alert("Home team and away team can't be the same");
                                return;
                            }
                            fetch('http://localhost:3000/matches', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                credentials: 'include',
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
                                .then(response => response.json())
                                .then(data => {
                                    alert('success');
                                    close(false);
                                    setMatches(data);
                                })
                                .catch((error) => {
                                    alert('error, try again');
                                });
                        }}>Add Match</Button>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}