//const board = document.getElementById('board')
let squares = document.querySelectorAll('.square')
let player1 = "X"
let player2 = "O"
let moves = 0
const winningCombos = [
  [0,1,2], [3,4,5],
  [6,7,8], [0,3,6],
  [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function changeUser (moves) {
  if (moves % 2 == 0){
    event.target.innerHTML = player1

  } else {
    event.target.innerHTML = player2
    event.target.style.color = "yellow"
  }
}



function gameOver(moves){
  if (moves >= 8) {
    board.style.pointerEvents = 'none'
  }
}

for (var i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', function(event) {
    changeUser(moves)
    moves++
  })
}
