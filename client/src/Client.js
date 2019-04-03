import axios from 'axios/index';

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;

  throw error;
};

const findSummoner = name => {
  return axios
    .get('/api/summoner')
    .then(checkStatus)
    .then(() => {
      return name;
    });
};

export default findSummoner;
