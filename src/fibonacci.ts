// the fibonacci sequence

function fibonacci(n: number) {
  let temp: number[] = [0, 1, 1];

  if (n === 1 || n === 2) {
    return 1;
  }

  let i = 3;
  while (i < n + 1) {
    temp[i] = temp[i - 1] + temp[i - 2];
    i++;
  }

  return temp[n];
}

// seems recursion is faster in javascript
function fibonacci2(n: number, memo: number[] = []): number {
  if (memo[n] !== undefined) {
    return memo[n];
  }

  let result: number;
  if (n === 1 || n === 2) {
    result = 1;
  } else {
    result = fibonacci2(n - 1, memo) + fibonacci2(n - 2, memo);
  }
  
  memo[n] = result;
  return result;
}

let start = new Date();
console.log('expected: ', 10000, 'actual: ', fibonacci(257));
let end = new Date();
console.log('time taken = ', end.getTime() - start.getTime());

start = new Date();
console.log('expected: ', 10000, 'actual: ', fibonacci2(6126));
end = new Date();
console.log('time taken = ', end.getTime() - start.getTime());