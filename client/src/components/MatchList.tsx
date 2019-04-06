import React from 'react';
// import useFetch from 'fetch-suspense';
import { useFetch } from 'react-fetch-hook';
import MatchCard from './MatchCard';

interface MatchListProps {
  summonerName: string;
  // setModalStatus: Function;
}

const MatchList: React.FC<MatchListProps> = (props: MatchListProps) => {
  const { summonerName } = props;
  // const data = useFetch('http://localhost:3001/api/summoner', {
  //   method: 'GET',
  // });
  const { isLoading, data } = useFetch('http://localhost:3001/api/summoner');

  return isLoading ? (
    <div>...loading</div>
  ) : (
    <>
      <button
        type="button"
        // @ts-ignore
        // onClick={setModalStatus(false)}
      >
        x
      </button>

      <h1>{summonerName}</h1>
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
          secondaryRune1={match.runes.secondaryRune1}
          secondaryRune2={match.runes.secondaryRune2}
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
    </>
  );
};

export default MatchList;
