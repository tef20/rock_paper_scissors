// ---------------------------------------------------
// 					GLOBAL VARIABLES
// ---------------------------------------------------
const MOVES = [
	"rock",
	"paper", 
	"scissors"
];
const WINNNGSCORE = 3;
const ROUNDS = 7;

// ---------------------------------------------------
// 					Bindings 
// ---------------------------------------------------

// Bind existing
const player1MovePanel = document.querySelector('div[id="player1MovePanel"]');
const player2MovePanel = document.querySelector('div[id="player2MovePanel"]');
const roundsPlayed = document.querySelector('span[id="roundNumber"]');
const player1Name = document.querySelector('span[id="player1Name"]');
const player2Name = document.querySelector('span[id="player2Name"]');
const playerScore = document.querySelector('span[id="player1Score"]');
const computerScore = document.querySelector('span[id="player2Score"]');
const gameMessage = document.querySelector('span[id="gameMessage"]');
const finalMessage = document.querySelector('span[id="finalMessage"]');

// set existing
roundsPlayed.textContent = 0;
player1Name.textContent = 'Human';
player2Name.textContent = 'Computer';
playerScore.textContent = 0;
computerScore.textContent = 0;
player1MovePanel.textContent = 'HUMAN';
player2MovePanel.textContent = 'COMPUTER';

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
	button.addEventListener('click', playRound);
});

// ---------------------------------------------------
// 					Functions
// ---------------------------------------------------

function playRound (e) {
	let playerMove = e.target.id;
	let computerMove = computerPlay();

	setMoveImages(player1MovePanel, playerMove, '#p1MoveImg');
	setMoveImages(player2MovePanel, computerMove, '#p2MoveImg');

	console.log(`You chose: ${playerMove}, Computer chose: ${computerMove}`);

	roundResult = getResult(playerMove, computerMove);
	declareRound(roundResult, playerMove, computerMove);

	updateScores(roundResult);
	printScores();

	// if gameover
	if (checkIsWinner(roundResult)) {
		declareWinner();
		// end game	
		endGame();
	} else {
		console.log("Pick your next move...\n")
	}
}

function capFirstLetter (inString) {
	return inString[0].toUpperCase() + inString.slice(1);
}

function computerPlay() {
	let choice = Math.floor(Math.random() * MOVES.length);
	return MOVES[choice];
}

function setMoveImages (panel, move, imageID) {
	panel.textContent = "";

	moveImg = document.createElement("img");
	moveImg.setAttribute('id', imageID);
	
	if (move === 'rock') {
		moveImg.setAttribute('src', 'rock.jpeg');
	} else if (move === 'paper') {
		moveImg.setAttribute('src', 'paper.jpeg');
	} else {
		moveImg.setAttribute('src', 'scissors.jpeg');
	}

	panel.appendChild(moveImg);
}

function getResult(playerSelection, computerSelection) {
	if (playerSelection === computerSelection) {
		return "draw";
	} else if (playerWins(playerSelection, computerSelection)) {
		return "player";
	} else {
		return "computer";
	}
}

function declareRound(roundResult, playerMove, computerMove) {
	if (roundResult === 'draw') {
		gameMessage.textContent = `You both picked ${playerMove}! It's a draw!`;
		console.log(gameMessage.textContent);
	} else if (roundResult === 'player') {
		gameMessage.textContent = `You Win! ${capFirstLetter(playerMove)} beats ${computerMove}!`;
		console.log(gameMessage.textContent);
	} else {
		gameMessage.textContent = `You Lose! ${capFirstLetter(computerMove)} beats ${playerMove}!`;
		console.log(gameMessage.textContent);
	}
}

function playerWins(playerSelection, computerSelection) {
	return playerSelection === "rock" && computerSelection === "scissors" || 
	playerSelection === "scissors" && computerSelection === "paper" || 
	playerSelection === "paper" && computerSelection === "rock";
}

function updateScores (roundResult) {
	roundsPlayed.textContent++;
	if (roundResult !== 'draw') {
		if (roundResult === 'player') {
			playerScore.textContent++;
		} else {
			computerScore.textContent++;
		}
	};
}

function printScores () {
	console.log(`Results after ${roundsPlayed.textContent} rounds: `);
	console.log(`Player ${playerScore.textContent} - ${computerScore.textContent} Computer`);
}

function checkIsWinner () {
	return playerScore.textContent == WINNNGSCORE || computerScore.textContent == WINNNGSCORE;
}

function declareWinner() {
	if (playerScore.textContent < computerScore.textContent) {
		finalMessage.textContent = "Player, you lost...";
		console.log(finalMessage);
	} else if (playerScore.textContent > computerScore.textContent) {
		finalMessage.textContent = "Player, you won!";
		console.log(finalMessage.textContent);
	} else {
		finalMessage.textContent = "It's a tie!";
		console.log(finalMessage.textContent);
	}
}

function endGame() {
	buttons.forEach((button) => {
		button.parentNode.removeChild(button);
	});
}