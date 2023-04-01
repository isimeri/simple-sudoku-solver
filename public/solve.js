// const matrix = [
//     [0,0,9,0,0,5,0,1,0],
//     [8,5,0,4,0,0,0,0,2],
//     [4,3,2,0,0,0,0,0,0],
//     [1,0,0,0,6,9,0,8,3],
//     [0,9,0,0,0,0,0,6,0],
//     [6,2,0,7,1,0,0,0,9],
//     [0,0,0,0,0,0,1,9,4],
//     [5,0,0,0,0,4,0,3,7],
//     [0,4,0,3,0,0,6,0,0]
// ];
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
]
const puzzlesAndSolutions = [
    [
      '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
      '135762984946381257728459613694517832812936745357824196473298561581673429269145378'
    ],
    [
      '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
      '568913724342687519197254386685479231219538467734162895926345178473891652851726943'
    ],
    [
      '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1',
      '218396745753284196496157832531672984649831257827549613962415378185763429374928561'
    ],
    [
      '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6',
      '473891265851726394926345817568913472342687951197254638734162589685479123219538746'
    ],
    [
      '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51',
      '827549163531672894649831527496157382218396475753284916962415738185763249374928651'
    ]
  ];



// const pos = {row: 1, col: 4};     //starting from top left corner of the board
function strToMatrix(strs){
    let c;
    let str = Array.from(strs)
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
}
function matrixToStr(){
    let str = '';

    for(let i=0;i<9;i++){
        for(let j=0; j<9; j++){
            str+=matrix[i][j];
        }
    }
    return str;
}

function sameRow(pos, num){

    for(let i = 0; i<9; i++){
        if(num === matrix[pos.row][i]){
            // console.log("found on the same row")
            return true;
        }
    }
}
function sameCol(pos, num){

    for(let i = 0; i<9; i++){
        if(num === matrix[i][pos.col]){
                // console.log("found on the same column")
            return true
        }
    }
}

function sameGroup(pos, num){

    const gRow = Math.floor(pos.row / 3)*3;
    const gCol = Math.floor(pos.col / 3)*3;

    for(let i=gRow; i<gRow+3; i++){
        for(let j=gCol; j<gCol+3; j++){
            if(num === matrix[i][j]){
                // console.log("found in the same group")
                return true;
            }
        }
    }
}

function checkPos(row, col, num){
    let pos = {row, col};
    if(!sameCol(pos, num) && !sameRow(pos, num) && !sameGroup(pos, num)){
        // console.log(`${num} fits inside the ${pos.row+1}, ${pos.col+1} cell`);
        return true;
    }
}

function solve(){
    let count = 0;
    let num;
    for(let i=0;i<9;i++){
        for(let j=0; j<9; j++){
            if(matrix[i][j] !== 0) continue;
            count = 0;
            for(let k=1; k<=9; k++){
                if(checkPos(i, j, k)){
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
function print(){
    let row='';
    for(let i=0;i<9;i++){
        row='';
        for(let j=0; j<9; j++){
            row = row + ' | ' + matrix[i][j];
        }
        console.log(row);
        console.log('____________________________________');
    }
}
// checkPos(pos, 2);
strToMatrix(puzzlesAndSolutions[4][0]);

let emptyCells = 0;

for(let i=0;i<9;i++){
    for(let j=0; j<9; j++){
        if(matrix[i][j] === 0){
            emptyCells++;
        }
    }
}

print();
while(emptyCells > 0){

    solve();
}
console.log("=======================================================================");
print();
if(puzzlesAndSolutions[4][1] === matrixToStr()){
    console.log("idem");
}