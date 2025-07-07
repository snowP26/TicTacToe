const board = document.getElementById("enter-name");
const input = document.getElementById("game-start");
const enterBtn = document.querySelector(".player-submit");

function addPlayer(name) {
  const userName = name;
  let score = 0;

  const addScore = () => score++;
  const getScore = () => score;

  return { userName, addScore, getScore };
}

enterBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let name1Holder = document.getElementById("p1-name");
  let name2Holder = document.getElementById("p2-name");
  let player1Score = document.getElementById("p1-score")[0];
  let player2Score = document.getElementById("p2-score")[0];

  let p1Name = document.getElementsByName("player1")[0];
  let p2Name = document.getElementsByName("player2")[0];

  const player1 = addPlayer(p1Name.value);
  const player2 = addPlayer(p2Name.value);

  board.style.display = "none";
  input.style.display = "block";

  name1Holder.innerHTML = player1.userName;
  name2Holder.innerHTML = player2.userName;

  console.log(player1Score);
  console.log(player2Score);
});
