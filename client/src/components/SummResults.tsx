import React from 'react';
import styled from 'styled-components';
import MatchCard from './MatchCard';

interface Props {
  data: any;
  summQuery: string;
  champData: any;
  itemData: any;
  spellData: any;
}

const SummResults: React.FC<Props> = (props: Props) => {
  const { data, summQuery, champData, itemData, spellData } = props;
  return (
    <ResultsModal>
      <ListWrapper>
        <h1>{summQuery}</h1>
        {data.hits.map((match: any) => (
          <MatchCard
            key={match.gameId}
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
            champData={champData}
            itemData={itemData}
            spellData={spellData}
            // keystoneData={keystoneData}
            // runeData={runeData}
          />
        ))}
      </ListWrapper>
    </ResultsModal>
  );
};

export default SummResults;

const ResultsModal = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  //padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  overflow: scroll;

  button {
    position: fixed;
    top: 10px;
    right: 10px;
  }
`;

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
