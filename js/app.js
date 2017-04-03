// Create a grid
// computer randomly selects from 1 to 4 and remebers its selection
// depending on what is selected it creates a div in the coresponding columb at the top of the page, the player will see this by making the div a certain color and the others in the row will remain white
// This will happen every set interval of x
//    every set interval all of the selected divs will transfer into the div below
// to get rid of the div you must select the columb it is in
//    the columbs can be selected by either a click on the coulmb or by clicking a key which is associated with the columb
// if any of the divs fall below the bottom line then you have lost the game
// select div using the class and nth child

// first have comp randomise          - DONE
// make it randomise at an interval   - DONE
// next have the divs show up         - DONE
// then have the divs drop down at an interval
// then make it so you can click the div and it disapears/speeds up every correct click
// then make it so that you have to click the divs in the correct order/gg if wrong order
// then make it so that if a div hits the bottom of the screen it is game over
// then add buttons to the columbs so that you can play without clicking
// reset button/try again...
// then make it display your score
// then make it work on the phone

$(init);

const width  = 10;
let $body;
let $board;
let numberOfBlocks = 0;
const falling = [];

function init() {
  createBoard();

  // GENERATE BLOCK
  setInterval(generateBlock, 1500);

  $(document).on('click', '.falling', function() {
    const fallingIndex = parseInt($(this).attr('class'));
    if (falling[0] === fallingIndex) {
      $(this).attr('class', '');
      falling.shift();
    }
  });
}

function generateBlock() {
  let prevIndex;
  let nextIndex;
  let $prev;
  let $next;
  nextIndex = pickStartIndex();
  $next     = pickSquare(nextIndex);
  $next.addClass(numberOfBlocks.toString());
  $next.addClass('falling');
  falling.push(numberOfBlocks);
  numberOfBlocks++;

  // Repeating
  setInterval(() => {
    prevIndex = nextIndex;
    nextIndex = nextIndex + width;
    $prev     = pickSquare(prevIndex);
    $next     = pickSquare(nextIndex);
    const classList = $prev.attr('class');
    $prev.attr('class', '');
    $next.attr('class', classList);
  }, 1000);
}

function createBoard() {
  $body  = $('body');
  $board = $('<ul class="board"></ul>');
  $body.append($board);
  for (let i = 0; i < width*width; i++) {
    $board.append('<li></li>');
  }
}

function pickStartIndex() {
  return Math.floor(Math.random() * width);
}

function pickSquare(nextIndex) {
  return $($('li')[nextIndex]);
}












// $(function(){
//
//   const gameSequence = [];
//   const userSequence = [];
//   let gameSpeed = 1000;
//
//   function running() {
//     // setInterval(function() {
//
//       const compSelect = Math.floor(Math.random()*4 + 2);
//       const compRandom = $(`.row1:nth-child(${compSelect})`);
//       compRandom.addClass('selected');
//       $('.selected').css('background-color', 'black');
//       gameSequence.push(compRandom);
//       // console.log(gameSequence);
//     // }, gameSpeed);
//           shiftElements();
//   }
//   running();
//
//   function shiftElements() {
//     console.log('running');
//
//     $.each(gameSequence, function(index, cell) {
//       const cellClass = $(cell).attr('class').split(' ')[0];
//       const nextCell = $(cell).next().find(`.${cellClass}`);
//       console.log(nextCell);
//       $(nextCell).css('background', 'red');
//     });
//   }
//
//
//   // function dropDiv() {
//   //   const divDropTime = 990;
//   //   // setInterval(function () {
//   //   const selectedColumn = $('.selected').attr('class').split(' ')[0];
//   //   console.log($('.selected').next().find(`.${selectedColumn}`).css('background', 'red'));
//   //   // }, divDropTime);
//   // }
//   // dropDiv();
//
//
// });
