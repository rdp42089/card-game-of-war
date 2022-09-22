// Card Game Of War

class Game {
	// Constructs Game class with given ojects
	constructor(){
		this.newDeck = new Deck()
		this.player1 = new Player()
		this.player2 = new Player()
		this.gameOver = false
		// this.shuffleDeck()
		// this.dealCards()
	}
	// Randomly feeds positive and negative values to the sort method
	shuffleDeck(){
		this.newDeck.deck.sort(() => Math.random() - .5)
	}
	// This is sorts the deck in ascending order for the purposes of testing the game
	sortDeckAscending(){
		this.newDeck.deck.sort((a,b) => a.score - b.score)
	}
	// Deals cards one at a time off the top of the deck
	dealCards(){
		for (let i = this.newDeck.deck.length; i > 0; i--){
			const cardDealt = this.newDeck.deck.pop()
			if(i % 2 === 0){
				this.player1.cards.push(cardDealt)
			}
			else if(i % 2 === 1){
				this.player2.cards.push(cardDealt)
			}
		}
	}
	// This stacks the deck in favor of Player 1 for the purposes of testing the end game
	dealCardsUnfair(){
		for (let i = this.newDeck.deck.length; i > 0; i--){
			const cardDealt = this.newDeck.deck.pop()
			if(cardDealt.score > 7){
				this.player1.cards.push(cardDealt)
			}
			else if(cardDealt.score <= 7){
				this.player2.cards.push(cardDealt)
			}
		}
	}
	// This causes both players play the top card in their pile	
	playTurn (){
		const drawCard1 = this.player1.cards.pop()
		const drawCard2 = this.player2.cards.pop()
		console.log(drawCard1,drawCard2)
		
		this.awardCards(drawCard1,drawCard2)
		if (this.player1.cards.length === 0 && this.player2.cards.length === 0){
			console.log("It's a tie")
			this.gameOver = true
			this.restartGame()
		}
		else if (this.player1.cards.length === 0){
			console.log("Player 2 has won the game")
			this.gameOver = true
			this.restartGame()
		}
		else if(this.player2.cards.length === 0){
			console.log("Player 1 has won the game")
			this.gameOver = true
			this.restartGame()
		}
	}
	// This function compares the cards and awards them to the winner
	awardCards (card1,card2){
		if (card1.score > card2.score) {
			this.player1.cards.unshift(card2)
			this.player1.cards.unshift(card1)
			console.log(`Player 1's ${card1.rank} of ${card1.suit} beats Player 2's ${card2.rank} of ${card2.suit}`)
		}
		else if (card1.score < card2.score) {
			this.player2.cards.unshift(card2)
			this.player2.cards.unshift(card1)
			console.log(`Player 2's ${card2.rank} of ${card2.suit} beats Player 1's ${card1.rank} of ${card1.suit}`)
		}
		else if (card1.score === card2.score) {
			this.tieBreaker(card1,card2)
		}
	}
	// In the event of a tie this function breaks the tie
	tieBreaker (card1,card2) {
		console.log("I declare war!")
		let tieHolder1 = []
		let tieHolder2 = []
		if (this.player2.cards.length < 4 && this.player1.cards.length < 4){
			console.log("It's a tie")
			this.gameOver = true
			this.restartGame()
		}
		if (this.player2.cards.length < 4){
			console.log("Player 1 wins")
			this.gameOver = true
			this.restartGame()
		}
		else if (this.player1.cards.length < 4){
			console.log("Player 2 wins")
			this.gameOver = true
			this.restartGame()
		}
		else {
			for (let i = 0; i < 4; i++){
				tieHolder1.push(this.player1.cards.pop())
				tieHolder2.push(this.player2.cards.pop())
			}
			console.log(tieHolder1,tieHolder2)
			let lastCard1 = tieHolder1[tieHolder1.length-1]
			let lastCard2 = tieHolder2[tieHolder1.length-1]
			if (lastCard1.score > lastCard2.score) {
				console.log(`Player 1's ${lastCard1.rank} of ${lastCard1.suit} beats Player 2's ${lastCard2.rank} of ${lastCard2.suit}`)
				this.player1.cards.unshift(card1)
				this.player1.cards.unshift(card2)
				for (let i = 0; i < 4; i++){
					this.player1.cards.unshift(tieHolder1[i])
					this.player1.cards.unshift(tieHolder2[i])
				}
			}
			else if (lastCard1.score < lastCard2.score) {
				console.log(`Player 2's ${lastCard2.rank} of ${lastCard2.suit} beats Player 1's ${lastCard1.rank} of ${lastCard1.suit}`)
				this.player2.cards.unshift(card1)
				this.player2.cards.unshift(card2)
				for (let i = 0; i < 4; i++){
					this.player2.cards.unshift(tieHolder1[i])
					this.player2.cards.unshift(tieHolder2[i])
				}
			}
			else if (lastCard1.score === lastCard2.score) {
				if (this.player2.cards.length < 4 && this.player1.cards.length < 4){
					console.log("It's a tie")
					console.log(this.player1.cards,this.player2.cards)
					this.gameOver = true
					this.restartGame()
				}
				else if (this.player2.cards.length < 4){
					console.log("Player 1 wins")
					console.log(this.player1.cards,this.player2.cards)
					this.gameOver = true
					this.restartGame()
				}
				else if (this.player1.cards.length < 4){
					console.log("Player 2 wins")
					console.log(this.player1.cards,this.player2.cards)
					this.gameOver = true
					this.restartGame()
				}
				else {
					console.log(this.player1.cards,this.player2.cards)
					this.tieBreaker()
				}
			}
		}
	}
	restartGame (){
		console.log("Restarting Game ...")
		console.log("\n")
		this.player1.cards = []
		this.player2.cards = []
		this.newDeck.makeDeck()
		this.dealCards()
		this.gameOver = false
	}
}

class Player {
	constructor(){
		this.cards = []
	}
}

class Card {
	constructor (suit,rank,score){
		this.suit = suit
		this.rank = rank
		this.score = score
	}
}

class Deck {
	constructor (){
		this.deck = []
		this.makeDeck()
	}
	makeDeck() {
		const suits = ['hearts','spades','clubs','diamonds']
		const scores = [14,2,3,4,5,6,7,8,9,10,11,12,13]
		for (const suit of suits) {
			for (const score of scores) {
				if (score === 14){
					const card = new Card(suit,"Ace",score)
					this.deck.push(card)
				}
				else if (score === 11){
					const card = new Card(suit,"Jack",score)
					this.deck.push(card)
				}
				else if (score === 12){
					const card = new Card(suit,"Queen",score)
					this.deck.push(card)
				}
				else if (score === 13){
					const card = new Card(suit,"King",score)
					this.deck.push(card)
				}
				else {
					const card = new Card(suit,`${score}`,score)
					this.deck.push(card)
				}
			}
		}
	}
}

const newGame = new Game

// Deck Sorting
// newGame.sortDeckAscending()
newGame.shuffleDeck()

// Deck Dealing
newGame.dealCards()
// newGame.dealCardsUnfair()

// Deck Viewing

for (let i = 0; i < 1000; i++) {
	newGame.playTurn()
}
console.log(newGame.player1.cards, newGame.player2.cards)
