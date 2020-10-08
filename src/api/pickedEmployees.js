import axios from "axios";
import { API_ENDPOINT } from "../constants/env";
import { headerSetter } from "../helpers/header-setter";

export const pickEmployee = (
  { employeeId, advertId },
  token,
  callback,
  errorcallback
) => {
  console.log(employeeId);
  console.log(advertId);
  axios
    .post(
      `${API_ENDPOINT}/pickedEmployees/pickEmployee`,
      {
        employeeId,
        advertId,
      },
      headerSetter(token)
    )
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};
