/*
 * Create a list that holds all of your cards
 */
 //list of all card in the game
var card = ["fa fa-diamond","fa fa-diamond","fa fa-paper-plane-o","fa fa-paper-plane-o",
            "fa fa-anchor","fa fa-anchor","fa fa-bolt","fa fa-bolt","fa fa-cube","fa fa-cube",
            "fa fa-leaf","fa fa-leaf","fa fa-bicycle","fa fa-bicycle","fa fa-bomb","fa fa-bomb"]

var openCard = []
var matchCard = []
var countMove = 0
var cardMatch = 0
var starInPopUp = 3;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 // create all of card from use "shuffle" function then append card in class deck
function drawCard(){
  var cardList  = shuffle(card);
  cardList .forEach(function(cards) {
  $(".deck").append('<li><i class="card '+ cards +'"></i></li>');
})
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

drawCard()

//function to reset and fold card
function foldCard(){
  $(".card").removeClass("open show wrong");
  openCard = [];
}

//function to delay when folding card
var timeOut;

function delayFoldCard(){
  timeOut = setTimeout(foldCard, 1000);
}

//section score show count move and reduce stars
function showMove(){
  if (countMove < 2){
    $("#movesText").text(" Move");
  } else{
    $("#movesText").text(" Moves");
  }
  $("#moves").text(countMove);
  //reduce stars
  if (countMove > 20){
    starInPopUp = 2;
    $("#starOne").removeClass()
  }
  if (countMove > 25){
    starInPopUp = 1;
    $("#starTwo").removeClass()
  }
}

//function to open the card
$(".card").on("click",function(){
  $(this).toggleClass("open show");
  //$(this).unbind("click"); disable click when card open
  openCard.push($(this));
  if (openCard.length === 2) {
    if (openCard[0][0].classList[2] === openCard[1][0].classList[2]) {
    openCard[0][0].classList.add("match");
    openCard[1][0].classList.add("match");
    matchCard.push("openCard[0][0]");
    openCard = []
    countMove += 1
    cardMatch += 1
    showMove()
    if (cardMatch == 8 ){
      openPopUp()
    }
    } else {
      openCard[0][0].classList.add("wrong");
      openCard[1][0].classList.add("wrong");
      countMove += 1
      showMove()
      delayFoldCard()
    }
  }
});

//Reload the page
function reloadPage(){
  location.reload()
}

//Pop up after finished game
function openPopUp(){
  $("#popUpMoves").text(countMove);
  for (var i = 0; i < starInPopUp; i++) {
    $("#popUpStar").append("<i class='fa fa-star'></i>");
  }
  $("#popUp").fadeIn();
}
function closePopUp(){
  $("#popUp").fadeOut();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
