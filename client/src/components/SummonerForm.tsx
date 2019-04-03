import React from 'react';
import styled from 'styled-components';
// import useFetch from 'fetch-suspense';
// import axios from 'axios';

interface Props {
  summName: string;
  setSummName: Function;
  setModalStatus: Function;
}
// @ts-ignore
// axios.defaults.baseURL = 'http://localhost:3001/api/summoner';

const SummonerForm: React.FC<Props> = (props: Props) => {
  const { summName, setSummName, setModalStatus } = props;
  const summNameFormData = new FormData();
  // const summonerDataEndpoint = '/api/summoner';

  // const data = useFetch('/api/summoner', {
  //   method: 'POST',
  // });

  // @ts-ignore
  const handleModalReFetch = e => {
    e.preventDefault();
    summNameFormData.set('summonerName', summName);

    // @ts-ignore
    // axios({
    //   method: 'post',
    //   data: summNameFormData,
    // })
    //   // @ts-ignore
    //   .then(res => {
    //     console.log('received', res);
    //   })
    //   // @ts-ignore
    //
    //   .catch(error => {
    //     console.log('error', error);
    //   });

    setModalStatus(true);
  };

  // const handlePostData = useAxios({
  //   url: 'http://localhost:3001/api/summoner',
  //   method: 'POST',
  //   trigger: summName,
  // });

  return (
    <SummForm
      method="POST"
      action="/api/summoner"
      autoComplete="off"
      onSubmit={handleModalReFetch}
    >
      <SummInput
        placeholder="Summoner Name"
        value={summName}
        name="summName"
        // @ts-ignore
        onChange={e => setSummName(e.target.value)}
      />

      <SubmitButt
        type="submit"
        // @ts-ignore
        // onClick={setPostData}
        // onClick={console.log('click')}
      >
        submit
      </SubmitButt>
    </SummForm>
  );
};

export default SummonerForm;

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
