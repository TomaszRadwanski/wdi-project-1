$(init);

const width        = 4;
const height       = 5;
const falling      = [];
let numberOfBlocks = 0;
let score          = 0;
let interval     = 1000;
let $body;
let loop;
let $board;

function init() {
  createBoard();
  $('button').on('click', startGame);
}

function createBoard() {
  $body  = $('body');
  $board = $('<ul class="board"></ul>');
  $body.append($board);
  for (let i = 0; i < width*height; i++) {
    $board.append('<li></li>');
  }
}

function startGame() {
  setInterval(shiftGrid, interval);
  $('.board').on('click', '.falling', removeFalling);
}

function shiftGrid() {
  for (let i = 0; i < width; i++) $board.prepend('<li></li>');
  $('li:nth-last-child(-n+4)').remove();
  selectFalling();
}

function selectFalling() {
  const first4 = $('li:lt(4)');
  const item = first4[Math.floor(Math.random()*first4.length)];
  $(item).addClass(numberOfBlocks.toString());
  $(item).addClass('falling');
  falling.push(numberOfBlocks);
  numberOfBlocks++;
}

function removeFalling() {
  const fallingIndex = parseInt($(this).attr('class'));
  if (falling[0] === fallingIndex) {
    $(this).removeClass('falling');
    falling.shift();
    interval-=100;
    console.log(interval);
    score ++;
    $('p').text(`Score: ${score}`);
  }
}
