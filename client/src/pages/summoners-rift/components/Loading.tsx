import React from 'react';
import styled from 'styled-components';

const Loading : React.FC = () => {
  return (
    <LoadingWrapper>
      <LoadingRing />
    </LoadingWrapper>
  );
};

export default Loading;

const LoadingWrapper = styled.div`
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

const LoadingRing = styled.div`
  display: inline-block;
  width: 500px;
  height: 500px;

  &:after {
    content: ' ';
    display: block;
    width: 500px;
    height: 500px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #fff;
    border-color: #fff transparent #ebfffb transparent;
    animation: loading-ring 1.2s linear infinite;
  }

  @keyframes loading-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
