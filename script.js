const divArray = document.querySelectorAll('.flip-card');

let hasFlippedCard = false;
let song = new Audio('./assets/audio/116-victory (vs trainer).mp3')
let lockBoard = false;
let firstCard, secondCard;
let scoreCounter = 0;
let scoreTarget = document.querySelector('#counter');
scoreTarget.innerHTML = scoreCounter;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    scoreCounter++;
    scoreTarget.innerHTML = scoreCounter;

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    if (scoreCounter === divArray.length/2) {
        song.play();
        alert('Congratulations! You have found them all!')
    }

    resetVariables();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetVariables();
    }, 1500);
}

function resetVariables() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


    (shuffleDivs = () => {
    let i=0;
    let random;
    divArray.forEach( div => {
        random=Math.floor(Math.random()*divArray.length)
        if (divArray[random]!="selected"){
            div.style.order = random;
            divArray[random]="selected";
            i++;
        }
    });
})();

divArray.forEach(card => card.addEventListener('click', flipCard))
divArray.forEach(card => card.addEventListener('click', function () {

        let cryNumber = this.dataset.framework;
        let audioFile = cryNumber + ".mp3";
        if (this.classList.contains('flip'))  {
            let audioSound = new Audio('./assets/audio/' + audioFile);
            audioSound.play()
        }
    })
);