const enterBtn = document.querySelector(".player-submit");
let p1Score = document.getElementById("p1-score");
let p2Score = document.getElementById("p2-score");

let board = ["", "", "", "", "", "", "", "", ""];
const cell = document.querySelectorAll(".cell");
let turn = true;

// Global variables for players declared here to be accessible throughout
let player1;
let player2;

// create player factory
const addPlayer = (name, marker) => {
  let score = 0;
  const getUserName = () => name;
  const userMarker = marker;
  const addScore = () => score++;
  const getScore = () => score;

  return { addScore, getUserName, getScore, userMarker };
};

function updateScore(player1, player2){
  p1Score.innerText = `Score: ${player1.getScore()}`;
  p2Score.innerText = `Score: ${player2.getScore()}`;
}

let message = document.querySelector("#turn-display");

// event listener for submit names button
enterBtn.addEventListener("click", () => {
  let getPlayer1 = document.querySelector(
    '.player-input[name="player1"]'
  ).value;
  let getPlayer2 = document.querySelector(
    '.player-input[name="player2"]'
  ).value;

  if(getPlayer1 == "" || getPlayer2 == ""){
    Swal.fire({
        icon: "info",
        title: "Let's Get Started!",
        text: "Please enter your names to begin the game."
    });

    return;
  }

 Swal.fire({
    title: "Setting up your game...",
    html: "Please wait a moment",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
    timer: 1500,
    timerProgressBar: true
  }).then(() => {
    player1 = addPlayer(getPlayer1, "⭕️");
    player2 = addPlayer(getPlayer2, "❌");
    updateScore(player1, player2);

    let initialScreen = document.getElementById("enter-name");
    let nextScreen = document.getElementById("game-start");
    initialScreen.style.display = "none";
    nextScreen.style.display = "block";
    message.innerHTML = `Begin the game ${player1.getUserName()}! It's your turn.`;

    document.getElementById("p1-name").innerHTML = player1.getUserName();
    document.getElementById("p2-name").innerHTML = player2.getUserName();
  });
});

// initialize gameboard logic
const gameboard = () => {
  let winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const resetBoard = () => {
    board.fill("");
    cell.forEach((cell) => {
      cell.innerHTML = "";
    });
    message.innerHTML = `One more time ${player1.getUserName()}! It's your turn.`
  };


  const updateBoard = (position, marker) => {
    player = !turn ? player1 : player2;

    message.innerHTML = `It is now your turn, ${player.getUserName()}. (${player.userMarker})`
    if (board[position] != "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This spot is already taken! choose another spot",
      });
    } else {
      turn = !turn;
      board[position] = marker;
    }
  };
  const checkWinner = (board) => {
    console.log(`${turn ? player1 : player2}`)
    winCondition.forEach((condition) => {
      let [i1, i2, i3] = condition;
      let winnerText = "";
      let player;

      if (board[i1] == "⭕️") {
        player = player1;
      } else if (board[i1] == "❌") {
        player = player2;
      }

      if (
        board[i1] !== "" &&
        board[i1] === board[i2] &&
        board[i1] === board[i3]
      ) {
        player.addScore();
        winnerText = `${player.getUserName()} won this round!`;
        Swal.fire({
          icon: "success",
          title: "Winner",
          text: winnerText,
        });
        turn = true;

        resetBoard();
        updateScore(player1, player2);
      }

      if (!board.includes("")) {
        Swal.fire({
          icon: "error",
          title: "Draw",
          text: "No one won this round!",
        });
        resetBoard();
      }
    });
  };

  return { resetBoard, updateBoard, checkWinner };
};

// initialize on press functions for each cell
let generateBoard = gameboard();
cell.forEach((cell) => {
  cell.addEventListener("click", () => {
    generateBoard.updateBoard(
      cell.dataset.index,
      turn ? player1.userMarker : player2.userMarker
    );
    cell.innerHTML = `${board[cell.dataset.index]}`;
    generateBoard.checkWinner(board);
  });
});
