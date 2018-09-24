//// test sudoku grids
//let puzzleTrue = [[ 8,9,5,7,4,2,1,3,6 ],
//              [ 2,7,1,9,6,3,4,8,5 ],
//              [ 4,6,3,5,8,1,7,9,2 ],
//              [ 9,3,4,6,1,7,2,5,8 ],
//              [ 5,1,7,2,3,8,9,6,4 ],
//              [ 6,8,2,4,5,9,3,7,1 ],
//              [ 1,5,9,8,7,4,6,2,3 ],
//              [ 7,4,6,3,2,5,8,1,9 ],
//              [ 3,2,8,1,9,6,5,4,7]];
//
//let puzzleFalse = [[ 8,8,5,7,4,2,1,3,6 ],
//              [ 8,7,1,9,6,3,4,8,5 ],
//              [ 4,6,3,5,8,1,7,9,2 ],
//              [ 9,3,4,6,1,7,2,5,8 ],
//              [ 5,1,7,2,3,8,9,6,4 ],
//              [ 6,8,2,4,5,9,3,7,1 ],
//              [ 8,5,9,8,7,4,6,2,3 ],
//              [ 7,7,6,3,2,5,8,1,1 ], 
//              [ 3,2,8,1,9,6,5,4,7 ]];

// object of methods  and values used in sudokuChecker
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

    //checks a sub array of 9 to make sure it passes sudoku rules. Returns true or false an and array or coords of repeating numbers.
    subCheck : function (arr) {
        let arrOfRepeaters = [];
        let result = [true, arrOfRepeaters];
        for(let i = 0; i < arr.length; i++){
            let currentNum = arr[i];
            for(let j = i+1; j < arr.length; j++){
                if(currentNum === arr[j]){
                    arrOfRepeaters.push(i);
                    arrOfRepeaters.push(j);
                    result[0] = false;
                }
            }
        }
        return result;
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
    },
    
    //returns coords of repeating numbers from affected sections
    returnRepSecCoords : function (x, y, id){
      y *=3;
      x *=3;
      if(id < 3){
        resultX = x;
      }
      else if(id < 6){
        resultX = (x+1);
        y-=3;
      }
      else{
        resultX = (x+2);
        y-=6;
      }
      resultY = y+id;
    return [resultY, resultX];
    },
    
    //results are sent here
    result : true,
    
    message : null,
    
    affectedRows : [],
    
    affectedColumns : [],
    
    affectedSections : [],
    
    repeatingNumbers : [],
    
    secRepeaters : [],
    
}


//function to check each row, column and subgrid of the sudoku grid for sudoku rules
function sudokuChecker(puzzle){
    
    
        //itterates through each row checking for sudoku rules
        function checkRows(puzzle){
            let rowRepeaters = [];
            for(let i = 0; i < puzzle.length; i++){
                let currentRow = sudMethodsObj.getRow(puzzle, i);
                if(sudMethodsObj.subCheck(currentRow)[0] === false){
                    sudMethodsObj.affectedRows.push(i);
                    rowRepeaters.push([i,sudMethodsObj.subCheck(currentRow)[1]]);
                    if(sudMethodsObj.result !== "incorrectInputArray"){
                        sudMethodsObj.result = false;
                    }  
                }
            }
            //formats repeaters in coord pairs and pushes them to repeatingNumbers array
            for(let i = 0; i < rowRepeaters.length; i++){
                for(let j = 0; j < rowRepeaters[i].length; j++){
                    let currentCoor = [rowRepeaters[i][0], rowRepeaters[i][j]];
                    for(let k = 0; k < rowRepeaters[i][j].length; k++){
                        let currentCoord = [rowRepeaters[i][j][k],rowRepeaters[i][0]];
                        sudMethodsObj.repeatingNumbers.push(currentCoord);
                    }
                }
            }
        }
      
        //itterates through each column checking for sudoku rules    
        function checkColumns(puzzle){
            let colRepeaters = [];
            for(let i = 0; i < puzzle[0].length; i++){
                let currentCol = sudMethodsObj.getColumn(puzzle, i);
                if(sudMethodsObj.subCheck(currentCol)[0] === false){
                    sudMethodsObj.affectedColumns.push(i);
                    colRepeaters.push([i,sudMethodsObj.subCheck(currentCol)[1]]);
                    if(sudMethodsObj.result !== "incorrectInputArray"){
                        sudMethodsObj.result = false;
                    }
                }
            }
            //formats repeaters in coord pairs and pushes them to repeatingNumbers array
            for(let i = 0; i < colRepeaters.length; i++){
                for(let j = 0; j < colRepeaters[i].length; j++){
                    let currentCoor = [colRepeaters[i][0], colRepeaters[i][j]];
                    for(let k = 0; k < colRepeaters[i][j].length; k++){
                        let currentCoord = [colRepeaters[i][0],colRepeaters[i][j][k]];
                        sudMethodsObj.repeatingNumbers.push(currentCoord);
                    }
                }
            }
        }
    
        //itterates through each subgrid checking for sudoku rules
        function checkSection(puzzle){
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    let currentSec = sudMethodsObj.getSection(puzzle, j, i);
                    if(sudMethodsObj.subCheck(currentSec)[0] === false){
                    sudMethodsObj.secRepeaters.push([i, j, sudMethodsObj.subCheck(currentSec)[1]]);
                    sudMethodsObj.affectedSections.push([j,i]);
                    if(sudMethodsObj.result !== "incorrectInputArray"){
                       sudMethodsObj.result = false; 
                    }
                }
            }
        }
    }

    
    function displayResults() {
        
        // sets message for true or false
        if(sudMethodsObj.result === true){
            sudMethodsObj.message = "😎 Looks great! 😎";
        }
        if(sudMethodsObj.result === false){
            sudMethodsObj.message = "😓 No dice. 😓";
        }
        if(sudMethodsObj.result === "incorrectInputArray"){
            sudMethodsObj.message = "😖 You entered the wrong amount of numbers. 😖"
        }
        
        document.getElementById('displayMessage').innerHTML = sudMethodsObj.message;

        // displays results
        document.getElementById('displayMessage').style.display = 'block';
        document.getElementById("displayGrid").style.display = 'grid';
        
    }
    
    //function calls
    checkRows(puzzle);
    checkColumns(puzzle);
    checkSection(puzzle)
    displayResults();
    
    //returns true or false
    return sudMethodsObj.result;
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
          sudMethodsObj.result = "incorrectInputArray";
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

