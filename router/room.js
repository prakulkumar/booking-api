const express = require('express');
const cors = require('cors');

const router = new express.Router();
const dataBaseConnection = require('./dataBaseConnection');
const collections = require('../constant').collections;
const {
    findAll,
    findByObj,
    correctMonthAndYear
} = require('./data');
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
                    },
                    "checkedOut": false,
                    "cancel": false
                };
                result = await findByObj(dbs, collections.booking, filter);
                bookings = result.length > 0 ? bookings.concat(result) : bookings;
            }

            if (req.body.bookingId !== null) {
                bookings = bookings.filter(booking => booking._id.toString() !== req.body.bookingId.toString());
            }

            bookings.forEach(booking => {
                let isCheckInInclude = false, isCheckOutInclude = false;
                let checkInCheck = dateFNS.isWithinRange(checkIn, booking.checkIn, booking.checkOut);
                let checkOutCheck = dateFNS.isWithinRange(checkOut, booking.checkIn, booking.checkOut);

                if (dateFNS.format(checkIn, "DD.MM.YYYY") === dateFNS.format(booking.checkIn, "DD.MM.YYYY") ||
                    dateFNS.format(checkIn, "DD.MM.YYYY") === dateFNS.format(booking.checkOut, "DD.MM.YYYY")) {
                    isCheckInInclude = true;
                };

                if (dateFNS.format(checkOut, "DD.MM.YYYY") === dateFNS.format(booking.checkIn, "DD.MM.YYYY") ||
                    dateFNS.format(checkOut, "DD.MM.YYYY") === dateFNS.format(booking.checkOut, "DD.MM.YYYY")) {
                    isCheckOutInclude = true;
                }

                if (checkInCheck || checkOutCheck || isCheckInInclude || isCheckOutInclude) filteredRooms = filteredRooms.concat([...booking.rooms]);
            });

            filteredRooms = [...new Set(filteredRooms)];
            res.send(filteredRooms);
        } catch (error) {
            console.log(error)
        }
    });

    router.post('/rooms/available', cors(), async (req, res) => {
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
                    },
                    "checkedOut": false,
                    "cancel": false
                };
                result = await findByObj(dbs, collections.booking, filter);
                bookings = result.length > 0 ? bookings.concat(result) : bookings;
            }

            if (req.body.bookingId !== null) {
                bookings = bookings.filter(booking => booking._id.toString() !== req.body.bookingId.toString());
            }

            bookings.forEach(booking => {
                let isCheckInInclude = false, isCheckOutInclude = false;
                let checkInCheck = dateFNS.isWithinRange(checkIn, booking.checkIn, booking.checkOut);
                let checkOutCheck = dateFNS.isWithinRange(checkOut, booking.checkIn, booking.checkOut);

                if (dateFNS.format(checkIn, "DD.MM.YYYY") === dateFNS.format(booking.checkIn, "DD.MM.YYYY") ||
                    dateFNS.format(checkIn, "DD.MM.YYYY") === dateFNS.format(booking.checkOut, "DD.MM.YYYY")) {
                    isCheckInInclude = true;
                };

                if (dateFNS.format(checkOut, "DD.MM.YYYY") === dateFNS.format(booking.checkIn, "DD.MM.YYYY") ||
                    dateFNS.format(checkOut, "DD.MM.YYYY") === dateFNS.format(booking.checkOut, "DD.MM.YYYY")) {
                    isCheckOutInclude = true;
                }

                if (checkInCheck || checkOutCheck || isCheckInInclude || isCheckOutInclude) filteredRooms = filteredRooms.concat([...booking.rooms]);

                console.log({ mychekIn: dateFNS.format(checkIn, "DD.MM.YYYY"), checkIn: dateFNS.format(booking.checkIn, "DD.MM.YYYY"), checkOut: dateFNS.format(booking.checkOut, "DD.MM.YYYY") });
            });

            filteredRooms = [...new Set(filteredRooms)];

            const allRooms = await findAll(dbs, collections.room);

            const availableRooms = allRooms.filter((room) => {
                return filteredRooms.indexOf(room._id.toString()) < 0;
            });

            res.send(availableRooms);
        } catch (error) {
            console.log(error)
        }
    });
})

module.exports = router;