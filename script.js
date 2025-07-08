const enterBtn = document.querySelector(".player-submit");

const addPlayer = (name, marker) => {
  const userName = name;
  let score = 0;
  const userMarker = marker;

  const addScore = () => score++;

  return { addScore, userName, score, userMarker };
};

enterBtn.addEventListener("click", () => {
  let initialScreen = document.getElementById("enter-name");
  let nextScreen = document.getElementById("game-start");
  let getPlayer1 = document.querySelector('.player-input[name="player1"]').value;
  let getPlayer2 = document.querySelector('.player-input[name="player2"]').value;

  let player1 = addPlayer(getPlayer1, "❌");
  let player2 = addPlayer(getPlayer2, "⭕️");

  initialScreen.style.display = "none";
  nextScreen.style.display = "block";

  document.getElementById("p1-name").innerHTML = player1.userName;
  document.getElementById("p2-name").innerHTML = player2.userName;

  console.log(player1.userMarker);
  console.log(player2.userMarker);
});

const gameboard = () => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const resetBoard = () => board.fill("");
  const updateBoard = (position, marker) => {
    board[position] = marker;

    if(board[position != ""]){
        alert.log("This spot has been taken already!")
    }
  };
  const getBoard = () => board;

  return { resetBoard, getBoard };
};
