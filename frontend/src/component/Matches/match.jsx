import {useParams} from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import StadiumIcon from '@mui/icons-material/Stadium';
import {useState} from 'react';

export default function Match() {
    const {id} = useParams();
    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Tabs value={value} onChange={handleChange}>
                <Tab icon={<BookOnlineIcon/>} label="Book Seat" value="one"/>
                <Tab icon={<StadiumIcon/>} label="Match Details" value="2"/>
                <Tab label="Item Three" value="3"/>
            </Tabs>
            <Box>
                {value === 'one' && <Box>Item One</Box>}
                {value === '2' && <Box>Item Two</Box>}
                {value === '3' && <Box>Item Three</Box>}
            </Box>
        </Box>

        // <div>
        //     <h1>{id}</h1>
        // </div>
    )
}