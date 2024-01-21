import React from 'react';
import styled from 'styled-components'

const CharacterCard = styled.div`
  min-width: 420px;
  height: 240px;
  border-radius: 20px;
  background-color: #eef1ec;
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  cursor: pointer;
  @media (width < 550px) {
    min-width: 90vw;
    height: 54vw;
  }
`
const Title = styled.h1`
  width: 170px;
  font-family: 'Darumadrop One', sans-serif;
  font-size: 22px;
  color: #226c43;
  text-align: left;
  @media (width < 550px) {
    width: 30vw;
    font-size: 16px;
  }

`
const PropertiesName = styled.h3`
  width: 170px;
  font-family: 'Fira Sans', sans-serif;
  font-size: 0.8rem;
  color: #509b72;
  text-align: left;
  @media (width < 550px) {
    width: 30vw;
  }
`
const PropertiesContent = styled.span`
  width: 170px;
  font-family: 'Fira Sans', sans-serif;
  font-size: 0.8rem;
  color: #226c43;
  @media (width < 550px) {
    min-width: 90vw;
    height: 47vw;

  }
`

const Image = styled.img`
  height: 240px;
  border-radius: 20px 0 0 20px;
  margin-right: 20px;
  @media (width < 550px) {
    height: 54vw;
  }
`

const Card = ({character, setShowPopUp, setCharacter}) => {
    function Click(data) {
        setShowPopUp(true);
        setCharacter(data)
    }
    return (
        <CharacterCard onClick={() => Click(character)}  character={character} >
            <Image loading="lazy" src={character.image} alt={character.name}/>
            <div>
                <Title>{character.name}</Title>

                <PropertiesName>
                    status:{' '}
                    <PropertiesContent>
                        {character.status}
                    </PropertiesContent>
                </PropertiesName>

                <PropertiesName>
                    species:{' '}
                    <PropertiesContent>
                        {character.species}
                    </PropertiesContent>
                </PropertiesName>

                <PropertiesName>
                    type:{' '}
                    <PropertiesContent>
                        {character.type ? character.type : "unknown"}
                    </PropertiesContent>
                </PropertiesName>

                <PropertiesName>
                    gender:{' '}
                    <PropertiesContent>
                        {character.gender}
                    </PropertiesContent>
                </PropertiesName>
            </div>
        </CharacterCard>
    )
}

export default Card;