import React, { useEffect } from 'react';
import { ReactComponent as RorLogo } from '../../../../assets/ror-logo.svg';

import {
  FormContainer,
  SummonerForm,
  SummInput,
  SubmitButt,
} from './SummForm.css';

interface Props {
  setSummName: any;
  summQuery: string;
  setSummQuery: any;
  summName: string;
}

const SummForm: React.FC<Props> = (props: Props) => {
  const { setSummName, setSummQuery, summName, summQuery } = props;
  const summonerFormData = new FormData();

  const findSummoner = () => {
    setSummQuery(summName);
  };

  // const handleFetchData = async () => {
  //   const summonerFormData = new FormData();
  //   summonerFormData.append('summName', summQuery);
  //   await ky.post('/api/summoner', {
  //     body: summonerFormData,
  //   });
  // };
  //
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setSummQuery(summName);
  //   handleFetchData();
  // };

  useEffect(() => {
    summQuery !== '' && summonerFormData.set('summonerName', summQuery);
  }, [summQuery]);

  return (
    <FormContainer>
      <RorLogo />
      <SummonerForm
        method="POST"
        action="/api/summoner"
        onSubmit={findSummoner}
      >
        <SummInput
          placeholder="Summoner Name"
          value={summName}
          name="summName"
          onChange={(e) => setSummName(e.target.value)}
        />
        <SubmitButt type="submit" disabled={summName === ''}>
          submit
        </SubmitButt>
      </SummonerForm>
    </FormContainer>
  );
};

export default SummForm;
