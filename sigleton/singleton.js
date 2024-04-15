// JS普段触らないが、このママ実行可、
let counter = 0;

class Counter {
  static instance = false;
  static getInstance() {
    if (!Counter.instance) {
      Counter.instance = new Counter();
      this.instance = true;
      return Counter.instance;
    } else {
      return null;
    }
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const counter1 = Counter.getInstance();
if (counter1 == null) console.log("counter1 is null");
else console.log("counter1 is successfully generated");
const counter2 = Counter.getInstance();
if (counter2 == null) console.log("counter2 is null");
else console.log("counter1 is successfully generated");
console.log(
  "Let's confirm this instance of Counter is a singleton-like pattern.(true or false)"
);
console.log(counter1 == counter2); // false
