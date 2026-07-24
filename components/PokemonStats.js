import { transformarStat } from "../utils/pokemon.js";
export default function PokemonStats(stats) {
  return `  
    <table class="pokemon__stats">
      ${stats
        .map(({ stat, base_stat }) => {
          return `<tr class="pokemon__stats-row">

            <th class="pokemon__stats-label">${transformarStat(stat.name)} </th>
            <td class="pokemon__stats-value">
                <div style="width: ${(base_stat / 255) * 100}%" class="pokemon__stats-bar">
                  <p class="pokemon__stats-number">${base_stat}</p>
                </div>
              </td>

          </tr>`;
        })
        .join("")}
    </table>
`;
}
