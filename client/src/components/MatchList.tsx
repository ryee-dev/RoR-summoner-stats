import React from 'react';
import styled from 'styled-components';
import MatchCard from './MatchCard';

interface MatchProps {
  data: any;
}

const MatchList: React.FC<MatchProps> = (properties: MatchProps) => {
  const { data } = properties;
  console.log(data);
  // console.log(data.matchData[0].win);
  return (
    <ListWrapper>
      {data &&
        data.map((match: any) => (
          <MatchCard
            // key={match.gameId}
            // summonerName={match.summonerName}
            // gameId={match.gameId}
            gameDuration={match.gameDuration}
            // win={match.win}
            participantPlayerId={match.participantPlayerId}
            summAId={match.summAId}
            summBId={match.summBId}
            champLevel={match.champLevel}
            totalMinionsKilled={match.totalMinionsKilled}
            neutralMinionsKilled={match.neutralMinionsKilled}
            teamJgMinionsKilled={match.teamJgMinionsKilled}
            enemyJgMinionsKilled={match.enemyJgMinionsKilled}
            primaryKeystone={match.primaryKeystone}
            primaryRune1={match.primaryRune1}
            primaryRune2={match.primaryRune2}
            primaryRune3={match.primaryRune3}
            secondaryRune1={match.secondaryRune1}
            secondaryRune2={match.secondaryRune2}
            championId={match.championId}
            item0={match.item0}
            item1={match.item1}
            item2={match.item2}
            item3={match.item3}
            item4={match.item4}
            item5={match.item5}
            item6={match.item6}
            kills={match.kills}
            deaths={match.deaths}
            assists={match.assists}
          />
        ))}
    </ListWrapper>
  );
};

export default MatchList;

const ListWrapper = styled.div`
  //height: 50%;
  position: absolute;
  padding: 0 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  background-color: aliceblue;
  overflow: scroll;

  p {
    font-size: 0.6rem;
  }
`;
