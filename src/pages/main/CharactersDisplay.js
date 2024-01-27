import React, {useEffect, useState} from "react";
import Card from "./CharacterCard";
import {getCharacters} from 'rickmortyapi'
import styled from "styled-components";
import PopUp from "../pop up/PopUp";
import ArrowRight from "../../assets/arrow-right.png";
import ArrowLeft from "../../assets/arrow-left.png";


const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const ArrowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  justify-content: space-between;
`

const Arrow = styled.img`
  height: 40px;
  width: 50px;
`
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-family: 'Darumadrop One', sans-serif;
  font-size: 40px;
  color: #226c43;
  text-align: center;
`
const Search = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
const UpButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Darumadrop One', sans-serif;
  font-size: 20px;
  height: 70px;
  width: 70px;
  border-radius: 40px;
  background-color: rgba(0, 0, 0, 0.22);
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: azure;
  @media (width < 450px) {
    height: 50px;
    width: 50px;
  }

`
const SearchItem = styled.input`
  margin: 10px;
  height: 15px;
  border-radius: 10px;
  border-style: none;
  outline: none;
  background-color: #eef1ec;
  padding: 10px;
`

function CharactersDisplay() {
    const [charactersList, setCharactersList] = useState([])

    const [nameFilter, setNameFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [speciesFilter, setSpeciesFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("");


    const [showPopUp, setShowPopUp] = useState(false);
    const [character, setCharacter] = useState({});

    let pageNumber = parseInt(localStorage.getItem('page'))
    const handleLeftClick = () => {
        if (pageNumber > 1) {
            pageNumber -= 1;
            localStorage.setItem('page', pageNumber)
            getAndSetCharacters();
        }
    };

    const handleRightClick = () => {
        if (pageNumber <= 41) {
            pageNumber += 1;
            localStorage.setItem('page', pageNumber)
            getAndSetCharacters();
        }
        if (pageNumber === undefined) {
            pageNumber = 1;
            localStorage.setItem('page', pageNumber)
            getAndSetCharacters();
        }
    };



    const getAndSetCharacters = async () => {
        let TwentyCharactersPerPage = [];
        for (let i = 20 * pageNumber - 19; i <= 20 * pageNumber; i++) {
            TwentyCharactersPerPage.push(i);
        }

        const allCharacters = await getCharacters({
            page: pageNumber,
            name: nameFilter,
            status: statusFilter,
            type: typeFilter,
            species: speciesFilter,
            gender: genderFilter
        });
        console.log(nameFilter)
        if (allCharacters) {
            setCharactersList(allCharacters.data.results);
        }
    };

    useEffect(() => {
        getAndSetCharacters();
        localStorage.setItem('page', 1)
        console.log(charactersList)
    }, [nameFilter, statusFilter, typeFilter, speciesFilter, genderFilter])


    function Up() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }


    return (
        <Wrapper>
            Search through characters:
            <Search>
                <SearchItem type="text" placeholder="Name" onChange={e => setNameFilter(e.target.value)}/>
                <SearchItem type="text" placeholder="Status" onChange={e => setStatusFilter(e.target.value)}/>
                <SearchItem type="text" placeholder="Species" onChange={e => setSpeciesFilter(e.target.value)}/>
                <SearchItem type="text" placeholder="Type" onChange={e => setTypeFilter(e.target.value)}/>
                <SearchItem type="text" placeholder="Gender" onChange={e => setGenderFilter(e.target.value)}/>
            </Search>
            <CardWrapper>
                {charactersList ? charactersList.map((character) => (
                    <Card character={character} setShowPopUp={setShowPopUp} setCharacter={setCharacter}/>)) : "No characters"}
            </CardWrapper>
            {showPopUp && <PopUp character={character} active={showPopUp} setActive={setShowPopUp}/>}
            <UpButton onClick={() => Up()}>Up!</UpButton>
             <ArrowContainer>
                 {pageNumber > 1 ? <Arrow src={ArrowLeft} onClick={handleLeftClick}/> : <div></div>}
                 {charactersList.length >= 20 && <Arrow src={ArrowRight} onClick={handleRightClick}/>}
            </ArrowContainer>

        </Wrapper>
    );
}

export default CharactersDisplay;