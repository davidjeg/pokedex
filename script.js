import PokemonCard from "./components/PokemonCard.js";
import PokemonCardSkeleton from "./components/PokemonCardSkeleton.js";
import { obtenerTodosPokemons, buscarPokemonPorNombre } from "./pokemonApi.js";
// === SELECCIÓN DE ELEMENTOS ===

const pokemonSearch = document.querySelector("#pokemon-search");
const pokemonsGrid = document.querySelector(".pokemons");

function renderizarPokemons(pokemons) {
  if (pokemons.length === 0) {
    pokemonsGrid.innerHTML = `<div class="pokemon__not-found">
        <h2>Pokémon no encontrado</h2>
        <p>Intenta buscar otro nombre</p>
      </div>

`;
    return;
  }
  pokemonsGrid.innerHTML = pokemons
    .map((pokemon) => PokemonCard(pokemon))
    .join("");
}

let pokemons = [];
let loading = true;
// BUSCAR POKEMON
pokemonSearch.addEventListener("input", (e) => {
  const value = e.target.value;
  const resultado = buscarPokemonPorNombre(value, pokemons);
  renderizarPokemons(resultado);
});
async function iniciar() {
  const cache = localStorage.getItem("pokemons");
  if (cache) {
    pokemons = JSON.parse(cache);
    renderizarPokemons(pokemons);
    loading = false;

    return;
  }
  renderizarSkeletons();
  pokemons = await obtenerTodosPokemons();
  const pokemonsCache = pokemons.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types,
  }));
  localStorage.setItem("pokemons", JSON.stringify(pokemonsCache));
  renderizarPokemons(pokemonsCache);
  loading = false;
}

document.addEventListener("DOMContentLoaded", async () => {
  await iniciar();
});

// SKELETON
function renderizarSkeletons(cantidad = 50) {
  const skeletons = Array.from({ length: cantidad })
    .map(() => {
      return PokemonCardSkeleton();
    })
    .join("");
  pokemonsGrid.innerHTML = skeletons;
}
