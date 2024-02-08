import { useEffect, useState } from 'react';

const COLUMNS = 10;
const ROWS = 20;

type GameProps = {
  hash: string;
};

type Matrix = number[][];

const createMatrix = (rows: number, cols: number) => {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix.push(Array(cols).fill(0));
  }
  return matrix;
};

function createRandomMatrix(numRows: number, numCols: number): number[][] {
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

export const Game = ({ hash }: GameProps) => {
  const [field, setField] = useState<Matrix>(createMatrix(ROWS, COLUMNS));

  useEffect(() => {
    let lastKeyPressTime = 0;
    const throttleInterval = 200;

    const handleKeyPress = (event: KeyboardEvent) => {
      const currentTime = new Date().getTime();
      if (currentTime - lastKeyPressTime > throttleInterval) {
        if (event.key === 'ArrowUp') {
          console.log(event.key);
        } else if (event.key === 'ArrowDown') {
          console.log(event.key);
        } else if (event.key === 'ArrowLeft') {
          console.log(event.key);
        } else if (event.key === 'ArrowRight') {
          console.log(event.key);
        } else if (event.key === ' ') {
          setField(createRandomMatrix(ROWS, COLUMNS));
          console.log(event.key);
        }

        lastKeyPressTime = currentTime;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const fieldComponent = field.map((row, rowIndex) => (
    <div key={rowIndex} className='flex'>
      {row.map((elem, colIndex) => (
        <div
          key={colIndex}
          className={`h-10 w-10 border border-black ${
            elem === 0 ? 'bg-slate-800' : 'bg-white'
          }`}
        ></div>
      ))}
    </div>
  ));

  return (
    <div className='main-container flex flex-col items-center justify-center'>
      <div>GAME : {hash}</div>
      <div>{fieldComponent}</div>
    </div>
  );
};
