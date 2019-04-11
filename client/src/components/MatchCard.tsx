import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

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

  const SecondsToMins = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <CardWrapper
      style={
        win ? { backgroundColor: '#ebfffb' } : { backgroundColor: '#ffe0ec' }
      }
    >
      {/* eslint-disable jsx-a11y/anchor-is-valid */}
      <CardRow>
        <CardCol>
          <p>{gameMode}</p>
          {win === 'Win' ? <p>Victory</p> : <p>Defeat</p>}
          <p>{SecondsToMins(gameDuration)}</p>
        </CardCol>
        <CardCol className="center">
          <a data-tip data-for="champion-name">
            <img
              className="champion"
              src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/champion/${championName}.png`}
              alt={`${championName}`}
            />
          </a>
          <ReactTooltip
            id="champion-name"
            place="right"
            type="dark"
            effect="solid"
          >
            <p>{championName}</p>
          </ReactTooltip>
        </CardCol>
        <CardCol>
          <a data-tip data-for="spell-name-1">
            <img
              className="spell"
              src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/spell/${summAId}.png`}
              alt={`${summAName}`}
            />
          </a>
          <ReactTooltip
            id="spell-name-1"
            place="right"
            type="dark"
            effect="solid"
          >
            <p>{summAName}</p>
          </ReactTooltip>

          <a data-tip data-for="spell-name-2">
            <img
              className="spell"
              src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/spell/${summBId}.png`}
              alt={`${summBName}`}
            />
          </a>
          <ReactTooltip
            id="spell-name-2"
            place="right"
            type="dark"
            effect="solid"
          >
            <p>{summBName}</p>
          </ReactTooltip>
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
          <ItemContainer>
            <div className="row">
              <div className="img-wrapper">
                {item0 !== 0 && (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/${
                      items.item0
                    }.png`}
                    alt={`${item0}`}
                  />
                )}
              </div>
              <div className="img-wrapper">
                {item1 !== 0 && (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/${
                      items.item1
                    }.png`}
                    alt={`${item1}`}
                  />
                )}
              </div>
              <div className="img-wrapper">
                {item2 !== 0 && (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/${
                      items.item2
                    }.png`}
                    alt={`${item2}`}
                  />
                )}
              </div>
              <div className="img-wrapper">
                {item3 !== 0 && (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/${
                      items.item3
                    }.png`}
                    alt={`${item3}`}
                  />
                )}
              </div>
            </div>
            <div className="row">
              <div className="img-wrapper">
                {item4 !== 0 && (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/${
                      items.item4
                    }.png`}
                    alt={`${item4}`}
                  />
                )}
              </div>
              <div className="img-wrapper">
                {item5 !== 0 && (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/${
                      items.item5
                    }.png`}
                    alt={`${item5}`}
                  />
                )}
              </div>
              <div className="img-wrapper">
                {item6 !== 0 && (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/${
                      items.item6
                    }.png`}
                    alt={`${item6}`}
                  />
                )}
              </div>
            </div>
          </ItemContainer>
        </CardCol>
      </CardRow>
      <CardRow>
        <CardCol>
          <p>Keystone:</p>
          <p>{keystone}</p>
        </CardCol>
        <CardCol>
          <p>Primary Rune 1:</p>
          <p>{primaryRune1}</p>
        </CardCol>
        <CardCol>
          <p>Primary Rune 2:</p>
          <p>{primaryRune2}</p>
        </CardCol>
        <CardCol>
          <p>Primary Rune 3:</p>
          <p>{primaryRune3}</p>
        </CardCol>
        <CardCol>
          <p>Secondary Rune 1:</p>
          <p>{secondaryRune1}</p>
        </CardCol>
        <CardCol>
          <p>Secondary Rune 2:</p>
          <p>{secondaryRune2}</p>
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
  justify-content: space-evenly;
  flex-direction: column;
  border: 1px dotted black;
  align-items: flex-start;

  &.center {
    align-items: center;
  }

  .spell {
    max-width: 64px;
  }

  .items {
    img {
      margin: 1rem;
    }
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-direction: column;

  div {
    &.row {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 0.1rem 0;
    }

    &.img-wrapper {
      margin: 0 0.1rem;
      border: 1px solid black;
      height: 50px;
      width: 50px;
    }
  }

  img {
    height: 50px;
    width: 50px;
    //border: 2px solid white;
    //background-color: white;
  }
`;
