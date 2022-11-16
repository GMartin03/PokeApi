import React, {useEffect} from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'

const Pokemon = () => {

  useEffect(() => {
    getPokemons()
  }, [])
  
  const getPokemons = async () => {
    const  results  = await axios("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30", {params: {  } })
    console.log(results.data.results) // Esta es la "ruta" para llegar al pokemon pero no se como llegar solamente al nombre y como deberia almacenar sus nombres

  } 

  return (
    <div className='Pokemon_container'>
      <Card>
        <Card.Img/>
        <Card.Body>
          <Card.Title></Card.Title>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Pokemon
