const express = require('express');
const cors = require('cors');

const router = new express.Router();
const dataBaseConnection = require('./dataBaseConnection');
const collections = require('../constant').collections;
const findAll = require('./data').findAll;
const dateFNS = require('date-fns');

dataBaseConnection().then(dbs => {
    router.get('/rooms', cors(), (req, res) => {
        try {
            findAll(dbs, collections.rooms).then(result => res.send(result));
        } catch (error) {
            console.log(error)
        }
    });

    // correctMonthAndYear = (monthNumber, year) => {
    //     if (monthNumber > 11) {
    //         return { monthNumber: monthNumber - 12, year: year + 1 };
    //     } else {
    //         return { monthNumber: monthNumber, year: year };
    //     }
    // };

    router.post('/getAvailableRooms', cors(), async (req, res) => {
        try {
           console.log(req.body);
        } catch (error) {
            console.log(error)
        }
    });
})

module.exports = router;