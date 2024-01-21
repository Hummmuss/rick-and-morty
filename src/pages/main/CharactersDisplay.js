import {useEffect, useState} from "react";
import Card from "./CharacterCard";
import {getCharacters} from 'rickmortyapi'
import styled from "styled-components";
import PopUp from "../pop up/PopUp";

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

    const [filteredCharacters, setFilteredCharacters] = useState([]);

    const [showPopUp, setShowPopUp] = useState(false);
    const [character, setCharacter] = useState({});


    useEffect(() => {
        const getAndSetCharacters = async () => {
            let characters = [];
            for (let page = 1; page <= 42; page++) {
                const allCharacters = await getCharacters({page: page});
                if (allCharacters) {
                    characters = characters.concat(allCharacters.data.results);
                }
            }
            if (characters.length > 0) {
                setCharactersList(characters);
            }
        };
        getAndSetCharacters();
    }, []);

    useEffect(() => {
        if (charactersList.length > 0) {
            const filtered = charactersList.filter(character => (character.name.toLowerCase().includes(nameFilter.toLowerCase()) || nameFilter === "") && (character.status.toLowerCase().includes(statusFilter.toLowerCase()) || statusFilter === "") && (character.species.toLowerCase().includes(speciesFilter.toLowerCase()) || speciesFilter === "") && (("unknown".includes(typeFilter.toLowerCase()) && character.type === "") || (character.type.toLowerCase().includes(typeFilter.toLowerCase()) || typeFilter === "")) && (character.gender.toLowerCase() === genderFilter.toLowerCase() || genderFilter === ""));
            setFilteredCharacters(filtered);
        }
    }, [charactersList, nameFilter, statusFilter, speciesFilter, typeFilter, genderFilter]);

    function Up() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (<Wrapper>
            Search through characters:
            <Search>
                <SearchItem type="text" placeholder="Name" onChange={e => setNameFilter(e.target.value)}/>
                <SearchItem type="text" placeholder="Status" onChange={e => setStatusFilter(e.target.value)}/>
                <SearchItem type="text" placeholder="Species" onChange={e => setSpeciesFilter(e.target.value)}/>
                <SearchItem type="text" placeholder="Type" onChange={e => setTypeFilter(e.target.value)}/>
                <SearchItem type="text" placeholder="Gender" onChange={e => setGenderFilter(e.target.value)}/>
            </Search>
            <CardWrapper>
                {(filteredCharacters.length > 0 ? filteredCharacters : charactersList).map((character) => (
                    <Card character={character} setShowPopUp={setShowPopUp} setCharacter={setCharacter}/>))}
            </CardWrapper>
            {showPopUp && <PopUp character={character} active={showPopUp} setActive={setShowPopUp}/>}
            <UpButton onClick={() => Up()}>Up!</UpButton>
        </Wrapper>);
}

export default CharactersDisplay;