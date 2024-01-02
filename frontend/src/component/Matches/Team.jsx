import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Team({ name, logo }) {
    return (
        <Grid item container xs={12} sm={4} direction='column' justifyContent='center'>
            <Grid item>
                <img height={150} width={150} style={{objectFit: 'contain'}} src={logo} alt="logo"/>
            </Grid>
            <Grid item>
                <Typography variant='h5' fontFamily='quicksand'>{name}</Typography>
            </Grid>
        </Grid>
    );
}