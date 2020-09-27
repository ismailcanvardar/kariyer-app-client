import axios from "axios";
import { API_ENDPOINT } from "../constants/env";

export const sendVerificationEmail = (email, callback, errorcallback) => {
  axios
    .get(`${API_ENDPOINT}/emails/sendVerification/${email}`)
    .then((res) => {
      callback !== null && callback(res);
    })
    .catch((err) => {
      errorcallback !== null && errorcallback(err);
    });
};
