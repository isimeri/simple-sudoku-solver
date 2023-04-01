class SudokuSolver {


  validate(puzzleString) {
    const regex = /[\d\.]/;
    const puzzleArray = Array.from(puzzleString);
    if(puzzleArray.length !== 81){
      return "not 81";
    }
    if(puzzleArray.some(elem => {
      return !regex.test(elem);
    })){
      return "invalid characters";
    }

  }

  checkRowPlacement(matrix, row, column, value) {
    
    for(let i = 0; i<9; i++){
      if(value === matrix[row][i]){
          // console.log("found on the same row")
          return true;
      }
    }
    return false;
  }

  checkColPlacement(matrix, row, column, value) {

    for(let i = 0; i < 9; i++){
      if(value === matrix[i][column]){
              // console.log("found on the same column")
          return true
      }
    }
    return false;
  }

  checkRegionPlacement(matrix, row, column, value) {

    const gRow = Math.floor(row / 3)*3;
    const gCol = Math.floor(column / 3)*3;

    for(let i=gRow; i<gRow+3; i++){
        for(let j=gCol; j<gCol+3; j++){
            if(value === matrix[i][j]){
                // console.log("found in the same group")
                return true;
            }
        }
    }
    return false;
  }

  checkPlacement(row, col, value){
    if(this.checkRowPlacement(matrix, row, col, value) === false && this.checkColPlacement(matrix, row, col, value) === false && this.checkRegionPlacement(matrix, row, col, value) === false){
      
    }
  }

  strToMatrix(puzzleString, matrix){
    let c;
    let str = Array.from(puzzleString)
    for(let i=0;i<9;i++){
        for(let j=0; j<9; j++){
            c = str[0];
            str.shift();
            if(c === '.'){
                matrix[i][j] = 0
            } else {
                matrix[i][j] = parseInt(c);
            }
        }
    }
    // return matrix;
}

  solve(puzzleString) {
    
    let matrix = [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
    ];
    let emptyCells = 0;

    this.strToMatrix(puzzleString, matrix);

    for(let i=0;i<9;i++){
      for(let j=0; j<9; j++){
        if(matrix[i][j] === 0){
          emptyCells++;
        }
      }
    } 

    while(emptyCells > 0){

      let count = 0;
      let num;
      for(let i=0;i<9;i++){
        for(let j=0; j<9; j++){
          if(matrix[i][j] !== 0) continue;
          count = 0;
          for(let k=1; k<=9; k++){
            if(this.checkRowPlacement(matrix, i, j, k) === false && this.checkColPlacement(matrix, i, j, k) === false && this.checkRegionPlacement(matrix, i , j , k) === false){
              count++;
              num = k;
            }
            if(count>1){
                break;
            }
          }
          if(count===1){
              matrix[i][j] = num;
              emptyCells--;
          }
        }
      }
    }
    let str = '';

    for(let i=0;i<9;i++){
      for(let j=0; j<9; j++){
        str+=matrix[i][j];
      }
    }
    return str;
  }
}

module.exports = SudokuSolver;

