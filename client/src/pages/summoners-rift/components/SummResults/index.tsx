import React from 'react';
import MatchCard from '../MatchCard';

import { ListWrapper, ResultsModal } from './SummResults.css';
import { ResultsProps } from 'utils/types';

const SummResults: React.FC<ResultsProps> = (props: ResultsProps) => {
  const { data, summQuery, staticData } = props;

  // for (let i = 0; i < 5; i++) {
  //   console.log(data.hits[i].gameDuration + data.hits[i].gameStartTimestamp);
  // }

  return (
    <ResultsModal>
      <ListWrapper>
        <h1>{summQuery}</h1>
        {data.hits.slice(0, 5).map((match: any, index: number) => (
          <MatchCard
            staticData={staticData}
            key={index}
            gameMode={match.gameMode}
            win={match.outcome}
            gameDuration={match.gameDuration}
            gameStartTimestamp={match.gameStartTimestamp}
            summonerName={match.summonerName}
            summAId={match.spell1Id}
            summBId={match.spell2Id}
            championName={match.championId}
            kills={match.kills}
            deaths={match.deaths}
            assists={match.assists}
            kda={match.kda}
            items={match.items}
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
      </ListWrapper>
    </ResultsModal>
  );
};

export default SummResults;
