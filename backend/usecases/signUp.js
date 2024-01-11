const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
    'username': 'moaaz',
    'password': 'moaaz',
    'firstName': 'moaaz',
    'lastName': 'moaaz',
    'birthDate': '2000-10-30',
    'gender': 'male',
    'city': 'cairo',
    'address': 'maadi',
    'email': 'moaaz2@gmail.com',
    'role': 'fan'
});

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/register',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
};

axios.request(config)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
