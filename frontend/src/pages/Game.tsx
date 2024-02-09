import { useEffect, useState } from 'react';
import '../styles/custom-utilities.css';
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
  { name: 'Player 1', firstLine: 2, rank: 8 },
  { name: 'Player 2', firstLine: 5, rank: 4 },
  { name: 'Player 3', firstLine: 8, rank: 9 },
  { name: 'Player 4', firstLine: 11, rank: 3 },
  { name: 'Player 5', firstLine: 14, rank: 10 },
  { name: 'Player 6', firstLine: 2, rank: 5 },
  { name: 'Player 7', firstLine: 5, rank: 7 },
  { name: 'Player 8', firstLine: 8, rank: 1 },
  { name: 'Player 9', firstLine: 11, rank: 6 },
  { name: 'Player 10', firstLine: 15, rank: 2 },
];

type Matrix = number[][];

export const Game = ({ hash }: GameProps) => {
  const [field, setField] = useState<Matrix>(createMatrix(ROWS, COLUMNS));
  const [opponents, setOpponents] = useState<
    {
      name: string;
      firstLine: number;
      rank: number;
    }[]
  >(opponentsSample);

  useEffect(() => {
    let lastKeyPressTime = 0;
    const throttleInterval = 200;

    const handleKeyPress = (event: KeyboardEvent) => {
      const currentTime = new Date().getTime();
      if (
        event.key == ' ' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp'
      ) {
        event.preventDefault();
      }
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
          className={`block ${getColorForNumber(elem)}`}
        ></div>
      ))}
    </div>
  ));

  const opponentsComponent = opponents
    .sort((a, b) => {
      return a.rank > b.rank ? 1 : 0;
    })
    .map(({ name, firstLine, rank }) => {
      const zerosMatrix = createMatrix(ROWS, COLUMNS);
      return (
        <div
          key={name}
          className='flex flex-col justify-center items-center m-2'
        >
          <div>{name}</div>
          {zerosMatrix.map((row, rowIndex) => (
            <div key={rowIndex} className='flex'>
              {row.map((elem, colIndex) => (
                <div
                  key={colIndex}
                  className={`w-1 h-1 border border-black ${
                    rowIndex > firstLine ? 'bg-black' : 'bg-gray-600'
                  }`}
                ></div>
              ))}
            </div>
          ))}

          {/* <div className='w-10 h-20 border m-1'>{firstLine}</div> */}
        </div>
      );
    });

  return (
    <div className='main-container flex justify-center items-center'>
      <div className='flex flex-col items-center justify-center'>
        <div>GAME : {hash}</div>
        <div className='border rounded-md'>{fieldComponent}</div>
      </div>
      <div className='flex flex-col bg-slate-900 rounded-md overflow-y-scroll h-auto max-h-[75%] m-1 border'>
        {opponentsComponent}
      </div>
    </div>
  );
};
