export const apiGetRequest = (endpoint, requestType, callback) => {
  const token = localStorage.getItem("token");

  fetch(endpoint, {
    method: requestType,
    headers: {
      Authorization: "Bearer " + token
    }
  }).then(callback);
};

export const apiPostRequest = (endpoint, requestType, callback, body = {}) => {
  const token = localStorage.getItem("token");

  fetch(endpoint, {
    method: requestType,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  }).then(callback);
};
