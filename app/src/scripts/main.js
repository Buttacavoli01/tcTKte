const board = document.getElementById('board');
const squares = document.querySelectorAll('.square');
const msg = document.getElementById('message');
let moves = 0;
let player;
const msg1 = 'It\'s O\'s turn';
const msg2 = 'It\'s X\'s turn';

const player1 = {
  marker: 'X',
  color: 'red'
};
const player2 = {
  marker: '0',
  color: 'yellow'
};

function startGame() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].innerText = '';
    squares[i].style = null;
  }
  moves = 0;
  setMessage(msg2);
  board.style.pointerEvents = null;
}

function setMessage(message) {
  msg.innerText = message;
}

function changeUser(moves) {
  if (moves % 2 == 0) {
    player = player1;
    setMessage(msg1);
  } else {
    player = player2;
    setMessage(msg2);
  }
  setProps();

  if (moves > 3) checkWinner(player.marker);
}

function setProps(ev) {
  event.target.innerText = player.marker;
  event.target.style.color = player.color;
  event.target.style.pointerEvents = 'none';
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
    setMessage(`${player.marker} won!`);
    board.style.pointerEvents = 'none';
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
