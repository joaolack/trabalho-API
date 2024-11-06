const charsContainer = document.querySelector('.chars-container');
const LoadMoreButton = document.querySelector('#load-more');

const API = ' https://rickandmortyapi.com/api'
const defaultFilters = {
    name: '',
    species: '',
    type: '',
    status: '',
    origin: '',
    location: '',    
    page: 1
}

async function getCharacters({name, species, type, status, origin, location, page = 1 }) {
    const response = await fetch(`${API}/character?name=${name}&species=${species}
    &type=${type}&status=${status}&origin=${origin}&location=${location}&page=${page}`)

    const characters = await response.json()
    return characters.results
}


async function render({characters}) {
    characters.forEach((character) => {

        return charsContainer.innerHTML += `
        <div class="char">
            <img src="${character.image}" alt="">
            <div class="char-info">
              <h3>${character.name}</h3>
              <span>${character.species}</span>
              <span>${character.status}</span>
              <span>${character.type}</span>
              <span>${character.gender}</span>
            </div>
        </div>`
    })
}

 async function handleLoadMore(){
    defaultFilters.page += 1
    const characters = await getCharacters(defaultFilters)
    render({characters})

}

function addEventListener(){
    LoadMoreButton.addEventListener('click', handleLoadMore)
}

async function main(){
    const characters = await getCharacters(defaultFilters)
    addEventListener()
    render({characters})
}

main()



