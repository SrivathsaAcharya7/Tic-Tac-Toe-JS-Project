const gameBox = document.querySelectorAll(".box");
const newGame = document.querySelector(".btn");
const gameInfo = document.querySelector(".game-info");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  gameBox.forEach((box, index) => {
    box.innerText = "";
    gameBox[index].style.pointerEvents = "all";
    box.classList = `box box${index + 1}`;
  });
  newGame.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";
  winningPositions.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }

      gameBox.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      gameBox[position[0]].classList.add("win");
      gameBox[position[1]].classList.add("win");
      gameBox[position[2]].classList.add("win");
    }
  });

  if (answer != "") {
    gameInfo.innerText = `winner Player - ${answer}`;
    newGame.classList.add("active");
    return;
  }

  let count = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      count += 1;
    }
  });

  if (count === 9) {
    gameInfo.innerText = "Game Tied !";
    newGame.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] == "") {
    gameBox[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    gameBox[index].style.pointerEvents = "none";

    swapTurn();

    checkGameOver();
  }
}

gameBox.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGame.addEventListener("click", initGame);
