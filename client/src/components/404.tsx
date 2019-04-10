import React from 'react';
import styled from 'styled-components';

const Error = () => {
  return (
    <ErrorWrapper>
      <h1>data not found...</h1>
    </ErrorWrapper>
  );
};

export default Error;

const ErrorWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  h1 {
    color: white;
  }
`;
