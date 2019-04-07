import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import useFetch from 'fetch-suspense';
// import useAxios from '@use-hooks/axios';
import axios from 'axios';
import { SummonerForm, MatchList } from './components';

const App = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [data, setData] = useState();
  const [summName, setSummName] = useState('');
  const [summQuery, setSummQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await axios('http://localhost:3001/api/summoner')
        .then(res => {
          if (summQuery.length > 4) {
            setData(res.data);
            // console.log(summQuery);
            setModalStatus(true);
          }
        })
        .catch(error => {
          setModalStatus(false);
          console.log(error);
        });
    };

    fetchData();
  }, [summQuery]);

  // if (data) {
  //   setLoading(false);
  // }

  // @ts-ignore
  return (
    <AppShell>
      <FloatingContainer>
        <SummonerForm
          summName={summName}
          setSummName={setSummName}
          setLoading={setLoading}
          setSummQuery={setSummQuery}
          summQuery={summQuery}
        />
        <br />
      </FloatingContainer>

      {loading ? (
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
      ) : (
        data && (
          <ModalWrapper>
            <ResultsModal>
              <ListWrapper>
                <MatchList
                  data={data}
                  setModalStatus={setModalStatus}
                  modalStatus={modalStatus}
                  summonerName={summName}
                />
              </ListWrapper>
            </ResultsModal>
          </ModalWrapper>
        )
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
