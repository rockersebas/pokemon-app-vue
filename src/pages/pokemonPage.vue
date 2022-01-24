<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <h1>Quién es este Pokémon?</h1>
    <!-- IMG-->
    <pokemon-picture :pokemonId="pokemon.id" :showPokemon="showPokemon" />

    <!-- OPTIONS-->
    <pokemon-options
      :pokemons="pokemonsArr"
      @selection="checkAnswer"
      :election="election"
    />
    <template v-if="showMessage">
      <h2>{{ message }}</h2>
      <button @click="newGame">Nuevo Juego</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from "../components/PokemonPicture.vue";
import PokemonOptions from "../components/PokemonOptions.vue";
import getPokemonOptions from "../helpers/getPokemonOptions";

export default {
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  data() {
    return {
      pokemonsArr: [],
      pokemon: null,
      showPokemon: false,
      message: "",
      showMessage: false,
      election : false,
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonsArr = await getPokemonOptions()
      const rndInt = Math.floor(Math.random() * 4)
      this.pokemon = this.pokemonsArr[rndInt]
    },
    checkAnswer(pokemonID) {
      this.showMessage = true;
      this.showPokemon = true;
      if (pokemonID === this.pokemon.id) {
        this.message = `Correcto, es ${this.pokemon.name} !!!`
      } else {
        this.message = `Ups, era ${this.pokemon.name} :(`
      }
      this.election = true
    },
    newGame() {
      this.pokemon = null
      this.showPokemon = false
      this.message = ""
      this.election = false
      this.mixPokemonArray()
    },
  },
  mounted() {
    this.mixPokemonArray()
  },
};
</script>


