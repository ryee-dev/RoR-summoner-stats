require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

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

app.post('/api/summoner', (req, res) => {
  summonerName = req.body.summName;
  res.status(204).send();
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

const searchSummoner = async () => {
  let accountId;
  let matchHistory;
  let matchStats;
  let playerMatchStatsList = [];
  let matchIdList = [];
  let matchData;

  if (summonerName !== undefined) {
    let fetchAccountId = await axios.get(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${
        process.env.API_KEY
      }`
    );

    accountId = fetchAccountId.data.accountId;

    let fetchMatchHistory = await axios.get(
      `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${
        process.env.API_KEY
      }`
    );
    matchHistory = fetchMatchHistory.data.matches;

    for (let i = 0; i < matchHistory.length; i++) {
      matchIdList.push(matchHistory[i].gameId);
    }

    for (let i = 0; i < 10; i++) {
      matchData = await axios.get(
        `https://na1.api.riotgames.com/lol/match/v4/matches/${
          matchIdList[i]
        }?api_key=${process.env.API_KEY}`
      );

      for (let i = 0; i < matchData.data.participants.length; i++) {
        if (
          fetchAccountId.data.name ===
            matchData.data.participantIdentities[i].player.summonerName &&
          matchData.data.participantIdentities[i].participantId ===
            matchData.data.participants[i].participantId
        ) {
          matchStats = {
            gameId: matchData.data.gameId,
            gameMode: matchData.data.gameMode,
            outcome: matchData.data.participants[i].stats.win,
            gameDuration: matchData.data.gameDuration,
            summonerName: summonerName,
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
            kda: (
              (matchData.data.participants[i].stats.kills +
                matchData.data.participants[i].stats.assists) /
              matchData.data.participants[i].stats.deaths
            ).toFixed(2),
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
            creepScore: {
              totalMinionsKilled:
                matchData.data.participants[i].stats.totalMinionsKilled,
              neutralMinionsKilled:
                matchData.data.participants[i].stats.neutralMinionsKilled,
              neutralMinionsKilledTeamJungle:
                matchData.data.participants[i].stats
                  .neutralMinionsKilledTeamJungle,
              neutralMinionsKilledEnemyJungle:
                matchData.data.participants[i].stats
                  .neutralMinionsKilledEnemyJungle,
            },
          };

          playerMatchStatsList.push(matchStats);
        }
      }
    }
    return playerMatchStatsList;
  } else {
    console.log('error');
  }
};

let currentRotation;

const getCurrentRotation = async () => {
  let fetchCurrentRotation = await axios.get(
    `https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${process.env.API_KEY}
      }`
  );
  currentRotation = fetchCurrentRotation.data.freeChampionIds;
};

let output;

app.get('/api/summoner', async (req, res) => {
  if (summonerName !== undefined) {
    await searchSummoner().then(res => {
      output = res;
    });
    res.json(output);
  }
});

let rotation;

app.get('/api/current-rotation', async (req, res) => {
  await getCurrentRotation().then(res => {
    rotation = res;
  });
  res.json(rotation);
  console.log(rotation);
});

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
  app.get('*', function(req, res) {
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
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

app.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`);
});

module.exports = app;
