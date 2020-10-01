import axios from "axios";
import { API_ENDPOINT } from "../constants/env";
import { headerSetter } from "../helpers/header-setter";

export const registerEmployer = (data, callback, errorcallback) => {
  axios
    .post(`${API_ENDPOINT}/employers`, data)
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};

export const loginEmployer = (data, callback, errorcallback) => {
  axios
    .get(`${API_ENDPOINT}/employers/login/${data.email}/${data.password}`)
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};

export const getEmployer = (employeeId, callback, errorcallback) => {
  axios
    .get(`${API_ENDPOINT}/employers/findEmployer/${employeeId}`)
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};

export const searchEmployers = (data, callback, errorcallback) => {
  axios
    .get(
      `${API_ENDPOINT}/employers/findEmployers/${data.searchCriteria}/${data.offset}/${data.limit}`
    )
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};

export const getMyEmployerProfile = (token, callback, errorcallback) => {
  axios
    .get(`${API_ENDPOINT}/employers/getMyProfile`, headerSetter(token))
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};
