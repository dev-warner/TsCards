---
    label: 'Stack'
    type: 'Data Type'
    category: 'Abstract Data Type'
    summary: 'Stacks. A stack is a container of objects that are inserted and
    removed according to the last-in first-out (LIFO) principle.'
---

# What is a Stack?

A stack is a type of data structure that is linear where order is conserved. For many people, stack is known to have a LIFO (Last In First Out) mechanism. Let’s take a look at an example of a stack in real life: stack of plates.

Mainly the following three basic operations are performed in the stack:

## Quick Points

1. LIFO (last in, first out).
2. Considered as a linear data structure
3. Stacks entered the computer science literature in 1946, when Alan M. Turing used the terms "bury" and "unbury" as a means of calling and returning from subroutines. 😎

    - Push Adds an item in the stack. If the stack is full, then it is said to be an Overflow condition.
    - Pop Removes an item from the stack. The items are popped in the reversed order in which they are pushed. If the stack is empty, then it is said to be an Underflow condition.
    - peek or Top: Returns top element of stack.
    - length : Returns total length stack of stack.

![Diagram of Stack](https://i.imgur.com/x8ECBKb.png)

```javascript
class Stack<T> {

  private items: Array<T>;

  constructor(...items: Array<T>) {
    this.items = [];

    if (items.length > 0) {
        items.forEach(item => this.items.push(item));
    }
  }

  push(...items) {
    items.forEach(item => this.items.push(item));
    return this.items;
  }

  pop(count = 0) {
    if (count === 0) return this.items.pop();
    else return this.items.splice(-count, count);
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  size() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length == 0;
  }

  toArray() {
    return this.items;
  }
}
```

## Resources

- https://medium.com/javascript-in-plain-english/javascript-what-are-stack-and-queue-79df7af5a566
- https://www.geeksforgeeks.org/stack-data-structure-introduction-program/
- https://egghead.io/lessons/typescript-stack-implementation-using-typescript 💰
