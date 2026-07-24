export default function PokemonDetails(id, weight, height, abilities) {
  return `

<table class="pokemon__details">
      <tr>
        <th>ID </th>
        <td>${id}</td>
      </tr>
      <tr>
        <th>Height </th>
        <td>${height}</td>
      </tr>
      <tr>
        <th>Weight </th>
        <td>${weight}</td>
      </tr>
      <tr>
        <th>Abilities</th>
        <td id="pokemon__abilities">
            ${abilities
              .map((ability) => `<p>${ability.ability.name}</p>`)
              .join("")}
          </td>
      </tr>
    </table>
`;
}
