import Types from "./Types.js";
export default function PokemonCard({ name, types, id }) {
  const idFormateado = id < 1000 ? String(id).padStart(4, "0") : String(id);
  return `<a href="../pages/pokemonDetail.html?name=${name.toLowerCase()}" class="pokemon__card">

<div class="pokemon__image-container">
    <img class="pokemon__img" src="https://pokedex.hybridshivam.com/assets/thumbnails-compressed/${idFormateado}.png" />
</div>
  <h3 class="pokemon__name">${name[0].toUpperCase() + name.slice(1)}</h3>

<div class="pokemon__types">
  ${types
    .map(({ type }) => {
      return Types(type);
    })
    .join("")}
</div>

</a>`;
}
