console.log("Tic Tac Toe JS loaded");

//global variables

//turn is a global variable as it needs to be tracked from one play to the next
let turn = 2;

const manageTurn = function(){
    turn += 1;
    //add UI to indicate who's turn it is 
}


const placeX = function(space){
    const $newX = $("<span></span>");
    $newX.addClass("move");
    $newX.html('X');
    space.html($newX); 
}

const placeO = function(space){
    const $newO = $("<span></span>");
    $newO.addClass("move");
    $newO.html('O');
    space.html($newO);
}


const placeMove = function(){
    
    const clickSpace = $(this);

    if(turn % 2 === 0){
        placeX(clickSpace);
    }else {
        placeO(clickSpace);
    }

    manageTurn()
}


$('.space').on('click',placeMove);