//writes a string of divs that display as the input grid
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
            let currentDiv = `<div class="gridSquare" id="[${[j,i]}]"<p>${currentNum}</p></div>`;
            coordsStr +=currentDiv;
            }
        }
        return coordsStr;
}

//displays the input grid with incorrect rows, columns, and sections highlighted
function displayResultsGrid(){
    
    let display = coordsBuilder(setGrid());
    document.getElementById('displayGrid').innerHTML = display;
    //changes the background color of incorrect rows and columns
    function changeColor() {
        if(sudMethodsObj.affectedRows.length > 0){
            for(let j = 0; j < sudMethodsObj.affectedRows.length; j++){
                for(let i = 0; i < 9; i++){
                    let currentCoord = `[${i},${sudMethodsObj.affectedRows[j]}]`;
                    document.getElementById(`${currentCoord}`).style.backgroundColor = "#ff997a";
                }
            }
        } 
        if(sudMethodsObj.affectedColumns.length > 0){
            for(let i = 0; i < sudMethodsObj.affectedColumns.length; i++){
                for(let j = 0; j < 9; j++){
                    let currentCoord = `[${sudMethodsObj.affectedColumns[i]},${j}]`;
                    document.getElementById(`${currentCoord}`).style.backgroundColor = "#ff997a"; 
                }
            }
        }
    }
    
    //finds the coords of incorrect sections and colors them on the display grid
    function findAndColorSections(){

        // makes an array of coords
        function getSectionInd(grid, x, y) {
            y *=3;
            x *=3;
            let affectedCoordsArr = [];
            for(let j = 0; j < 3; j++){
                    for(let i = x ; i < x+3; i++){
                    affectedCoordsArr.push([(y+j), i]);
                } 
            }
            return affectedCoordsArr;
        }

      //itterates through the affected sections to get an array of coords
        function itterateThruInd(){
            let arrOfAffectedSec = [];
            for(let i = 0; i < sudMethodsObj.affectedSections.length; i++){
                let currentArr = getSectionInd(setGrid(), sudMethodsObj.affectedSections[i][0], sudMethodsObj.affectedSections[i][1]);
                arrOfAffectedSec.push(currentArr.slice());
            }
            return arrOfAffectedSec;
        }
        
      //colors the affected elements on the display grid
        function colorAffectedSecs(){
            let arrOfAffected = itterateThruInd();
            for(let i = 0; i < arrOfAffected.length; i++){
                let currentNestedArr = arrOfAffected[i];
                for(let j = 0; j < currentNestedArr.length; j++){
                    let currentArr = currentNestedArr[j];
                    let currentCoord = `[${currentArr[1]},${currentArr[0]}]`;

                    document.getElementById(`${currentCoord}`).style.backgroundColor = "#ff997a";  
                }
            }
        }
        
        //color repeating numbers from repeatingNumbers array
        function colorRepeaters(){
            for(let i = 0; i < sudMethodsObj.repeatingNumbers.length; i++){
                let currentCoord = `[${sudMethodsObj.repeatingNumbers[i][0]},${sudMethodsObj.repeatingNumbers[i][1]}]`;
                document.getElementById(`${currentCoord}`).style.color = "rgb(239, 0, 0)";
                document.getElementById(`${currentCoord}`).style.fontSize = "135%";
            }
        }
        
        //takes repeating numbers from sections and pushes correctly formatted coordinates to repeatingNumbers array
        function returnArrOfRepSecCos(){
          for(let i = 0; i < sudMethodsObj.secRepeaters.length; i++){
            for(let j = 0; j < sudMethodsObj.secRepeaters[i][2].length; j++){
              let currentEl = [sudMethodsObj.secRepeaters[i][0], sudMethodsObj.secRepeaters[i][1], sudMethodsObj.secRepeaters[i][2][j]];
              let resultCoords = sudMethodsObj.returnRepSecCoords(currentEl[0], currentEl[1], currentEl[2]);
              sudMethodsObj.repeatingNumbers.push(resultCoords);
            }
          }
        }
        
        //function calls
        returnArrOfRepSecCos();
        colorAffectedSecs();
        colorRepeaters();
        changeColor();
    }
    
    //function calls
    findAndColorSections();
    console.log(sudMethodsObj.affectedRows);
}
    

//resets the result to true after results are displayed
function reset(){
    sudMethodsObj.result = true;
    sudMethodsObj.message = null;
    sudMethodsObj.affectedRows = [];
    sudMethodsObj.affectedColumns = [];
    sudMethodsObj.affectedSections = [];
    sudMethodsObj.repeatingNumbers = [];
    sudMethodsObj.secRepeaters = [];
}







