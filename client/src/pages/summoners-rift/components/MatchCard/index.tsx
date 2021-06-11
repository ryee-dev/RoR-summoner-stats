import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { MatchProps, MatchDataProps } from '../../../../utils/types';

import {
  getChampionName,
  getSpellId,
  getSpellName,
  getRuneName,
  getItemName,
  handleConvertSecToMin,
} from '../../../../utils/helpers';

import {
  CardWrapper,
  RuneWrapper,
  CardRow,
  CardCol,
  ItemContainer,
} from './MatchCard.css';

const MatchCard: React.FC<MatchProps> = (props: MatchProps) => {
  const [matchData, setMatchData] = useState<MatchDataProps>({
    championName: '',
    spells: {
      summAName: '',
      summBName: '',
      summAId: 0,
      summBId: 0,
    },
    runes: {
      keystone: 0,
      primaryRune1: 0,
      primaryRune2: 0,
      primaryRune3: 0,
      secondaryRune1: 0,
      secondaryRune2: 0,
    },
    items: {
      item0: 0,
      item1: 0,
      item2: 0,
      item3: 0,
      item4: 0,
      item5: 0,
      item6: 0,
    },
  });

  const {
    staticData,
    gameMode,
    win,
    gameDuration,
    summAId,
    summBId,
    items,
    keystone,
    primaryRune1,
    primaryRune2,
    primaryRune3,
    secondaryRune1,
    secondaryRune2,
    championName,
    kills,
    deaths,
    assists,
    kda,
    champLevel,
    totalMinionsKilled,
    neutralMinionsKilled,
    neutralMinionsKilledTeamJungle,
    neutralMinionsKilledEnemyJungle,
  } = props;

  const getTotalCS = () => {
    let total;
    if (
      neutralMinionsKilledTeamJungle === undefined ||
      neutralMinionsKilledEnemyJungle === undefined
    ) {
      total = totalMinionsKilled + neutralMinionsKilled;
    } else {
      total =
        totalMinionsKilled +
        neutralMinionsKilled +
        neutralMinionsKilledTeamJungle +
        neutralMinionsKilledEnemyJungle;
    }
    return total;
  };

  const getCsPerMin = () => {
    const csPerMin = getTotalCS() / Math.floor(gameDuration / 60);
    return csPerMin.toFixed(1);
  };

  useEffect(() => {
    const { item0, item1, item2, item3, item4, item5, item6 } = items;
    matchData &&
      setMatchData({
        championName: getChampionName(championName, staticData),
        runes: {
          keystone: getRuneName(keystone, staticData),
          primaryRune1: getRuneName(primaryRune1, staticData),
          primaryRune2: getRuneName(primaryRune2, staticData),
          primaryRune3: getRuneName(primaryRune3, staticData),
          secondaryRune1: getRuneName(secondaryRune1, staticData),
          secondaryRune2: getRuneName(secondaryRune2, staticData),
        },
        spells: {
          summAName: getSpellName(summAId, staticData),
          summBName: getSpellName(summBId, staticData),
          summAId: getSpellId(summAId, staticData),
          summBId: getSpellId(summBId, staticData),
        },
        items: {
          item0: getItemName(item0, staticData),
          item1: getItemName(item1, staticData),
          item2: getItemName(item2, staticData),
          item3: getItemName(item3, staticData),
          item4: getItemName(item4, staticData),
          item5: getItemName(item5, staticData),
          item6: getItemName(item6, staticData),
        },
      });

    console.log(matchData);
  }, [matchData]);

  return (
    <CardWrapper
      style={
        win ? { backgroundColor: '#b6f7c1' } : { backgroundColor: '#ffcccc' }
      }
    >
      <CardRow className="list">
        <CardCol>
          <h3 style={{ fontWeight: 'bold' }}>{gameMode}</h3>
          {win ? (
            <h3 style={{ color: '#91b859' }}>Victory</h3>
          ) : (
            <h3 style={{ color: '#f07178' }}>Defeat</h3>
          )}
          <p>{handleConvertSecToMin(gameDuration)}</p>
        </CardCol>
        <CardCol className="center">
          <img
            className="champion"
            src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/${matchData.championName}.png`}
            alt={`${matchData.championName}`}
            data-tip={`${matchData.championName}`}
          />
          <ReactTooltip place="top" type="dark" effect="float" />
          <CardRow>
            <img
              className="spell"
              src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/spell/${matchData.spells.summAId}.png`}
              alt={`${matchData.spells.summAName}`}
            />
            <img
              className="spell"
              src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/spell/${matchData.spells.summBId}.png`}
              alt={`${matchData.spells.summBName}`}
            />
          </CardRow>
        </CardCol>

        <CardCol className="center">
          <p>
            {kills}/<span style={{ color: '#be3044' }}>{deaths}</span>/{assists}
          </p>
          {deaths === 0 ? <p>Perfect</p> : <p>{kda}:1 KDA</p>}

          <p>level: {champLevel}</p>
          <p>
            {getTotalCS()} ({getCsPerMin()}) CS
          </p>
        </CardCol>
        <CardCol className="items">
          <ItemContainer>
            <div className="row">
              <div className="img-wrapper">
                {matchData.items.item0 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${matchData.items.item0}.png`}
                    alt={`${matchData.items.item0}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item1 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${matchData.items.item1}.png`}
                    alt={`${matchData.items.item1}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item2 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${matchData.items.item2}.png`}
                    alt={`${matchData.items.item2}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item6 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${matchData.items.item6}.png`}
                    alt={`${matchData.items.item6}`}
                    style={{
                      marginLeft: '0.4rem',
                      maxWidth: '25px',
                      maxHeight: '25px',
                    }}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
            </div>
            <div className="row">
              <div className="img-wrapper">
                {matchData.items.item4 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${matchData.items.item4}.png`}
                    alt={`${matchData.items.item4}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item5 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${matchData.items.item5}.png`}
                    alt={`${matchData.items.item5}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
              <div className="img-wrapper">
                {matchData.items.item3 !== 0 ? (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/${matchData.items.item3}.png`}
                    alt={`${matchData.items.item3}`}
                  />
                ) : (
                  <div className="empty" />
                )}
              </div>
            </div>
          </ItemContainer>
        </CardCol>
        <RuneWrapper>
          <div className="col">
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${matchData.runes.keystone}.png`}
              alt={`${matchData.runes.keystone}`}
            />
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${matchData.runes.primaryRune1}.png`}
              alt={`${matchData.runes.primaryRune1}`}
            />
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${matchData.runes.primaryRune2}.png`}
              alt={`${matchData.runes.primaryRune2}`}
            />
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${matchData.runes.primaryRune3}.png`}
              alt={`${matchData.runes.primaryRune3}`}
            />
          </div>
          <div className="col">
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${matchData.runes.secondaryRune1}.png`}
              alt={`${matchData.runes.secondaryRune1}`}
            />
            <img
              className="rune"
              src={`https://opgg-static.akamaized.net/images/lol/perk/${matchData.runes.secondaryRune2}.png`}
              alt={`${matchData.runes.secondaryRune2}`}
            />
          </div>
        </RuneWrapper>
      </CardRow>
    </CardWrapper>
  );
};

export default MatchCard;
