require("dotenv").config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
// const { Kayn } = require('kayn');

const app = express();

// const kayn = Kayn(process.env.API_KEY);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

// enable cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// declare objects
let summonerName = "contractz";
let summonerInfo;
let matchHistory;
let result = [];

// fetch data
app.get('/api/summoner', async (req, res) => {

  let fetchedSummonerData = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.API_KEY}`);

  summonerInfo = {
    name: fetchedSummonerData.data.name,
    accountId: fetchedSummonerData.data.accountId,
  };

  result.push(summonerInfo);


  result = {
    summonerData: summonerInfo
  };

  res.json(result);
});

// catchall
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
});

const port = process.env.PORT || 5000;
app.listen(port);
