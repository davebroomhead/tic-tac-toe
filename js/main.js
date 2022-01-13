console.log("Tic Tac Toe JS loaded");

//global variables

//turn is a global variable as it needs to be tracked from one play to the next
let turn = 2;
let gameSize = 3;
let crossScore = 0;
let circleScore = 0;
let fontSizeVariable = Math.floor(228 * Math.pow(gameSize,-1.267));

let gameBoardArray = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]


const createGameBoardArray = function(size){
    gameBoardArray = [''];
    for (let i = 0; i < size; i++) {
        gameBoardArray[i] = [''];
        for (let j = 0; j < size; j++){
        gameBoardArray[i][j] = 0;
        }
    }
}

const createGameBoard = function(){

    turn = 2;

    $('.player-turn').html(`Cross's turn`);
    $('.messages').html("");

    //clears grid area by making html empty
    $('.grid').html("");

    gameSize = $('.size-selector').val();

    createGameBoardArray(gameSize);

    fontSizeVariable = Math.floor(228 * Math.pow(gameSize,-1.267));

    for (let i = 0; i < gameSize; i++) {
        for (let j = 0; j <gameSize; j++){
            const $newSpace = $("<div></div>");
            $newSpace.addClass('space');
            $newSpace.data('row',i);
            $newSpace.data('column',j);
            $('.grid').append($newSpace);
        }
    }

    $('.grid').css('grid-template-columns',`repeat(${gameSize}, 1fr)`);
    $('.grid').css('grid-template-rows',`repeat(${gameSize}, 1fr)`);

    $('.space').on('click',placeMove);
}

//manages turn with integer - player one is odd and player two even numbers
//updates page so user can see whose turn it is
const manageTurn = function(){

    turn += 1;
    if (turn % 2 === 0){
        $('.player-turn').html(`Cross's turn`);
    }else {
        $('.player-turn').html(`Nought's turn`);
    }
}

//places X in space passed into function from placeMove()
const placeX = function(space,row,column){
    const $newX = $("<span></span>");
    $newX.addClass("move").css('font-size',fontSizeVariable + 'px');
    $newX.html('X');
    space.html($newX);
    gameBoardArray[row][column] = 1;
}

//places O in space passed into function from placeMove()
const placeO = function(space,row,column){
    const $newO = $("<span></span>");
    $newO.addClass("move").css('font-size',fontSizeVariable + 'px');
    $newO.html('O');
    space.html($newO);
    gameBoardArray[row][column] = -1;
}

//checks if space player clicks on is empty
const checkSpaceIsEmpty = function(space){
    if (space.is(':empty')){
        return true;
    }
}

//checks for winner by using score variable, array is updated with 1 for player 1 and -1 for player 2
//player wins when row, column, or diagonal sum === 3 or -3
const checkForWinner = function(){

let gameScore = 0;


    //checks if the score is value of gameboard size, indicating winner
    //adds 1 to scoreboard for winning player
    const checkScore = function(score){

    console.log("score = ",score);

        gameSize = parseInt(gameSize);
        if (score === gameSize){
            $('.messages').html("*Cross wins!*");
            $('.player-turn').html("");
            crossScore += 1;
            $('.cross-score').html(`Cross: ${crossScore}`);
            
            return true; // need something here to end game ****

        }else if(score === -gameSize){
            $('.messages').html("*Nought wins!*");
            $('.player-turn').html("");
            circleScore += 1;
            $('.nought-score').html(`Nought: ${circleScore}`);
            return true;

        }else if(turn === ((gameSize * gameSize) + 2)){
            $('.messages').html("*It's a draw!*");
            $('.player-turn').html("");
            return true;
        }

        return false;

    }; //end of checkScore()


    //loop that iterates through rows by iterating through arrays within gameBoard to check for winner
    for (let i = 0; i < gameBoardArray.length; i++){
        gameScore = 0;
        for(let j = 0; j < gameBoardArray[i].length; j++){
            gameScore = gameScore + gameBoardArray[i][j];
            if (checkScore(gameScore)){
                return true
            };
        }
    }


    //loop that iterates through columns by iterating through arrays within gameBoard to check for winner
    for (let i = 0; i < gameBoardArray.length; i++){
        gameScore = 0;
        for(let j = 0; j < gameBoardArray[i].length; j++){
            gameScore = gameScore + gameBoardArray[j][i];
            checkScore(gameScore);
            //if
        }
    } 
    
    gameScore = 0;
    //loop that checks diagonal top left to bottom right for winner
    for (let i = 0; i < gameBoardArray.length; i++){
        gameScore = gameScore + gameBoardArray[i][i];
        checkScore(gameScore);
    }

    //loop that checks diagonal top right to bottom left for winner
    gameScore = 0;
    for (let i = 0; i < gameBoardArray.length; i++){
        let j = gameBoardArray.length - i - 1;
        gameScore = gameScore + gameBoardArray[i][j];
        checkScore(gameScore);
    }


} //end checkForWinner()

// checks for a draw by referencing turn counter
// const checkForDraw = function(){

//     if (turn === ((gameSize * gameSize) + 2)){
//         $('.messages').html("*It's a draw!*");
//         $('.player-turn').html("");
//     }

// } // end checkForDraw()

//primary function that invokes above functions, manages gameplay
const placeMove = function(){
    
    const clickSpace = $(this);
    //saves the jQuery element of the space clicked into variable 'clickSpace'

    const clickSpaceRow = clickSpace.data('row');
    const clickSpaceColumn = clickSpace.data('column');

    const spaceEmpty = checkSpaceIsEmpty(clickSpace);
    //checks the space clicked on is empty

    //conditional that allows move if space is empty, otherwise tells user the space is taken and prevents move
    if (spaceEmpty === true){

        if(turn % 2 === 0){
            placeX(clickSpace,clickSpaceRow,clickSpaceColumn);
        }else {
            placeO(clickSpace,clickSpaceRow,clickSpaceColumn);
        }
        $('.messages').html("");
        //player turn changes at the end of the move
        manageTurn()

    }else {
        $('.messages').html("*space taken!*");
    }


    checkForWinner();
    // checkForDraw();

} // placeMove()

createGameBoard();


//creates game board of specified size when user sets size field
$('.size-selector').on('change',createGameBoard);

//resets gameboard when clicked
$('.reset-button').on('click',createGameBoard);