    const pokemons = document.getElementById("pokemons");
    const datoPokemon = [];

function solicitarPokemon(id) { //Recorre el numero de pokemons pasado por parametro en solicitarPokemons
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json());
}
async function solicitarPokemons(numero){ //Recorre todos los pokemons
    for (let i = 1; i <= numero; i++) {
        const dato = await solicitarPokemon(i);
        datoPokemon.push(dato);
    }
    datoPokemon.sort((a,b) => a.id - b.id); // Organiza los pokemons para que no salgan desordenados.
    return datoPokemon;
}

function crearPokemon(pokemon, elemento){
  const imagen = elemento.querySelector("img");
  imagen.src = pokemon.sprites.other["home"].front_default; // Solicita imagen frontal en 3D

  const numero = elemento.querySelector(".numeroPoke");
  numero.textContent = `#${pokemon.id.toString().padStart(3, 0)}`; // Solicita el numero con 3 posiciones, añadiendo 2 ceros al principio. 

  const name = elemento.querySelector(".nombrePokemon");
  name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase();// Solicita el nombre del pokemon con la primera letra en mayuscula y el resto en minusculas

  console.log(`Creado ${pokemon.name}`); //Envia mensaje a la consola(solo para probar el funcionamiento de la API)
}

async function cargarPokemons() { 
  const pokemons = await solicitarPokemons(20); 
  const pokemonBlocks = document.querySelectorAll(".pokemon");
  pokemons.forEach((pokemon, index) => {
    crearPokemon(pokemon, pokemonBlocks[index]);
  });
}           //  crea y agrega los elementos HTML de cada pokemon. Finalmente, se llama a la función cargarPokemons() para iniciar la aplicación.

cargarPokemons();

