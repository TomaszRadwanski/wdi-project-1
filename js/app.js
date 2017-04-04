$(init);
let $main;
let $board;
let interval = 3000;
let falling = [];
let score = 0;
let gameTimeout;
let running = true;

function init (){
  createBoard();
  $('#start').on('click', startGame);
  $('.board').on('click', '.falling', removeFalling);
  $('#reset').on('click', resetGame);

}

function startGame(){
  console.log(running);
  if (running === true)  {
    gameTimeout = setTimeout(createFallingDiv, interval/4.7);
    running = false;
  }
}

function createFallingDiv (){
  gameTimeout = setTimeout(createFallingDiv, interval/4.4);

  const compSelection = $('.col')[Math.floor(Math.random()*$('.col').length)];
  const $newDiv = $('<div>', { class: 'falling'});
  $(compSelection).append($newDiv);
  $newDiv.animate({
    bottom: 0
  }, {
    duration: interval,
    easing: 'linear',
    complete: function() {
      $('.falling').stop(true).remove();
      clearTimeout(gameTimeout);
      $('#start').hide();
      $('#reset').show();
    }
  });
  falling.push($newDiv[0]);
}

function removeFalling(e) {
  if (falling.indexOf(e.target) === 0) {
    interval = interval - 40;
    falling.shift();
    $(this).stop(true).fadeOut( 'fast', () => $(this).remove());
    score ++;
    $('#score').text(`Score: ${score}`);
  }
}

function createBoard() {
  $main  = $('main');
  $board = $('<div class="board"></div>');
  $main.append($board);
  for (let i = 0; i < 4; i++) {
    $board.append('<div class="col"></div>');
  }
}
function resetGame() {
  falling = [];
  score = 0;
  clearTimeout(gameTimeout);
  $('#reset').hide();
  $('#start').show();
  $('#score').text(`Score: ${score}`);
  running = true;
  interval = 3000;
}
