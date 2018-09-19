// getRow: This function should accept two arguments: a sudoku grid (represented by an array of arrays) and a row index. The function should return an array containing the numbers in the specified row.

// getColumn: This function should accept a sudoku grid and a column index. The function should return an array containing the numbers in the specified column.

// getGrid: This function should accept three arguments: a sudoku grid, and an x and y coordinate for one of the puzzle's 3x3 subgrids. The function should return an array with all the numbers in the specified subgrid.

// Remember that our puzzle is broken into 9 subgrids. In our coordinate system, (0,0) will represent the subgrid in the upper left, (1,0) will represent the upper-middle and so on.
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

