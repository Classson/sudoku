
let puzzleTrue = [[ 8,9,5,7,4,2,1,3,6 ],
              [ 2,7,1,9,6,3,4,8,5 ],
              [ 4,6,3,5,8,1,7,9,2 ],
              [ 9,3,4,6,1,7,2,5,8 ],
              [ 5,1,7,2,3,8,9,6,4 ],
              [ 6,8,2,4,5,9,3,7,1 ],
              [ 1,5,9,8,7,4,6,2,3 ],
              [ 7,4,6,3,2,5,8,1,9 ],
              [ 3,2,8,1,9,6,5,4,7]];

let puzzleFalse = [[ 8,9,5,7,4,2,1,3,6 ],
              [ 8,7,1,9,6,3,4,8,5 ],
              [ 4,6,3,5,8,1,7,9,2 ],
              [ 9,3,4,6,1,7,2,5,8 ],
              [ 5,1,7,2,3,8,9,6,4 ],
              [ 6,8,2,4,5,9,3,7,1 ],
              [ 1,5,9,8,7,4,6,2,3 ],
              [ 7,7,6,3,2,5,8,1,1 ], //bad row
              [ 3,2,8,1,9,6,5,4,7 ]];


let checkerCoords = [[0,0], [1,0], [2,0],
                    [0,1], [1,1], [2,1],
                    [0,2], [1,2], [2,2]];

const getRow = (grid, rowInd) => {
    return grid[rowInd];
}

const getColumn = (grid, colInd) => {
    let colArr = [];
    for(let i = 0; i < grid.length; i++){
        colArr.push(grid[i][colInd]);
    }
    return colArr;
}

const getSection = (grid, x, y) => {
    y *=3;
    x *=3;
    let subGrid = [];

    for(let j = 0; j < 3; j++){
        for(let i = x ; i < x+3; i++){
            subGrid.push(grid[y+j][i]);
        } 
    }
    return subGrid;
}

const subCheck = (arr) => {
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
}

function sudokuChecker(puzzle){
    let result = true;
//        function checkRows(puzzle){
//            for(let i = 0; i < puzzle.length; i++){
//                let currentRow = getRow(puzzle, i);
//                if(subCheck(currentRow) === false){
//                    result = false;
//                }
//            }
//        }
//        
//        function checkColumns(puzzle){
//            for(let i = 0; i < puzzle[0].length; i++){
//                let currentCol = getColumn(puzzle, i);
//                if(subCheck(currentCol) === false){
//                    result = false;
//                }
//            }
//        }
//    
        function checkSection(puzzle){
            for(let i = 0; i < puzzle.length; i++){
                let currentSec = getSection(puzzle, checkerCoords[i][0], checkerCoords[i][1]);
                if(subCheck(currentSec) === false){
                    result = false;
                }
            }
        }
    

    
    
    
    
    //checkRows(puzzle);
    //checkColumns(puzzle);
    checkSection(puzzle)
    console.log(result);
}

//console.log("i'm running");
sudokuChecker(puzzleTrue);