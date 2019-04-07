import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// import useFetch from 'fetch-suspense';
// import useAxios from '@use-hooks/axios';
import axios from 'axios';
// import { MatchList } from './components';
import MatchCard from './components/MatchCard';

const App = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ hits: [] });
  const [summName, setSummName] = useState('');
  const [summQuery, setSummQuery] = useState('');
  const summonerFormData = new FormData();

  const prepareResults = async () => {
    await setSummQuery(summName);
  };

  const findSummoner = async () => {
    setLoading(true);
    setModalStatus(false);
    await summonerFormData.set('summonerName', summQuery);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (summQuery) {
        setData({ hits: [] });
        console.log('fetching');
        await axios
          .get('/api/summoner')
          .then(res => {
            setData(res.data);
            setLoading(false);
            setModalStatus(true);
            return data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    };

    fetchData();
  }, [summQuery]);

  return (
    <AppShell>
      <FloatingContainer>
        <SummForm
          method="POST"
          action="/api/summoner"
          autoComplete="off"
          onSubmit={findSummoner}
        >
          <SummInput
            placeholder="Summoner Name"
            value={summName}
            name="summName"
            onChange={e => setSummName(e.target.value)}
          />
          <SubmitButt type="submit" onClick={prepareResults}>
            submit
          </SubmitButt>
        </SummForm>
        <br />
      </FloatingContainer>

      {data && loading && (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
          }}
        >
          <h1 style={{ color: 'white' }}>loading...</h1>
        </div>
      )}

      {modalStatus && !loading && (
        <ModalWrapper>
          <ResultsModal>
            <ListWrapper>
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
            </ListWrapper>
          </ResultsModal>
        </ModalWrapper>
      )}

      {!loading && modalStatus && (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
          }}
        >
          <h1 style={{ color: 'white' }}>data not found...</h1>
        </div>
      )}
    </AppShell>
  );
};

export default App;

const AppShell = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 2rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #06080b;
  overflow: scroll;
`;

const FloatingContainer = styled.div`
  height: 100%;
  background-color: #151a27;
  border-radius: 4px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  //padding: 4rem 0;
  overflow: scroll;

  h1 {
    color: white;
  }

  .data-wrapper {
    position: absolute;
    color: white;
    margin: 2rem 0;
    overflow: scroll;
  }
`;

const ModalWrapper = styled.div`
  position: absolute;
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: scroll;
`;

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

const SummForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  //background-color: #1D212B;
  //background-color: #27303F;
  border-radius: 6px;
`;

const SummInput = styled.input`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.25);
  outline: none;
  border: none;
  padding: 0.6rem 1rem;
  width: 25%;
  border-radius: 2px;
  margin: 1rem;
  transition: width 0.2s ease-in-out;
  background-color: #f3f8ff;
  caret-color: #565b63;
  color: #565b63;

  ::placeholder {
    color: #565b63;
  }

  &:focus {
    width: 40%;
  }
`;

const SubmitButt = styled.button`
  //width: 10%;
  padding: 0.6rem 2rem;
  text-decoration: none;
  outline: none;
  //border: none;
  border-radius: 6px;
  background-color: transparent;
  border: solid #1380f0 1px;
  //color: white;
  color: #1380f0;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;

  transition: background-color 0.2s ease-in-out, letter-spacing 0.2s ease-in-out,
    color 0.2s ease-in-out;

  &:hover {
    //width: 25%;
    background-color: #1380f0;
    //letter-spacing: 4px;
    color: #151a27;
  }
`;
