const axios = require('axios');
const qs = require('qs');
async function signIn(uname, pass) {
    let data = qs.stringify({
        'username': uname,
        'password': pass
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/login',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    let cookie = '';
    await axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.headers['set-cookie']));
            console.log(JSON.stringify(response.data));
            cookie = response.headers['set-cookie'][0];
        })
        .catch((error) => {
            console.log(error);
        });
    return cookie;
}

async function displayRequests(cookie) {
    let data = qs.stringify({
        'username': 'admin',
        'password': 'admin',
        'firstName': 'admin',
        'lastName': 'admin',
        'birthDate': '2000-1-1',
        'gender': 'male',
        'city': 'Cairo',
        'address': 'Egypt',
        'email': 'admin@admin',
        'role': 'admin'
    });

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/requests',
        headers: {
            'Cookie': cookie,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    await axios.request(config)
        .then((response) => {
            console.log("\n\n");
            responses = response.data;
            for (let i = 0; i < responses.length; i++) {
                console.log(responses[i]);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

async function acceptRequest(userId, cookie) {
    let data = qs.stringify({
        'action': 'accept'
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/requests/users/${userId}`,
        headers: {
            'Cookie': cookie
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });

}

async function rejectRequest(userId, cookie) {
    let data = qs.stringify({
        'action': 'reject'
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/requests/users/${userId}`,
        headers: {
            'Cookie': cookie
        },
        data: data
    };

    await axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });

}

async function viewMatches() {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/matches', headers: {}
    };

    await axios.request(config)
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                console.log(response.data[i]);
            }
        })
        .catch((error) => {
            console.log(error);
        });

}

async function reserveSeat(cookie, matchId, row, col) {
    let data = {
        "locations": [
            {
                "row": row,
                "column": col
            }
        ],
        "cardNumber": 20,
        "cardPin": 60
    };

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/matches/${matchId}/reservations`,
        headers: {
            'Cookie': cookie
        },
        data: data
    };

    await axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));

        })
        .catch((error) => {
            console.log(error);
        });


}

async function reserveSeats(cookie, matchId, arr) {
    let data = {
        "locations": arr,
        "cardNumber": 20,
        "cardPin": 60
    };

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/matches/${matchId}/reservations`,
        headers: {
            'Cookie': cookie
        },
        data: data
    };

    await axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));

        })
        .catch((error) => {
            console.log(error);
        });


}

async function viewUserTickets(userId, cookie) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/users/${userId}/tickets`,
        headers: {
            'Cookie': cookie
        }
    };

    await axios.request(config)
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                console.log(response.data[i]);
            }
        })
        .catch((error) => {
            console.log(error);
        });

}


async function viewReservationsAfter(matchId, date) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/matches/${matchId}/reservationsAfter?date=${date}`,
        headers: {
        }
    };

    await axios.request(config)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

}

async function viewUsers(cookie) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/users`,
        headers: {
            'Cookie': cookie
        }
    };

    await axios.request(config)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

}

async function cancelTickets(userId, ticketId, cookie) {
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/users/${userId}/tickets/${ticketId}`,
        headers: {
            'Cookie': cookie
        }
    };

    await axios.request(config)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

}

async function scenario() {
    //let cookie = await signIn('admin', 'admin');
    //await displayRequests(cookie);
    //await acceptRequest("658de39bddb7065d122e6c7f", cookie);
    let cookie = await signIn('moaaz2', 'moaaz');
    await viewUsers(cookie);
    await viewMatches();
    console.log("-----------------------------------");
    //await reserveSeats(cookie, "656a2ff0979ed0c0bd752527", [{ "row": 15, "column": 1 }]);
    await cancelTickets("658de39bddb7065d122e6c7f", "65931d0d43bd2992808735a9", cookie)
    await viewUserTickets("658de39bddb7065d122e6c7f", cookie);
    //viewReservationsAfter("656a2ff0979ed0c0bd752527", "2021-05-01");
}

scenario();