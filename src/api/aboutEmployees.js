import axios from "axios";
import { API_ENDPOINT } from "../constants/env";
import { headerSetter } from "../helpers/header-setter";

export const getAboutEmployee = (userId, token, callback, errorcallback) => {
  axios
    .get(`${API_ENDPOINT}/aboutEmployee/${userId}`, headerSetter(token))
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};

export const updateAboutEmployee = (data, token, callback, errorcallback) => {
  axios
    .post(`${API_ENDPOINT}/aboutEmployee`, data, headerSetter(token))
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};
