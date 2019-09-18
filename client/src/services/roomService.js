import http from "./httpService";

async function getRooms() {
  try {
    const { data: rooms } = await http.get("/rooms");
    return rooms;
  } catch (error) {
    console.log(error);
  }
}

export default { getRooms };
