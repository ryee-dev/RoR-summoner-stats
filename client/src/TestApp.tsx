import React from 'react';
import styled from 'styled-components';
import { AppShell } from './App.css';

const TestApp = () => {
  return (
    <AppShell>
      <CardWrapper>
        <CardCol>
          <p>ARAM</p>
          <p>Victory</p>
          <p>21m 31s</p>
        </CardCol>

        <CardCol>
          <img
            src="http://ddragon.leagueoflegends.com/cdn/9.7.1/img/champion/Aatrox.png"
            alt="test"
          />
        </CardCol>
        <CardCol>
          <img
            src="http://ddragon.leagueoflegends.com/cdn/9.7.1/img/spell/SummonerFlash.png"
            alt="test"
          />
          <img
            src="http://ddragon.leagueoflegends.com/cdn/9.7.1/img/spell/SummonerDot.png"
            alt="test"
          />
        </CardCol>
        <CardCol>
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
        </CardCol>
        <CardCol>
          <p>1 / 2 / 3</p>
          <p>2.00:1 KDA</p>
        </CardCol>
        <CardCol>
          <p>Level 10</p>
          <p>100 (5.0) CS</p>
        </CardCol>
        <CardCol>
          <ItemContainer>
            <Row>
              <img
                src="http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/1001.png"
                alt="test"
              />
              <img
                src="http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/1001.png"
                alt="test"
              />
              <img
                src="http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/1001.png"
                alt="test"
              />
              <img
                src="http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/1001.png"
                alt="test"
              />
            </Row>
            <Row>
              <img
                src="http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/1001.png"
                alt="test"
              />
              <img
                src="http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/1001.png"
                alt="test"
              />
              <img
                src="http://ddragon.leagueoflegends.com/cdn/9.7.1/img/item/1001.png"
                alt="test"
              />
            </Row>
          </ItemContainer>
        </CardCol>
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
  justify-content: space-evenly;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0.1rem 0;
`;

const CardCol = styled.div`
  height: 100%;
  margin: 0 0.4rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-direction: column;

  .spell {
    max-width: 64px;
  }

  .items {
    img {
      margin: 1rem;
    }
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-direction: column;

  

  img {
    height: 50px;
    width: 50px;
    border: 2px solid white;
    background-color: white;
    margin: 0 0.1rem;
  }
`;
