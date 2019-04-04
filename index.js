require("dotenv").config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
// const cors = require('cors');

// const RiotRateLimiter = require('riot-ratelimiter');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// const limiter = new RiotRateLimiter;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// let summonerName;
let summonerInfo;
let matchData;
let outcomeData;
let compiledData;

const handleSummonerEP = async (name) => {
  let summonerData = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.API_KEY}`);

  summonerInfo = {
    name: summonerData.data.name,
    accountId: summonerData.data.accountId
  };

  return summonerInfo;
};

const handleMatchHistoryEP = async (accountId) => {
  let matchIdList = [];
  let matchHistoryData = await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${process.env.API_KEY}`);

  for (let i = 0; i < matchHistoryData.data.matches.length; i++) {
    matchIdList.push(matchHistoryData.data.matches[i].gameId);
  }

  return matchIdList;
};

const handleMatchEP = async (matchIdList) => {
  let matchHistoryData = [];

  for (let i = 0; i < 5; i++) {
    matchData = await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${matchIdList[i]}?api_key=${process.env.API_KEY}`);
    for (let i = 0; i < matchData.data.participants.length; i++) {
      // match player's summoner name with participants' summoner name
      if (summonerInfo.name === matchData.data.participantIdentities[i].player.summonerName && matchData.data.participantIdentities[i].participantId === matchData.data.participants[i].participantId) {
        compiledData = {
          outcome: matchData.data.participants[i].stats.win,
          gameDuration: matchData.data.gameDuration,
          summonerName: summonerInfo.name,
          spell1Id: matchData.data.participants[i].spell1Id,
          spell2Id: matchData.data.participants[i].spell2Id,
          runes: {
            keystone: matchData.data.participants[i].stats.perk0,
            primaryRune1: matchData.data.participants[i].stats.perk1,
            primaryRune2: matchData.data.participants[i].stats.perk2,
            primaryRune3: matchData.data.participants[i].stats.perk3,
            secondaryRune1: matchData.data.participants[i].stats.perk4,
            secondaryRune2: matchData.data.participants[i].stats.perk5,
          },
          championId: matchData.data.participants[i].championId,
          kills: matchData.data.participants[i].stats.kills,
          deaths: matchData.data.participants[i].stats.deaths,
          assists: matchData.data.participants[i].stats.assists,
          items: {
            item0: matchData.data.participants[i].stats.item0,
            item1: matchData.data.participants[i].stats.item1,
            item2: matchData.data.participants[i].stats.item2,
            item3: matchData.data.participants[i].stats.item3,
            item4: matchData.data.participants[i].stats.item4,
            item5: matchData.data.participants[i].stats.item5,
            item6: matchData.data.participants[i].stats.item6,
          },
          championLevel: matchData.data.participants[i].stats.champLevel,
          totalCS: matchData.data.participants[i].stats.totalMinionsKilled + matchData.data.participants[i].stats.neutralMinionsKilled + matchData.data.participants[i].stats.neutralMinionsKilledTeamJungle + matchData.data.participants[i].stats.neutralMinionsKilledEnemyJungle,
          csPerMinute: compiledData.totalCS / compiledData.gameDuration
        };
        matchHistoryData.push(compiledData);
      }
    }
  }

  return matchHistoryData;
};

let summonerName;

app.post('/api/summoner', (req, res) => {
  summonerName = req.body.summName;
});

app.get('/api/summoner', (req, res, next) => {
  let playerMatchHistory = [];

  if (summonerName) {
    handleSummonerEP(summonerName)
      .then(async data => {
        let matchIdList = await handleMatchHistoryEP(data.accountId);
        playerMatchHistory.push(handleMatchEP(matchIdList));
      })
      .catch(err => {
        console.log(err);
      })
  } else {
    console.log("error");
  }

  let summSpelldata;
  fs.readFile('./static/summoner.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    summSpelldata = JSON.parse(data);
    playerMatchHistory.push(summSpelldata.data);
  });

  res.json(playerMatchHistory);
});

let summItemData;
fs.readFile('./static/item.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  summItemData = JSON.parse(data);
});

// serve champion.json
let summChampiondata;
let decodedChampion;
let championKeyList = [];
let championNameList = [];

fs.readFile('./static/champion.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }

  summChampiondata = JSON.parse(data);
  const entries = Object.entries(summChampiondata.data);
  for (const [champion, values] of entries) {
    championKeyList.push(values.key);
    championNameList.push(champion);

    decodedChampion = {
      championNames: championNameList,
      championKeys: championKeyList
    };
  }
});

// serve item.json
let decodedItem;
let itemKeyList = [];
let itemNameList = [];

fs.readFile('./static/item.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }

  let summItemData = JSON.parse(data);
  const entries = Object.entries(summItemData.data);
  for (const [item, values] of entries) {
    itemKeyList.push(item);
    itemNameList.push(values.name);

    decodedItem = {
      itemNames: itemNameList,
      itemKeys: itemKeyList
    };
  }
});

// serve summoner spells
let summSpellData;
let decodedSpell;
let spellKeyList = [];
let spellNameList = [];

fs.readFile('./static/summoner.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }

  summSpellData = JSON.parse(data);
  const entries = Object.entries(summSpellData.data);
  for (const [spell, values] of entries) {
    spellKeyList.push(values.key);
    spellNameList.push(values.name);

    decodedSpell = {
      spellNames: spellNameList,
      spellKeys: spellKeyList,
    }
  }
});

// serve summoner runes
let decodedKeystone;
let decodedRune;
let summKeystoneData;
let summRuneData;
let decodedRunesReforged;

let keystoneIdList = [];
let keystoneNameList = [];
let runeIdList = [];
let runeNameList = [];

fs.readFile('./static/runesReforged.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  summKeystoneData = JSON.parse(data);
  // summRuneData = JSON.parse(data.slots);
  // console.log(summRuneData);

  const keystoneEntries = Object.entries(summKeystoneData);
  for (const [keystone, values] of keystoneEntries) {
    keystoneIdList.push(values.id);
    keystoneNameList.push(values.name);

    decodedKeystone = {
      names: keystoneNameList,
      ids: keystoneIdList
    };

    // decodedKeystone.names.push(keystoneIdList);
    // decodedKeystone.ids.push(keystoneNameList);
  }

//   const runeEntries = Object.entries(summRuneData);
//   for (const [rune, values] of runeEntries) {
//     runeIdList.push(values.id);
//     runeNameList.push(values.name);
//
//     decodedRune = {
//       names: runeNameList,
//       ids: runeIdList
//     };
//
//     decodedRune.names.push(runeNameList);
//     decodedRune.ids.push(runeIdList);
//   }
//
//   decodedRunesReforged = {
//     decodedKeystone,
//     decodedRune
//   }
});

app.get('/static/champions', async (req, res) => {
  res.json(decodedChampion);
});

app.get('/static/items', async (req, res) => {
  res.json(decodedItem);
});

app.get('/static/spells', async (req, res) => {
  res.json(decodedSpell);
});

app.get('/static/runes', async (req, res) => {
  res.json(decodedKeystone);
});

// fetch static data
app.use('/static', express.static(path.join(__dirname, 'static')));

// catchall
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
});


app.listen(port);
