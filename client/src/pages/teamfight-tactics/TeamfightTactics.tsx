// @ts-ignore
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import useFetch from 'fetch-suspense';
import useOnClickOutside from 'use-onclickoutside';
import { SummForm, SummResults, Error, Loading } from './components';
import { AppShell, ModalWrapper, AppOverlay, Close } from '../../App.css';

const TeamfightTactics = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({ hits: [] });
  const [summName, setSummName] = useState('');
  const [summQuery, setSummQuery] = useState('');

  const staticData = useFetch('/static', { method: 'GET' });

  const closeModal = () => {
    setModalStatus(false);
    setData({ hits: [] });
    setSummQuery('');
    setSummName('');
  };

  const ref = useRef(null);
  useOnClickOutside(ref, closeModal);

  const handleEscClose = (e: { keyCode: number }) => {
    if (e.keyCode === 27) {
      closeModal();
    }
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

    // console.log({
    //   loadingStatus: loading,
    //   errorStatus: error,
    //   modal: modalStatus,
    //   response: data,
    //   query: summQuery,
    // });
  }, [summQuery]);

  return (
    <AppShell onKeyDown={handleEscClose}>
      <SummForm
        setSummName={setSummName}
        setSummQuery={setSummQuery}
        summName={summName}
        summQuery={summQuery}
      />
      {summQuery !== '' && loading && <Loading />}
      {!loading && modalStatus && error && <Error />}
      {modalStatus && !loading && data.hits && (
        <ModalWrapper ref={ref}>
          <SummResults
            data={data}
            summQuery={summQuery}
            staticData={staticData}
          />
        </ModalWrapper>
      )}
      {summQuery !== '' && <AppOverlay />}
      {modalStatus && !loading && <Close onClick={closeModal} />}
    </AppShell>
  );
};

export default TeamfightTactics;
