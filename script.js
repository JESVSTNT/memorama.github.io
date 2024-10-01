const gameBoard = document.getElementById('gameBoard');
const mensaje = document.getElementById("mensaje");
let flippedCards = [];
let matchedPairs = 0;
const totalPairs = 6;

async function fetchPokemon() {
    const pokemonArray = [];
    const pokemonIds = Array.from({ length: 6}, () => Math.floor(Math.random()*1000) + 1); // 8 IDs aleatorios de Pokémon
    for (let id of pokemonIds) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();


        var objPokemon = {
            "img": data.sprites.other.home.front_default,
            "name":data.species.name
        };



        pokemonArray.push(objPokemon);

    }


    return pokemonArray;
}


async function createGameBoard() {
    gameBoard.innerHTML = ''; 

    const pokemonImages = await fetchPokemon(); 
    const allCards = [...pokemonImages, ...pokemonImages]; 

    console.log(pokemonImages);
    console.log(allCards);

    allCards.sort(() => 0.5 - Math.random());

    console.log(allCards);

    allCards.forEach(imageSrc => {
        console.log(imageSrc);
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${imageSrc.img}" alt="Pokemon">
            <div class="card-cover"></div>
            <h2 class="labelName">${imageSrc.name}</h2>
        `;
        gameBoard.appendChild(card);

        card.addEventListener('click', () => flipCard(card));
    });
}

function flipCard(card) {

    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);


        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector('img').src;
    const img2 = card2.querySelector('img').src;

    if (img1 === img2) {

        flippedCards = [];
        matchedPairs++;
        if (matchedPairs === totalPairs) {
            mensaje.textContent="GANASTE!!! 🤑🤓👍";
            mensaje.style.color="greenyellow";
        }
    } else {

        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1500);
    }
}

const resetGameBtn = document.getElementById('resetGame');
resetGameBtn.addEventListener('click', () => {
    matchedPairs = 0;
    flippedCards = [];
    gameBoard.innerHTML = '';
    createGameBoard();
    mensaje.textContent=[];
    
});

createGameBoard();