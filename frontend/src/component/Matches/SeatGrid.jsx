import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EventSeatIcon from '@mui/icons-material/EventSeat';
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {Fragment, useEffect, useState} from "react";
import ZoomInIcon from "@mui/icons-material/ZoomIn.js";
import ZoomOutIcon from "@mui/icons-material/ZoomOut.js";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong.js";


export default function SeatGrid({match, hidden, setReservedSeats, setTprice}) {
    const [seats, setSeats] = useState([]);
    useEffect(() => {
        for (let i = 0; i < match.stadium.dimensions.rows; i++) {
            let row = [];
            for (let j = 0; j < match.stadium.dimensions.columns; j++) {
                row.push({row: i + 1, column: j + 1, color: 'success'});
            }
            setSeats((prevSeats) => [...prevSeats, row]);
        }
        for (let seat of match.reservationMap) {
            setSeats((prevSeats) => {
                prevSeats[seat.row - 1][seat.column - 1].color = 'error';
                return prevSeats;
            });
        }
    }, []);
    const handleSeatClick = (seat) => {
        if (seat.color === 'success') {
            setTprice((prev) => prev + match.ticketPrice);
            setSeats((prevSeats) => {
                prevSeats[seat.row - 1][seat.column - 1].color = 'primary';
                return prevSeats;
            });
            setReservedSeats((prevSeats) => [...prevSeats, seat]);
        } else if (seat.color === 'primary') {
            setTprice((prev) => prev - match.ticketPrice);
            setSeats((prevSeats) => {
                prevSeats[seat.row - 1][seat.column - 1].color = 'success';
                return prevSeats;
            });
            setReservedSeats((prevSeats) => prevSeats.filter((s) => s.row !== seat.row || s.column !== seat.column));
        }
    };
    return <Grid width={0.95} height={0.9} item hidden={hidden} position={'absolute'} top={-5}>
        <TransformWrapper
            minScale={0.1}
            maxScale={5}
            // initialScale={150 / match.stadium.dimensions.rows}
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
                        width: '90%',
                        height: '90%',
                        borderRadius: '10px',
                    }}>
                        {seats.map((row, rowIndex) => (
                            <Grid key={rowIndex} container justifyContent='center' wrap spacing={0.5}>
                                {row.map((seat, seatIndex) => (
                                    <Grid key={seatIndex} item>
                                        <IconButton disabled={seat.color==='error'} onClick={() => handleSeatClick(seat)}>
                                            <EventSeatIcon color={seat.color}/>
                                        </IconButton>
                                    </Grid>
                                ))}
                            < /Grid>
                        ))}
                    </TransformComponent>
                </Fragment>
            )}
        </TransformWrapper>
    </Grid>

}