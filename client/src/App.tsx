import React, { useState } from 'react';
import styled from 'styled-components';
// import useFetch from 'fetch-suspense';
// import useAxios from '@use-hooks/axios';
import axios from 'axios';
import { MatchList } from './components';

const fetchData = () => {
  return axios.get('http://localhost:3001/api/summoner');
};

const App = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ hits: [] });
  const [summName, setSummName] = useState('');
  const [summQuery, setSummQuery] = useState('');
  const summonerFormData = new FormData();

  const findSummoner = async () => {
    summonerFormData.set('summonerName', summQuery);
    setLoading(true);
    setData({ hits: [] });
    setSummQuery(summName);
    await fetchData()
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.get('http://localhost:3001/api/summoner');
  //     setData(result.data);
  //   };
  //
  //   if (summQuery !== '') {
  //     fetchData();
  //     setLoading(false);
  //     setModalStatus(true);
  //   }
  // }, [summQuery]);

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

      {loading && (
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

      {!loading && data && modalStatus ? (
        <ModalWrapper>
          <ResultsModal>
            <ListWrapper>
              <MatchList
                data={data}
                setModalStatus={setModalStatus}
                modalStatus={modalStatus}
                summonerName={summQuery}
              />
            </ListWrapper>
          </ResultsModal>
        </ModalWrapper>
      ) : (
        <div>data not found</div>
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
