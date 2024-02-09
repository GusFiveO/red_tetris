import { useEffect, useState } from 'react';
import {
  createMatrix,
  createRandomMatrix,
  getColorForNumber,
} from '../utils/gameUtils';

const COLUMNS = 10;
const ROWS = 20;

type GameProps = {
  hash: string;
};

const opponentsSample = [
  { name: 'Player 1', firstLine: 2 },
  { name: 'Player 2', firstLine: 5 },
  { name: 'Player 3', firstLine: 8 },
  { name: 'Player 4', firstLine: 11 },
  { name: 'Player 5', firstLine: 14 },
  { name: 'Player 6', firstLine: 2 },
  { name: 'Player 7', firstLine: 5 },
  { name: 'Player 8', firstLine: 8 },
  { name: 'Player 9', firstLine: 11 },
  { name: 'Player 10', firstLine: 15 },
];

type Matrix = number[][];

export const Game = ({ hash }: GameProps) => {
  const [field, setField] = useState<Matrix>(createMatrix(ROWS, COLUMNS));
  const [opponents, setOpponents] = useState<
    {
      name: string;
      firstLine: number;
    }[]
  >(opponentsSample);

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
          className={`h-8 w-8 border border-black ${getColorForNumber(elem)}`}
        ></div>
      ))}
    </div>
  ));

  const opponentsComponent = opponents.map(({ name, firstLine }) => {
    return (
      <div key={name} className='flex flex-col justify-center items-center m-2'>
        <div>{name}</div>
        <div className='w-10 h-20 border m-1'>{firstLine}</div>
      </div>
    );
  });

  return (
    <div className='main-container flex justify-center items-center'>
      <div className='flex flex-col items-center justify-center'>
        <div>GAME : {hash}</div>
        <div>{fieldComponent}</div>
      </div>
      <div className='bg-red-600 overflow-y-scroll h-full'>
        {opponentsComponent}
      </div>
    </div>
  );
};
