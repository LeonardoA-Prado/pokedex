import { obtenerColorTipo, traducirTipo, crearPokemon } from 'scripts/crearPokemon.js';

async function cargarDetallesPokemon() {
    const pokemonData = JSON.parse(localStorage.getItem("pokemonSeleccionado"));
    
    const alturaPokemon = pokemonData.height;
    const alturaMetros = alturaPokemon / 10;
    const alturaSpan = document.querySelector(".altura");
    alturaSpan.textContent = `Altura: ${alturaMetros} m`;
  
    const pesoPokemon = pokemonData.weight;
    const pesoKilos = pesoPokemon / 10;


    const pesoSpan = document.querySelector(".peso");
    pesoSpan.textContent = ` Peso: ${pesoKilos} kg`;


    const imagen = document.getElementById("imagenPokemon");
    imagen.src = pokemonData.sprites.versions["generation-v"]["black-white"].animated.front_default;
  
    const numero = document.getElementById("numeroPoke");
    numero.textContent = `#${pokemonData.id.toString().padStart(3, 0)}`;

    const nombre = document.getElementById("nombrePokemon");
    nombre.textContent = pokemonData.name;

    const tipoContainer = document.querySelector(".tipo");
    tipoContainer.innerHTML = "";

    const tipos = pokemonData.types.map((tipo) => tipo.type.name);

    tipos.forEach((tipo) => {
    const span = document.createElement('span');
    span.textContent = traducirTipo(tipo);
    span.style.backgroundColor = obtenerColorTipo(tipo);
    tipoContainer.appendChild(span);
  });
    
    
  const stats = pokemonData.stats;
  const pokemonDiv = document.querySelector(".estadisticas-container");
  const statsDiv = document.createElement("div");
  statsDiv.classList.add("estadisticas");


stats.forEach(stat => {
  const statDiv = document.createElement("div");
  const statValue = document.createElement("span");
  const statName = document.createElement("span");
  const statBar = document.createElement("div");
  
  
  statValue.textContent = stat.base_stat;
  statName.textContent = stat.stat.name;
 
  const statWidth = `${stat.base_stat / 3}%`; 
  statBar.style.width = statWidth;

 
  switch (stat.stat.name) {
    case "hp":
      statBar.classList.add("barra-vida");
      break;
    case "attack":
      statBar.classList.add("barra-ataque");
      break;
    case "defense":
      statBar.classList.add("barra-defensa");
      break;
    case "special-attack":
      statBar.classList.add("barra-ataque-especial");
      break;
    case "special-defense":
      statBar.classList.add("barra-defensa-especial");
      break;
    case "speed":
      statBar.classList.add("barra-velocidad");
      break;
    default:
      break;
  }

  // Agregar los elementos a la estadística
  statDiv.appendChild(statName);
  statDiv.appendChild(statValue);
  statDiv.appendChild(statBar);
  statsDiv.appendChild(statDiv);
});


pokemonDiv.appendChild(statsDiv);

}
  
  cargarDetallesPokemon();