type Callback = (input: any, error: Error | undefined) => void;

function nonPromiseFunction(someInput: string, cb: Callback) {
  // when some work has happened it will call the cb
  const someWork = someInput + 2;
  cb(someWork, undefined);
}

function promisfiedNonPromiseFunction(nonPromiseFn: any) {
  return (...args: any[]) => new Promise((resolve, reject) => {
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
