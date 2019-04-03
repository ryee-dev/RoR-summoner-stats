import axios from 'axios/index';

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  // console.log(response);
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;

  throw error;
};

// const parseJson = response => {
//   return response.json();
// };

// axios.defaults.baseURL = 'http://localhost:3001';

const findSummoner = (summoner, cb) => {
  console.log(summoner);
  return axios
    .get(`/api/summoner?name=${summoner}`)
    .then(checkStatus);
    // .then(cb);
  // .then(parseJson);
  // .then(res => {
  //   res.json();
  // })
  // .then(res => {
  //   console.log(res);
  // })
};

export default findSummoner;
