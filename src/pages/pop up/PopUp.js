import React from 'react';
import styled from "styled-components";

const PopUpBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.36);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
const PopUpCard = styled.div`

  padding: 20px;
  background-color: white;
  border-radius: 30px;
  @media (width < 550px) {
    width: 80vw;
  }
`
const PopUpImage = styled.img`
  width: 11vw;
  height: 11vw;
  border-radius: 6vw;
  @media (width < 550px) {
    width: 30vw;
    height: 30vw;
    border-radius: 30vw;
  }
`
const PopUpTop = styled.div`

  display: flex;
  align-items: center;
  flex-wrap: wrap;
`
const PopUpBottom = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`
const PopUpTitle = styled.h1`
  width: 29vw;
  text-align: center;
  font-family: 'Darumadrop One', sans-serif;
  font-size: 3vw;
  color: #226c43;
  @media (width < 550px) {
    font-size: 8vw;
    line-height: 8vw;
    width: 40vw;
    border-radius: 30vw;
  }
`
const PopUpMainData = styled.h2`
  width: 29vw;
  text-align: center;
  font-family: 'Fira Sans', sans-serif;
  font-size: 20px;
  line-height: 20px;
  color: #419667;

`

const PopUpSubDataName = styled.h3`
  max-width: 40vw;
  font-family: 'Fira Sans', sans-serif;
  font-size: 1rem;
  color: #509b72;

`
const PopUpSubDataValue = styled.span`
  color: #226c43;
`
const PopUp = ({character, active, setActive}) => {
    function getArrayNumbers(arr) {
        const lastCharacters = arr.map((url) => url.split('/').pop());
        return lastCharacters.join(', ');
    }

    return (
        <PopUpBackground onClick={() => setActive(false)}>
            <PopUpCard onClick={e => e.stopPropagation()}>
                <PopUpTop>
                    <PopUpImage loading="lazy" src={character.image} alt={character.name}/>
                    <PopUpTitle>
                        {character.name}
                    </PopUpTitle>
                </PopUpTop>
                <PopUpBottom>
                    <PopUpMainData>
                        {character.gender.toLowerCase()}{", "}
                        {character.status.toLowerCase()}
                    </PopUpMainData>
                    <PopUpSubDataName>Origin:{" "}<PopUpSubDataValue>{character.origin.name}</PopUpSubDataValue></PopUpSubDataName>
                    <PopUpSubDataName>Episodes:{" "}<PopUpSubDataValue>{getArrayNumbers(character.episode)}</PopUpSubDataValue></PopUpSubDataName>
                    <PopUpSubDataName>Species:{" "}<PopUpSubDataValue>{character.species}</PopUpSubDataValue></PopUpSubDataName>
                    <PopUpSubDataName>Type:{" "}<PopUpSubDataValue>{character.type ? character.type : "unknown"}</PopUpSubDataValue></PopUpSubDataName>
                    <PopUpSubDataName>Location:{" "}<PopUpSubDataValue>{character.location.name}</PopUpSubDataValue></PopUpSubDataName>
                </PopUpBottom>
            </PopUpCard>
        </PopUpBackground>
    );
};

export default PopUp;