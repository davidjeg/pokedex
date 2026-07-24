import { obtenerPokemonPorNombre } from "../pokemonApi.js";
import PokemonDetails from "../components/PokemonDetails.js";
import PokemonStats from "../components/PokemonStats.js";

const pokemonDetails = document.querySelector(".pokemon-details");
const evolutionChainSprites = document.querySelector(".evolution-sprites");
const backButton = document.querySelector("#back");
backButton.addEventListener("click", (e) => {
  e.preventDefault();
  history.back();
});

async function iniciarDetalle() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  const {
    name: nombrePokemon,
    weight,
    height,
    id,
    abilities,
    stats,
    species: { url },
  } = await obtenerPokemonPorNombre(name);
  const pokemon = await obtenerPokemonPorNombre(name);
  const evolutionChain = await obtainEvolutionChain(url);
  const detallesEvoluciones = await obtenerDatosEvoluciones(evolutionChain);
  renderizarDetalles(
    nombrePokemon,
    weight,
    height,
    id,
    abilities,
    stats,
    detallesEvoluciones,
  );
}

iniciarDetalle();

function renderizarDetalles(
  nombrePokemon,
  weight,
  height,
  id,
  abilities,
  stats,
  detallesEvoluciones,
) {
  console.log(detallesEvoluciones);
  pokemonDetails.innerHTML = `
        <h1 class="pokemon__name">${nombrePokemon.toUpperCase()}</h1>
        <div class="pokemon__info">
        ${PokemonDetails(id, weight, height, abilities)}


        <div class="pokemon__img-container">
        <img alt="pokemon__img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" />
        </div>
        ${PokemonStats(stats)}
        

        </div>
`;
  evolutionChainSprites.innerHTML = `
${detallesEvoluciones
  .map(
    (evolucion, index) => `
      <div class="evolution">

        <div class="evolution__sprite">
          <img src="${evolucion.image}" alt="${evolucion.name}">
        </div>
        <p class="evolution__name">${evolucion.name}</p>
      </div>

      ${
        index < detallesEvoluciones.length - 1
          ? `<div class="arrow">→</div>`
          : ""
      }
    `,
  )
  .join("")}
`;
}

async function obtainEvolutionChain(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("No se pudo obtener la cadena de evoluciones");
    return;
  }
  const { evolution_chain } = await res.json();
  const evolutionChain = await fetch(evolution_chain.url);
  const evolutionChainRes = await evolutionChain.json();
  return obtenerEvoluciones(evolutionChainRes.chain);
}

async function obtenerEvoluciones(chain) {
  const evoluciones = [];
  let actual = chain;
  while (actual) {
    evoluciones.push(actual.species.name);
    actual = actual.evolves_to[0];
  }
  return evoluciones;
}
async function obtenerDatosEvoluciones(evoluciones) {
  const pokemons = await Promise.all(
    evoluciones.map(async (nombre) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
      const pokemon = await res.json();
      return {
        name: pokemon.name,
        id: pokemon.id,
        image: pokemon.sprites.other["official-artwork"].front_default,
      };
    }),
  );
  return pokemons;
}
