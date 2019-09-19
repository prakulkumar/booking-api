import moment from "moment";

export function getDateObj(date) {
  return {
    month: moment(date).month(),
    year: moment(date).year(),
    days: moment(date).daysInMonth()
  };
}

export function daysBetweenDates(startDate, endDate) {
  let dates = [];
  const currDate = moment(startDate).startOf("day");
  const lastDate = moment(endDate).startOf("day");

  while (currDate.add(1, "days").diff(lastDate) < 0) {
    dates.push(currDate.clone().toDate());
  }

  dates.unshift(moment(startDate).toDate());
  dates.push(moment(endDate).toDate());

  return dates;
}

export function getDate(value) {
  return moment(value).toDate();
}

export function generateRandomColor() {
  const lum = -0.25;
  let hex = String(
    "#" +
      Math.random()
        .toString(16)
        .slice(2, 8)
        .toUpperCase()
  ).replace(/[^0-9a-f]/gi, "");

  if (hex.length < 6) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  let rgb = "#",
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }
  return rgb;
}

export default {
  getDateObj,
  daysBetweenDates,
  getDate,
  generateRandomColor
};
