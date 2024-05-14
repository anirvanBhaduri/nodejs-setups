type Subscriber = (input: any) => any;

export class Observable {
  private _value: any;
  private _subscribers: Subscriber[] = [];

  public next(value: any) {
    this._value = value;

    for (const fn of this._subscribers) {
      fn(this._value);
    }

    // Alternatively
    // for (let i = 0; i < this._subscribers.length; i++) {
    //   this._subscribers[i](value);
    // }
  }

  public subscribe(fn: Subscriber) {
    this._subscribers.push(fn);
  }
} 

const a = new Observable();

a.subscribe((val) => {
  console.log('First subscriber', val);
});

a.subscribe((val) => {
  console.log('Second subscriber', val);
});

a.next(4);
a.next(2);