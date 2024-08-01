import axios from "axios";
import { REFRESH_TOKEN } from "../../../utils/urls.js";
import { Route } from "react-router-dom";

export const checkForTokenExpiredError = (error) => {
  if (error.message === "Network Error") {
    document.write("Server Down");
  } else {
    const { status } = error?.response;
    return Number(status) === 401;
  }
};

export const createWithAuth = () => {
  let token = localStorage.getItem("token");
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// const refreshTokenAndSetAuth = async (callback) => {
//   const refreshToken = localStorage.getItem("refreshToken");
//   if (refreshToken) {
//     const response = await refreshUserToken(REFRESH_TOKEN, {
//       refresh: refreshToken,
//     });
//     const { access } = response?.data;
//     if (response.status == 200) {
//       localStorage.setItem("token", access);
//       return callback();
//     } else {
//       localStorage.clear();
//       window.location.href = "/login";
//       Route.push("/login");
//     }
//   } else {
//     window.location.href = "/login";
//   }
// };

// const refreshUserToken = (url, data) => {
//   return postWithOutAuth(url, data);
// };

const refreshTokenAndSetAuth = async (callback) => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    try {
      const response = await refreshUserToken(REFRESH_TOKEN, {
        refresh: refreshToken,
      });
      const { access } = response?.data;
      if (response.status === 200) {
        localStorage.setItem("token", access);
        return callback();
      } else {
        handleAuthFailure();
      }
    } catch (error) {
      handleAuthFailure();
    }
  } else {
    handleAuthFailure();
  }
};

const handleAuthFailure = () => {
  localStorage.clear();
  window.location.href = "/login";
  Route.push("/login");
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
          const callback = () => postWithAuth(url, data);
          refreshTokenAndSetAuth(callback).then((data) => {
            return resolve(data);
          });
          return;
        }
        resolve({ status: false, message: ex.message, ex });
      });
  });
};

export const postWithAuthForUpload = (url, data) => {
  let token = localStorage.getItem("token");
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  // return axios.post(url, data, { headers });
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, config)
      .then((response) => {
        if (response && response.data) {
          resolve({ status: true, data: response.data });
        }
      })
      .catch((ex) => {
        if (checkForTokenExpiredError(ex)) {
          const callback = () => postWithAuthForUpload(url, data);
          refreshTokenAndSetAuth(callback).then((data) => {
            return resolve(data);
          });
          return;
        }
        resolve({ status: false, message: ex.message, ex });
      });
  });
};

export const putWithAuthForUpload = (url, data) => {
  let token = localStorage.getItem("token");
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  // return axios.post(url, data, { headers });
  return new Promise((resolve, reject) => {
    axios
      .put(url, data, config)
      .then((response) => {
        if (response && response.data) {
          resolve({ status: true, data: response.data });
        }
      })
      .catch((ex) => {
        if (checkForTokenExpiredError(ex)) {
          const callback = () => putWithAuthForUpload(url, data);
          refreshTokenAndSetAuth(callback).then((data) => {
            return resolve(data);
          });
          return;
        }
        resolve({ status: false, message: ex.message, ex });
      });
  });
};

export const putWithAuth = (url, data) => {
  let token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  // return axios.post(url, data, { headers });
  return new Promise((resolve, reject) => {
    axios
      .put(url, data, { headers })
      .then((response) => {
        if (response && response.data) {
          resolve({ status: true, data: response.data });
        }
      })
      .catch((ex) => {
        if (checkForTokenExpiredError(ex)) {
          const callback = () => putWithAuth(url, data);
          refreshTokenAndSetAuth(callback).then((data) => {
            return resolve(data);
          });
          return;
        }
        resolve({ status: false, message: ex.message, ex });
      });
  });
};
export const patchWithAuth = (url, data) => {
  let token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  // return axios.post(url, data, { headers });
  return new Promise((resolve, reject) => {
    axios
      .patch(url, data, { headers })
      .then((response) => {
        if (response && response.data) {
          resolve({ status: true, data: response.data });
        }
      })
      .catch((ex) => {
        if (checkForTokenExpiredError(ex)) {
          const callback = () => putWithAuth(url, data);
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
