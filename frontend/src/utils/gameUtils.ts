export const createMatrix = (rows: number, cols: number) => {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix.push(Array(cols).fill(0));
  }
  return matrix;
};

export function createRandomMatrix(
  numRows: number,
  numCols: number
): number[][] {
  const matrix: number[][] = [];

  for (let i = 0; i < numRows; i++) {
    const row: number[] = [];
    for (let j = 0; j < numCols; j++) {
      const randomNumber = Math.floor(Math.random() * 10);
      row.push(randomNumber);
    }
    matrix.push(row);
  }

  return matrix;
}

export const getColorForNumber = (num: number): string => {
  switch (num) {
    case 0: // Empty cell
      return 'bg-gray-800';
    case 1: // Cyan (I)
      return 'bg-cyan-500';
    case 2: // Blue (J)
      return 'bg-blue-500';
    case 3: // Orange (L)
      return 'bg-orange-500';
    case 4: // Yellow (O)
      return 'bg-yellow-500';
    case 5: // Green (S)
      return 'bg-green-500';
    case 6: // Purple (T)
      return 'bg-purple-500';
    case 7: // Red (Z)
      return 'bg-red-500';
    default:
      // return 'bg-white'; // Default color for unknown cells
      return 'bg-gray-800';
  }
};
