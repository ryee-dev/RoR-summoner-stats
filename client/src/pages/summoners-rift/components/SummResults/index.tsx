import React from 'react';
import MatchCard from '../MatchCard';

import { ListWrapper, ResultsModal } from './SummResults.css';
import { ResultsProps } from '../../../../utils/types';

const SummResults: React.FC<ResultsProps> = (props: ResultsProps) => {
  const { data, summQuery, staticData } = props;

  return (
    <ResultsModal>
      <ListWrapper>
        <h1>{summQuery}</h1>
        {data.hits.slice(0, 5).map((match: any) => (
          <MatchCard
            staticData={staticData}
            key={match.gameDuration}
            gameMode={match.gameMode}
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
