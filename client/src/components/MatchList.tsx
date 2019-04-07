import React from 'react';
import MatchCard from './MatchCard';

interface MatchListProps {
  data: any;
}

const MatchList: React.FC<MatchListProps> = (props: MatchListProps) => {
  const { data } = props;

  console.log(data);

  return (
    <div>
      {data.hits.map((match: any) => (
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
    </div>
  );
};

export default MatchList;
