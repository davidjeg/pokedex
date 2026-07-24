import { TYPE_IMAGES } from "../data/pokemon-types.js";

export function getTypeImage(type) {
  return TYPE_IMAGES[type];
}

export function transformarStat(nombre) {
  const nombres = {
    "special-attack": "Sp. Attack",
    "special-defense": "Sp. Defense",
    attack: "Attack",
    defense: "Defense",
    speed: "Speed",
    hp: "HP",
  };

  return nombres[nombre] ?? nombre;
}
