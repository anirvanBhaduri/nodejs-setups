type Callback = (input: any, error: Error | undefined) => void;

function nonPromiseFunction(someInput: string, cb: Callback) {
  // when some work has happened it will call the cb
  const someWork = someInput + 2;
  cb(someWork, undefined);
}

function promisfiedNonPromiseFunction(nonPromiseFn: any) {
  return (...args: any[]) =>
    new Promise((resolve, reject) => {
      nonPromiseFn(...args, (returnValue: any, error: Error | undefined) => {
        if (error) {
          return reject(error);
        }
        return resolve(returnValue);
      });
    });
}

(async () => {
  const promisifiedFn = promisfiedNonPromiseFunction(nonPromiseFunction);
  const returnValue = await promisifiedFn('2');
  console.log('promisified function', returnValue);
})();
nonPromiseFunction('2', (val) => console.log('nonPromiseFunction', val));

// code camp exercise

// percentage e.g. 0.1 = 10%, number range beginning = e.g. 1
// number range end = e.g. 10
type Distribution = [number, number, number][];

// generate n random numbers given a distribution
// since we have distribution percentage, we can do percentage * n = how many numbers to generate = Math.floor(percentage * n)
// generate the number using range values = lowest + Math.floor(Math.random() * (highest - lowest)) e.g. 1 + Math.floor(Math.random() * (10 - 1));
function randomGenerator(distribution: Distribution, n: number) {
  const randomNumbers = [];

  // run for each dist
  for (const dist of distribution) {
    const percentage = dist[0];
    const lowest = dist[1];
    const highest = dist[2];
    const diff = highest - lowest;

    // we want to generate n * dist random numbers
    const x = Math.floor(percentage * n);
    for (let i = 0; i < x; i++) {
      randomNumbers.push(lowest + Math.floor(Math.random() * diff));
    }
  }

  return randomNumbers;
}

// generate random numbers, where 20% of the time they are between 1 - 10
// 30% between 11 - 20, AND 50% between 21 - 30
function testRandomGenerator() {
  const randomNumbers = randomGenerator(
    [
      [0.2, 1, 10],
      [0.5, 11, 20],
      [0.3, 21, 30],
    ],
    10
  );

  if (randomNumbers.length !== 10) throw `length should be 10. Got ${randomNumbers.length}`;

  const expectedDist: number[] = [5, 2, 3];
  const actualDist: number[] = [...expectedDist].fill(0);

  for (const rand of randomNumbers) {
    if (rand >= 1 && rand <= 10) {
      actualDist[0] += 1;
    }

    if (rand >= 11 && rand <= 20) {
      actualDist[1] += 1;
    }

    if (rand >= 21 && rand <= 30) {
      actualDist[2] += 1;
    }
  }

  if (!actualDist.every((v, i) => v === expectedDist[i])) {
    throw `Invalid distribution received. Got: ${actualDist}/${randomNumbers}, Expected: ${expectedDist}`;
  }

  console.log('success!');
}

testRandomGenerator();
