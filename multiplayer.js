
function multiMemory() {
    const divArray = document.querySelectorAll('.flip-card');

    let hasFlippedCard = false;
    let song = new Audio('./assets/audio/116-victory (vs trainer).mp3')
    let lockBoard = false;
    let firstCard, secondCard;
    let scorePlayer1 = 0;
    let scorePlayer2 = 0;
    document.querySelector('#scoreboard').innerHTML = `<p>Player 1 - Pairs found: <span id="counter1"></span>   Player 2 - Pairs found: <span id="counter2"></span></p>`
    let scoreTarget1 = document.querySelector('#counter1'); let scoreTarget2 = document.querySelector('#counter2');
    scoreTarget1.innerHTML = scorePlayer1; scoreTarget2.innerHTML = scorePlayer2;
    let multiplayer = true

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
        resetVariables();

        if (multiplayer) {
            scorePlayer1++;
            scoreTarget1.innerHTML = scorePlayer1;
        } else if (!multiplayer) {
            scorePlayer2++;
            scoreTarget2.innerHTML = scorePlayer2;
        }

        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        if (scoreCounter === divArray.length/2) {
            song.play();
            alert('Congratulations! You have found them all!')
        }

    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetVariables()
        }, 1500);
        multiplayer ? multiplayer = false : multiplayer = true;
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
}

function singleMemory() {

    {
        const divArray = document.querySelectorAll('.flip-card');

        let hasFlippedCard = false;
        let song = new Audio('./assets/audio/116-victory (vs trainer).mp3')
        let lockBoard = false;
        let firstCard, secondCard;
        let scoreCounter = 0;
        let scoreTarget = document.querySelector('#counter1');
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

            if (scoreCounter === divArray.length / 2) {
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

                resetVariables()
            }, 1500);
        }

        function resetVariables() {
            [hasFlippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];
        }


        (shuffleDivs = () => {
            let i = 0;
            let random;
            divArray.forEach(div => {
                random = Math.floor(Math.random() * divArray.length)
                if (divArray[random] != "selected") {
                    div.style.order = random;
                    divArray[random] = "selected";
                    i++;
                }
            });
        })();

        divArray.forEach(card => card.addEventListener('click', flipCard))
        divArray.forEach(card => card.addEventListener('click', function () {

                let cryNumber = this.dataset.framework;
                let audioFile = cryNumber + ".mp3";
                if (this.classList.contains('flip')) {
                    let audioSound = new Audio('./assets/audio/' + audioFile);
                    audioSound.play()
                }
            })
        );

    }
}

let x = prompt('Do you want to play with a friend? (y/n)').toLowerCase();
if (x === 'y') {
    multiMemory();

} else if (x === 'n') {
    singleMemory();
}

