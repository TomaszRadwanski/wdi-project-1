const game = {};

game.init = function init (){
  this.createBoard();
  this.$slow;
  this.$bonus;
  this.$falling;
  this.$dontClick;
  this.score      = 0;
  this.hScore     = 0;
  this.falling    = [];
  this.running    = true;
  this.interval   = 3000;
  this.$start     = $('#start');
  this.$reset     = $('#reset');
  this.$gg        = $('#gg');
  this.$score     = $('#score');
  this.$hScore    = $('#hScore');
  this.$board     = $('.board');
  this.$start.on('click', this.startGame.bind(this));
  this.$board.on('click', '.falling', this.removeFalling.bind(this));
  this.$board.on('click', '.dontClick', this.clickPoison.bind(this));
  this.$board.on('click', '.bonus', this.removeBonus.bind(this));
  this.$board.on('click', '.slow', this.removeSlow.bind(this));
  this.$reset.on('click', this.resetGame.bind(this));
  this.$gg.hide();
};
game.createBoard =function createBoard() {
  this.$main         = $('main');
  this.$boardCreate  = $('<div>', { class: 'board'});
  this.$main.append(this.$boardCreate);
  for (let i = 0; i < 4; i++) {
    this.$boardCreate.append('<div class="col"></div>');
    this.highScore();
  }
};
game.startGame =function startGame(){
  if (this.running === true)  {
    this.gameTimeout = setTimeout(this.createFallingDiv.bind(this), this.interval/4.7);
    this.running     = false;
  }
};
game.createFallingDiv =function createFallingDiv (){
  this.$newGoodDiv       = $('<div>', { class: 'falling'});
  this.$newBonusDiv      = $('<div>', { class: 'bonus'});
  this.$newSlowDiv       = $('<div>', { class: 'slow'});
  this.$newBadDiv        = $('<div>', { class: 'dontClick'});
  this.gameTimeout       = setTimeout(this.createFallingDiv.bind(this), game.interval/4.4);
  this.compSelection     = $('.col')[Math.floor(Math.random()*$('.col').length)];
  const typeOfDiv   = Math.floor(Math.random() * 100);
  if (typeOfDiv >= 10) {
  // if (typeOfDiv >= 75) {
    this.compAnimate(this.$newGoodDiv);
    this.falling.push(this.$newGoodDiv[0]);
  } else if (typeOfDiv >= 9 && typeOfDiv < 10 ) {
  // } else if (typeOfDiv >= 50 && typeOfDiv < 75 ) {
    this.compAnimate(this.$newBonusDiv);
  } else if (typeOfDiv >= 8 && typeOfDiv < 9 ) {
  // } else if (typeOfDiv >= 25 && typeOfDiv < 50 ) {
    this.compAnimate(this.$newSlowDiv);
  } else {
    $(this.compSelection).append(this.$newBadDiv);
    this.$newBadDiv.animate({
      bottom: 0},
      { duration: this.interval,
        easing: 'linear',
        complete: function() {
          $(this).remove();
        }
      });
  }
};
game.compAnimate = function compAnimate(div) {
  $(this.compSelection).append(div);
  div.animate({
    bottom: 0},
    { duration: this.interval,
      easing: 'linear',
      complete: this.gameOver.bind(this)
    });
};
game.removeFalling = function removeFalling(e) {
  if (this.falling.indexOf(e.target) === 0) {
    this.falling.shift();
    this.removeDiv.call(e.target, -40, 1);
    this.beer = new Audio('sounds/beer.mp3');
    this.beer.play();
  }
};
game.removeBonus = function removeBonus(e) {
  this.removeDiv.call(e.target, -40, 5);
  this.vodka = new Audio('sounds/vodka.mp3');
  this.vodka.play();
};
game.removeSlow = function removeSlow(e) {
  this.removeDiv.call(e.target, 160, 1);
  this.water = new Audio('sounds/water.wav');
  this.water.play();
};
game.removeDiv =function removeDiv(time, points) {
  game.interval  = game.interval + time;
  game.score     = game.score + points;
  $(this).stop(true).fadeOut( 'fast', () => $(this).remove());
  game.$score.text(`Score: ${game.score}`);
  game.highScore();
};
game.clickPoison =function clickPoison() {
  this.gameOver();
  this.poison = new Audio('sounds/poison.mp3');
  this.poison.play();
};
game.gameOver =function gameOver() {
  this.$slow      = $('.slow');
  this.$bonus     = $('.bonus');
  this.$dontClick = $('.dontClick');
  this.$falling   = $('.falling');
  this.$falling.stop().remove();
  this.$dontClick.stop().remove();
  this.$bonus.stop().remove();
  this.$slow.stop().remove();
  clearTimeout(this.gameTimeout);
  this.$start.hide();
  this.$reset.show();
  this.$gg.show();
  this.fallen = new Audio('sounds/fallen.mp3');
  this.fallen.play();
};
game.resetGame =function resetGame() {
  this.falling   = [];
  this.score     = 0;
  this.running   = true;
  this.interval  = 3000;
  clearTimeout(this.gameTimeout);
  this.$reset.hide();
  this.$start.show();
  this.$gg.hide();
  this.$score.text(`Score: ${this.score}`);
};
game.highScore =function highScore() {
  if (this.score > this.hScore) {
    this.hScore = this.score;
    this.$hScore.text(`High Score: ${this.hScore}`);
  }
};

$(game.init.bind(game));
