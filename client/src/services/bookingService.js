import http from "./httpService";

async function getBookings(monthObj) {
  try {
    const { data: bookings } = await http.post(
      "/bookings/filterByMonth",
      monthObj
    );

    return bookings;
  } catch (error) {
    console.log(error);
  }
}

export default { getBookings };
