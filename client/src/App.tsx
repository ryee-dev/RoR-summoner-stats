import React from 'react';
import styled from 'styled-components';
import { Flex } from 'rebass';

import SummonersRift from 'pages/summoners-rift/SummonersRift';

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

const App: React.FC = () => {
  return (
    <PageContainer alignItems='center' justifyContent='center'>
      <SummonersRift />
    </PageContainer>
  );
};

export default App;
