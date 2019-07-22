const express = require('express');
const cors = require('cors');

const router = new express.Router();
const dataBaseConnection = require('./dataBaseConnection');
const collections = require('../constant').collections;
const { findAll, findByObj, correctMonthAndYear } = require('./data');
const dateFNS = require('date-fns');

dataBaseConnection().then(dbs => {
    router.get('/rooms', cors(), (req, res) => {
        try {
            findAll(dbs, collections.room).then(result => res.send(result));
        } catch (error) {
            console.log(error)
        }
    });

    router.post('/rooms/booked', cors(), async (req, res) => {
        try {
            let checkIn = req.body.checkIn,
                checkOut = req.body.checkOut;
            let diffrenceInMonth = dateFNS.differenceInCalendarMonths(checkOut, checkIn);
            let bookings = [],
                filteredRooms = [];

            for (let index = 0; index <= diffrenceInMonth; index++) {
                let obj = correctMonthAndYear(dateFNS.getMonth(checkIn) + index, dateFNS.getYear(checkIn));
                const filter = {
                    "months": {
                        $elemMatch: obj
                    }
                };
                result = await findByObj(dbs, collections.booking, filter);
                bookings = result.length > 0 ? bookings.concat(result) : bookings;
            }

            if (req.body.bookingId !== null) {
                bookings = bookings.filter(booking => booking._id.toString() !== req.body.bookingId.toString());
            }

            bookings.forEach(booking => {
                let checkInCheck = dateFNS.isWithinRange(checkIn, booking.checkIn, booking.checkOut);
                let checkOutCheck = dateFNS.isWithinRange(checkOut, booking.checkIn, booking.checkOut);

                if (checkInCheck || checkOutCheck) filteredRooms = filteredRooms.concat([...booking.rooms]);
            });

            filteredRooms = [...new Set(filteredRooms)];
            res.send(filteredRooms);
        } catch (error) {
            console.log(error)
        }
    });
})

module.exports = router;