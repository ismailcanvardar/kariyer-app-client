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

export const cancelApplication = (
  applicationId,
  token,
  callback,
  errorcallback
) => {
  axios
    .delete(
      `${API_ENDPOINT}/applications/apply/${applicationId}`,
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

export const getApplicationsOfDefinedEmployer = (
  employeeId,
  token,
  callback,
  errorcallback
) => {
  axios
    .get(
      `${API_ENDPOINT}/applications/getApplicationsOfDefinedEmployer/${employeeId}`,
      headerSetter(token)
    )
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

export const getApplicationsByAdvert = (
  advertId,
  token,
  callback,
  errorcallback
) => {
  axios
    .get(
      `${API_ENDPOINT}/applications/getApplicationsByAdvert/${advertId}`,
      headerSetter(token)
    )
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};
