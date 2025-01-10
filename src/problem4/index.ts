/**
 * Calculates the sum of numbers from 1 to n using the arithmetic sequence formula.
 * Formula used: n(n+1)/2
 * Time complexity: O(1)
 * Space complexity: O(1)
 * @param n The upper bound of the sequence
 * @returns The sum of numbers from 1 to n
 */
function sumToNWithFormula(n: number) {
  if (n <= 0) {
    return 0;
  }

  return (n * (n + 1)) / 2;
}

/**
 * Calculates the sum of numbers from 1 to n using iteration.
 * Uses a for loop to add each number from 1 to n.
 * Time complexity: O(n)
 * Space complexity: O(1)
 * @param n The upper bound of the sequence
 * @returns The sum of numbers from 1 to n
 */
function sumToNWithIterative(n: number) {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

/**
 * Calculates the sum of numbers from 1 to n using recursion.
 * Time complexity: O(n)
 * Space complexity: O(n)
 * @param n The upper bound of the sequence
 * @returns The sum of numbers from 1 to n
 */
function sumToNWithRecursive(n: number) {
  if (n <= 0) {
    return 0;
  }

  return n + sumToNWithRecursive(n - 1);
}
