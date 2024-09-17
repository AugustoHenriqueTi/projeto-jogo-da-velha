const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessegeTextElement = document.querySelector(
  "[data-winning-messege-text]"
);
const winningMessegeElement = document.querySelector("[data-winning-messege]");
const winningMessege = document.querySelector("[data-winning-messege]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;
  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessege.classList.remove("show-winning-messege");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessegeTextElement.innerText = "Empatou!";
  } else {
    winningMessegeTextElement.innerText = isCircleTurn
      ? "O venceu!"
      : "X venceu!";
  }

  winningMessege.classList.add("show-winning-messege");
};

const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};
const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};
const handleClick = (e) => {
  //colocar x ou 0
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  //verificar vitoria
  const isWin = checkForWin(classToAdd);
 
  //veificar empate
  const isDraw = checkForDraw();
  
  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true)
  } else {
    //mudar o simbolo 
    swapTurns();
  }

};

startGame();

restartButton.addEventListener("click", startGame);
