import React, { useState } from 'react';
import styled from 'styled-components';
// import useAxios from 'axios-hooks';
import useAxios from '@use-hooks/axios';
import { SummonerForm, MatchList } from './components';

const App = () => {
  const { response, loading, error, reFetch } = useAxios({
    url: 'http://localhost:3001/api/summoner',
    method: 'GET',
  });

  // @ts-ignore
  const { data } = response || {};

  const [summName, setSummName] = useState('');

  // @ts-ignore
  // const updateName = e => {
  //   e.preventDefault();
  //   setSummName(e.target.value);
  // };

  console.log(response);
  return (
    <AppShell>
      <FloatingContainer>
        <SummonerForm
          summName={summName}
          setSummName={setSummName}
          reFetch={reFetch}
        />
        <br />
        <div className="data-wrapper">
          {loading && <p style={{ position: 'absolute' }}>loading</p>}
          {error && <p>error</p>}
        </div>
      </FloatingContainer>

      {!loading && <MatchList data={data} />}
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
  background-color: #151a27;
  border-radius: 4px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 4rem 0;
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
