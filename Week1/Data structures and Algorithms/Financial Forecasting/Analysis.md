# Analysis

## Understanding Recursion

Recursion is a technique in which a method calls itself to solve a problem. It helps break a complex problem into smaller and simpler subproblems. Every recursive function must have a base case to stop the recursion.

## Recursive Financial Forecasting

In this program, the future value is calculated recursively by applying the growth rate for each year.

Formula:

Future Value = Current Value × (1 + Growth Rate)

The recursive method continues to calculate the value for the next year until the number of years becomes 0.

## Time Complexity

The recursive function makes one recursive call for each year.

* Best Case: O(1) when years = 0
* Average Case: O(n)
* Worst Case: O(n)

where n is the number of years.

## Space Complexity

* O(n) because each recursive call is stored in the call stack until the base case is reached.

## Optimization

1. Memoization

   * Store previously calculated results and reuse them.
   * Avoids repeated computations.

2. Iterative Approach

   * Use a loop instead of recursion.
   * Reduces memory usage by eliminating the recursive call stack.

3. Mathematical Formula

   * Use the compound growth formula:

     Future Value = Present Value × (1 + Growth Rate)^Years

   * This directly computes the result without recursive calls.
