import moment from "moment";

// -date- is represents the day that will pass on some calculations.
// -text- is represents calculated dates text value like days to d or weeks to w etc.
export const timeDifference = (date) => {
  const text = {
    dates: {
      second: " saniye önce",
      minute: " dakika önce",
      hour: " saat önce",
      day: " gün önce",
      week: " hafta önce",
    },
  };

  const initialDate = moment(date).local();
  const now = moment();

  // get the difference between the moments
  const diff = now.diff(initialDate);

  //express as a duration
  const diffDuration = moment.duration(diff);

  if (diffDuration.years() !== 0 || diffDuration.months() !== 0) {
    return moment(initialDate).format("DD-MM-YYYY");
  } else if (diffDuration.weeks() !== 0) {
    return diffDuration.weeks() + text.dates.week;
  } else if (diffDuration.days() !== 0) {
    return diffDuration.days() + text.dates.day;
  } else if (diffDuration.hours() !== 0) {
    return diffDuration.hours() + text.dates.hour;
  } else if (diffDuration.minutes() !== 0) {
    return diffDuration.minutes() + text.dates.minute;
  } else {
    return diffDuration.seconds() + text.dates.second;
  }
};

export const getDate = (date) => {
  const formattedDate = moment(date).local().format("HH:mm:ss");

  return formattedDate;
};
