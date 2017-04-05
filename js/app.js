$(init);
let $main;
let $board;
let $newBadDiv;
let gameTimeout;
let $newGoodDiv;
let $newSlowDiv;
let $newBonusDiv;

let score     = 0;
let hScore    = 0;
let falling   = [];
let running   = true;
let interval  = 3000;

function init (){
  createBoard();
  $('#start').on('click', startGame);
  $('.board').on('click', '.falling', removeFalling);
  $('.board').on('click', '.dontClick', gameOver);
  $('.board').on('click', '.bonus', removeBonus);
  $('.board').on('click', '.slow', removeSlow);
  $('#reset').on('click', resetGame);
  $('#gg').hide();
}

function startGame(){
  if (running === true)  {
    gameTimeout = setTimeout(createFallingDiv, interval/4.7);
    running = false;
  }

}

function createFallingDiv (){
  gameTimeout = setTimeout(createFallingDiv, interval/4.4);
  const compSelection = $('.col')[Math.floor(Math.random()*$('.col').length)];
  const typeOfDiv = Math.floor(Math.random() * 100);
  if (typeOfDiv >= 10) {
  // if (typeOfDiv >= 75) { //use to see all types
    $newGoodDiv = $('<div>', { class: 'falling'});
    $(compSelection).append($newGoodDiv);
    $newGoodDiv.animate({
      bottom: 0},
      { duration: interval,
        easing: 'linear',
        complete: gameOver
      });
    falling.push($newGoodDiv[0]);
  // } else if (typeOfDiv >= 50 && typeOfDiv < 75 ) { //use to see all types
  } else if (typeOfDiv >= 7 && typeOfDiv < 9 ) {
    $newBonusDiv = $('<div>', { class: 'bonus'});
    $(compSelection).append($newBonusDiv);
    $newBonusDiv.animate({
      bottom: 0},
      { duration: interval,
        easing: 'linear',
        complete: gameOver
      });
  // } else if (typeOfDiv >= 25 && typeOfDiv < 50 ) { //use to see all types
  } else if (typeOfDiv >= 9 && typeOfDiv < 10 ) {
    $newSlowDiv = $('<div>', { class: 'slow'});
    $(compSelection).append($newSlowDiv);
    $newSlowDiv.animate({
      bottom: 0},
      { duration: interval,
        easing: 'linear',
        complete: gameOver
      });
  } else {
    $newBadDiv = $('<div>', { class: 'dontClick'});
    $(compSelection).append($newBadDiv);
    $newBadDiv.animate({
      bottom: 0},
      { duration: interval,
        easing: 'linear',
        complete: function() {
          $(this).remove();
        }
      });
  }
}

function removeFalling(e) {
  if (falling.indexOf(e.target) === 0) {
    interval = interval - 40;
    falling.shift();
    $(this).stop(true).fadeOut( 'fast', () => $(this).remove());
    score ++;
    $('#score').text(`Score: ${score}`);
    highScore();
  }
}
function removeBonus() {
  interval = interval - 40;
  $(this).stop(true).fadeOut( 'fast', () => $(this).remove());
  score = score + 5;
  $('#score').text(`Score: ${score}`);
  highScore();
}
function removeSlow() {
  interval = interval + 150;
  $(this).stop(true).fadeOut( 'fast', () => $(this).remove());
  score = score + 1;
  $('#score').text(`Score: ${score}`);
  highScore();
}

function createBoard() {
  $main  = $('main');
  $board = $('<div class="board"></div>');
  $main.append($board);
  for (let i = 0; i < 4; i++) {
    $board.append('<div class="col"></div>');
    highScore();
  }
}

function resetGame() {
  falling = [];
  score = 0;
  clearTimeout(gameTimeout);
  $('#reset').hide();
  $('#start').show();
  $('#gg').hide();
  $('#score').text(`Score: ${score}`);
  running = true;
  interval = 3000;
}

function gameOver() {
  $('.falling').stop(true).remove();
  $('.dontClick').stop(true).remove();
  $('.bonus').stop(true).remove();
  $('.slow').stop(true).remove();
  clearTimeout(gameTimeout);
  $('#start').hide();
  $('#reset').show();
  $('#gg').show();
}
function highScore() {
  if (score > hScore) {
    hScore = score;
    $('#hScore').text(`High Score: ${hScore}`);
  }
}
