import React, { Suspense } from 'react';
// import axios from 'axios';
import useFetch from 'fetch-suspense';
import MatchCard from './MatchCard';

interface MatchListProps {
  summonerName: string;
}

const MatchList: React.FC<MatchListProps> = (props: MatchListProps) => {
  const { summonerName } = props;
  const matchHistoryEndPoint = 'http://localhost:3001/api/summoner';
  const data = useFetch(matchHistoryEndPoint, {
    method: 'GET',
  });

  return (
    <>
      <h1>{summonerName}</h1>
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
            key={match.gameId}

            win={match.outcome}
            gameDuration={match.gameDuration}
            summonerName={match.summonerName}
            summAId={match.spell1Id}
            summBId={match.spell2Id}
            keystone={match.runes.keystone}
            primaryRune1={match.runes.primaryRune1}
            primaryRune2={match.runes.primaryRune2}
            primaryRune3={match.runes.primaryRune3}
            secondaryRune1={match.runes.primaryRune4}
            secondaryRune2={match.runes.primaryRune5}
            championId={match.championId}
            kills={match.kills}
            deaths={match.deaths}
            assists={match.assists}
            kda={match.kda}
            item0={match.items.item0}
            item1={match.items.item1}
            item2={match.items.item2}
            item3={match.items.item3}
            item4={match.items.item4}
            item5={match.items.item5}
            item6={match.items.item6}
            champLevel={match.championLevel}
            totalMinionsKilled={match.creepScore.totalMinionsKilled}
            neutralMinionsKilled={match.creepScore.neutralMinionsKilled}
            neutralMinionsKilledTeamJungle={
              match.creepScore.neutralMinionsKilledTeamJungle
            }
            neutralMinionsKilledEnemyJungle={
              match.creepScore.neutralMinionsKilledEnemyJungle
            }
          />
        ))}
      </Suspense>
    </>
  );
};

export default MatchList;
