import PokemonApi from "../api/pokemonApi"

const getPokemon = () => {
    // CREA ARRAY de 650 ELEMENTOS
    const pokemonArr =  Array.from(Array(650))
    // ASIGNA VALOR a CADA indice
    return pokemonArr.map((_, index) => index+1)
    
}

const getPokemonOptions = async() =>{
    // ALTERA ORDEN de los valores de forma aletaroria
    const mixedPokemons = getPokemon().sort(() => Math.random() - 0.5)
    //Captura nombre de los 4 primeros pokemones
    const pokemons = await getPokemonNames(mixedPokemons.splice(0,4))
    //console.table(pokemons)
    return pokemons
}

const getPokemonNames = async ([a,b,c,d] = []) => {
/*  const resp = await PokemonApi.get(`/3`)
 console.log(resp.data.name, resp.data.id) */

 const promiseArr = [
     PokemonApi.get(`/${a}`),
     PokemonApi.get(`/${b}`),
     PokemonApi.get(`/${c}`),
     PokemonApi.get(`/${d}`),
 ]
 // Captura los 4 pokemones
 const [p1,p2,p3,p4] = await Promise.all(promiseArr)
 // Devuelve lo resuelto por la API
 return [
     { name: p1.data.name, id: p1.data.id },
     { name: p2.data.name, id: p2.data.id },
     { name: p3.data.name, id: p3.data.id },
     { name: p4.data.name, id: p4.data.id },
 ]


}


export default getPokemonOptions