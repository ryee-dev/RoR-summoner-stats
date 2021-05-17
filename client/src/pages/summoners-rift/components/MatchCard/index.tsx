import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import {
  CardWrapper,
  RuneWrapper,
  CardRow,
  CardCol,
  ItemContainer,
} from './MatchCard.css';

interface MatchProps {
  staticData: any;
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
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  items: any;
  champLevel: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  neutralMinionsKilledTeamJungle: number;
  neutralMinionsKilledEnemyJungle: number;
}

const MatchCard: React.FC<MatchProps> = (props: MatchProps) => {
  const [matchData, setMatchData] = useState({
    championName: '',
    spells: {
      summAName: '',
      summBName: '',
      summAId: 0,
      summBId: 0,
    },
    runes: {
      keystone: 0,
      primaryRune1: 0,
      primaryRune2: 0,
      primaryRune3: 0,
      secondaryRune1: 0,
      secondaryRune2: 0,
    },
    items: {
      item0: 0,
      item1: 0,
      item2: 0,
      item3: 0,
      item4: 0,
      item5: 0,
      item6: 0,
    },
  });

  const {
    staticData,
    gameMode,
    win,
    gameDuration,
    summAId,
    summBId,
    items,
    keystone,
    primaryRune1,
    primaryRune2,
    primaryRune3,
    secondaryRune1,
    secondaryRune2,
    championName,
    kills,
    deaths,
    assists,
    kda,
    champLevel,
    totalMinionsKilled,
    neutralMinionsKilled,
    neutralMinionsKilledTeamJungle,
    neutralMinionsKilledEnemyJungle,
  } = props;

  const getChampionName = (champKey: any) => {
    let championName;
    for (let i = 0; i < staticData.champions.championKeys.length; i++) {
      if (champKey.toString() === staticData.champions.championKeys[i]) {
        championName = staticData.champions.championNames[i];
      }
    }
    return championName;
  };

  const getItemName = (itemKey: number) => {
    let itemName;
    for (let i = 0; i < staticData.itemKeys.length; i++) {
      if (itemKey.toString() === staticData.itemKeys[i]) {
        itemName = staticData.itemNames[i];
      }
    }
    return itemName;
  };

  const getSpellName = (spellKey: number) => {
    let spellName;
    for (let i = 0; i < staticData.spells.spellKeys.length; i++) {
      if (spellKey.toString() === staticData.spells.spellKeys[i]) {
        spellName = staticData.spells.spellNames[i];
      }
    }
    return spellName;
  };

  const getSpellId = (spellKey: number) => {
    let spellId;
    for (let i = 0; i < staticData.spells.spellKeys.length; i++) {
      if (spellKey.toString() === staticData.spells.spellKeys[i]) {
        spellId = staticData.spells.spellIds[i];
      }
    }
    return spellId;
  };

  const getRuneName = (runeId: number) => {
    let runeName;
    for (let i = 0; i < staticData.runeIds.length; i++) {
      if (runeId === staticData.runeIds[i]) {
        runeName = staticData.runeNames[i];
      }
    }
    return runeName;
  };

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

  const handleConvertSecToMin = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const { item0, item1, item2, item3, item4, item5, item6 } = items;
    setMatchData({
      championName: getChampionName(championName),
      runes: {
        keystone: getRuneName(keystone),
        primaryRune1: getRuneName(primaryRune1),
        primaryRune2: getRuneName(primaryRune2),
        primaryRune3: getRuneName(primaryRune3),
        secondaryRune1: getRuneName(secondaryRune1),
        secondaryRune2: getRuneName(secondaryRune2),
      },
      spells: {
        summAName: getSpellName(summAId),
        summBName: getSpellName(summBId),
        summAId: getSpellId(summAId),
        summBId: getSpellId(summBId),
      },
      items: {
        item0: getItemName(item0),
        item1: getItemName(item1),
        item2: getItemName(item2),
        item3: getItemName(item3),
        item4: getItemName(item4),
        item5: getItemName(item5),
        item6: getItemName(item6),
      },
    });

    console.log(matchData);
  }, [matchData]);

  return (
    <CardWrapper
      style={
        win ? { backgroundColor: '#b6f7c1' } : { backgroundColor: '#ffcccc' }
      }
    >
      <CardRow className="list">
        <CardCol>
          <h3 style={{ fontWeight: 'bold' }}>{gameMode}</h3>
          {win ? (
            <h3 style={{ color: '#91b859' }}>Victory</h3>
          ) : (
            <h3 style={{ color: '#f07178' }}>Defeat</h3>
          )}
          <p>{handleConvertSecToMin(gameDuration)}</p>
        </CardCol>
        <CardCol className="center">
          <img
            className="champion"
            src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/${matchData.championName}.png`}
            alt={`${matchData.championName}`}
            data-tip={`${matchData.championName}`}
          />
          <ReactTooltip place="top" type="dark" effect="float" />
          <CardRow>
            <img
              className="spell"
              src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/spell/${matchData.spells.summAId}.png`}
              alt={`${matchData.spells.summAName}`}
            />
            <img
              className="spell"
              src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/spell/${matchData.spells.summBId}.png`}
              alt={`${matchData.spells.summBName}`}
            />
          </CardRow>
        </CardCol>

        <CardCol className="center">
          <p>
            {kills}/<span style={{ color: '#be3044' }}>{deaths}</span>/{assists}
          </p>
          {deaths === 0 ? <p>Perfect</p> : <p>{kda}:1 KDA</p>}

          <p>level: {champLevel}</p>
          <p>
            {getTotalCS()} ({getCsPerMin()}) CS
          </p>
        </CardCol>
        <CardCol className="items">
          <ItemContainer>
            <div className="row">
              <div className="img-wrapper">
                {matchData.items.item0 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${matchData.items.item0}.png`}
                    alt={`${matchData.items.item0}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item1 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${matchData.items.item1}.png`}
                    alt={`${matchData.items.item1}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item2 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${matchData.items.item2}.png`}
                    alt={`${matchData.items.item2}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item6 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${matchData.items.item6}.png`}
                    alt={`${matchData.items.item6}`}
                    style={{
                      marginLeft: '0.4rem',
                      maxWidth: '25px',
                      maxHeight: '25px',
                    }}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
            </div>
            <div className="row">
              <div className="img-wrapper">
                {matchData.items.item4 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${matchData.items.item4}.png`}
                    alt={`${matchData.items.item4}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item5 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${matchData.items.item5}.png`}
                    alt={`${matchData.items.item5}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item3 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${matchData.items.item3}.png`}
                    alt={`${matchData.items.item3}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
            </div>
          </ItemContainer>
        </CardCol>
        <RuneWrapper>
          <div className="col">
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${matchData.runes.keystone}.png`}
              alt={`${matchData.runes.keystone}`}
            />
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${matchData.runes.primaryRune1}.png`}
              alt={`${matchData.runes.primaryRune1}`}
            />
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${matchData.runes.primaryRune2}.png`}
              alt={`${matchData.runes.primaryRune2}`}
            />
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${matchData.runes.primaryRune3}.png`}
              alt={`${matchData.runes.primaryRune3}`}
            />
          </div>
          <div className="col">
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${matchData.runes.secondaryRune1}.png`}
              alt={`${matchData.runes.secondaryRune1}`}
            />
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${matchData.runes.secondaryRune2}.png`}
              alt={`${matchData.runes.secondaryRune2}`}
            />
          </div>
        </RuneWrapper>
      </CardRow>
    </CardWrapper>
  );
};

export default MatchCard;
