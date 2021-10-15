import React, { useEffect, useState, useRef } from 'react';
import ky from 'ky';
import useFetch from 'fetch-suspense';
import useOnClickOutside from 'use-onclickoutside';
import { SummForm, SummResults, Error, Loading } from './components';
import { AppShell, ModalWrapper, AppOverlay } from 'App.css';
import CloseIcon from '../../assets/close.svg';

const SummonersRift: React.FC = () => {
  const [modalStatus, setModalStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [summData, setSummData] = useState(null);
  const [summName, setSummName] = useState('');
  const [summQuery, setSummQuery] = useState('');

  const staticData = useFetch('/static', { method: 'GET' });

  const closeModal = () => {
    setModalStatus(false);
    setSummData(null);
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
    const handleToggle = () => {
      if (summData.length !== 0) {
        setError(false);
        setLoading(false);
        setModalStatus(true);
        console.log(summQuery, 'fetched');
      }
    };

    if (summQuery !== '' && summData) {
      console.log(summData);
      handleToggle();
    }
  }, [summData]);

  useEffect(() => {
    const fetchData = async () => {
      setModalStatus(false);
      setLoading(true);

      if (summQuery !== '') {
        setLoading(true);
        console.log('fetching');

        await ky
          .get('/api/summoner')
          .json()
          .then((res) => {
            setSummData(res);
          });
      }
    };

    if (summQuery !== '') {
      fetchData();
    }

    // console.log(`
    //   loading: ${loading}\n
    //   error: ${error}\n
    //   modal status: ${modalStatus}
    // `);
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
      {modalStatus && !loading && summData && (
        <ModalWrapper ref={ref}>
          <SummResults
            data={summData}
            summQuery={summQuery}
            staticData={staticData}
          />
        </ModalWrapper>
      )}
      {summQuery !== '' && <AppOverlay />}
      {modalStatus && !loading && (
        <img src={CloseIcon} alt="close-icon" onClick={closeModal} />
      )}
    </AppShell>
  );
};

export default SummonersRift;
