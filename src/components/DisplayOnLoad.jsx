import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styles.css';

const DisplayOnLoad = () =>{
    const[pokemonList,setPokemonList] = useState([])
    const [pokemon, setPokemon] = useState()
    const [pokemonName, setPokemonName] =useState("pikachu")
    const [refresh, setRefresh] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(pokemonName)
        setRefresh(!refresh)
    }

    const handleClick = (e) => {
        console.log(e)
        setPokemonName(e)
        setRefresh(!refresh)
    }

    useEffect(()=> {
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=898`)
            .then(response=>{
                console.log(response.data.results)
                setPokemonList(response.data.results)
            })
            .catch(err=>console.log(err))
        axios.get("https://pokeapi.co/api/v2/pokemon/"+pokemonName)
        .then(responseSingle=>{
            console.log(responseSingle.data)
            setPokemon(responseSingle.data)
        })
        .catch(err=>console.log(err))
    },[refresh])

    // const fetchPokemon = async() => {
    //     const response = await axios.get(` https://pokeapi.co/api/v2/pokemon/pikachu`)
    //     console.log(response.data)
    //     setPokemon(response.data)
    // }

    return (
        <div>
            <img className="logo" src={require('./pokemon.png')}   alt="wtf"/>
            <div className="row">
                <div className="allPokemon">
                    <h1>Display All Pokemon</h1>
                    {pokemonList.length > 0 && pokemonList.map((pokemonList, index)=>{
                        return (<option key={index} value={pokemonList.name} onClick={e=>handleClick(e.target.value)}>{pokemonList.name.charAt(0).toUpperCase() + pokemonList.name.slice(1)}</option>)
                    })}
                </div>
                <div className="onePokemon">
                    <form action="">
                        <input type="text" name="pokemonName" value={pokemonName} 
                            onChange={e=>setPokemonName(e.target.value)}
                            placeholder= "Enter a Pokemon Name"/>
                        <button onClick={handleSubmit}> Search Pokemon</button>
                    </form>
                    {pokemon &&
                        <div>
                            <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                            <img src={pokemon.sprites.front_default} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default DisplayOnLoad