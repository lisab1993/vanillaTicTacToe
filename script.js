const zero = document.querySelector("#zero");
const one = document.querySelector("#one");
const two = document.querySelector("#two");

const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");

const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");

const displayTurn = document.querySelector("#displayTurn");
const boardArr = [zero, one, two, three, four, five, six, seven, eight];
let removeIndex = null;
//best square positions for the computer to pick from
const bestOptions = [zero, two, six, eight, four];
const lesserOptions = [one, three, five, seven];

// number of turns so far
let totalTurns = 0;
// whose turn is it anyway
// 0 = computer
// 1= player
let currentTurn = null;
//who won?
let winner = null;
let openSquares = [zero, one, two, three, four, five, six, seven, eight];

function disableSquares() {
  boardArr.forEach((square) => (square.style.pointerEvents = "none"));
  return true;
}

function enableOpenSquares() {
  boardArr.forEach((square) => {
    square.innerHTML === "" ? (square.style.pointerEvents = "auto") : null;
  });
}

function randInt(num1, num2) {
  return Math.floor(num1 + Math.random() * (num2 - num1 + 1));
}

function checkWinner() {
  // 7 x4 = t0 t2 b6 b8
  // 5 x4 = t1 m3 m5 b7
  // 9 x1 = m4

  const t0 = zero.innerHTML;
  const t1 = one.innerHTML;
  const t2 = two.innerHTML;
  const m3 = three.innerHTML;
  const m4 = four.innerHTML;
  const m5 = five.innerHTML;
  const b6 = six.innerHTML;
  const b7 = seven.innerHTML;
  const b8 = eight.innerHTML;
  //numeric representation of board
  // 0 1 2
  // 3 4 5
  // 6 7 8

  //0,1,2
  if (t0 === "X" && t1 === "X" && t2 === "X") {
    winner = 1;
    disableSquares();
    return 1;
  } else if (t0 === "O" && t1 === "O" && t2 === "O") {
    winner = 0;
    disableSquares();
    return 0;
  }
  //3,4,5
  else if (m3 === "X" && m4 === "X" && m5 === "X") {
    winner = 1;
    disableSquares();
    return 1;
  } else if (m3 === "O" && m4 === "O" && m5 === "O") {
    winner = 0;
    disableSquares();
    return 0;
  }
  //6,7,8
  else if (b6 === "X" && b7 === "X" && b8 === "X") {
    winner = 1;
    disableSquares();
    return 1;
  } else if (b6 === "O" && b7 === "O" && b8 === "O") {
    winner = 0;
    disableSquares();
    return 0;
  }
  //0,3,6
  else if (t0 === "X" && m3 === "X" && b6 === "X") {
    winner = 1;
    disableSquares();
    return 1;
  } else if (t0 === "O" && m3 === "O" && b6 === "O") {
    winner = 0;
    disableSquares();
    return 0;
  }
  //1,4,7
  else if (t1 === "X" && m4 === "X" && b7 === "X") {
    winner = 1;
    disableSquares();
    return 1;
  } else if (t1 === "O" && m4 === "O" && b7 === "O") {
    winner = 0;
    disableSquares();
    return 0;
  }
  //2,5,8
  else if (t2 === "X" && m5 === "X" && b8 === "X") {
    winner = 1;
    disableSquares();
    return 1;
  } else if (t2 === "O" && m5 === "O" && b8 === "O") {
    winner = 0;
    disableSquares();
    return 0;
  }
  //0,4,8
  else if (t0 === "X" && m4 === "X" && b8 === "X") {
    winner = 1;
    disableSquares();
    return 1;
  } else if (t0 === "O" && m4 === "O" && b8 === "O") {
    winner = 0;
    disableSquares();
    return 0;
  }
  //2,4,6
  else if (t2 === "X" && m4 === "X" && b6 === "X") {
    winner = 1;
    disableSquares();
    return 1;
  } else if (t2 === "O" && m4 === "O" && b6 === "O") {
    winner = 0;
    disableSquares();
    return 0;
  } else {
    return "no winner";
  }
}

