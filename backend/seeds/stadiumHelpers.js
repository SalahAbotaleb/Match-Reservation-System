const stadiums = [
    {
        name: 'Al salam stadium',
        location: 'Cairo',
        dimensions: {
            rows: Math.floor(Math.random() * 31) + 20,
            columns: Math.floor(Math.random() * 11) + 20
        }
    },
    {
        name: 'Borg El Arab Stadium',
        location: 'Alexandria',
        dimensions: {
            rows: Math.floor(Math.random() * 31) + 20,
            columns: Math.floor(Math.random() * 11) + 20
        }
    },
    {
        name: 'Cairo International Stadium',
        location: 'Cairo',
        dimensions: {
            rows: Math.floor(Math.random() * 31) + 20,
            columns: Math.floor(Math.random() * 11) + 20
        }
    },
    {
        name: 'Petroleum Stadium',
        location: 'Suez',
        dimensions: {
            rows: Math.floor(Math.random() * 31) + 20,
            columns: Math.floor(Math.random() * 11) + 20
        }
    },
    {
        name: 'Suez Canal Stadium',
        location: 'Ismailia',
        dimensions: {
            rows: Math.floor(Math.random() * 31) + 20,
            columns: Math.floor(Math.random() * 11) + 20
        }
    },
    {
        name: 'Alexandria Stadium',
        location: 'Alexandria',
        dimensions: {
            rows: Math.floor(Math.random() * 31) + 20,
            columns: Math.floor(Math.random() * 11) + 20
        }
    },
    {
        name: 'El Gouna Stadium',
        location: 'Hurghada',
        dimensions: {
            rows: Math.floor(Math.random() * 31) + 20,
            columns: Math.floor(Math.random() * 11) + 20
        }
    },
    {
        name: 'Sohag Stadium',
        location: 'Sohag',
        dimensions: {
            rows: Math.floor(Math.random() * 31) + 20,
            columns: Math.floor(Math.random() * 11) + 20
        }
    },
    {
        name: 'Ismailia Stadium',
        location: 'Ismailia',
        dimensions: {
            rows: Math.floor(Math.random() * 31) + 20,
            columns: Math.floor(Math.random() * 11) + 20
        }
    },
    {
        name: 'Port Said Stadium',
        location: 'Port Said',
        dimensions: {
            rows: Math.floor(Math.random() * 31) + 20,
            columns: Math.floor(Math.random() * 11) + 20
        }
    }
];
module.exports.stadiums = stadiums;
