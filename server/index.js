import 'dotenv/config.js';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import * as fs from 'fs';

import { PlatformId, RiotAPI } from '@fightmegg/riot-api';

const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 3001;

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
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

const rAPI = new RiotAPI(API_KEY);

let summonerName;
let accountId;
let riftMatchHistory;
let matchStats;
let playerMatchStatsList = [];
let matchIdList = [];
let matchData;

let SummonerData = {
  summonerName,
  playerMatchStatsList,
  matchIdList,
};

app.post('/api/summoner', (req, res) => {
  summonerName = req.body.summName;
  res.status(204).send();
});

const handleGetPuuid = async (summName) => {
  let summPuuid = await (rAPI.summoner.getBySummonerName({
    region: PlatformId.NA1,
    summonerName: summName,
  }));
  
  return summPuuid.puuid;
};

const handleGetMatchHistory = async (name) => {
  let acctPuuid = await handleGetPuuid(name);
  
  return await (rAPI.matchV5.getIdsbyPuuid({
    cluster: PlatformId.AMERICAS,
    puuid: `${acctPuuid}`,
    params: {
      start: 0,
      count: 5,
    },
  }));
};

const handleGetMatch = async (matchId) => {
  return await (rAPI.matchV5.getMatchById({
    cluster: PlatformId.AMERICAS,
    matchId: `${matchId}`,
  }));
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
    console.log(riftMatchHistory);
    
    for (let i = 0; i < riftMatchHistory.length; i++) {
      matchIdList.push(riftMatchHistory[i].gameId);
    }
    
    for (let i = 0; i < matchIdList.length; i++) {
      await handleGetMatch(riftMatchHistory[i])
      .then((r) => {
        matchData = r;
      })
      .catch((e) => {
        console.log(e);
      });
      
      const {
        name,
        summonerName,
        info: { gameDuration, gameStartTimestamp, gameId, gameMode, participants },
      } = matchData;
      
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
            gameStartTimestamp,
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
          
          playerMatchStatsList.push(matchStats);
        }
      }
    }
    
    return playerMatchStatsList;
  }
};

let output;

app.get('/api/summoner', async (req, res) => {
  if (summonerName !== undefined) {
    await searchSummoner().then((res) => {
      output = res;
    });
    
    res.json(output);
  }
});

let staticData = {
  champions: {},
  items: {},
  spells: {},
  runes: null,
};

fs.readFile('./static/champion.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  
  let summChampionData = JSON.parse(data);
  const entries = Object.entries(summChampionData.data);
  for (const [champion, values] of entries) {
    staticData.champions[values.key] = champion;
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
    staticData.items[item] = values.name;
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
    staticData.spells[values.key] = values.id;
  }
});

let summKeystoneData;

fs.readFile('./static/runesReforged.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  summKeystoneData = JSON.parse(data);
  
  const keystoneEntries = Object.entries(summKeystoneData);
  
  staticData.runes = keystoneEntries.map((x) => x[1]);
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

// catchall
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

app.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`);
});

export default app;
