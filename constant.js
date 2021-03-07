const monthObj = {
    "monthName": "",
    "year": "",
    "monthNumber": "",
    "numberOfDays": "",
    "bookingArray": []
}

const dataBaseName = "hotel-booking";

const collections = {
    room: "room",
    booking: "booking"
}

const mongoUrl = process.env.MONGODB_URL;
const test = "test"

module.exports = { monthObj, dataBaseName, collections, mongoUrl };
