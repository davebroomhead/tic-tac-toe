console.log("Tic Tac Toe JS loaded");

//global variables

//turn is a global variable as it needs to be tracked from one play to the next
let turn = 2;
let gameSize = 3;

let gameBoardArray = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

const createGameBoard = function(){

    //clears grid area by making html empty
    $('.grid').html("");

    gameSize = $('.size-selector').val();

    console.log(`making ${gameSize}^2 spaces`);

    for (let i = 0; i < gameSize; i++) {
        for (let j = 0; j <gameSize; j++){
            const $newSpace = $("<div></div>");
            $newSpace.addClass(`space data-row="${i}" data-column="${j}"`);
            $('.grid').append($newSpace);
        }
    }
}


//manages turn with integer - player one is odd and player two even numbers
//updates page so user can see whose turn it is
const manageTurn = function(){

    //console.log("mangeTurn() ... turn = ",turn);

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
    $newX.addClass("move");
    $newX.html('X');
    space.html($newX);
    gameBoardArray[row][column] = 1;
}

//places O in space passed into function from placeMove()
const placeO = function(space,row,column){
    const $newO = $("<span></span>");
    $newO.addClass("move");
    $newO.html('O');
    space.html($newO);
    gameBoardArray[row][column] = -1;
}

//checks if space player clicks on is empty
const checkSpaceIsEmpty = function(space){
    if (space.html() === ''){
        return true;
    }
}

//checks for winner by using score variable, array is updated with 1 for player 1 and -1 for player 2
//player wins when row, column, or diagonal sum === 3 or -3
const checkForWinner = function(){

    //checks if the score is 3 or -3, indicating winner
    const checkScore = function(score){
        if (score === 3){
            $('.messages').html("*Cross wins!*");
            $('.player-turn').html("");
        }else if(score === -3){
            $('.messages').html("*Circle wins!*");
            $('.player-turn').html("");
        }
    }  


    //loop that iterates through rows by iterating through arrays within gameBoard to check for winner
    for (let i = 0; i < gameBoardArray.length; i++){
        gameScore = 0;
        for(let j = 0; j < gameBoardArray[i].length; j++){
            gameScore = gameScore + gameBoardArray[i][j];
            checkScore(gameScore);
        }
    }


    //loop that iterates through columns by iterating through arrays within gameBoard to check for winner
    for (let i = 0; i < gameBoardArray.length; i++){
        gameScore = 0;
        for(let j = 0; j < gameBoardArray[i].length; j++){
            gameScore = gameScore + gameBoardArray[j][i];
            checkScore(gameScore);
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
const checkForDraw = function(){

    if (turn === 11){
        console.log("it's a draw!");
    }

} // end checkForDraw()


//primary function that invokes above functions, manages gameplay
const placeMove = function(){
    
    //expect blank array of zeros (not the case)
    //console.log("this text is before the board is changed: ",gameBoard);


    const clickSpace = $(this);
    //saves the jQuery element of the space clicked into variable 'clickSpace'


    const clickSpaceRow = clickSpace.attr('data-row');
    const clickSpaceColumn = clickSpace.attr('data-column');
    
    console.log(clickSpace);
    console.log("clickSpace.attr('data-row') = ",clickSpace.attr('data-row'));
    console.log(clickSpaceRow,clickSpaceColumn);

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

    }else{
        $('.messages').html("*space taken!*");
    }


    checkForWinner();
    checkForDraw();

} // placeMove()

//createGameBoard();

//when the user clicks on a div with the class of space, it runs placeMove()
$('.space').on('click',placeMove);

//creates game board of specified size when user sets size field
$('.size-selector').on('change',createGameBoard);