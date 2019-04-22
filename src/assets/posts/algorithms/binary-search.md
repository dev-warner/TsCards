---
 label: 'Binary Search'
 type: 'Algorithm'
 category: 'Divide and conquer'
 time: 'O(log n)'
 space: 'O(1)'
 summary: 'Binary search works on sorted arrays. Binary search begins by comparing the middle element of the array with the target value.'
---
# Binary Search

Binary search works on sorted arrays. Binary search begins by comparing the middle element of the array with the target value.

then splitting the array in half by checking if the middle is lower or higher than the target, continuing til it finds its target or returns falsy.

this creates a worse case time complexity of O(log n) an average performance of O(log n) (Logarithmic time) and a best case O(1).

An O(log n) algorithm is considered highly efficient, as the ratio of the number of operations to the size of the input decreases and tends to zero when n increases. An algorithm that must access all elements of its input cannot take logarithmic time, as the time taken for reading an input of size n is of the order of n.


![Diagram of binary tree visulizaing Binary Search](https://i.imgur.com/RJ6Xzyg.png)
_Binary Search Tree - Binary_search_tree.svg: Booyabazooka derivative work: movax_

### Quick Points

1.  Class Search algorithm
2.  Must be sorted
3.  Data structure Array

    - Worst-case performance O(log n)
    - Best-case performance O(1) 🚀
    - Average performance O(log n)
    - Worst-case space complexity O(1)


Ensure that your array is sorted since this is the crux of a binary search.

Any indexed/random-access data structure can be binary searched. So when you say using "just an array", I would say arrays are the most basic/common data structure that a binary search is employed on.

You can do it recursively (easiest) or iteratively. Time complexity of a binary search is O(log N) which is considerably faster than a linear search of checking each element at O(N).


### Recursive

```javascript
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
### Iterative
```javascript
export function binarySearch(
  array: number[],
  element: number,
  start: 0,
  end: array.length - 1
) {
   while (start <= end) {
       let mid = Math.floor((start + end) / 2);

       if (array[mid] > element)
           start = mid - 1
       else if (array[mid] < element)
           end = mid + 1
       else
           return mid // found
   }
   return -1 // not found
}
```



## Resources

- https://en.wikipedia.org/wiki/Binary_search_algorithm 🤘
- https://en.wikipedia.org/wiki/Time_complexity#Logarithmic_time 📚
- https://github.com/basarat/algorithms/tree/master/src/binarySearch
- https://blog.hellojs.org/implement-binary-search-in-typescript-using-generics-with-useful-refactorings-a4bcda932d7
- https://www.youtube.com/watch?v=P3YID7liBug
- https://stackoverflow.com/questions/249392/binary-search-in-array
