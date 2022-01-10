console.log("Tic Tac Toe JS loaded");

//global variables

//turn is a global variable as it needs to be tracked from one play to the next
let turn = 1;

let gameBoard = [
    [1,0,1],
    [-1,-1,-1],
    [1,0,1]
]

//manages turn with integer - player one is odd and player two even numbers
//updates page so user can see whose turn it is
const manageTurn = function(){
    turn += 1;
    if (turn % 2 === 0){
        $('.player-turn').html(`Player two's turn`);
    }else {
        $('.player-turn').html(`Player one's turn`);
    }
}

//places X in space passed into function from placeMove()
const placeX = function(space){
    const $newX = $("<span></span>");
    $newX.addClass("move");
    $newX.html('X');
    space.html($newX); 
}

//places O in space passed into function from placeMove()
const placeO = function(space){
    const $newO = $("<span></span>");
    $newO.addClass("move");
    $newO.html('O');
    space.html($newO);
}

//checks if space player clicks on is empty
const checkSpaceIsEmpty = function(space){
    if (space.html() === ''){
        return true;
    }
}

//checks for winner by ...
const checkForWinner = function(){

    const checkScore = function(score){
        if (score === 3){
            console.log('player one wins!');
        }else if(score === -3){
            console.log('player two wins!');
        }
    }  


    let gameScore = 0;
    //loop that iterates through rows by iterating through arrays within gameBoard    
    for (let i = 0; i < gameBoard.length; i++){
        gameScore = 0;
        for(let j = 0; j < gameBoard[i].length; j++){
            gameScore = gameScore + gameBoard[i][j];
            console.log(gameScore);
            checkScore(gameScore);
        }
    }
    


    gameScore = 0;
    //loop that iterates through columns by iterating through arrays within gameBoard    
    for (let i = 0; i < gameBoard.length; i++){
        gameScore = 0;
        for(let j = 0; j < gameBoard[i].length; j++){
            gameScore = gameScore + gameBoard[j][i];
            console.log(gameScore);
            checkScore(gameScore);
        }
    } 
    

    






} //end checkForWinner()

checkForWinner();




// **loops through entire gameboard > draw
//
// for(let i = 0; i < gameBoard.length; i++){
//     gameBoard[i]
//         for(let j = 0; j < gameBoard[i].length; j++){
//             console.log(gameBoard[i][j]);
//         }
// }

const placeMove = function(){
    
    const clickSpace = $(this);
    //saves the jQuery element of the space clicked into variable 'clickSpace'

    const spaceEmpty = checkSpaceIsEmpty(clickSpace);
    //checks the space clicked on is empty

    //conditional that allows move if space is empty, otherwise tells user the space is taken and prevents move
    if (spaceEmpty === true){
        if(turn % 2 === 0){
            placeX(clickSpace);
        }else {
            placeO(clickSpace);
        }
    }else{
        console.log("space taken!")
    }
    manageTurn()
    //player turn changes at the end of the move

} // placeMove()


//when the user clicks on a div with the class of space, it runs placeMove()
$('.space').on('click',placeMove);

