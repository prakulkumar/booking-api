import moment from "moment";

export function getDateObj(date) {
  return {
    month: moment(date).month(),
    year: moment(date).year(),
    days: moment(date).daysInMonth()
  };
}
