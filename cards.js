let deck = [];

let suits = ['&spades;', '&hearts;'];
let currentPlayDeck;
suits.forEach(suit => {

        const cardsInSuit = 13;
        for (let j = 0; j < cardsInSuit; j++) {
            deck.push({'suit': suit, 'value': i})
        }

         currentPlayDeck = deck.sort((a, b) => {
            return Math.floor(Math.random() * 10) > 5 ? 1 : -1;
        })

        let players = [{'name': 'Arnaud'}, {'name': 'Koen'}, {'name': "Thomas"}, {'name': 'Vinnie'}];

        players.forEach(player => {
            player.cards.push(currentPlayDeck.pop())
            player.cards.push(currentPlayDeck.pop())

        })
    }

)