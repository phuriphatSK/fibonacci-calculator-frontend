/**
 * Calculate Fibonacci number at given index
 * @param n - The index of Fibonacci sequence
 * @returns Promise<string> - The Fibonacci number as string
 */
export const calculateFibonacci = async (n: number): Promise<string> => {
  // Add small delay to simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (n <= 1) return n.toString();

  let a = 0n,
    b = 1n;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b.toString();
};

/**
 * Validate Fibonacci index input
 * @param value - Input value to validate
 * @returns boolean - Whether the input is valid
 */
export const validateFibonacciIndex = (value: string): boolean => {
  const num = Number(value);
  return !isNaN(num) && num >= 0 && num <= 1000 && Number.isInteger(num);
};
