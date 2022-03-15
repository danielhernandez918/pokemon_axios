import React, { useState } from 'react'
import axios from 'axios'


const FetchComponent = () => {
    const [pokemon, setPokemon] = useState([])


    const fetchPokemon = async() => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=898`)
        console.log(response.data.results)
        setPokemon(response.data.results)
    }
    return (
        <div>
            <button onClick={fetchPokemon}>Fetch all the Pokemon!</button>
            {pokemon.length > 0 && pokemon.map((pokemon, index)=>{
                return (<div key={index}>{pokemon.name}</div>)
            })}
        </div>
    )
}

export default FetchComponent;
