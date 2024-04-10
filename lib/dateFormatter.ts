

export const dateShowFormat = (date: string) => {
  var now = new Date(date);
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var today = (month) + "-" + (day) + "-" + now.getFullYear()

  return today;
}

export const formikDateAdd = (date: string) => {
  var now = new Date(date);
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var today = now.getFullYear() + "-" + (month) + "-" + (day);

  return today;
}