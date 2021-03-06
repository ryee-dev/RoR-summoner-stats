import styled from "styled-components";

const CardWrapper = styled.div`
  height: auto;
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin: 1rem 0;
  color: #1c222b;

  p {
    font-size: 1rem;
    margin: 0;
  }

  img.spell {
    margin: 0.2rem 0;
  }

  img.rune {
    max-height: 50px;
    max-width: 50px;
  }
`;

const CardRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  //border: 1px dotted black;
`;

const CardCol = styled.div`
  height: 100%;
  margin: 0 0.4rem;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: flex-start;

  &.center {
    align-items: center;
  }

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

  div {
    &.row {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 0.1rem 0;
    }

    &.img-wrapper {
      margin: 0 0.1rem;
      height: 50px;
      width: 50px;
    }
  }

  img {
    height: 50px;
    width: 50px;
    //border: 2px solid white;
    //background-color: white;
  }
`;

const RuneWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.2rem;

  img {
    margin: 0 0.2rem;
  }
`;

export { CardCol, CardRow, CardWrapper, RuneWrapper, ItemContainer };
