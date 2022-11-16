import React, {useEffect} from 'react'
import axios from 'axios'


const Pokemon = () => {

  useEffect(() => {
    getPokemons()
  }, [])
  

  const getPokemons = async () => {
    const { data } = await axios("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30", {params: {  } })
    console.log(data.results)
  } 


  return (
    <div className='Pokemon_container'>
      a
    </div>
  )
}

export default Pokemon