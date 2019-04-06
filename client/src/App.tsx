import React, { useState } from 'react';
import styled from 'styled-components';
// import axios from 'axios';
// import MatchCard from './components/MatchCard';
// import { useFetch } from 'react-fetch-hook';
// import MatchCard from './components/MatchCard';
// import { MatchList } from './components';

const App = () => {
  const [summName, setSummName] = useState('');
  // const [summData, setSummData] = useState();
  // const [fetchStatus, setFetchStatus] = useState(false);
  const summonerFormData = new FormData();

  const findSummoner = () => {
    summonerFormData.set('summonerName', summName);

    // axios
    //   .get('http://localhost:3000/api/summoner')
    //   .then(res => {
    //     console.log(res);
    //     setSummData(res.data);
    //     setFetchStatus(true);
    //   })
    //   .catch(() => {
    //     console.log('error fetching data');
    //   });
  };
  return (
    <AppShell>
      <FloatingContainer>
        <SummForm
          method="POST"
          action="http://localhost:3001/api/summoner"
          autoComplete="off"
          onSubmit={findSummoner}
        >
          <SummInput
            placeholder="Summoner Name"
            value={summName}
            name="summName"
            // @ts-ignore
            onChange={e => setSummName(e.target.value)}
          />

          <SubmitButt type="submit">submit</SubmitButt>
        </SummForm>

        <br />
      </FloatingContainer>

      {/* {fetchStatus && ( */}
      {/*  <ListWrapper> */}
      {/*    {summData.map((match: any) => ( */}
      {/*      <MatchCard */}
      {/*        key={match.gameId} */}
      {/*        win={match.outcome} */}
      {/*        gameDuration={match.gameDuration} */}
      {/*        summonerName={match.summonerName} */}
      {/*        summAId={match.spell1Id} */}
      {/*        summBId={match.spell2Id} */}
      {/*        keystone={match.runes.keystone} */}
      {/*        primaryRune1={match.runes.primaryRune1} */}
      {/*        primaryRune2={match.runes.primaryRune2} */}
      {/*        primaryRune3={match.runes.primaryRune3} */}
      {/*        secondaryRune1={match.runes.secondaryRune1} */}
      {/*        secondaryRune2={match.runes.secondaryRune2} */}
      {/*        championId={match.championId} */}
      {/*        kills={match.kills} */}
      {/*        deaths={match.deaths} */}
      {/*        assists={match.assists} */}
      {/*        kda={match.kda} */}
      {/*        item0={match.items.item0} */}
      {/*        item1={match.items.item1} */}
      {/*        item2={match.items.item2} */}
      {/*        item3={match.items.item3} */}
      {/*        item4={match.items.item4} */}
      {/*        item5={match.items.item5} */}
      {/*        item6={match.items.item6} */}
      {/*        champLevel={match.championLevel} */}
      {/*        totalMinionsKilled={match.creepScore.totalMinionsKilled} */}
      {/*        neutralMinionsKilled={match.creepScore.neutralMinionsKilled} */}
      {/*        neutralMinionsKilledTeamJungle={ */}
      {/*          match.creepScore.neutralMinionsKilledTeamJungle */}
      {/*        } */}
      {/*        neutralMinionsKilledEnemyJungle={ */}
      {/*          match.creepScore.neutralMinionsKilledEnemyJungle */}
      {/*        } */}
      {/*      /> */}
      {/*    ))} */}
      {/*  </ListWrapper> */}
      {/* )} */}
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

// SummonerForm

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

// const ListWrapper = styled.div`
//   //height: 50%;
//   position: absolute;
//   padding: 0 1rem;
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: space-evenly;
//   flex-direction: column;
//   background-color: aliceblue;
//   overflow: scroll;
//   p {
//     font-size: 0.6rem;
//   }
// `;
