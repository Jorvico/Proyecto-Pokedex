const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
const pokemon = document.getElementById('pokeName');
const btnSearch = document.getElementById('searchPokemon')
const appNode = document.getElementById('app')
const removeAllPokemon = document.getElementById('borrarPokemon')

btnSearch.addEventListener('click', insertarPokemon)
removeAllPokemon.addEventListener('click', borrarPokemon)

function insertarPokemon(){
    window.fetch(`${baseURL}${pokemon.value.toLowerCase()}`)
    .then(response =>{
        if(response.status === 404){
            alert('Este pokemon no esta disponible')
        }else{
            return response.json()
        }
    })
    .then(responseJson => {
        const allItems = []
        const result = []

        for(let pokemonInfo in responseJson){
            result.push([pokemonInfo, responseJson[pokemonInfo]])
        }

        console.table(result)
        const pokeImagen = document.createElement('img')
        pokeImagen.src = result[14][1].front_default

        const pokeName = document.createElement('h1')
        pokeName.classList.add('card-title')
        pokeName.innerText =  `Nombre: ${result[10][1]}`
        
        const pokeType = document.createElement('h3')
        pokeType.innerText =  `Tipo: ${result[16][1][0].type.name}`

        const resultContainer = document.createElement('section')
        resultContainer.id = "card";
        resultContainer.append(pokeName, pokeImagen, pokeType)
        resultContainer.classList.add('p-2')
        resultContainer.classList.add('border')
        resultContainer.classList.add('border-success')
        resultContainer.classList.add('border-4')
        resultContainer.classList.add('rounded-top')
        
        let pokeAbility
        for (let index = 0; index < result[0][1].length; index++) {
            pokeAbility = document.createElement('h3')
            pokeAbility.innerText =  `Habilidad: ${result[0][1][index].ability.name}`
            resultContainer.appendChild(pokeAbility);
        }
        allItems.push(resultContainer)
        appNode.append(...allItems)
    })
}

function borrarPokemon(){
    let allPokemons = appNode.childNodes
    allPokemons = Array.from(allPokemons)

    allPokemons.forEach(pokemon => {
        pokemon.remove(pokemon)
    })
}