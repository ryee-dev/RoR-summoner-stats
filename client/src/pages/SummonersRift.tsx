import React, { useEffect, useState, useRef } from 'react';
import ky from 'ky';
import useFetch from 'fetch-suspense';
import useOnClickOutside from 'use-onclickoutside';
import { SummForm, SummResults, Error, Loading } from '../components';
import { AppShell, ModalWrapper, AppOverlay, Close } from '../App.css';

const SummonersRift = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [summData, setSummData] = useState({ hits: [] });
  const [summName, setSummName] = useState('');
  const [summQuery, setSummQuery] = useState('');

  const staticData = useFetch('/static', { method: 'GET' });

  const closeModal = () => {
    setModalStatus(false);
    setSummData({ hits: [] });
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
    setSummData({ hits: [] });
    const fetchData = async () => {
      setModalStatus(false);
      setLoading(true);

      if (summQuery !== '') {
        setLoading(true);
        console.log('fetching');

        setSummData({
          hits: await ky.get('/api/summoner').json(),
        });

        setError(false);
        setLoading(false);
        setModalStatus(true);
        console.log(summQuery, 'fetched');
      }
    };

    if (summQuery !== '') {
      fetchData();
    }
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
      {modalStatus && !loading && summData.hits && (
        <ModalWrapper ref={ref}>
          <SummResults
            data={summData}
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

export default SummonersRift;
