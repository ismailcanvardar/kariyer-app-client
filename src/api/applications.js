import axios from "axios";
import { API_ENDPOINT } from "../constants/env";
import { headerSetter } from "../helpers/header-setter";

export const applyToAdvert = (advertId, token, callback, errorcallback) => {
  axios
    .post(
      `${API_ENDPOINT}/applications/apply/${advertId}`,
      "",
      headerSetter(token)
    )
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};

export const getMyApplication = (token, callback, errorcallback) => {
  axios
    .get(`${API_ENDPOINT}/applications/myApplications`, headerSetter(token))
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};

export const isApplied = (advertId, token, callback, errorcallback) => {
  axios
    .get(
      `${API_ENDPOINT}/applications/isApplied/${advertId}`,
      headerSetter(token)
    )
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};
