import React, { Suspense } from 'react';
// import axios from 'axios';
import useFetch from 'fetch-suspense';
import MatchCard from './MatchCard';

interface MatchListProps {
  summonerName: string;
}

const MatchList: React.FC<MatchListProps> = (props: MatchListProps) => {
  const { summonerName } = props;
  const matchHistoryEndPoint = '/api/summoner';
  const data = useFetch(matchHistoryEndPoint, {
    method: 'GET',
  });
  // console.log(data);
  // console.log(data.matchData[0].win);

  // @ts-ignore
  // let summName: any;

  // const handleGetSummonerName = (champKey: any) => {
  //   for (let i = 0; i < staticData.championKeys.length; i++) {
  //     console.log(staticData.championKeys[i]);
  //     if (champKey.toString() === staticData.championKeys[i]) {
  //       summName = staticData.championNames[i];
  //       return summName;
  //     }
  //   }
  //   return summName;
  // };

  // @ts-ignore

  return (
    <>
      <h2>{summonerName}</h2>
      <Suspense
        fallback={
          <div
            style={{
              height: '100vh',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
            }}
          >
            <h1>loading...</h1>
          </div>
        }
      >
        {data.map((match: any) => (
          <MatchCard
            // summonerName={match.summonerName}
            // gameId={match.gameId}
            // win={match.win}
            key={match.gameId}
            gameDuration={match.gameDuration}
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
      </Suspense>
    </>
  );
};

export default MatchList;
