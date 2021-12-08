document.addEventListener('DOMContentLoaded', () => {
    
    // card options
    const cardArray = [
        {
            cardId: 1,
            image: './images/image1.jpg'
        },
        {
            cardId: 2,
            image: './images/image2.jpg'
        },
        {
            cardId: 3,
            image: './images/image3.jpg'
        },
        {
            cardId: 4,
            image: './images/image4.jpg'
        },
        {
            cardId: 5,
            image: './images/image5.jpg'
        },
        {
            cardId: 6,
            image: './images/image6.jpg'
        },
        {
            cardId: 7,
            image: './images/image7.jpg'
        },
        {
            cardId: 8,
            image: './images/image8.jpg'
        },
        {
            cardId: 1,
            image: './images/image1.jpg'
        },
        {
            cardId: 2,
            image: './images/image2.jpg'
        },
        {
            cardId: 3,
            image: './images/image3.jpg'
        },
        {
            cardId: 4,
            image: './images/image4.jpg'
        },
        {
            cardId: 5,
            image: './images/image5.jpg'
        },
        {
            cardId: 6,
            image: './images/image6.jpg'
        },
        {
            cardId: 7,
            image: './images/image7.jpg'
        },
        {
            cardId: 8,
            image: './images/image8.jpg'
        }
    ];

    // selecting audio elements
    const clickSound = document.querySelector('#click-sound');
    const matchSound = document.querySelector('#match-sound');
    const notMatchSound = document.querySelector('#not-match-sound');
    const winSound = document.querySelector('#win-sound');

    // select elements
    const board = document.querySelector('.board');
    const scoreboard = document.querySelector('.scoreboard');
    const restartBtn = document.querySelector('.restart-btn');

    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    // restart the game
    restartBtn.addEventListener('click', restartGame);
    
    // create board
    function createBoard() {
        cardArray.sort(() => 0.5 - Math.random());

        cardArray.forEach((card, index) => {
            let element = document.createElement('img');
            element.setAttribute('src', './images/close-image.jpg');
            element.setAttribute('data-id', index);
            element.addEventListener('click', flipCard);
            board.appendChild(element);
        });
    }

    // flip card
    function flipCard() {
        // play click sound
        clickSound.currentTime = 0;
        clickSound.play();

        // flip card
        const id = this.dataset.id;
        cardsChosen.push(cardArray[id].cardId);
        cardsChosenId.push(id);
        this.setAttribute('src', cardArray[id].image);
        if(cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    // check for match
    function checkForMatch() {
        const cards = board.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if(optionOneId == optionTwoId) {
            notMatchSound.currentTime = 0;
            notMatchSound.play();

            cards[optionOneId].setAttribute('src', './images/close-image.jpg');
            cards[optionTwoId].setAttribute('src', './images/close-image.jpg');
            // alert('You have clicked the same card.');
        }
        else if(cardsChosen[0] === cardsChosen[1]) {
            matchSound.currentTime = 0;
            matchSound.play();

            // alert('Yeah! You found a match.');
            cards[optionOneId].setAttribute('src', './images/image-blank.jpg');
            cards[optionTwoId].setAttribute('src', './images/image-blank.jpg');

            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);

            cards[optionOneId].style.cursor = 'default';
            cards[optionTwoId].style.cursor = 'default';

            cardsWon.push(cardsChosen);
        }
        else {
            notMatchSound.currentTime = 0;
            notMatchSound.play();

            cards[optionOneId].setAttribute('src', './images/close-image.jpg');
            cards[optionTwoId].setAttribute('src', './images/close-image.jpg');
            // alert('OHOO, try again');
        }
        cardsChosen = [];
        cardsChosenId = [];

        const score = document.querySelector('#score');
        score.textContent = cardsWon.length;

        if(cardsWon.length === cardArray.length / 2) {
            matchSound.pause();
            winSound.currentTime = 0;
            winSound.play();

            scoreboard.textContent = 'Congratulations! You found them all!';
        }
    }
    
    // restart game
    function restartGame() {
        clickSound.currentTime = 0;
        clickSound.play();

        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];
        scoreboard.innerHTML = `Score : <span id="score">0</span>`;
        board.innerHTML = '';
        createBoard();
    }

    createBoard();
});