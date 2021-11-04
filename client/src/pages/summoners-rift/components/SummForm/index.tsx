import React, { useEffect } from 'react';
import RorLogo from '../../../../assets/ror-logo.svg';

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

  useEffect(() => {
    summQuery !== '' && summonerFormData.set('summonerName', summQuery);
  }, [summQuery]);

  return (
    <FormContainer>
      <img src={RorLogo} alt="ror-logo" />
      <SummonerForm
        method="POST"
        action="/api/summoner"
        onSubmit={findSummoner}
      >
        <SummInput
          placeholder="Summoner Name"
          value={summName}
          name="summName"
          aria-autocomplete="list"
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
