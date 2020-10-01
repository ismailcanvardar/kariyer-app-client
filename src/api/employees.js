import axios from "axios";
import { API_ENDPOINT } from "../constants/env";
import { headerSetter } from "../helpers/header-setter";

export const registerEmployee = (data, callback, errorcallback) => {
  axios
    .post(`${API_ENDPOINT}/employees`, data)
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};

export const loginEmployee = (data, callback, errorcallback) => {
  axios
    .get(`${API_ENDPOINT}/employees/login/${data.email}/${data.password}`)
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};

export const getEmployee = (employeeId, callback, errorcallback) => {
  axios
    .get(`${API_ENDPOINT}/employees/findUser/${employeeId}`)
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};

export const searchEmployees = (data, callback, errorcallback) => {
  axios
    .get(
      `${API_ENDPOINT}/employees/findUsers/${data.searchCriteria}/${data.offset}/${data.limit}`
    )
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};

export const getMyEmployeeProfile = (token, callback, errorcallback) => {
  axios
    .get(`${API_ENDPOINT}/employees/getMyProfile`, headerSetter(token))
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};
