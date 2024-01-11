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
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import SeatGrid from "./SeatGrid.jsx";

async function getTeams() {
    const response = await fetch('http://localhost:3000/teams');
    return response.json();
}

async function getStadiums() {
    const response = await fetch('http://localhost:3000/stadiums');
    return response.json();
}

const steps = ['View Seats', 'Edit Match'];

export default function EditMatch({close, match, setMatches}) {
    const [teams, setTeams] = useState([]);
    const [stadiums, setStadiums] = useState([]);
    const [homeTeam, setHomeTeam] = useState(match.homeTeam._id);
    const [awayTeam, setAwayTeam] = useState(match.awayTeam._id);
    const [stadium, setStadium] = useState(match.stadium._id);
    const [date, setDate] = useState(match.date.split('.')[0]);
    const [ticketPrice, setTicketPrice] = useState(match.ticketPrice);
    const [referee, setReferee] = useState(match.referee);
    const [linesman1, setLinesman1] = useState(match.linesman[0]);
    const [linesman2, setLinesman2] = useState(match.linesman[1]);
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (activeStep !== steps.length - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            close(null);
        }

    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

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
            <IconButton size={'large'} onClick={() => close(null)}
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
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        return (<Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>);
                    })}
                </Stepper>
                {activeStep === 0 && <Grid container direction={'column'} justifyContent={'center'} alignItems={'center'} height={0.9}
                      position={'absolute'}>
                    <SeatGrid hidden={activeStep !== 0} match={match}/>
                </Grid>}
                {activeStep === 1 && <Grid container spacing={10} direction={'column'} justifyContent={"space-between"}
                                           alignItems={'center'}>
                    <Grid item>
                        <Typography variant='h3' fontFamily={'quicksand'} marginBottom={0}>
                            Edit Match:
                        </Typography>
                    </Grid>
                    <Grid container item spacing={1} justifyContent={'center'}>
                        <Grid item md={6} lg={4} container justifyContent={'center'}>
                            <FormControl required sx={{width: '50%'}}>
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
                            <FormControl required sx={{width: '50%'}}>
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
                            <FormControl required sx={{width: '50%'}}>
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
                                    setTicketPrice(event.target.value)
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
                                    setReferee(event.target.value);
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
                                onChange={(event) =>{
                                    if (!/^[a-zA-Z\s]+$/.test(event.target.value) && event.target.value !== '') return;
                                    setLinesman2(event.target.value)
                                }}
                            />
                        </Grid>

                    </Grid>
                </Grid>}

                {activeStep !== steps.length && (
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
                        <Grid hidden={activeStep === 1} item>
                            <Button variant={'contained'} onClick={handleNext}>Next</Button>
                        </Grid>
                        <Grid hidden={activeStep === 0} item>
                            <Button variant={'contained'} onClick={() => {
                                let stad = stadiums.find((stad) => stad._id === stadium);
                                for (let i = 0; i < match.reservationMap.length; i++) {
                                    if (match.reservationMap[i].row > stad.dimensions.rows && match.reservationMap[i].column > stad.dimensions.columns) {
                                        alert("Stadium is too small for this match");
                                        return;
                                    }
                                }
                                if (date < new Date().toISOString().split('.')[0]) {
                                    console.log(date);
                                    console.log(new Date().toISOString().split('.')[0]);
                                    alert("Date is in the past");
                                    return;
                                }
                                if (referee === '' || linesman1 === '' || linesman2 === '' || ticketPrice === '') {
                                    alert("fill all required fields");
                                    return;
                                }
                                if (homeTeam === awayTeam) {
                                    alert("Home team and away team can't be the same");
                                    return;
                                }
                                setMatches((prev) => {
                                    return prev.map((prevmatch) => {
                                        if (prevmatch._id === match._id) {
                                            return {
                                                ...prevmatch,
                                                homeTeam: teams.find((team) => team._id === homeTeam),
                                                awayTeam: teams.find((team) => team._id === awayTeam),
                                                stadium: stad,
                                                date: date,
                                                ticketPrice: ticketPrice,
                                                referee: referee,
                                                linesman: [linesman1, linesman2]
                                            };
                                        }
                                        return prevmatch;
                                    });
                                });
                                fetch('http://localhost:3000/matches/' + match._id, {
                                    method: 'POST',
                                    credentials: 'include',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        homeTeam: homeTeam,
                                        awayTeam: awayTeam,
                                        stadium: stadium,
                                        date: date + "+00:00",
                                        ticketPrice: ticketPrice,
                                        referee: referee,
                                        linesman: [linesman1, linesman2]
                                    }),
                                })
                                    .then(response => response.text())
                                    .then(data => {
                                        console.log('Success:', data);
                                        close(null);
                                    })
                                    .catch((error) => {
                                        console.error('Error:', error);
                                    });
                            }}>Edit Match</Button>
                        </Grid>
                    </Grid>)
                }

            </Box>

        </>
    )
}