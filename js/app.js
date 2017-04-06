$(init);
// const game = {};
let $main;
let beer;
let fallen;
let vodka;
let poison;
let water;
let $newBadDiv;
let gameTimeout;
let $newGoodDiv;
let $newSlowDiv;
let $boardCreate;
let $newBonusDiv;
let compSelection;
let score     = 0;
let hScore    = 0;
let falling   = [];
let running   = true;
let interval  = 3000;

function init (){
  createBoard();
  $('#start').on('click', startGame);
  $('.board').on('click', '.falling', removeFalling);
  $('.board').on('click', '.dontClick', clickPoison);
  $('.board').on('click', '.bonus', removeBonus);
  $('.board').on('click', '.slow', removeSlow);
  $('#reset').on('click', resetGame);
  $('#gg').hide();
}
function createBoard() {
  $main         = $('main');
  $boardCreate  = $('<div>', { class: 'board'});
  $main.append($boardCreate);
  for (let i = 0; i < 4; i++) {
    $boardCreate.append('<div class="col"></div>');
    highScore();
  }
}
function startGame(){
  if (running === true)  {
    gameTimeout = setTimeout(createFallingDiv, interval/4.7);
    running     = false;
  }
}
function createFallingDiv (){
  $newGoodDiv       = $('<div>', { class: 'falling'});
  $newBonusDiv      = $('<div>', { class: 'bonus'});
  $newSlowDiv       = $('<div>', { class: 'slow'});
  $newBadDiv        = $('<div>', { class: 'dontClick'});
  gameTimeout       = setTimeout(createFallingDiv, interval/4.4);
  compSelection     = $('.col')[Math.floor(Math.random()*$('.col').length)];
  const typeOfDiv   = Math.floor(Math.random() * 100);
  // if (typeOfDiv >= 10) {
  if (typeOfDiv >= 75) {
    compAnimate($newGoodDiv);
    falling.push($newGoodDiv[0]);
  // } else if (typeOfDiv >= 9 && typeOfDiv < 10 ) {
  } else if (typeOfDiv >= 50 && typeOfDiv < 75 ) {
    compAnimate($newBonusDiv);
  // } else if (typeOfDiv >= 8 && typeOfDiv < 9 ) {
  } else if (typeOfDiv >= 25 && typeOfDiv < 50 ) {
    compAnimate($newSlowDiv);
  } else {
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
function compAnimate(div) {
  $(compSelection).append(div);
  div.animate({
    bottom: 0},
    { duration: interval,
      easing: 'linear',
      complete: gameOver
    });
}
function removeFalling() {
  if (falling.indexOf(this) === 0) {
    falling.shift();
    removeDiv.call(this, -40, 1);
  }
  beer = new Audio('sounds/beer.mp3');
  beer.play();
}
function removeBonus() {
  removeDiv.call(this, -40, 5);
  vodka = new Audio('sounds/vodka.mp3');
  vodka.play();
}
function removeSlow() {
  removeDiv.call(this, 160, 1);
  water = new Audio('sounds/water.wav');
  water.play();
}
function removeDiv(time, points) {
  interval  = interval + time;
  score     = score + points;
  $(this).stop(true).fadeOut( 'fast', () => $(this).remove());
  $('#score').text(`Score: ${score}`);
  highScore();
}
function clickPoison() {
  gameOver();
  poison = new Audio('sounds/poison.mp3');
  poison.play();
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
  fallen = new Audio('sounds/fallen.mp3');
  fallen.play();
}
function resetGame() {
  falling   = [];
  score     = 0;
  running   = true;
  interval  = 3000;
  clearTimeout(gameTimeout);
  $('#reset').hide();
  $('#start').show();
  $('#gg').hide();
  $('#score').text(`Score: ${score}`);
}
function highScore() {
  if (score > hScore) {
    hScore = score;
    $('#hScore').text(`High Score: ${hScore}`);
  }
}
