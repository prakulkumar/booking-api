const express = require('express');
const cors = require('cors');

const router = new express.Router();
const dataBaseConnection = require('./dataBaseConnection');
const collections = require('../constant').collections;
const { addData, findAll, findByObj, updateData } = require('./data');
const dateFNS = require('date-fns');
const ObjectID = require('mongodb').ObjectID;

dataBaseConnection().then(dbs => {
    router.get('/bookings', cors(), async (req, res) => {
        try {
            findAll(dbs, collections.booking).then(result => res.send(result));
        } catch (error) {
            console.log(error);
        }
    });

    router.post('/bookings/filterByMonth', cors(), async (req, res) => {
        try {
            const filter = { "months": { $elemMatch: { "monthNumber": req.body.monthNumber, "year": req.body.year } } };
            findByObj(dbs, collections.booking, filter).then(result => res.send(result));
        } catch (error) {
            console.log(error);
        }
    })

    router.post('/addBookingDetails', cors(), async (req, res) => {
        try {
            let booking = req.body;
            booking['balance'] = req.body.amount - req.body.advance;
            booking['months'] = [];
            booking['misc'] = [];
            addData(dbs, collections.booking, booking).then(result => res.status(200));
        } catch (error) {
            console.log(error)
        }
    })

    router.post('/updateBookingDetails', cors(), async (req, res) => {
        try {
            console.log(req.body);
            let booking = req.body;
            booking['balance'] = req.body.amount - req.body.advance;
            booking['months'] = [];
            booking['misc'] = [];
            updateData(dbs, collections.booking, { _id: bookingId }, { $set: booking })
        } catch (error) {
            console.log(error)
        }
    })

    // correctMonthAndYear = (monthNumber, year) => {
    //     if (monthNumber > 11) {
    //         return { monthNumber: monthNumber - 12, year: year + 1 };
    //     } else {
    //         return { monthNumber: monthNumber, year: year };
    //     }
    // };

    // router.get('/getBookingDetails/:id', cors(), async (req, res) => {
    //     try {
    //         const bookingObjectID = new ObjectID(req.params.id);
    //         const bookingObj = await findOnePromise(dbs, collections.bookings, { _id: bookingObjectID });
    //         const personObjectID = new ObjectID(bookingObj.personId);
    //         const personObj = await findOnePromise(dbs, collections.persons, { _id: personObjectID });
    //         bookingObj.bookingId = bookingObj._id;
    //         res.send({ ...bookingObj, ...personObj });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // })
});

module.exports = router;