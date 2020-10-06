import axios from "axios";
import { API_ENDPOINT } from "../constants/env";
import { headerSetter } from "../helpers/header-setter";

export const getAdvert = (advertId, token, callback, errorcallback) => {
  axios
    .get(`${API_ENDPOINT}/adverts/${advertId}`, headerSetter(token))
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};

export const createAdvert = (data, token, callback, errorcallback) => {
  axios
    .post(`${API_ENDPOINT}/adverts`, data, headerSetter(token))
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};

export const searchAdvert = (data, token, callback, errorcallback) => {
  axios
    .post(`${API_ENDPOINT}/adverts/search`, data, headerSetter(token))
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};

export const removeAdvert = (advertId, token, callback, errorcallback) => {
  axios
    .delete(`${API_ENDPOINT}/adverts/${advertId}`, data, headerSetter(token))
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};

export const getMyAdverts = (token, callback, errorcallback) => {
  axios
    .get(`${API_ENDPOINT}/adverts/myAdverts`, headerSetter(token))
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};

export const getAdvertsOfDefinedEmployer = (
  employerId,
  token,
  callback,
  errorcallback
) => {
  axios
    .get(
      `${API_ENDPOINT}/adverts/getAdvertsOfDefinedEmployer/${employerId}`,
      headerSetter(token)
    )
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};

export const getAdvertsOfDefinedEmployee = (
  employeeId,
  token,
  callback,
  errorcallback
) => {
  axios
    .get(
      `${API_ENDPOINT}/adverts/getAdvertsOfDefinedEmployee/${employeeId}`,
      headerSetter(token)
    )
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};
