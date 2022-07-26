const pokemonname = document.querySelector('.pokemonname');
const pokemonNumber = document.querySelector('.pokemonnumber');
const pokemonImagem = document.querySelector('.pokemon_imagem');

const form = document.querySelector('.form')
const input = document.querySelector('.inputsearch')
const voltar = document.querySelector('.btn-voltar')
const proximo = document.querySelector('.btn-proximo')

let searchPokemon = 1;

const fetchpokemon = async (pokemon) => {
    const apiresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (apiresponse.status === 200) {
        const data = await apiresponse.json();
        return data;

    }
}
    

const renderPokemon = async (pokemon) => {

 pokemonname.innerHTML = 'Loading...'

    const data = await fetchpokemon(pokemon);
     if (data) {
        pokemonImagem.style.display = 'block';
        pokemonname.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonname.innerHTML = 'Not found'; 
        pokemonNumber.innerHTML = '';
        pokemonImagem.style.display = 'none';
    }
}
form.addEventListener('submit', (Event) => {
    Event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    });
    
    
    voltar.addEventListener('click', () => {
         if (searchPokemon > 1) {   
            searchPokemon -=1;
            renderPokemon(searchPokemon);
         }
        });
    
    
        proximo.addEventListener('click', () => {
            searchPokemon +=1;
            renderPokemon(searchPokemon);
        });
   
  renderPokemon(searchPokemon);