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
  background-color: white;
  border-radius: 30px;
  @media (width < 550px) {
    width: 80vw;
  }
`
const PopUpImage = styled.img`
  width: 50%;
  height: 50%;
  border-radius: 50%;
  @media (width < 550px) {
    width: 30vw;
    height: 30vw;
    border-radius: 30vw;
  }
`
const PopUpTop = styled.div`
  padding: 20px;
  border-radius: 30px 30px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eef1ec;
`
const PopUpBottom = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`
const PopUpTitle = styled.h1`
  max-width: 400px;
  text-align: center;
  font-family: 'Darumadrop One', sans-serif;
  font-size: 2.5rem;
  color: #226c43;
  @media (width < 550px) {

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
    function getArrayNumbers(array) {
        const lastCharacters = array.map((url) => url.split('/').pop());
        let arr = lastCharacters.join();
        let result = '';
        arr = arr.split(',').map(Number);
        let start = arr[0];
        let end;

        console.log(arr)
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] !== arr[i-1] + 1) {
                end = arr[i-1];
                if (start !== end) {
                    result += start + '-' + end + ', ';
                } else {
                    result += start + ', ';
                }
                start = arr[i];
            }
        }
        end = arr[arr.length - 1];
        if (start !== end) {
            result += start + '-' + end;
        } else {
            result += start;
        }
        return result;
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