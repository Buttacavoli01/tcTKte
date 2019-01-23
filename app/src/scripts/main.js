//const board = document.getElementById('board')
let squares = document.querySelectorAll('.square');
let id = document.getElementById(this);
let msg = document.getElementById('message');
let moves = 0;
let player;

let player1 = {
  name: "Player One",
  marker: "X",
  color: "red"
};
let player2 = {
  name: "Player Two",
  marker: "0",
  color: "yellow"
};

function startGame() {
  squares.forEach(i => i.innerHTML = "");
  moves = 0;
  setMessage("It's Player One's Turn ");
}

function setMessage(message) {
  msg.innerText = message;
}

function changeUser(moves) {
  if (moves % 2 === 0) {
    player = player1;
    setMessage(`It's Player Two's turn`);
  } else {
    player = player2;
    setMessage(`It's Player One's turn`);

  }

  event.target.innerText = player.marker;
  event.target.style.color = player.color;
  msg.style.color = player.color;
  event.target.style.pointerEvents = 'none';
  if(moves > 3) checkWinner(player.marker);
}

function checkWinner(move) {
  var result = false;
  if (checkRow(0, 1, 2, move) ||
    checkRow(3, 4, 5, move) ||
    checkRow(6, 7, 8, move) ||
    checkRow(0, 3, 6, move) ||
    checkRow(1, 4, 7, move) ||
    checkRow(2, 5, 8, move) ||
    checkRow(0, 4, 8, move) ||
    checkRow(2, 4, 6, move)) {
    result = true;
    setMessage(`${player.name} won!`);
    //squares.style.pointerEvents = "none"
  }
  if (moves >= 8 && result == false) {
    setMessage('It\'s a draw!');
  }
  return result;
}

function checkRow(a, b, c, move) {
  var result = false;
  if (getBox(a) == move && getBox(b) == move && getBox(c) == move) {
    result = true;
  }
  return result;
}

function getBox(number) {
  return document.getElementById(number).innerText;
}

for (var i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', function(event) {
    changeUser(moves);
    moves++;
  });
}
