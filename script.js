
let puzzle = [[ 8,9,5,   7,4,2,   1,3,6 ],
              [ 2,7,1,   9,6,3,   4,8,5 ],
              [ 4,6,3,   5,8,1,   7,9,2 ],

              [ 9,3,4,   6,1,7,   2,5,8 ],
              [ 5,1,7,   2,3,8,   9,6,4 ],
              [ 6,8,2,   4,5,9,   3,7,1 ],

              [ 1,5,9,   8,7,4,   6,2,3 ],
              [ 7,4,6,   3,2,5,   8,1,9 ],
              [ 3,2,8,   1,9,6,   5,4,7 ]];


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
        debugger;
        for(let i = x ; i < x+3; i++){
            subGrid.push(grid[y+j][i]);
        } 
    }
    return subGrid;
}

// We now have functions that accept a sudoku grid and return specific subsections (row, column, or subgrid).

// Now we need to write a function that will accept a subsection and check that it includes the numbers 1-9 (with no repeats). Write a function includes1to9 that accomplishes this.

const subCheck = (arr) => {
    debugger;
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

subCheck([1,1,2,3,4,5,6,7,8]);