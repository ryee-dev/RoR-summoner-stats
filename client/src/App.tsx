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
    transition: letter-spacing 0.4s ease-in-out, font-size 0.4s ease-in-out;
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
  //transition: background-color 0.4s ease-in-out, color 0.4s ease-in-out;
  h1 {
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    //background-color: #fafafa;
    //color: #171e2c;
    h1 {
      //letter-spacing: 10px;
      //font-size: 2.2rem;
      transform: scale(1.2) translateX(-60%);
    }
  }
`;

const TFTBlock = styled(Flex)`
  width: 150%;
  height: 100%;
  background-color: #fafafa;
  color: #171e2c;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  //transition: background-color 0.4s ease-in-out, color 0.4s ease-in-out;

  .tft-overlay {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 50vw;
    background-color: black;
    opacity: 0;
    transition: all 0.2s ease-in-out;
    align-items: center;
    justify-content: center;
    color: white;
  }

  &:hover {
    //background-color: #031017;
    //color: #fafafa;

    .tft-overlay {
      opacity: 0.8;
      //transform: scale(1.2);
    }

    h1 {
      //letter-spacing: 10px;
      //font-size: 2.2rem;
    }
  }
`;

const App = () => {
  return (
    <PageContainer alignItems="center" justifyContent="center">
      <SummRiftBlock to="/summoners-rift">
        <h1>SUMMONER'S RIFT</h1>
      </SummRiftBlock>
      <TFTBlock>
        <Flex className="tft-overlay">
          <h1>coming soon</h1>
        </Flex>
        <h1>TEAMFIGHT TACTICS</h1>
      </TFTBlock>
    </PageContainer>
  );
};

export default App;
