import React from 'react';
import styled from 'styled-components';
import MatchCard from './MatchCard';

interface Props {
  data: any;
  summQuery: string;
  staticData: any;
}

const SummResults: React.FC<Props> = (props: Props) => {
  const { data, summQuery, staticData } = props;

  const getChampionName = (champKey: number) => {
    let championName;
    for (let i = 0; i < staticData.champions.championKeys.length; i++) {
      if (champKey.toString() === staticData.champions.championKeys[i]) {
        championName = staticData.champions.championNames[i];
      }
    }
    return championName;
  };

  const getItemName = (itemKey: number) => {
    let itemName;
    for (let i = 0; i < staticData.items.itemKeys.length; i++) {
      if (itemKey.toString() === staticData.items.itemKeys[i]) {
        itemName = staticData.items.itemNames[i];
      }
    }
    return itemName;
  };

  const getSpellName = (spellKey: number) => {
    let spellName;
    for (let i = 0; i < staticData.spells.spellKeys.length; i++) {
      if (spellKey.toString() === staticData.spells.spellKeys[i]) {
        spellName = staticData.spells.spellNames[i];
      }
    }
    return spellName;
  };

  const getSpellId = (spellKey: number) => {
    let spellId;
    for (let i = 0; i < staticData.spells.spellKeys.length; i++) {
      if (spellKey.toString() === staticData.spells.spellKeys[i]) {
        spellId = staticData.spells.spellIds[i];
      }
    }
    return spellId;
  };

  const getRuneName = (runeId: number) => {
    let runeName;
    for (let i = 0; i < staticData.runes.runeIds.length; i++) {
      if (runeId === staticData.runes.runeIds[i]) {
        runeName = staticData.runes.runeNames[i];
      }
    }
    return runeName;
  };

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
            summAId={getSpellId(match.spell1Id)}
            summBId={getSpellId(match.spell2Id)}
            summAName={getSpellName(match.spell1Id)}
            summBName={getSpellName(match.spell2Id)}
            keystone={getRuneName(match.runes.keystone)}
            runes={match.runes}
            primaryRune1={getRuneName(match.runes.primaryRune1)}
            primaryRune2={getRuneName(match.runes.primaryRune2)}
            primaryRune3={getRuneName(match.runes.primaryRune3)}
            secondaryRune1={getRuneName(match.runes.secondaryRune1)}
            secondaryRune2={getRuneName(match.runes.secondaryRune2)}
            championName={getChampionName(match.championId)}
            kills={match.kills}
            deaths={match.deaths}
            assists={match.assists}
            kda={match.kda}
            items={match.items}
            item0={getItemName(match.items.item0)}
            item1={getItemName(match.items.item1)}
            item2={getItemName(match.items.item2)}
            item3={getItemName(match.items.item3)}
            item4={getItemName(match.items.item4)}
            item5={getItemName(match.items.item5)}
            item6={getItemName(match.items.item6)}
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

const ResultsModal = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  //padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  overflow: auto;

  svg {
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
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
  background-color: #27303f;
  overflow: auto;

  h1 {
    font-family: Paralucent, sans-serif;
    font-weight: lighter;
    letter-spacing: 8px;
    text-transform: lowercase;
    font-size: 3rem;
    color: white;
  }
`;
