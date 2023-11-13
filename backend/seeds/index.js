const { stadiums } = require('./stadiumHelpers');
const { teams } = require('./teamHelpers');
const { referees } = require('./refereeHelpers');
const matchModel = require('../models/matchModel');
const stadiumModel = require('../models/stadiumModel');
const teamModel = require('../models/teamModel');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/TicketReservation');
const db = mongoose.connection;
db.once("connected", () => {
    console.log("connected to db");
});
db.on("error", (err) => {
    console.log(err);
});

function getRandomDate(startDate, endDate) {
    const date = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    return date;

}

const saveStadiums = async () => {
    for (let i = 0; i < stadiums.length; i++) {
        const stadium = new stadiumModel(stadiums[i]);
        await stadium.save();
    }
}

const saveTeams = async () => {
    for (let i = 0; i < teams.length; i++) {
        const team = new teamModel(teams[i]);
        await team.save();
    }
}

const randomMatchesBuilder = async () => {
    for (let i = 0; i < 20; i++) {
        const stadiumIndex = Math.floor(Math.random() * stadiums.length);
        const refereeIndex = Math.floor(Math.random() * referees.length);
        const homeTeamIndex = Math.floor(Math.random() * teams.length);
        let awayTeamIndex = Math.floor(Math.random() * teams.length);
        while (awayTeamIndex == homeTeamIndex) {
            awayTeamIndex = Math.floor(Math.random() * teams.length);
        }

        const linesManIndex = [Math.floor(Math.random() * referees.length), Math.floor(Math.random() * referees.length)];
        while (linesManIndex[0] == linesManIndex[1] || linesManIndex[0] == refereeIndex || linesManIndex[1] == refereeIndex) {
            linesManIndex[0] = Math.floor(Math.random() * referees.length);
            linesManIndex[1] = Math.floor(Math.random() * referees.length);
        }
        const referee = referees[refereeIndex];
        const linesMan = [referees[linesManIndex[0]], referees[linesManIndex[1]]];
        const stadium = stadiums[stadiumIndex];
        const homeTeam = teams[homeTeamIndex];
        const awayTeam = teams[awayTeamIndex];
        const startDate = new Date(2023, 12, 12);
        const endDate = new Date(2024, 5, 25);
        const stadiumReference = await stadiumModel.findOne({ name: stadium.name });
        const newMatch = {
            homeTeam: homeTeam.name,
            awayTeam: awayTeam.name,
            stadium: stadiumReference._id,
            reservationMap: [],
            date: getRandomDate(startDate, endDate),
            referee: referee,
            linesman: [linesMan[0], linesMan[1]]
        };
        const match = new matchModel(newMatch);
        await match.save();
    }
}

const seed = async () => {
    await db.dropDatabase();
    await saveStadiums();
    await saveTeams();
    await randomMatchesBuilder();
    await db.close();
}
seed();
