export function buscarPokemonPorNombre(nombre, pokemons) {
  const resultado = pokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().startsWith(nombre.toLowerCase());
  });
  return resultado;
}

// OBTENER TODOS LOS POKEMONS DESDE LA API
export async function obtenerTodosPokemons() {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025}`, {
      method: "GET",
    });
    const { results } = await res.json();
    console.log(results);
    const pokemonInfo = [];
    const tamanoLote = 300;
    for (let i = 0; i < results.length; i += tamanoLote) {
      const lote = results.slice(i, i + tamanoLote);
      const datosLote = await Promise.all(
        lote.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        }),
      );
      pokemonInfo.push(...datosLote);
      console.log(`Cargados ${pokemonInfo.length} pokemons`);
    }
    return pokemonInfo;
  } catch (error) {
    console.log("Error al obtener los pokemons");
  }
}

export async function obtenerPokemonPorNombre(name) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) {
      throw new Error("Pokemon no encontrado");
    }
    return await res.json();
  } catch (error) {
    console.log("No se pudo encontrar el pokemon");
    console.log(error);
    return;
  }
}
