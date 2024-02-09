import { useEffect, useState } from 'react';
import { Field } from '../components/Field';
import { Scoreboard } from '../components/Scoreboard';
import { Spectrum } from '../components/Spectrum';
import '../styles/custom-utilities.css';
import { createMatrix, createRandomMatrix } from '../utils/gameUtils';

const COLUMNS = 10;
const ROWS = 20;

const opponentsSample = [
  { name: 'Player 1', firstLine: 2, score: 100 },
  { name: 'Player 2', firstLine: 5, score: 150 },
  { name: 'Player 3', firstLine: 8, score: 80 },
  { name: 'Player 4', firstLine: 11, score: 200 },
  { name: 'Player 5', firstLine: 14, score: 120 },
  { name: 'Player 6', firstLine: 2, score: 90 },
  { name: 'Player 7', firstLine: 5, score: 110 },
  { name: 'Player 8', firstLine: 8, score: 180 },
  { name: 'Player 9', firstLine: 11, score: 160 },
  { name: 'Player 10', firstLine: 15, score: 140 },
];

const scoreSample: ScoreInfo[] = [
  { name: 'Player 1', score: 100 },
  { name: 'Player 2', score: 150 },
  { name: 'Player 3', score: 80 },
  { name: 'Player 4', score: 200 },
  { name: 'Player 5', score: 120 },
  { name: 'Player 6', score: 90 },
  { name: 'Player 7', score: 110 },
  { name: 'Player 8', score: 180 },
  { name: 'Player 9', score: 160 },
  { name: 'Player 10', score: 140 },
];

type Matrix = number[][];

export type PlayerSpectrum = {
  name: string;
  firstLine: number;
  score: number;
};

export type ScoreInfo = {
  name: string;
  score: number;
};

type GameProps = {
  hash: string;
};

export const Game = ({ hash }: GameProps) => {
  const [field, setField] = useState<Matrix>(createMatrix(ROWS, COLUMNS));
  const [opponents, setOpponents] = useState<PlayerSpectrum[]>(opponentsSample);
  const [scores, setScores] = useState<ScoreInfo[]>(scoreSample);

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

  return (
    <div className='main-container flex justify-center items-center'>
      <Scoreboard scoreList={scores} />
      <Field field={field} />
      <Spectrum opponentList={opponents} />
    </div>
  );
};
