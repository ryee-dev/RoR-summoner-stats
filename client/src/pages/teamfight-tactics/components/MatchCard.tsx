import React from 'react';
import styled from 'styled-components';
// import ReactTooltip from 'react-tooltip';

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

  const SecondsToMins = (secs: number) => {
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
      <CardRow>
        <CardCol>
          <p>{gameMode}</p>
          {win ? <p>Victory</p> : <p>Defeat</p>}
          <p>{SecondsToMins(gameDuration)}</p>
        </CardCol>
        <CardCol className="center">
          <img
            className="champion"
            src={`http://ddragon.leagueoflegends.com/cdn/9.20.1/img/champion/${championName}.png`}
            alt={`${championName}`}
          />
        </CardCol>
        <CardCol>
          <img
            className="spell"
            src={`http://ddragon.leagueoflegends.com/cdn/9.20.1/img/spell/${summAId}.png`}
            alt={`${summAName}`}
          />
          <img
            className="spell"
            src={`http://ddragon.leagueoflegends.com/cdn/9.20.1/img/spell/${summBId}.png`}
            alt={`${summBName}`}
          />
        </CardCol>
        <CardCol className="center">
          <p>
            {kills}/<span style={{ color: '#be3044' }}>{deaths}</span>/{assists}
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
                {items.item0 !== 0 ? (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/9.20.1/img/item/${
                      items.item0
                    }.png`}
                    alt={`${item0}`}
                  />
                ) :
                  <div style={{ height: '50px', width: '50px', border: '1px solid black' }} />
                }
              </div>
              <div className="img-wrapper">
                {items.item1 !== 0 ? (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/9.20.1/img/item/${
                      items.item1
                    }.png`}
                    alt={`${item1}`}
                  />
                ):
                  <div style={{ height: '50px', width: '50px', border: '1px solid black' }} />
                }
              </div>
              <div className="img-wrapper">
                {items.item2 !== 0 ? (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/9.20.1/img/item/${
                      items.item2
                    }.png`}
                    alt={`${item2}`}
                  />
                ) :
                  <div style={{ height: '50px', width: '50px', border: '1px solid black' }} />
                }
              </div>
              <div className="img-wrapper">
                {items.item6 !== 0 ? (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/9.20.1/img/item/${
                      items.item6
                    }.png`}
                    alt={`${item6}`}
                  />
                ) : <div style={{ height: '50px', width: '50px', border: '1px solid black' }} />
                }
              </div>
            </div>
            <div className="row">
              <div className="img-wrapper">
                {items.item4 !== 0 ? (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/9.20.1/img/item/${
                      items.item4
                    }.png`}
                    alt={`${item4}`}
                  />
                ) :
                  <div style={{ height: '50px', width: '50px', border: '1px solid black' }} />
                }
              </div>
              <div className="img-wrapper">
                {items.item5 !== 0 ? (
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/9.20.1/img/item/${
                      items.item5
                    }.png`}
                    alt={`${item5}`}
                  />
                ) :
                  <div style={{ height: '50px', width: '50px', border: '1px solid black' }} />
                }
              </div>
              <div className="img-wrapper">

                {items.item3 !== 0 ? (
                    <img
                      src={`http://ddragon.leagueoflegends.com/cdn/9.20.1/img/item/${
                        items.item3
                      }.png`}
                      alt={`${item3}`}
                    />
                  ) :
                  <div style={{ height: '50px', width: '50px', border: '1px solid black' }} />
                }
              </div>
            </div>
          </ItemContainer>
        </CardCol>
        <CardCol>
          <RuneWrapper>
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${
                runes.keystone
              }.png`}
              alt={`${keystone}`}
            />
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${
                runes.primaryRune1
              }.png`}
              alt={`${primaryRune1}`}
            />
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${
                runes.primaryRune2
              }.png`}
              alt={`${primaryRune2}`}
            />
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${
                runes.primaryRune3
              }.png`}
              alt={`${primaryRune3}`}
            />
          </RuneWrapper>
          <RuneWrapper>
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${
                runes.secondaryRune1
              }.png`}
              alt={`${secondaryRune1}`}
            />
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${
                runes.secondaryRune2
              }.png`}
              alt={`${secondaryRune2}`}
            />
          </RuneWrapper>
        </CardCol>
      </CardRow>
    </CardWrapper>
  );
};

export default MatchCard;

const CardWrapper = styled.div`
  height: auto;
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin: 1rem 0;
  color: #1c222b;

  p {
    font-size: 1rem;
    margin: 0;
  }

  img.spell {
    margin: 0.2rem 0;
  }

  img.rune {
    max-height: 50px;
    max-width: 50px;
  }
`;

const CardRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  //border: 1px dotted black;
`;

const CardCol = styled.div`
  height: 100%;
  margin: 0 0.4rem;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
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

const RuneWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.2rem;

  img {
    margin: 0 0.2rem;
  }
`;
