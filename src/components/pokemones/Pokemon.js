import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./pokemon.css"

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState([])
  const [previous, setPrevious] = useState()
  const [next, setNext] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState("")

  useEffect(() => {
    getPokemons()
  }, [searchFilter])
  
  const getPokemons = async (url) => {
    try {
      setIsLoading(true);
      const pokemons = []
      const  { data }  = await axios(url || "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30", {params: { name: searchFilter } })
      setPrevious(data.previous)
      setNext(data.next)
      for await (const pokemon of data.results) {
        const pokemonInfo = await axios(pokemon.url);
        pokemons.push({
          ...pokemonInfo.data,
        })
      }
      setPokemonData(pokemons)
      setIsLoading(false); 
    } catch (error) {
      if(error?.response?.pokemonInfo?.error === "There is nothing here"){
        setPokemonData([])
      } else {
        alert("Algo salio mal intente mas tarde")
      }
      setIsLoading(false)
    }
  } 

  const handleSearch = (e) => {
    setSearchFilter(e.target?.value)
  }

  return (
    <div className='Pokemon_container'>
      <div className="w-100 d-flex justify-content-center">
        <div className="w-25">
          <input 
          placeholder="Buscar..." 
          onChange={(e) => handleSearch(e)}
          className="w-100"/>
        </div>
      </div>
      {
        !isLoading ? (
          pokemonData.length !== 0 && 
          pokemonData.map((pokemon, i) => (
            <Card  className='pokemonCard' key={i}>
              <Card.Img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <Card.Body>
                <Card.Title>{pokemon.name}</Card.Title>
              </Card.Body>
            </Card>
          ))        
        ) : (
          <>Loading...</>
        )
      }   
      <div className="w-100 d-flex justify-content-around mb-3 buttonArea">
        <div className="w-25 d-flex justify-content-evenly align-items-center">
          <Button 
            onClick={() => getPokemons(previous)} 
            variant="secondary" 
          >
            {"<"}
          </Button>
          <b>Pagina: A</b>
          <Button 
            onClick={() => getPokemons(next)} 
            variant="secondary"
          >
            {">"}
            </Button>
        </div>
      </div>
      
    </div>
  )
}

export default Pokemon
