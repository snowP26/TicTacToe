const enterBtn = document.querySelector(".player-submit");

let board = ["", "", "", "", "", "", "", "", ""];
const cell = document.querySelectorAll(".cell");
let turn = true;

// Global variables for players declared here to be accessible throughout
let player1;
let player2;

// create player factory
const addPlayer = (name, marker) => {
  let score = 0;
  const getUserName = () => name; // ✅ renamed to `getUserName()` for consistent method access
  const userMarker = marker;
  const addScore = () => score++;
  const getScore = () => score;

  return { addScore, getUserName, getScore, userMarker };
};

// event listener for submit names button
enterBtn.addEventListener("click", () => {
  // ✅ Move input value reading inside the event so we get the actual typed names
  let getPlayer1 = document.querySelector('.player-input[name="player1"]').value;
  let getPlayer2 = document.querySelector('.player-input[name="player2"]').value;

  // ✅ Create player objects AFTER getting the names
  player1 = addPlayer(getPlayer1, "⭕️");
  player2 = addPlayer(getPlayer2, "❌");

  let initialScreen = document.getElementById("enter-name");
  let nextScreen = document.getElementById("game-start");

  initialScreen.style.display = "none";
  nextScreen.style.display = "block";

  // ✅ Use method `.getUserName()` instead of directly accessing `userName`
  document.getElementById("p1-name").innerHTML = player1.getUserName();
  document.getElementById("p2-name").innerHTML = player2.getUserName();

  // ✅ Update the message box with proper player turn
  let message = document.querySelector("#turn-display");
  message.innerHTML = turn
    ? `${player1.getUserName()}'s turn`
    : `${player2.getUserName()}'s turn`;
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
    })
  }


  const updateBoard = (position, marker) => {
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
    winCondition.forEach((condition) => {
        let [ i1, i2, i3 ] = condition;
        let winnerText = "";
        let player = "";
        if(board[i1] == "⭕️"){
            player = player1;
        } else if (board[i1] == "❌"){
            player = player2;
        }
        if (board[i1] !== "" && board[i1] === board[i2] && board[i1] === board[i3]) {
          player.addScore();
          console.log(player.score)
          winnerText = `${player.getUserName()} won this round!`;
          Swal.fire({
            icon: "success",
            title: "Winner",
            text: winnerText,
          });
          turn = true;
        
        }
    })
  }

  const getBoard = () => board;

  return { resetBoard, getBoard, updateBoard, checkWinner };
};

// initialize on press functions for each cell
let generateBoard = gameboard();
cell.forEach((cell) => {
  cell.addEventListener("click", () => {
    
    generateBoard.updateBoard(cell.dataset.index,  turn ? player1.userMarker : player2.userMarker);
    cell.innerHTML= `${board[cell.dataset.index]}`
    generateBoard.checkWinner(board);

  });
});


