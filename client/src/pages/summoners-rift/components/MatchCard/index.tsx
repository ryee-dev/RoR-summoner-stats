import React from 'react';
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
  key: number;
  gameMode: any;
  win: string;
  gameDuration: number;
  summonerName: string;
  summAId: number;
  summBId: number;
  summAName: string;
  summBName: string;
  runes: any;
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
  const {
    gameMode,
    win,
    gameDuration,
    summAId,
    summBId,
    summAName,
    summBName,
    runes,
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
    items,
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

  const handleConvertSecToMin = (secs: number) => {
    console.log(gameDuration);
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}m ${seconds}s`;
  };

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
            src={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/${championName}.png`}
            alt={`${championName}`}
            data-tip={`${championName}`}
          />
          <ReactTooltip place="top" type="dark" effect="float" />
          <CardRow>
            <img
              className="spell"
              src={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/spell/${summAId}.png`}
              alt={`${summAName}`}
            />
            <img
              className="spell"
              src={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/spell/${summBId}.png`}
              alt={`${summBName}`}
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
                {items.item0 !== 0 ? (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${items.item0}.png`}
                    alt={`${item0}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {items.item1 !== 0 ? (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${items.item1}.png`}
                    alt={`${item1}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {items.item2 !== 0 ? (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${items.item2}.png`}
                    alt={`${item2}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {items.item6 !== 0 ? (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${items.item6}.png`}
                    alt={`${item6}`}
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
                {items.item4 !== 0 ? (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${items.item4}.png`}
                    alt={`${item4}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {items.item5 !== 0 ? (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${items.item5}.png`}
                    alt={`${item5}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {items.item3 !== 0 ? (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${items.item3}.png`}
                    alt={`${item3}`}
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
              src={`https://opgg-static.akamaized.net/images/lol/perk/${runes.keystone}.png`}
              alt={`${keystone}`}
            />
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${runes.primaryRune1}.png`}
              alt={`${primaryRune1}`}
            />
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${runes.primaryRune2}.png`}
              alt={`${primaryRune2}`}
            />
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${runes.primaryRune3}.png`}
              alt={`${primaryRune3}`}
            />
          </div>
          <div className="col">
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${runes.secondaryRune1}.png`}
              alt={`${secondaryRune1}`}
            />
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${runes.secondaryRune2}.png`}
              alt={`${secondaryRune2}`}
            />
          </div>
        </RuneWrapper>
      </CardRow>
    </CardWrapper>
  );
};

export default MatchCard;
