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
    font-family: Leixo, sans-serif;
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

  h1 {
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    h1 {
      transform: scale(1.2) translateX(-60%);
    }
  }
`;

const App = () => {
  return (
    <PageContainer alignItems="center" justifyContent="center">
      <SummRiftBlock to="/summoners-rift">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <h1>SUMMONER'S RIFT</h1>
      </SummRiftBlock>
    </PageContainer>
  );
};

export default App;
