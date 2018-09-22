// test sudoku grids
let puzzleTrue = [[ 8,9,5,7,4,2,1,3,6 ],
              [ 2,7,1,9,6,3,4,8,5 ],
              [ 4,6,3,5,8,1,7,9,2 ],
              [ 9,3,4,6,1,7,2,5,8 ],
              [ 5,1,7,2,3,8,9,6,4 ],
              [ 6,8,2,4,5,9,3,7,1 ],
              [ 1,5,9,8,7,4,6,2,3 ],
              [ 7,4,6,3,2,5,8,1,9 ],
              [ 3,2,8,1,9,6,5,4,7]];

let puzzleFalse = [[ 8,8,5,7,4,2,1,3,6 ],
              [ 8,7,1,9,6,3,4,8,5 ],
              [ 4,6,3,5,8,1,7,9,2 ],
              [ 9,3,4,6,1,7,2,5,8 ],
              [ 5,1,7,2,3,8,9,6,4 ],
              [ 6,8,2,4,5,9,3,7,1 ],
              [ 8,5,9,8,7,4,6,2,3 ],
              [ 7,7,6,3,2,5,8,1,1 ], 
              [ 3,2,8,1,9,6,5,4,7 ]];

let result = true;
let affectedRows = [];
let affectedColumns = [];
let affectedSections = [];

// object of methods used in sudokuChecker
let sudMethodsObj = {

    // gets a seperate array for a row of the grid
    getRow : function (grid, rowInd) {
        return grid[rowInd];
    },

    // gets a seperate array for a column of the grid
    getColumn : function (grid, colInd) {
        let colArr = [];
        for(let i = 0; i < grid.length; i++){
            colArr.push(grid[i][colInd]);
        }
        return colArr;
    },

    // gets a seperate array for a subgrid of the grid
    getSection : function (grid, x, y) {
        y *=3;
        x *=3;
        let subGrid = [];

        for(let j = 0; j < 3; j++){
            for(let i = x ; i < x+3; i++){
                subGrid.push(grid[y+j][i]);
            } 
        }
        return subGrid;
    },

    //checks a sub array of 9 to make sure it passes sudoku rules
    subCheck : function (arr) {
        if(arr.length !== 9){
            return false;
        }
        for(let i = 0; i < arr.length; i++){
            let currentNum = arr[i];
            for(let j = i+1; j < arr.length; j++){
                if(currentNum === arr[j]){
                    return false;
                }
            }
        }
        return true;
    },
    
    // array of coords to check each section of the grid
    coordsBuilder : function (x,y){
      let coordsArr = [];
      for(let i = 0; i < x; i++){
        for(let j = 0; j < y; j++){
          coordsArr.push([j,i]);
        }
      }
      return coordsArr;
    }
}


//function to check each row, column and subgrid of the sudoku grid for sudoku rules
function sudokuChecker(puzzle){
    
    
        //itterates through each row checking for sudoku rules
        function checkRows(puzzle){
            for(let i = 0; i < puzzle.length; i++){
                let currentRow = sudMethodsObj.getRow(puzzle, i);
                if(sudMethodsObj.subCheck(currentRow) === false){
                    affectedRows.push(i);  
                    result = false;
                }
            }
        }
      
        //itterates through each column checking for sudoku rules    
        function checkColumns(puzzle){
            for(let i = 0; i < puzzle[0].length; i++){
                let currentCol = sudMethodsObj.getColumn(puzzle, i);
                if(sudMethodsObj.subCheck(currentCol) === false){
                    affectedColumns.push(i); 
                    result = false;
                }
            }
        }
    
        //itterates through each subgrid checking for sudoku rules
        function checkSection(puzzle){
          for(let i = 0; i < (puzzle.length/3); i++){
            for(let j = 0; j < (puzzle.length/3); j++){
              let currentSec = sudMethodsObj.getSection(puzzle, j, i);
              if(sudMethodsObj.subCheck(currentSec) === false){
                result = false;
              }
            }
          }
        }

    
    function displayResults() {
        let message = null;
        // sets message for true or false
        if(result === true){
            message = "😎 Looks great! 😎";
        }
        if(result === false){
            message = "😓 No dice. 😓";
        }
        if(result === "incorrectInputArray"){
            message = "😖 You entered the wrong amount of numbers. 😖"
        }
        
        document.getElementById('displayMessage').innerHTML = message;

        // displays results
        document.getElementById('displayMessage').style.display = 'block';
        
    }
    
    //function calls
    checkRows(puzzle);
    checkColumns(puzzle);
    checkSection(puzzle)
    displayResults();
    

    //returns true or false
    console.log(result);
    return result;
}


// THERE MUST BE AN EASIER WAY TO DO THIS
//gets user input grid and converts from string to array
function setGrid() {
    let inputGridString = document.getElementById("userGrid").value;
    
    // an empty properly formatted grid
    let emptyArr = [[],[],[],[],[],[],[],[],[]];
    
      //removes all non-numbers
      let numbersString= inputGridString.replace(/\D/g,"");
    
      if(numbersString.length !== 81){
          result = "incorrectInputArray";
      }

      //populates empty array with numbers from the string
      for (let i =0; i < 9; i++){
        currentArr = emptyArr[i];
        for(let j = 0; j < 9; j++){
          currentNum = parseInt(numbersString[0]);
          currentArr.push(currentNum);
          numbersString = numbersString.substring(1); 
        }
      }
    
    //copies the resulting array onto a new array
    resultArr = emptyArr.slice();
    
    return resultArr;
}


const coordsBuilder = (puzzle) => {
    let coordsStr = '';
    let x = puzzle[0].length;
    let y = puzzle.length;
    for(let i = 0; i < x; i++){
        for(let j = 0; j < y; j++){
            let currentNum = puzzle[i][j];
            if(!currentNum){
                currentNum = "😕";
            }
            let currentDiv = `<div class="gridSquare" id="[${[j,i]}]">${currentNum}</div>`;
            coordsStr +=currentDiv;
            }
        }
        return coordsStr;
}


function displayResultsGrid(){
    let display = coordsBuilder(setGrid());
    document.getElementById('displayGrid').innerHTML = display;
    function changeColor() {
        if(affectedRows.length > 0){
            for(let j = 0; j < affectedRows.length; j++){
                for(let i = 0; i < 9; i++){
                    let currentCoord = `[${i},${affectedRows[j]}]`;
                    document.getElementById(`${currentCoord}`).style.backgroundColor = "rgba(251,82,62,0.4)"; 
                }
            }
        } 
        if(affectedColumns.length > 0){
            for(let i = 0; i < affectedColumns.length; i++){
                for(let j = 0; j < 9; j++){
                    let currentCoord = `[${affectedColumns[i]},${j}]`;
                    console.log(currentCoord);
                    document.getElementById(`${currentCoord}`).style.backgroundColor = "rgba(251,82,62,0.4)"; 
                }
            }
        }
    }
    changeColor();
}

//resets the result to true after results are displayed
function reset(){
    result = true;
    affectedRows = [];
    affectedColumns = [];
    affectedSections = [];
}






