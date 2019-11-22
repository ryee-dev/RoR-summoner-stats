import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Flex } from 'rebass';

const PageContainer = styled(Flex)`
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  overflow: auto;

  h1 {
    font-family: Leixo;
    font-size: 1.8rem;
    transition: letter-spacing 0.2s ease-in-out, font-size 0.2s ease-in-out;
  }

  a {
    text-decoration: none;
  }
`;

const SummRiftBlock = styled(Link)`
  bottom: 0;
  width: 150%;
  height: 100%;
  background-color: #171e2c;
  color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &:hover {
    h1 {
      letter-spacing: 10px;
      font-size: 2.2rem;
    }
  }
`;

const TFTBlock = styled(Link)`
  width: 150%;
  height: 100%;
  background-color: #fafafa;
  color: #171e2c;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    h1 {
      letter-spacing: 10px;
      font-size: 2.2rem;
    }
  }
`;

const App = () => {
  return (
    <PageContainer alignItems="center" justifyContent="center">
      <SummRiftBlock to="/summoners-rift">
        <h1>SUMMONER'S RIFT</h1>
      </SummRiftBlock>
      <TFTBlock to="/teamfight-tactics">
        <h1>TEAMFIGHT TACTICS</h1>
      </TFTBlock>
    </PageContainer>
  );
};

export default App;
