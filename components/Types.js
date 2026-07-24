import { getTypeImage } from "../utils/pokemon.js";
export default function Types({ name }) {
  return `<div class="${name} pokemon__type">
<img class="pokemon__types-img"
alt="${name}"
src="${getTypeImage(name)}"/>
</div>
`;
}
