const correct_number = function correct_number(number) {
  return number < 10 ? '0' + number : number;
};

const get_date_time = function get_date_time() {
  const now = new Date();
  const year = now.getFullYear();
  const month = correct_number(now.getMonth() + 1);
  const day = correct_number(now.getDate());
  const hours = correct_number(now.getHours());
  const minutes = correct_number(now.getMinutes());

  return '_' + year + '-' + month + '-' + day + '_' + hours + '-' + minutes;
};

module.exports = get_date_time();
