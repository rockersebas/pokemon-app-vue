import axios from 'axios'

const PokemonApi = axios.create({
    baseURL : 'https://pokeapi.co/api/v2/pokemon'
})


export default PokemonApi