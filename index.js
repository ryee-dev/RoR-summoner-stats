require("dotenv").config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const RiotRateLimiter = require('riot-ratelimiter');
const fs = require('fs');

const app = express();
const limiter = new RiotRateLimiter;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

// enable cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// declare objects
let summonerName;

// post summoner name input
app.post('/api/summoner', async (req, res) => {
  summonerName = req.body.summName;
});

// fetch data
app.get('/api/summoner', async (req, res) => {

  let summonerInfo;
  let matchHistoryInfo;
  let matchData;
  let result;
  let outcomeData;
  let matchIdList = [];
  let recentMatchOutcomeData = [];

  let fetchedSummonerData = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.API_KEY}`);

  summonerInfo = {
    name: fetchedSummonerData.data.name,
    accountId: fetchedSummonerData.data.accountId
  };

  let fetchedMatchHistory = await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerInfo.accountId}?api_key=${process.env.API_KEY}`);

  matchHistoryInfo = {
    matches: fetchedMatchHistory.data.matches,
  };

  for (let i = 0; i < matchHistoryInfo.matches.length; i++) {
    matchIdList.push(matchHistoryInfo.matches[i].gameId);
  }

  for (let i = 0; i < 5; i++) {
    matchData = await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${matchIdList[i]}?api_key=${process.env.API_KEY}`);

    for (let i = 0; i < matchData.data.participants.length; i++) {

      // match player's summoner name with participants' summoner name
      if (summonerInfo.name === matchData.data.participantIdentities[i].player.summonerName && matchData.data.participantIdentities[i].participantId === matchData.data.participants[i].participantId) {
        outcomeData = {
          gameDuration: matchData.data.gameDuration,
          win: matchData.data.participants[i].stats.win,
          participantPlayerId: matchData.data.participants[i].participantId,
          summAId: matchData.data.participants[i].spell1Id,
          summBId: matchData.data.participants[i].spell2Id,
          champLevel: matchData.data.participants[i].stats.champLevel,
          totalMinionsKilled: matchData.data.participants[i].stats.totalMinionsKilled,
          neutralMinionsKilled: matchData.data.participants[i].stats.neutralMinionsKilled,
          teamJgMinionsKilled: matchData.data.participants[i].stats.neutralMinionsKilledTeamJungle,
          enemyJgMinionsKilled: matchData.data.participants[i].stats.neutralMinionsKilledEnemyJungle,
          primaryKeystone: matchData.data.participants[i].stats.perk0,
          primaryRune1: matchData.data.participants[i].stats.perk1,
          primaryRune2: matchData.data.participants[i].stats.perk2,
          primaryRune3: matchData.data.participants[i].stats.perk3,
          secondaryRune1: matchData.data.participants[i].stats.perk4,
          secondaryRune2: matchData.data.participants[i].stats.perk5,
          championId: matchData.data.participants[i].championId,
          item0: matchData.data.participants[i].stats.item0,
          item1: matchData.data.participants[i].stats.item1,
          item2: matchData.data.participants[i].stats.item2,
          item3: matchData.data.participants[i].stats.item3,
          item4: matchData.data.participants[i].stats.item4,
          item5: matchData.data.participants[i].stats.item5,
          item6: matchData.data.participants[i].stats.item6,
          kills: matchData.data.participants[i].stats.kills,
          deaths: matchData.data.participants[i].stats.deaths,
          assists: matchData.data.participants[i].stats.assists,
        };

        recentMatchOutcomeData.push(outcomeData);
      }
    }
  }

  // serve summoner.json
  let summSpelldata;

  fs.readFile('./static/summoner.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    summSpelldata = JSON.parse(data);
    recentMatchOutcomeData.push(summSpelldata.data);

    // console.log(summSpelldata.data.SummonerBarrier);
  });


  // serve item.json
  let summItemData;
  fs.readFile('./static/item.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    summItemData = JSON.parse(data);
  });
  res.json(recentMatchOutcomeData);
});

// serve champion.json
let summChampiondata;
let decodedChampion;
// let championDecoded;
let decodedChampionList = [];
let championKeyList = [];
let championNameList = [];
// let decodedChampionKey;

fs.readFile('./static/champion.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  summChampiondata = JSON.parse(data);
  const entries = Object.entries(summChampiondata.data);
  for (const [champion, values] of entries) {

    championKeyList.push(values.key);
    championNameList.push(champion);

    // championDecoded = {
    //   championKey: values.key,
    //   championName: champion
    // };

    // decodedChampionList.push(championDecoded);

    decodedChampion = {
      championNames: championNameList,
      championKeys: championKeyList
    };
  }
  // decodedChampionList.push(decodedChampion);
  // return decodedChampionList;
});

app.get('/static/champions', async (req, res) => {
  res.json(decodedChampion);
});

// fetch static data
// app.use('/static', express.static(path.join(__dirname, 'static')));



// catchall
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
});

const port = process.env.PORT || 5000;
app.listen(port);
