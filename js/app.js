$(init);
let $main;
let $board;
let interval = 3000;
let falling = [];

function init (){
  createBoard();
  $('button').on('click', startGame);
  $('.board').on('click', '.falling', removeFalling);
}

function startGame(){
  setInterval(createFallingDiv, interval/4.7);
}

function createFallingDiv (){
  const compSelection = $('.col')[Math.floor(Math.random()*$('.col').length)];
  const $newDiv = $('<div>', { class: 'falling'});
  $(compSelection).append($newDiv);
  $newDiv.animate({
    bottom: 0
  }, {
    duration: interval,
    easing: 'linear',
    complete: function() {
      $('p').text('hit');
      $(this).remove();
    }
  });

  // Push DOM object into the array
  falling.push($newDiv[0]);
}

function removeFalling(e) {
  // Can't make comparison as a jQuery object?
  if (falling.indexOf(e.target) === 0) {
    falling.shift();
    $(this).stop(true).remove();
    // $(this).fadeOut('slow', function() {
    //   $(this).remove();
    // });
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
