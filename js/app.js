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

$(function(){



  function running() {
    let compSelectTime = 1000;
    setInterval(function () {
      let compSelect = Math.floor(Math.random()*4 +2);
      let compRandom = $(`.row1:nth-child(${compSelect})`);
      console.log(compRandom);
      compRandom.css('background-color', 'black');
    }, compSelectTime);
  }
  running();



});
