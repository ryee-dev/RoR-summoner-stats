import React, { useState } from 'react';
import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { SummonerForm } from './components';

const App = () => {
  const [{ data, loading, error }, refetch] = useAxios(
    'http://localhost:3001/api/summoner'
  );

  const [summName, setSummName] = useState('');

  // const [fetchedData, setFetchedData] = useState('');
  // @ts-ignore
  // const handleRefetch = e => {
  //   e.preventDefault();
  //   refetch();
  //   setFetchedData(JSON.stringify(data, null, 2));
  // };

  // @ts-ignore
  const updateName = e => {
    e.preventDefault();
    setSummName(e.target.value);
  };

  return (
    <AppShell>
      <FloatingContainer>
        <SummonerForm
          summName={summName}
          updateName={updateName}
          refetch={refetch}
        />
        <br />
        <div className="data-wrapper">
          {loading && <p style={{ position: 'absolute' }}>loading</p>}
          {error && <p>error</p>}
          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>

        {/* <h1>{summName}</h1> */}
      </FloatingContainer>
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
    color: white;
    margin: 2rem 0;
    overflow: scroll;
  }
`;
