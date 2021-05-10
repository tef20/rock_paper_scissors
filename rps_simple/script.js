const MOVES = [
	"Rock",
	"Paper", 
	"Scissors"
]

game(3);

function game(rounds) {
	let playerScore = 0;
	let computerScore = 0;

	for (let i = 0; i < rounds; i++) {
		let playerMove = getPlayerMove();
		let computerMove = computerPlay();
		let roundWinner = playRound(playerMove, computerMove);
		
		if (roundWinner === "player") {
			playerScore++
		} else if (roundWinner === "computer") {
			computerScore++
		}
	}

	declareWinner(playerScore, computerScore)
}

function getPlayerMove() {
	// get valid player choice
	let move
	while (MOVES.indexOf(move) < 0) {
		move = formatChoice(prompt("Chose from Rock, Paper, or Scissors: "));
	}
	
	return move;
}

function formatChoice(choice) {
	if (choice) {
		choice = choice.toLowerCase();
		choice = choice[0].toUpperCase() + choice.slice(1);
	}
		
	return choice;
}

function computerPlay() {
	let choice = Math.floor(Math.random() * MOVES.length);

	return MOVES[choice];
}

function playRound(playerSelection, computerSelection) {
	if (playerSelection === computerSelection) {
		console.log(`You both picked ${playerSelection}! It's a draw!`);
		return "draw";
	} else if (playerWins(playerSelection, computerSelection)) {
		console.log(`You Win! ${playerSelection} beats ${computerSelection}!`);
		return "player";
	} else {
		console.log(`You Lose! ${computerSelection} beats ${playerSelection}!`);
		return "computer";
	}
}

function playerWins(playerSelection, computerSelection) {
	return playerSelection === "Rock" && computerSelection === "Scissors" || 
	playerSelection === "Scissors" && computerSelection === "Paper" || 
	playerSelection === "Paper" && computerSelection === "Rock";
}

function declareWinner(playerScore, computerScore) {
	console.log(`Player ${playerScore} - ${computerScore} Computer`)
	if (playerScore < computerScore) {
		console.log("Player, you lost...")
	} else if (playerScore > computerScore) {
		console.log("Player, you won!")
	} else {
		console.log("It's a tie!")
	}
}
