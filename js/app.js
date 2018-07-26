/*
 * Create a list that holds all of your cards
 */

const icons = ['far fa-gem', 'far fa-gem', 'far fa-paper-plane', 'far fa-paper-plane', 'fas fa-anchor', 'fas fa-anchor', 'fas fa-bolt', 'fas fa-bolt', 'fas fa-cube', 'fas fa-cube', 'fas fa-leaf', 'fas fa-leaf', 'fas fa-bicycle', 'fas fa-bicycle', 'fas fa-bomb', 'fas fa-bomb'];

const cardsContainer = document.querySelector(".deck");

//Arrays to store cards that have been opened and matched
let openCards = [];
let matchedCards =[];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(icons) {
    var currentIndex = icons.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = icons[currentIndex];
        icons[currentIndex] = icons[randomIndex];
        icons[randomIndex] = temporaryValue;
    }

    return icons;
}

/*
 *Function to initiliaze/start the game
 */
function init(){
    // Loop through icons array and Create the cards
    let shuffledCards = shuffle(icons);
    for(let i = 0; i < shuffledCards.length; i++){
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${shuffledCards[i]}"></i>`;
        cardsContainer.appendChild(card);
        //call click function
        click(card);
    }
}

/*
 * Click Event
 */
function click(card){
    //Event for when card is clicked
    card.addEventListener("click", function(){
        //We have an existing open card
        if(openCards.length === 1){
            const currentCard = this;
            const previousCard = openCards[0];
            card.classList.add("open", "show", "disabled");
            openCards.push(this);
            //invoke function to match and compare clicked cards
            compare(currentCard, previousCard);
        } else {
        //no open cards
            card.classList.add("open", "show", "disabled");
            openCards.push(this);
        }
    });
}

/*
 * Compares the cards that have been clicked
 */
function compare(currentCard, previousCard){
    // Compare two opened cards
    if(currentCard.innerHTML === previousCard.innerHTML){
        // Matched cards
        currentCard.classList.add("match");
        previousCard.classList.add("match");
        // Push to an array to act a completion counter
        matchedCards.push(currentCard, previousCard);
        openCards = [];
        //check if game is completed
        gameComplete();
    } else {
        //cards flipping too fast so adding a timeout, wait 500ms
        setTimeout(function(){
            currentCard.classList.remove("open", "show", "disabled");
            previousCard.classList.remove("open", "show", "disabled");
        }, 200);
        openCards = [];
    }
    // Add new move
    addMove();
}

/*
 * Check if the game is over
 */
function gameComplete(){
    if(matchedCards.length === icons.length){
        alert("GAME OVER!");
    }
}

/*
 * Moves counter
 */
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove(){
    moves++;
    movesContainer.innerHTML = moves;
    // Set rating
    rating();
}

/*
 * Star rating system next to moves counter
 */
const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li>`;
function rating(){
    if (moves > 12 && moves < 16){
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="far fa-star"></i></li>`;
    } else if (moves >= 16){
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="far fa-star"></i></li>
        <li><i class="far fa-star"></i></li>`;
    }
}

/*
 * Restart the game
 */
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function(){
    // Delete all cards
    cardsContainer.innerHTML = "";

    // Call init function to create new cards
    init();

    // Reset any related variables
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`;
});

// Start/Initialize the game for the first time
init();