function computerChoice() {
  disableSquares();
  let bestOptionsAvailable = 0;
  let lesserOptionsAvailable = 0;
  let selection = null;
  //find out how many best and lesser options are available
  openSquares.forEach((square) => {
    if (bestOptions.includes(square)) {
      bestOptionsAvailable += 1;
    } else if (lesserOptions.includes(square)) {
      lesserOptionsAvailable += 1;
    }
  });
  //if no more best options available, pick a lesser one
  if (bestOptionsAvailable === 0) {
    selection = randInt(0, lesserOptionsAvailable - 1);
    selection = lesserOptions[selection];
    selection.innerHTML = "O";
    lesserOptions.splice(lesserOptions.indexOf(selection), 1);
  } //if no more lesser options, pick a best one
  else if (lesserOptionsAvailable === 0) {
    selection = randInt(0, bestOptionsAvailable - 1);
    selection = bestOptions[selection];
    selection.innerHTML = "O";
    bestOptions.splice(bestOptions.indexOf(selection), 1);
  } //if both lists are available, pick a list and make a selection
  else {
    const listSelection = randInt(0, 1);
    if (listSelection === 0) {
      selection = randInt(0, bestOptionsAvailable - 1);
      selection = bestOptions[selection];
      selection.innerHTML = "O";
      bestOptions.splice(bestOptions.indexOf(selection), 1);
    } else {
      selection = randInt(0, lesserOptionsAvailable - 1);
      selection = lesserOptions[selection];
      selection.innerHTML = "O";
      lesserOptions.splice(lesserOptions.indexOf(selection), 1);
    }
  }

  removeIndex = openSquares.indexOf(selection);
  openSquares.splice(removeIndex, 1);
  currentTurn = 1;
  totalTurns += 1;
  console.log(totalTurns, "total turns");
  winner = checkWinner();
  if (winner === 0) {
    disableSquares();
    displayTurn.innerHTML = "The computer wins!";
  } else if (winner === 1) {
    disableSquares();
    displayTurn.innerHTML = "The player wins!";
  } else if ((winner === "no winner") & (totalTurns === 9)) {
    displayTurn.innerHTML = "catscan";
  } else if (winner === "no winner") {
    displayTurn.innerHTML = "It's the player's turn";
    enableOpenSquares();
    return true;
  }
}

function randomPlayer() {
  let choice = randInt(0, 1);
  if (choice === 0) {
    disableSquares();
    displayTurn.innerHTML = "It's the computer's turn";
    setTimeout(function () {
      computerChoice();
    }, 1000);
  } else {
    displayTurn.innerHTML = "It's the player's turn";
  }
  return choice;
}

function oneTurn(square) {
  square.innerHTML = "X";
  winner = checkWinner();
  if (winner === 0) {
    disableSquares();
    displayTurn.innerHTML = "The computer wins!";
  } else if (winner === 1) {
    disableSquares();
    displayTurn.innerHTML = "The player wins!";
  } else if (winner === 'no winner' && totalTurns === 9) {
    disableSquares();
    displayTurn.innerHTML = 'Catscan'
  } else if (winner === "no winner" && totalTurns < 9) {
    currentTurn = 0;
    displayTurn.innerHTML = "It's the computer's turn";
    removeIndex = openSquares.indexOf(square);
    openSquares.splice(removeIndex, 1);
    if (bestOptions.includes(square)) {
      bestOptions.splice(bestOptions.indexOf(square), 1);
    } else if (lesserOptions.includes(square)) {
      lesserOptions.splice(lesserOptions.indexOf(square), 1);
    }
    setTimeout(function () {
      computerChoice();
    }, 1000);
  }
  totalTurns += 1;
  console.log(totalTurns, "total turns");
}

window.onload = function () {
  console.log(totalTurns, "total turns");
  currentTurn = randomPlayer();
};


zero.addEventListener("click", function () {
  oneTurn(zero);
});
one.addEventListener("click", function () {
  oneTurn(one);
});
two.addEventListener("click", function () {
  oneTurn(two);
});

three.addEventListener("click", function () {
  oneTurn(three);
});
four.addEventListener("click", function () {
  oneTurn(four);
});
five.addEventListener("click", function () {
  oneTurn(five);
});

six.addEventListener("click", function () {
  oneTurn(six);
});
seven.addEventListener("click", function () {
  oneTurn(seven);
});
eight.addEventListener("click", function () {
  oneTurn(eight);
});