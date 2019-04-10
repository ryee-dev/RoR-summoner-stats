import React from 'react';
import styled from 'styled-components';

interface MatchProps {
  key: number;
  gameMode: any;
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
  champData: any;
  itemData: any;
  spellData: any;
  runeData: any;
}

const MatchCard: React.FC<MatchProps> = (props: MatchProps) => {
  const {
    gameMode,
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
    neutralMinionsKilledTeamJungle,
    neutralMinionsKilledEnemyJungle,
    champData,
    itemData,
    spellData,
    runeData,
  } = props;

  const getTotalCS = () => {
    let total;
    if (
      neutralMinionsKilledTeamJungle === undefined ||
      neutralMinionsKilledEnemyJungle === undefined
    ) {
      total = totalMinionsKilled + neutralMinionsKilled;
    } else {
      total =
        totalMinionsKilled +
        neutralMinionsKilled +
        neutralMinionsKilledTeamJungle +
        neutralMinionsKilledEnemyJungle;
    }
    return total;
  };

  const getCsPerMin = () => {
    const csPerMin = getTotalCS() / Math.floor(gameDuration / 60);
    return csPerMin.toFixed(1);
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

  const getSpellId = (spellKey: number) => {
    let spellId;
    for (let i = 0; i < spellData.spellKeys.length; i++) {
      if (spellKey.toString() === spellData.spellKeys[i]) {
        spellId = spellData.spellIds[i];
      }
    }
    return spellId;
  };

  const getRuneName = (runeId: number) => {
    let runeName;
    for (let i = 0; i < runeData.runeIdList.length; i++) {
      if (runeId === runeData.runeIdList[i]) {
        runeName = runeData.runeNameList[i];
      }
    }
    return runeName;
  };

  return (
    <CardWrapper
      style={
        win ? { backgroundColor: '#ebfffb' } : { backgroundColor: '#ffe0ec' }
      }
    >
      <CardRow>
        <CardCol>
          <p>{gameMode}</p>
          {win === 'Win' ? <p>Victory</p> : <p>Defeat</p>}
          <p>{SecondsToMins(gameDuration)}</p>
        </CardCol>
        <CardCol>
          <p>{getChampionName(championId)}</p>
          <img
            className="champion"
            src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/champion/${getChampionName(
              championId
            )}.png`}
            alt={`${getChampionName(championId)}`}
          />
        </CardCol>
        <CardCol>
          <p>{getSpellName(summAId)}</p>
          <img
            className="spell"
            src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/spell/${getSpellId(
              summAId
            )}.png`}
            alt={`${getSpellName(summAId)}`}
          />
          <p>{getSpellName(summBId)}</p>
          <img
            className="spell"
            src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/spell/${getSpellId(
              summBId
            )}.png`}
            alt={`${getSpellName(summBId)}`}
          />
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
        <CardCol className="items">
          <CardRow>
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/${item0}.png`}
              alt={`${getItemName(item0)}`}
            />
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/${item1}.png`}
              alt={`${getItemName(item1)}`}
            />
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/${item2}.png`}
              alt={`${getItemName(item2)}`}
            />
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/${item3}.png`}
              alt={`${getItemName(item3)}`}
            />
          </CardRow>
          <CardRow>
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/${item4}.png`}
              alt={`${getItemName(item4)}`}
            />
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/${item5}.png`}
              alt={`${getItemName(item5)}`}
            />
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/${item6}.png`}
              alt={`${getItemName(item6)}`}
            />
          </CardRow>
          {/* <p>Item 1: {getItemName(item0)}</p> */}
          {/* <p>Item 2: {getItemName(item1)}</p> */}
          {/* <p>Item 3: {getItemName(item2)}</p> */}
          {/* <p>Item 4: {getItemName(item3)}</p> */}
        </CardCol>
        {/* <CardCol> */}
        {/*  <p>Item 5: {getItemName(item4)}</p> */}
        {/*  <p>Item 6: {getItemName(item5)}</p> */}
        {/*  <p>Trinket: {getItemName(item6)}</p> */}
        {/* </CardCol> */}
      </CardRow>
      <CardRow>
        <CardCol>
          <p>Keystone:</p>
          <p>{getRuneName(keystone)}</p>
        </CardCol>
        <CardCol>
          <p>Primary Rune 1:</p>
          <p>{getRuneName(primaryRune1)}</p>
        </CardCol>
        <CardCol>
          <p>Primary Rune 2:</p>
          <p>{getRuneName(primaryRune2)}</p>
        </CardCol>
        <CardCol>
          <p>Primary Rune 3:</p>
          <p>{getRuneName(primaryRune3)}</p>
        </CardCol>
        <CardCol>
          <p>Secondary Rune 1:</p>
          <p>{getRuneName(secondaryRune1)}</p>
        </CardCol>
        <CardCol>
          <p>Secondary Rune 2:</p>
          <p>{getRuneName(secondaryRune2)}</p>
        </CardCol>
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
  margin: 0 0.4rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-direction: column;
  border: 1px dotted black;

  .spell {
    max-width: 64px;
  }

  .items {
    img {
      margin: 1rem;
    }
  }
`;
