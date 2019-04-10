import React from 'react';
import styled from 'styled-components';
import { AppShell } from './App.css';

const TestApp = () => {
  return (
    <AppShell>
      <CardWrapper>
        <div className="col-1">
          <p>ARAM</p>
          <p>Victory</p>
          <p>21m 31s</p>
        </div>

        <div className="col-2">
          <div className="subcol">
            <img
              src="http://ddragon.leagueoflegends.com/cdn/9.7.1/img/champion/Aatrox.png"
              alt="test"
            />
          </div>
          <div className="subcol">
            <img
              src="http://ddragon.leagueoflegends.com/cdn/9.7.1/img/spell/SummonerFlash.png"
              alt="test"
            />
            <img
              src="http://ddragon.leagueoflegends.com/cdn/9.7.1/img/spell/SummonerDot.png"
              alt="test"
            />
          </div>
          <div className="subcol">
            <div className="rune-container">
              <img
                src="http://opgg-static.akamaized.net/images/lol/perk/8128.png?image=w_40&v=1"
                alt="test"
              />
            </div>
            <div className="rune-container">
              <img
                src="https://opgg-static.akamaized.net/images/lol/perkStyle/8000.png?image=w_40&v=2"
                alt="test"
              />
            </div>
          </div>
        </div>
        <div className="col-3">
          <p>1 / 2 / 3</p>
          <p>2.00:1 KDA</p>
        </div>
      </CardWrapper>
    </AppShell>
  );
};

export default TestApp;

const CardWrapper = styled.div`
  background-color: beige;
  padding: 1rem 2rem;
  min-width: 1000px;
  min-height: 200px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  div.col-1 {
    padding: 0 0.4rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
  }

  div.col-2 {
    padding: 0 0.4rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .subcol {
      padding: 0 0.4rem;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      flex-direction: column;

      .rune-container {
        background-color: black;
        height: 40px;
        width: 40px;
        padding: 0.25rem;
        margin: 0.2rem 0;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      img {
        margin: 0.4rem 0;
      }
    }
  }

  div.col-3 {
    margin: 0 1rem;
    padding: 0 0.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
`;
