import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useFetch from 'fetch-suspense';
import SummForm from './components/SummForm';
import SummResults from './components/SummResults';

const App = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({ hits: [] });
  const [summName, setSummName] = useState('');
  const [summQuery, setSummQuery] = useState('');

  const champData = useFetch('/static/champions', { method: 'GET' });
  const itemData = useFetch('/static/items', { method: 'GET' });
  const spellData = useFetch('/static/spells', { method: 'GET' });

  // const keystoneData = useFetch('/static/keystones', {
  //   method: 'GET',
  // });

  // const runeData = useFetch('/static/runes', {
  //   method: 'GET',
  // });

  const closeModal = () => {
    setModalStatus(false);
    setData({ hits: [] });
    setSummQuery('');
    setSummName('');
  };

  useEffect(() => {
    setData({ hits: [] });

    const fetchData = async () => {
      setModalStatus(false);
      setLoading(true);

      if (summQuery !== '') {
        setLoading(true);
        console.log('fetching');

        await axios
          .get('/api/summoner')
          .then(res => {
            setData({
              hits: res.data,
            });
            setError(false);
            setLoading(false);
            setModalStatus(true);
            console.log(summQuery, 'fetched');
            return data;
          })
          .catch(() => {
            setError(true);
            console.log('error');
          });
      }
    };

    if (summQuery !== '') {
      fetchData();
    }

    console.log({
      loadingStatus: loading,
      errorStatus: error,
      modal: modalStatus,
      response: data,
      query: summQuery,
    });
  }, [summQuery]);

  return (
    <AppShell>
      <FloatingContainer>
        <SummForm
          setSummName={setSummName}
          setSummQuery={setSummQuery}
          summName={summName}
          summQuery={summQuery}
        />
      </FloatingContainer>

      {summQuery !== '' && loading && (
        <TempPageWrapper>
          <h1>loading...</h1>
        </TempPageWrapper>
      )}

      {modalStatus && !loading && data.hits && (
        <ModalWrapper>
          <button type="button" onClick={closeModal}>
            Close
          </button>
          <SummResults
            data={data}
            summQuery={summQuery}
            champData={champData}
            itemData={itemData}
            spellData={spellData}
          />
        </ModalWrapper>
      )}

      {!loading && modalStatus && error && (
        <TempPageWrapper>
          <h1>data not found...</h1>
        </TempPageWrapper>
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

const TempPageWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  h1 {
    color: white;
  }
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

  button {
    position: fixed;
    top: 0;
    right: 0;
    margin: 1rem;
  }
`;
