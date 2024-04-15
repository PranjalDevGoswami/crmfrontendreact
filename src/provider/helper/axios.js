import axios from "axios";
import { REFRESH_TOKEN } from "../../../utils/urls.js";
import { Route } from "react-router-dom";

export const checkForTokenExpiredError = (error) => {
  const { status } = error?.response;
  return status === 401;
};

export const createWithAuth = () => {
  let token = localStorage.getItem("token");
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const refreshTokenAndSetAuth = async (callback) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await refreshUserToken(REFRESH_TOKEN, {
    refresh: refreshToken,
  });
  const { access } = response?.data;
  if (response.status == 200) {
    localStorage.setItem("token", access);
    return callback();
  } else {
    localStorage.clear();
    Route.push("/login");
  }
};

const refreshUserToken = (url, data) => {
  return postWithOutAuth(url, data);
};

export const postWithOutAuth = (url, data) => {
  return axios.post(url, data);
};

export const postWithAuth = (url, data) => {
  let token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  // return axios.post(url, data, { headers });
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, { headers })
      .then((response) => {
        if (response && response.data) {
          resolve({ status: true, data: response.data });
        }
      })
      .catch((ex) => {
        if (checkForTokenExpiredError(ex)) {
          const callback = () => getWithAuth(url);
          refreshTokenAndSetAuth(callback).then((data) => {
            return resolve(data);
          });
          return;
        }
        resolve({ status: false, message: ex.message, ex });
      });
  });
};

export const getWithAuth = (url) => {
  const token = localStorage.getItem("token");
  const headers = {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return new Promise((resolve, reject) => {
    axios
      .get(url, { headers })
      .then((response) => {
        if (response && response.data) {
          resolve({ status: true, data: response.data });
        }
      })
      .catch((ex) => {
        if (checkForTokenExpiredError(ex)) {
          const callback = () => getWithAuth(url);
          refreshTokenAndSetAuth(callback).then((data) => {
            return resolve(data);
          });
          return;
        }
        resolve({ status: false, message: ex.message });
      });
  });
};
