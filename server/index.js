require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const got = require('got');

const app = express();
const port = process.env.PORT || 5000;

const API_KEY = process.env.API_KEY;

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

let summonerName;
let accountId;
let riftMatchHistory;
let matchStats;
let playerMatchStatsList = [];
let matchIdList = [];
let matchData;

let SummonerData = {
  summonerName,
  accountId,
  riftMatchHistory,
  matchStats,
  playerMatchStatsList,
  matchIdList,
  matchData,
};

app.post('/api/summoner', (req, res) => {
  summonerName = req.body.summName;
  res.status(204).send();
});

const summByName =
  'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const matchListByPuuid =
  'https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/';
const matchByMatchID =
  'https://americas.api.riotgames.com/lol/match/v5/matches/';

const handleGetPuuid = async (summName) => {
  let summPuuid = await got(`${summByName}${summName}?api_key=${API_KEY}`, {
    responseType: 'json',
    resolveBodyOnly: true,
  });
  return summPuuid.puuid;
};

const handleGetMatchHistory = async (name) => {
  const acctPuuid = await handleGetPuuid(name);
  // console.log(`${matchListByPuuid}${acctPuuid}/ids?api_key=${API_KEY}`);
  let allMatches = await got(
    `${matchListByPuuid}${acctPuuid}/ids?api_key=${API_KEY}`,
    {
      responseType: 'json',
      resolveBodyOnly: true,
    }
  );

  return allMatches;
};

const handleGetMatch = async (matchId) => {
  let singleMatch = await got(
    `${matchByMatchID}${matchId}?api_key=${API_KEY}`,
    {
      responseType: 'json',
      resolveBodyOnly: true,
    }
  );

  // console.log(singleMatch);

  return singleMatch;
};

const searchSummoner = async () => {
  let {
    riftMatchHistory,
    matchStats,
    playerMatchStatsList,
    matchIdList,
    matchData,
  } = SummonerData;

  if (summonerName !== undefined) {
    riftMatchHistory = await handleGetMatchHistory(summonerName);

    for (let i = 0; i < riftMatchHistory.length; i++) {
      matchIdList.push(riftMatchHistory[i].gameId);
    }

    for (let i = 0; i < 10; i++) {
      matchData = await handleGetMatch(riftMatchHistory[i]);
      // console.log(matchData);

      const {
        // participants,
        name,
        summonerName,
        // gameId,
        // gameMode,
        // gameDuration,
      } = matchData;

      const {
        info: { gameDuration, gameId, gameMode, participants },
      } = matchData;

      // console.log(participants);

      for (let i = 0; i < participants.length; i++) {
        let {
          win,
          perks,
          kills,
          deaths,
          assists,
          item0,
          item1,
          item2,
          item3,
          item4,
          item5,
          item6,
          champLevel,
          totalMinionsKilled,
          neutralMinionsKilled,
          neutralMinionsKilledTeamJungle,
          neutralMinionsKilledEnemyJungle,
          championId,
          summoner1Id,
          summoner2Id,
        } = participants[i];

        if (name === summonerName) {
          matchStats = {
            gameId,
            gameMode,
            outcome: win,
            gameDuration,
            summonerName,
            spell1Id: summoner1Id,
            spell2Id: summoner2Id,
            runes: {
              keystone: perks.styles[0].selections[0].perk,
              primaryRune1: perks.styles[0].selections[1].perk,
              primaryRune2: perks.styles[0].selections[2].perk,
              primaryRune3: perks.styles[0].selections[3].perk,
              secondaryRune1: perks.styles[1].selections[0].perk,
              secondaryRune2: perks.styles[1].selections[1].perk,
            },
            championId,
            kills,
            deaths,
            assists,
            kda: ((kills + assists) / deaths).toFixed(2),
            items: {
              item0,
              item1,
              item2,
              item3,
              item4,
              item5,
              item6,
            },
            championLevel: champLevel,
            creepScore: {
              totalMinionsKilled,
              neutralMinionsKilled,
              neutralMinionsKilledTeamJungle,
              neutralMinionsKilledEnemyJungle,
            },
          };

          // console.log(matchStats.runes);
          playerMatchStatsList.push(matchStats);
        }
      }
    }
    // console.log(playerMatchStatsList);
    return playerMatchStatsList;
  } else {
    console.log('error');
  }
};

// let currentRotation;
//
// const getCurrentRotation = async () => {
//   let fetchCurrentRotation = await axios.get(
//     `https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${API_KEY}
//       }`
//   );
//   currentRotation = fetchCurrentRotation.data.freeChampionIds;
// };

// let output;
//
// app.get('/api/summoner', async (req, res) => {
//   if (summonerName !== undefined) {
//     await searchSummoner().then((res) => {
//       output = res;
//     });
//     res.json(output);
//   }
// });

// let rotation;
//
// app.get('/api/current-rotation', async (req, res) => {
//   await getCurrentRotation().then((res) => {
//     rotation = res;
//   });
//   res.json(rotation);
//   // console.log(rotation);
// });

let staticData = {
  champions: {
    championNames: [],
    championKeys: [],
  },

  items: {
    itemNames: [],
    itemKeys: [],
  },

  spells: {
    spellNames: [],
    spellKeys: [],
    spellIds: [],
  },

  runes: {
    runeNames: [],
    runeIds: [],
  },
};

fs.readFile('./static/champion.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }

  let summChampiondata = JSON.parse(data);
  const entries = Object.entries(summChampiondata.data);
  for (const [champion, values] of entries) {
    staticData.champions.championNames.push(champion);
    staticData.champions.championKeys.push(values.key);
  }
});

// serve item.json

fs.readFile('./static/item.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }

  let summItemData = JSON.parse(data);
  const entries = Object.entries(summItemData.data);
  for (const [item, values] of entries) {
    staticData.items.itemNames.push(values.name);
    staticData.items.itemKeys.push(item);
  }
});

// serve summoner spells
let summSpellData;

fs.readFile('./static/summoner.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }

  summSpellData = JSON.parse(data);
  const entries = Object.entries(summSpellData.data);
  for (const [spell, values] of entries) {
    staticData.spells.spellKeys.push(values.key);
    staticData.spells.spellNames.push(values.name);
    staticData.spells.spellIds.push(values.id);
  }
});

// serve summoner runes
let summKeystoneData;

fs.readFile('./static/runesReforged.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  summKeystoneData = JSON.parse(data);
  const keystoneEntries = Object.entries(summKeystoneData);
  for (const [keystone, values] of keystoneEntries) {
    staticData.runes.runeNames.push(values.name);
    staticData.runes.runeIds.push(values.id);

    for (let i = 0; i < values.slots.length; i++) {
      for (let j = 0; j < values.slots[i].runes.length; j++) {
        staticData.runes.runeNames.push(values.slots[i].runes[j].name);
        staticData.runes.runeIds.push(values.slots[i].runes[j].id);
      }
    }
  }
});

app.get('/static', async (req, res) => {
  res.json(staticData);
});

// fetch static data
app.use('/static', express.static(path.join(__dirname, 'static')));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')));
//   // app.get('*', (req, res) => {
//   //   res.sendfile(path.join((__dirname = 'client/build/index.html')));
//   // });
//   app.get('*', (req, res) => {
//     res.sendfile(path.join((__dirname + '/client/build/index.html')));
//   });
// }

// catchall
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

app.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`);
});

module.exports = app;
