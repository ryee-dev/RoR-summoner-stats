import styled from 'styled-components';
import { ReactComponent as CloseIcon } from './assets/close.svg';

export const AppShell = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 2rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #06080b;
  overflow: auto;

  font-family: 'Kyrial Display Pro', sans-serif;
`;

export const AppOverlay = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: black;
  opacity: 0.4;
  z-index: 1;
`;

export const ModalWrapper = styled.div`
  position: absolute;
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  border-radius: 6px;
  z-index: 2;
`;

export const Close = styled(CloseIcon)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 2rem 2rem 0 0;
  z-index: 2;

  &:hover {
    cursor: pointer;
  }
`;
