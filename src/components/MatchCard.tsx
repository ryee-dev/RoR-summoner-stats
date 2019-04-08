import React from 'react';
import styled from 'styled-components';
import useFetch from 'fetch-suspense';

interface MatchProps {
  key: number;
  win: string;
  gameDuration: number;
  summonerName: string;
  summAId: number;
  summBId: number;
  keystone: number;
  primaryRune1: number;
  primaryRune2: number;
  primaryRune3: number;
  secondaryRune1: number;
  secondaryRune2: number;
  championId: number;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  champLevel: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  neutralMinionsKilledTeamJungle: number;
  neutralMinionsKilledEnemyJungle: number;
}

const MatchCard: React.FC<MatchProps> = (props: MatchProps) => {
  const staticChampionDataEndpoint = 'http://localhost:3001/static/champions';
  const staticItemDataEndpoint = 'http://localhost:3001/static/items';
  const staticSpellDataEndpoint = 'http://localhost:3001/static/spells';

  const champData = useFetch(staticChampionDataEndpoint, {
    method: 'GET',
  });

  const itemData = useFetch(staticItemDataEndpoint, {
    method: 'GET',
  });

  const spellData = useFetch(staticSpellDataEndpoint, {
    method: 'GET',
  });

  const {
    win,
    gameDuration,
    summAId,
    summBId,
    keystone,
    primaryRune1,
    primaryRune2,
    primaryRune3,
    secondaryRune1,
    secondaryRune2,
    championId,
    kills,
    deaths,
    assists,
    kda,
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
    // neutralMinionsKilledTeamJungle,
    // neutralMinionsKilledEnemyJungle,
  } = props;

  // console.log(win);

  const getTotalCS = () => {
    let total;
    if (neutralMinionsKilled === 0) {
      total = totalMinionsKilled;
    } else {
      total = totalMinionsKilled + neutralMinionsKilled;
    }
    return total;
  };

  const getCsPerMin = () => {
    const csPerMin = (getTotalCS() / Math.floor(gameDuration / 60)).toPrecision(
      1
    );
    return csPerMin;
  };

  const SecondsToMins = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}m ${seconds}s`;
  };

  const getChampionName = (champKey: number) => {
    let championName;
    for (let i = 0; i < champData.championKeys.length; i++) {
      if (champKey.toString() === champData.championKeys[i]) {
        championName = champData.championNames[i];
      }
    }
    return championName;
  };

  const getItemName = (itemKey: number) => {
    let itemName;
    for (let i = 0; i < itemData.itemKeys.length; i++) {
      if (itemKey.toString() === itemData.itemKeys[i]) {
        itemName = itemData.itemNames[i];
      }
    }
    return itemName;
  };

  const getSpellName = (spellKey: number) => {
    let spellName;
    for (let i = 0; i < spellData.spellKeys.length; i++) {
      if (spellKey.toString() === spellData.spellKeys[i]) {
        spellName = spellData.spellNames[i];
      }
    }
    return spellName;
  };

  return (
    <CardWrapper>
      <CardRow>
        <CardCol>
          {win === 'Win' ? <p>Win</p> : <p>Lose</p>}
          <p>{SecondsToMins(gameDuration)}</p>
        </CardCol>
        <CardCol>
          <p>{getChampionName(championId)}</p>
          {/* <p>{championId}</p> */}
        </CardCol>
        <CardCol>
          <p>{getSpellName(summAId)}</p>
          <p>{getSpellName(summBId)}</p>
        </CardCol>
        <CardCol>
          <p>
            {kills}/{deaths}/{assists}
          </p>
          {deaths === 0 ? <p>Perfect</p> : <p>{kda}:1 KDA</p>}
        </CardCol>
        <CardCol>
          <p>level: {champLevel}</p>
          <p>
            {getTotalCS()} ({getCsPerMin()}) CS
          </p>
        </CardCol>
        <CardCol>
          <p>Item 1: {getItemName(item0)}</p>
          <p>Item 2: {getItemName(item1)}</p>
          <p>Item 3: {getItemName(item2)}</p>
          <p>Item 4: {getItemName(item3)}</p>
        </CardCol>
        <CardCol>
          <p>Item 5: {getItemName(item4)}</p>
          <p>Item 6: {getItemName(item5)}</p>
          <p>Trinket: {getItemName(item6)}</p>
        </CardCol>
      </CardRow>
      <CardRow>
        <p>Keystone: {keystone}</p>
        <p>Primary Rune 1: {primaryRune1}</p>
        <p>Primary Rune 2: {primaryRune2}</p>
        <p>Primary Rune 3: {primaryRune3}</p>
        <p>Secondary Rune 1: {secondaryRune1}</p>
        <p>Secondary Rune 2: {secondaryRune2}</p>
      </CardRow>
    </CardWrapper>
  );
};

export default MatchCard;

const CardWrapper = styled.div`
  height: auto;
  width: 100%;
  border: 2px solid black;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: aliceblue;
  margin: 1rem 0;

  p {
    font-size: 0.6rem;
  }
`;

const CardRow = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  //border: 1px dotted black;
`;

const CardCol = styled.div`
  height: 100%;
  //width: 10%;
  //max-width: 100px;
  margin: 0 0.4rem;
  display: flex;
  align-items: flex=start;
  justify-content: space-evenly;
  flex-direction: column;
  border: 1px dotted black;
`;
