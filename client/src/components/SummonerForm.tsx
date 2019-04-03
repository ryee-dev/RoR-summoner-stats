import React from 'react';
import styled from 'styled-components';
// import useFetch from 'fetch-suspense';

// @ts-ignore
// import useFetch from "fetch-suspense";
import findSummoner from '../Client';

interface Props {
  summName: string;
  setSummName: Function;
  setModalStatus: Function;
  // setStats: Function;
  // data: any;
}

const SummonerForm: React.FC<Props> = (props: Props) => {
  const { summName, setSummName, setModalStatus } = props;
  // const [stats, setStats] = useState({});
  // const matchHistoryEndPoint = '/api/summoner';
  // const data = useFetch(matchHistoryEndPoint, {
  //   method: 'GET',
  // });

  // const summNameFormData = new FormData();

  // const setPostData = () => {
  //   summNameFormData.set('summonerName', summName);
  // };

  // @ts-ignore
  const handleModalReFetch = () => {
    setModalStatus(true);
  };

  // @ts-ignore
  const handleFindSummoner = () => {
    // setSummName(e.target.value[0]);
    const summoner = summName;

    if (summName === '') {
      console.log('invalid summoner name');
    }

    // findSummoner(summoner, () => {
    //   setStats();
    // });

    findSummoner(summoner);

    handleModalReFetch();
  };

  return (
    <SummFormWrapper>
      <SummInput
        placeholder="Summoner Name"
        value={summName}
        name="summName"
        // @ts-ignore
        onChange={e => setSummName(e.target.value)}
      />

      <SubmitButt type="button" onClick={handleFindSummoner}>
        submit
      </SubmitButt>
    </SummFormWrapper>
  );
};

export default SummonerForm;

const SummFormWrapper = styled.div`
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
