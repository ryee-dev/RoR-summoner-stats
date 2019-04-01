import React, { useState } from 'react';
import styled from 'styled-components';
import useAxios from '@use-hooks/axios';
// import { useClickOutside } from 'use-events';
import { SummonerForm, MatchList } from './components';

const App = () => {
  const { response, loading, error, reFetch } = useAxios({
    url: 'http://localhost:3001/api/summoner',
    method: 'GET',
  });

  const [modalStatus, setModalStatus] = useState(null);

  // @ts-ignore
  const { data } = response || {};

  const [summName, setSummName] = useState('');
  // @ts-ignore
  const handleCloseModal = () => {
    // @ts-ignore
    setModalStatus(false);
  };

  // console.log(modalStatus);
  return (
    <AppShell>
      <FloatingContainer>
        <SummonerForm
          summName={summName}
          setSummName={setSummName}
          reFetch={reFetch}
          setModalStatus={setModalStatus}
        />
        <br />
        <div className="data-wrapper">
          {loading && <p style={{ position: 'absolute' }}>loading</p>}
          {error && <p>error</p>}
        </div>
      </FloatingContainer>

      {modalStatus && (
        <ModalWrapper>
          <ResultsModal>
            <button
              type="button"
              // @ts-ignore
              onClick={handleCloseModal}
            >
              close
            </button>
            <MatchList data={data} />
          </ResultsModal>
        </ModalWrapper>
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
