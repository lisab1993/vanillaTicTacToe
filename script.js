let tLeft = document.querySelector("#tLeft");
let tMid = document.querySelector("#tMid");
let tRight = document.querySelector("#tRight");

let bLeft = document.querySelector("#bLeft");
let bMid = document.querySelector("#bMid");
let bRight = document.querySelector("#bRight");

let mLeft = document.querySelector("#mLeft");
let mMid = document.querySelector("#mMid");
let mRight = document.querySelector("#mRight");

let btn = document.querySelector("#btn");
let displayTurn = document.querySelector("#displayTurn");

// number of turns so far
let totalTurns = 0;
let currentTurn = null;

function randomPlayer() {
  let choice = Math.floor(0 + Math.random() * (1 - 0 + 1));
  if (choice == 0) {
    displayTurn.innerHTML = "It's the computer's turn";
  } else {
    displayTurn.innerHTML = "It's the player's turn";
  }
  return choice;
}

function oneTurn() {
  if (totalTurns == 0) {
    currentTurn = randomPlayer();
    totalTurns += 1;
  } else if (totalTurns > 0 && totalTurns < 9) {
    if (currentTurn == 1) {
      currentTurn = 0;
      displayTurn.innerHTML = "It's the computer's turn";
    } else {
      currentTurn = 1;
      displayTurn.innerHTML = "It's the player's turn";
    }
    totalTurns += 1;
  } else {
    displayTurn.innerHTML = "Game Over";
  }
}

window.onload = function () {
  oneTurn();
};

btn.addEventListener("click", function () {
  oneTurn();
});
//make random function to pick who goes first -player or computer
//keep track of whose turn it is
//player will be 1, computer will be 0
//if it's the player's turn, ask for their move
//if it's the computer's turn, the computer will decide what to do - more to follow on this.
//when it's the player's turn, they'll click on a box, and then be asked if they want to keep that move - not with a prompt
//the game ends if someone wins, or there's a draw.
//player is asked if they want to play again
