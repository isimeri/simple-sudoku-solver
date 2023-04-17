// let arr = [1,2,3]

// function fun (arr){
//     arr[1] = 5;
// }

// fun(arr);

// console.log(arr);
// const str = 'A';
// console.log(str.charCodeAt(0));

const regex = /[^\d\.]/g;

const str = '123g.xd';

console.log(str.match(regex));