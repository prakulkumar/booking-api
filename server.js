const http = require('http');
const express = require('express');
const path = require('path');

// const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const bookingDetailsRouter = require('./router/booking');
const roomDetailsRouter = require('./router/room');
const bodyParser = require('body-parser');
require('./router/dataBaseConnection');


// initialize the server and configure support for ejs templates
const app = new express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const url = `mongodb+srv://prakul:mlab404@cluster0-jtu6n.gcp.mongodb.net/hotel-booking?retryWrites=true&w=majority`;
// const url = 'mongodb://localhost:27017/hotel-booking';
// const myobj = [{
//   "firstName": "Ddsds",
//   "lastName": "Gdsd",
//   "mobileNumber": "22222222",
//   "address": "Whitefield",
//   "adults": 2,
//   "children": 3,
//   "checkIn": new Date('8/15/2019'),
//   "checkOut": new Date('8/30/2019'),
//   "advance": 0,
//   "balance": 0,
//   "checkedIn": false,
//   "cancelBooking": false,
//   "months": [{ "monthNumber": 7, "year": 2019 }],
//   "rooms": ["5d1f064c583cc524406fafff"],
//   "misc": [{ "type": "", "ammount": 0 }]
// },
// {
//   "firstName": "Wsddsd",
//   "lastName": "Tfgfg",
//   "mobileNumber": "5555555555",
//   "address": "Whitefield",
//   "adults": 1,
//   "children": 2,
//   "checkIn": new Date('9/28/2019'),
//   "checkOut": new Date('10/18/2019'),
//   "advance": 0,
//   "balance": 0,
//   "checkedIn": false,
//   "cancelBooking": false,
//   "months": [{ "monthNumber": 8, "year": 2019 }, { "monthNumber": 9, "year": 2019 }, { "monthNumber": 8, "year": 2019 }],
//   "rooms": ["5d1f064c583cc524406faff8", "5d1f064c583cc524406faff5"],
//   "misc": [{ "type": "", "ammount": 0 }]
// }]

// MongoClient.connect(url, function (err, db) {
//   var dbo = db.db("hotel-booking");
//   dbo.createCollection("booking", function (err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// });

// MongoClient.connect(url, function (err, db) {
//   var dbo = db.db("hotel-booking");

//   dbo.collection("booking").insertMany(myobj, function (err, res) {
//     if (err) throw err;
//     console.log("Number of documents inserted: " + res.insertedCount);
//     db.close();
//   });
// });

app.use(express.static(path.join(__dirname, 'client/build')));
// app.get('*', cors(), (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'))
// });

app.use(bookingDetailsRouter);
app.use(roomDetailsRouter);

app.use(express.json());

// start the server
const port = process.env.PORT || 5000;
// const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port}`);
});