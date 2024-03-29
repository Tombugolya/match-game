var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var colors = ['hsl(25, 85%, 65%)',
                'hsl(55, 85%, 65%)',
                'hsl(90, 85%, 65%)',
                'hsl(160, 85%, 65%)',
                'hsl(220, 85%, 65%)',
                'hsl(265, 85%, 65%)',
                'hsl(310, 85%, 65%)',
                'hsl(360, 85%, 65%)'];
  
  $game.empty();
  $game.data('flippedCards', []);
  
  for (var i = 0 ; i < cardValues.length ; i++){
    var value = cardValues[i];
    var color = colors[value - 1];
    var data = {
      value: value,
      color: color,
      isFlipped: false
    };
    var $cardElement = $('<div class="card col-xs-3"></div>');
    $cardElement.data(data);
    $game.append($cardElement);
    
    $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });
  }
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */
var overallFlipped = [];
MatchGame.flipCard = function($card, $game) {
  if ($card.data('isFlipped')){
    return;
  }
  
  play("flip");
  $card.css('background-color', $card.data('color'))
    .text($card.data('value'))
    .data('isFlipped', true);
  
  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);
  
  if (flippedCards.length === 2){
    if (flippedCards[0].data('value') == flippedCards[1].data('value')){
      flippedCards[0].css("color", "rgb(204, 204, 204)");
      flippedCards[0].css("background-color", "rgb(153, 153, 153)");
      flippedCards[1].css("color", "rgb(20  4, 204, 204)");
      flippedCards[1].css("background-color", "rgb(153, 153, 153)");
      overallFlipped.push(1, 1);
      if (overallFlipped.length === 16){
          play("win");
          }
    } else {
      window.setTimeout(function(){
      flippedCards[0].css("background-color", "rgb(32 ,64 ,86)")
        .text(" ")
        .data("isFlipped", false);
      flippedCards[1].css("background-color", "rgb(32,64,86)")
        .text(" ")
        .data("isFlipped", false);}, 350);
        play("unflip");
      }
      $game.data('flippedCards', []);
  }
};

/*
    Sound effects
*/

function play(id) {
    var audio = document.getElementById(id);
    audio.play();
}