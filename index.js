require("dotenv").config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const RiotRateLimiter = require('riot-ratelimiter');

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
  let result = [];

  let fetchedSummonerData = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.API_KEY}`);


  summonerInfo = {
    name: fetchedSummonerData.data.name,
    accountId: fetchedSummonerData.data.accountId
  };

  let fetchedMatchHistory = await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerInfo.accountId}?api_key=${process.env.API_KEY}`);


  matchHistoryInfo = {
    matches: fetchedMatchHistory.data.matches,
  };

  //

  let outcomeData;
  let playerOutcomeData;
  let matchId;

  for (let i = 0; i < matchHistoryInfo.matches.length; i++) {
    matchId = matchHistoryInfo.matches[i].gameId;
    let matchData = await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${process.env.API_KEY}`);

    for (let i = 0; i < matchData.data.participants.length; i++) {
      outcomeData = {
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

      // find participantId of player
      if (summonerInfo.name === outcomeData.participantPlayerId) {
        const {
          win,
          participantPlayerId,
          summAId,
          summBId,
          champLevel,
          totalMinionsKilled,
          neutralMinionsKilled,
          teamJgMinionsKilled,
          enemyJgMinionsKilled,
          primaryKeystone,
          primaryRune1,
          primaryRune2,
          primaryRune3,
          secondaryRune1,
          secondaryRune2,
          championId,
          item0,
          item1,
          item2,
          item3,
          item4,
          item5,
          item6,
          kills,
          deaths,
          assists
        } = outcomeData;

        playerOutcomeData = {
          win: win,
          participantPlayerId: participantPlayerId,
          summAId: summAId,
          summBId: summBId,
          champLevel: champLevel,
          totalMinionsKilled: totalMinionsKilled,
          neutralMinionsKilled: neutralMinionsKilled,
          teamJgMinionsKilled: teamJgMinionsKilled,
          enemyJgMinionsKilled: enemyJgMinionsKilled,
          primaryKeystone: primaryKeystone,
          primaryRune1: primaryRune1,
          primaryRune2: primaryRune2,
          primaryRune3: primaryRune3,
          secondaryRune1: secondaryRune1,
          secondaryRune2: secondaryRune2,
          championId: championId,
          item0: item0,
          item1: item1,
          item2: item2,
          item3: item3,
          item4: item4,
          item5: item5,
          item6: item6,
          kills: kills,
          deaths: deaths,
          assists: assists,
        };
      }
    }
  }

  limiter.executing({
    url: `https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${process.env.API_KEY}`,
    token: process.env.API_KEY,

    resolveWithFullResponse: true
  });

  result.push(summonerInfo);
  result.push(playerOutcomeData);

  // result = {
  //   summonerData: summonerInfo,
  //   // matchHistoryData: matchHistoryInfo,
  //   matchData: playerOutcomeData,
  // };

  // console.log(matchDetails);

  res.json(result);
});

// catchall
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
});

const port = process.env.PORT || 5000;
app.listen(port);
