function Buscar() {
    var input, filter, pokemons, pokemon, numeroPoke, nombrePoke, i, txtValue;
    input = document.getElementById("buscar");
    filter = input.value.toUpperCase();
    pokemons = document.getElementsByClassName("pokemon");
  
    for (i = 0; i < pokemons.length; i++) {
      var pokemon = pokemons[i];
      var numeroPoke = pokemon.querySelector(".numeroPoke");
      var nombrePoke = pokemon.querySelector(".nombrePokemon");
      if (numeroPoke.textContent.toUpperCase().indexOf(filter) > -1 || nombrePoke.textContent.toUpperCase().indexOf(filter) > -1) {
        pokemon.style.display = "";
      } else {
        pokemon.style.display = "none";
      }
    }
  }
  