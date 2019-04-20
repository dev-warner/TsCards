---
 label: 'Binary Search'
 type: 'Algorithm'
 category: 'Divide and conquer'
 summary: "Binary search works on sorted arrays. Binary search begins by
comparing the middle element of the array with the target value."
 time: 'O(log n)'
 space: 'O(1)'
---

# Binary Search

Binary search works on sorted arrays. Binary search begins by comparing the middle element of the array with the target value.

![Diagram of binary tree visulizaing Binary Search](https://i.imgur.com/RJ6Xzyg.png)
_Binary Search Tree - Binary_search_tree.svg: Booyabazooka derivative work: movax_

### Quick Points

1.  Class Search algorithm
2.  Data structure Array

    - Worst-case performance O(log n)
    - Best-case performance O(1)
    - Average performance O(log n)
    - Worst-case space complexity O(1)

```typescript
/**
 * Searches for specific element in a given sorted array
 * @returns the index of the element (-1 if its not found)
 * @https://github.com/basarat/algorithms/blob/master/src/binarySearch/binarySearch.ts
 */
export function binarySearch(
  array: number[],
  element: number,
  start = 0,
  end = array.length - 1
): number {
  if (end < start) return -1;
  const middle = Math.floor((start + end) / 2);
  return element === array[middle]
    ? middle
    : element < array[middle]
    ? binarySearch(array, element, start, middle - 1)
    : binarySearch(array, element, middle + 1, end);
}
```

### Resources

- ![Binary Search - Hanker Rank](https://img.youtube.com/vi/P3YID7liBug/0.jpg)
- https://github.com/basarat/algorithms/tree/master/src/binarySearch
- https://blog.hellojs.org/implement-binary-search-in-typescript-using-generics-with-useful-refactorings-a4bcda932d7

[
