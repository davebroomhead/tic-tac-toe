console.log("Tic Tac Toe JS loaded");

//global variables
//turn tracks whose turn it is - even is cross and odd is nought
let turn = 2;
//gameSize gets the size of the board, default to 3
let gameSize = 3;
//tracks score of cross player and nought player
let crossScore = 0;
let circleScore = 0;
//formula to make power relationship between gameboard size and font size
let fontSizeVariable = 56;

//default array to graphically represent gameboard in an array of arrays, allows scores to be added with function 
let gameBoardArray = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

//creates an array of arrays using game size variable
const createGameBoardArray = function(size){
    gameBoardArray = [''];
    for (let i = 0; i < size; i++) {
        gameBoardArray[i] = [''];
        for (let j = 0; j < size; j++){
        gameBoardArray[i][j] = 0;
        }
    }
}

//creates gameboalird array and grid of divs labelled with row and column numbers
const createGameBoard = function(){

    turn = 2;

    //displays message whose turn it is 
    $('.player-turn').html(`Cross's turn`);
    $('.messages').html("");

    //clears grid area by making html empty
    $('.grid').html("");

    //gets value of size selector for game size variable
    gameSize = $('.size-selector').val();

    //creates array for game size
    createGameBoardArray(gameSize);

    //sets font size for X and O's based on grid size
    fontSizeVariable = Math.floor(228 * Math.pow(gameSize,-1.267));

    //loop that generates divs and labels them with row and column numbers
    //adds 'data' row and column information (arbitrary data) using i and j loops variables
    //The .data() method allows us to attach data of any type to DOM elements in a way that is safe from circular references and therefore from memory leaks. -jQuery.com
    for (let i = 0; i < gameSize; i++) {
        for (let j = 0; j <gameSize; j++){
            const $newSpace = $("<div></div>");
            $newSpace.addClass('space');
            $newSpace.data('row',i);
            $newSpace.data('column',j);
            $('.grid').append($newSpace);
        }
    } //spent 3 hours to work out this curly bracket was in the wrong spot  :/

    //sets css grid structure using game size variabe
    $('.grid').css('grid-template-columns',`repeat(${gameSize}, 1fr)`);
    $('.grid').css('grid-template-rows',`repeat(${gameSize}, 1fr)`);

    //runs the place move function when a space (div) is clicked on - propagation not a problem?
    $('.space').on('click',placeMove);

} //end createGameBoard()


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
    
    console.log("running spaceEmpty()")

    if (space.children().length == 0){
        return true;
    }
    return false;
}

//checks if the score is value of gameboard size, indicating winner
//adds 1 to scoreboard for winning player
const checkScore = function(score){

    gameSize = parseInt(gameSize);

    console.log("running checkScore()");

    if (score === gameSize){
        $('.messages').html("*Cross wins!*");
        $('.player-turn').html("");
        console.log("adding score");
        crossScore += 1;
        $('.cross-score').html(`Cross: ${crossScore}`);
        return true;

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


//checks for winner by using score variable, array is updated with 1 for player 1 and -1 for player 2
//player wins when row, column, or diagonal sum === gameSize or -gameSize
const checkForWinner = function(){

let gameScore = 0;

    //loop that iterates through rows by iterating through arrays within gameBoard to check for winner
    for (let i = 0; i < gameBoardArray.length; i++){
        if (checkScore(gameScore)){
            return true;
        }
        gameScore = 0;
        for(let j = 0; j < gameBoardArray[i].length; j++){
            gameScore = gameScore + gameBoardArray[i][j];
            if (checkScore(gameScore)){
                return true;
            };
        }
    }


    //loop that iterates through columns by iterating through arrays within gameBoard to check for winner
    for (let i = 0; i < gameBoardArray.length; i++){
        if (checkScore(gameScore)){
            return true;
        }
        gameScore = 0;
        for(let j = 0; j < gameBoardArray[i].length; j++){
            gameScore = gameScore + gameBoardArray[j][i];
            checkScore(gameScore);
            if (checkScore(gameScore)){
                return true;
            };
        }
    } 
    
    gameScore = 0;
    //loop that checks diagonal top left to bottom right for winner
    for (let i = 0; i < gameBoardArray.length; i++){
        if (checkScore(gameScore)){
            return true;
        }
        gameScore = gameScore + gameBoardArray[i][i];
        checkScore(gameScore);
    }

    //loop that checks diagonal top right to bottom left for winner
    gameScore = 0;
    for (let i = 0; i < gameBoardArray.length; i++){
        if (checkScore(gameScore)){
            return true;
        }
        let j = gameBoardArray.length - i - 1;
        gameScore = gameScore + gameBoardArray[i][j];
        checkScore(gameScore);
    }
} //end checkForWinner()


//primary function that invokes above functions, manages gameplay
const placeMove = function(){

    //saves the jQuery element of the space clicked into variable 'clickSpace'
    const clickSpace = $(this);

    //gets row and column numbers from clicked space and saves into variables
    const clickSpaceRow = clickSpace.data('row');
    const clickSpaceColumn = clickSpace.data('column');

    //checks the space clicked on is empty
    const spaceEmpty = checkSpaceIsEmpty(clickSpace);

    //conditional that allows move if space is empty, otherwise tells user the space is taken and prevents move
    if (spaceEmpty === true){

        //equal turns are cross, odd turns nought
        //feeds location data into placeX or placeO functions
        if(turn % 2 === 0){
            placeX(clickSpace,clickSpaceRow,clickSpaceColumn);
        }else {
            placeO(clickSpace,clickSpaceRow,clickSpaceColumn);
        }
        //any error message cleared after turn
        $('.messages').html("");

        //player turn changes at the end of the move
        manageTurn()

        //checks for winnner after each turn
        checkForWinner();

    //if space is not empty, paste error message
    }else {
        $('.messages').html("*space taken!*");
    }
} // end placeMove()


//creates game board of specified size when user sets size field
$('.size-selector').on('change',createGameBoard);

//resets gameboard when clicked
$('.reset-button').on('click',createGameBoard);

//creates gameboard when page loads
createGameBoard();