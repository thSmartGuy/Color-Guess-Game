// alert("connectoed")
const resetButton = document.querySelector("#reset") ;
const headerObj = document.querySelector("#header") ;
const colorText = document.querySelector("#colorDisplay");
const squaresObj = document.querySelectorAll(".square") ;
const messageSpan = document.getElementById('message') ;
const easyBtn = document.querySelector("#easyBtn") ;  
const hardBtn = document.querySelector("#hardBtn") ;  

var colors = [] ;
var numberOfSquares = 6 ;

function pickRandomColor(){
    const color = colors[Math.floor(Math.random()*Math.floor(colors.length))] ;
    return color ;
}

function generateRandomColors(num){
    var colorsArr = [] ;

    for(var ii = 0 ; ii < num ; ii++){
        var str = "rgb(" ;
        for(var i = 0 ; i < 3 ; i++){
          const val = Math.floor(Math.random()*Math.floor(255)) ;
          str += (val + 1) ;
          if(i != 2){
            str += ", " ;
          }
        }

        str+=")";

        colorsArr.push(str) ;
    }


    colors = colorsArr ;

};

// when the page loads generate random colors   
generateRandomColors(numberOfSquares) ;

// choose a color frm the colors array...this is the color you have to guess
var fixedColor = pickRandomColor() ;
colorText.textContent = fixedColor ;

for(var i = 0 ; i < squaresObj.length ; i++){
    // assign colors to all squares
    squaresObj[i].style.backgroundColor = colors[i] ;

    // add click listners
    squaresObj[i].addEventListener("click", function(){
        const pickedColor = this.style.backgroundColor ;

        if(pickedColor === fixedColor){ 
            // make all squares same color
            for(var i = 0 ; i < squaresObj.length ; i++){
                squaresObj[i].style.backgroundColor = pickedColor ;
            }

            // make background of header as same color as correct color

            headerObj.style.backgroundColor = pickedColor ;

            // show the correct message
            messageSpan.textContent = "Correct!" ;

            // change the contents of Button from new colors to play again
            resetButton.textContent = "Play Again" ;
        }
        else{ 
            // hide the square
            this.style.backgroundColor = "#232323" ;

            // show the incorrect message
            messageSpan.textContent = "Incorrect! Try Again!!" ;
        }
    })
}

resetButton.addEventListener("click", function(){
    // generate all new colors

    resetForColors(numberOfSquares) ;

    // toggle bottom three squares to also visibl
    // toggle visibilty only if the current mode is hard
    if(numberOfSquares > 3){
        for(var i = 3 ; i < squaresObj.length ; i++){
            squaresObj[i].style.display = "block" ;
        }
    }
});

easyBtn.addEventListener("click", function(){
    this.classList.add("selected") ;
    hardBtn.classList.remove("selected") ;

    numberOfSquares = 3 ;
    resetForColors(numberOfSquares) ;

    // hide bottom 3 squares
    for(var i = 3 ; i < squaresObj.length ; i++){
        squaresObj[i].style.display = "none" ;
    }
})

hardBtn.addEventListener("click", function(){
    this.classList.add("selected") ;
    easyBtn.classList.remove("selected") ;

    numberOfSquares = 6 ;
    resetForColors(numberOfSquares) ;
    
    // toggle bottom three squares to also visible
    for(var i = 3 ; i < squaresObj.length ; i++){
        squaresObj[i].style.display = "block" ;
    }
})

function resetForColors(num){
    generateRandomColors(num) ;


    // pick a new correct color 
    fixedColor = pickRandomColor() ;

    // change textContent of header span 
    colorText.textContent = fixedColor ;

    // assign colors to block 
    for(var i = 0 ; i < squaresObj.length ; i++){
        squaresObj[i].style.backgroundColor = colors[i] ;
    }

    // chane the header color back
    headerObj.style.backgroundColor = "steelblue" ;

    // stripe message to empty
    messageSpan.textContent = "" ;

    //changeButtonContent
    resetButton.textContent = "New Colors" ;
}