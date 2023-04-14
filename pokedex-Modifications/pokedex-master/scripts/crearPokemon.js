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

function obtenerColorTipo(tipo) {
  let color;

  switch (tipo) {
    case 'fire':
      color = '#F05030';
      break;
    case 'water':
      color = '	#3899F8';
      break;
    case 'grass':
      color = '#78C850';
      break;
    case 'electric':
      color = '#F8D030';
      break;
    case 'ice':
      color = '#58C8E0';
      break;
    case 'poison':
      color = '#B058A0';
      break;
    case 'ground':
      color = '#E9D6A4';
      break;
    case 'flying':
      color = '#98A8F0';
      break;
    case 'psychic':
      color = '#F870A0';
      break;
    case 'bug':
      color = '#A8B820';
      break;
    case 'rock':
      color = '	#B8A058';
      break;
    case 'ghost':
      color = '#6060B0';
      break;
    case 'dragon':
      color = '#7860E0';
      break;
    case 'dark':
      color = '#7A5848';
      break;
    case 'steel':
      color = '#A8A8C0';
      break;
    case 'fairy':
      color = '#E79FE7';
      break;
    default:
      color = 'gray';
  }

  return color;
}

function traducirTipo(tipo) {
  switch (tipo) {
    case 'fire':
      return 'Fuego';
    case 'water':
      return 'Agua';
    case 'grass':
      return 'Planta';
    case 'electric':
      return 'Eléctrico';
    case 'ice':
      return 'Hielo';
    case 'poison':
      return 'Veneno';
    case 'ground':
      return 'Tierra';
    case 'flying':
      return 'Volador';
    case 'psychic':
      return 'Psíquico';
    case 'bug':
      return 'Bicho';
    case 'rock':
      return 'Roca';
    case 'ghost':
      return 'Fantasma';
    case 'dragon':
      return 'Dragón';
    case 'dark':
      return 'Siniestro';
    case 'steel':
      return 'Acero';
    case 'fairy':
      return 'Hada';
    case 'normal':
      return 'Normal';
    default:
      return 'Desconocido';
  }
}

function crearPokemon(pokemon, elemento){
  const imagen = elemento.querySelector("img");
  imagen.src = pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default; // Solicita imagen frontal en 3D

  const numero = elemento.querySelector(".numeroPoke");
  numero.textContent = `#${pokemon.id.toString().padStart(3, 0)}`; // Solicita el numero con 3 posiciones, añadiendo 2 ceros al principio. 

  const name = elemento.querySelector(".nombrePokemon");
  name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase();// Solicita el nombre del pokemon con la primera letra en mayuscula y el resto en minusculas

  console.log(`Creado ${pokemon.name}`); //Envia mensaje a la consola(solo para probar el funcionamiento de la API)


  const tipoContainer = elemento.querySelector(".tipo");
  tipoContainer.innerHTML = "";
  
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`) //Insertar los tipos solicitando a la api la parte de tipos
  .then((res) => res.json())
  .then((data) => 
  {
    const tipos = data.types.map((tipo) => tipo.type.name);

  tipos.forEach((tipo) => {
  const span = document.createElement('span');
  span.textContent = traducirTipo(tipo);
  span.style.backgroundColor = obtenerColorTipo(tipo);
  tipoContainer.appendChild(span);

  });
  });
}

async function cargarPokemons() { 
  const pokemons = await solicitarPokemons(20); 
  const pokemonBlocks = document.querySelectorAll(".pokemon");
  pokemons.forEach((pokemon, index) => {
    crearPokemon(pokemon, pokemonBlocks[index]);
  });
}           //  crea y agrega los elementos HTML de cada pokemon. Finalmente, se llama a la función cargarPokemons() para iniciar la aplicación.

cargarPokemons();