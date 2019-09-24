import http from "./httpService";

async function getRooms() {
  try {
    const { data: rooms } = await http.get(`${http.baseUrl}/rooms`);
    return rooms;
  } catch (error) {
    console.log(error);
  }
}

export default { getRooms };
