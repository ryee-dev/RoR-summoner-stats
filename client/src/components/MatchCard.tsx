import React from 'react';
import styled from 'styled-components';

interface MatchProps {
  // matchDetails?: object | any;
  // summonerName: string;
  // gameId: string;
  gameDuration: number;
  win?: boolean;
  participantPlayerId: string;
  summAId: string;
  summBId: string;
  champLevel: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  teamJgMinionsKilled: number;
  enemyJgMinionsKilled: number;
  primaryKeystone: string;
  primaryRune1: string;
  primaryRune2: string;
  primaryRune3: string;
  secondaryRune1: string;
  secondaryRune2: string;
  championId: string;
  item0: string;
  item1: string;
  item2: string;
  item3: string;
  item4: string;
  item5: string;
  item6: string;
  kills: number;
  deaths: number;
  assists: number;
}

const MatchCard: React.FC<MatchProps> = (props: MatchProps) => {
  const {
    win,
    gameDuration,
    // participantPlayerId,
    summAId,
    summBId,
    champLevel,
    totalMinionsKilled,
    neutralMinionsKilled,
    teamJgMinionsKilled,
    enemyJgMinionsKilled,
    primaryKeystone,
    primaryRune1,
    primaryRune2,
    primaryRune3,
    secondaryRune1,
    secondaryRune2,
    championId,
    item0,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    kills,
    deaths,
    assists,
  } = props;

  const TotalCS =
    totalMinionsKilled +
    neutralMinionsKilled +
    teamJgMinionsKilled +
    enemyJgMinionsKilled;
  const CsPerMin = TotalCS / gameDuration;

  return (
    <CardWrapper>
      <CardRow>
        <CardCol>
          <p>{win}</p>
          <p>{gameDuration}</p>
        </CardCol>
        <CardCol>
          <p>{championId}</p>
        </CardCol>
        <CardCol>
          <p>{summAId}</p>
          <p>{summBId}</p>
        </CardCol>
        <CardCol>
          <p>
            {kills}/{deaths}/{assists}
          </p>
          <p>{kills + assists / deaths}:1 KDA</p>
        </CardCol>
        <CardCol>
          <p>{champLevel}</p>
          <p>
            {TotalCS} ({CsPerMin}) CS
          </p>
        </CardCol>
        <CardCol>
          <CardRow>
            {item0} | {item1} | {item2} | {item3}
          </CardRow>
          <CardRow>
            {item4} | {item5} | {item6}
          </CardRow>
        </CardCol>
      </CardRow>
      <CardRow>
        <CardCol>
          <p>Keystone: {primaryKeystone}</p>
          <p>Primary Rune 1: {primaryRune1}</p>
          <p>Primary Rune 2: {primaryRune2}</p>
          <p>Primary Rune 3: {primaryRune3}</p>
        </CardCol>
        <CardCol>
          <p>Secondary Rune 1: {secondaryRune1}</p>
          <p>Secondary Rune 2: {secondaryRune2}</p>
        </CardCol>
      </CardRow>
    </CardWrapper>
  );
};

export default MatchCard;

const CardWrapper = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: aliceblue;

  p {
    font-size: 0.6rem;
  }
`;

const CardRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const CardCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
`;
