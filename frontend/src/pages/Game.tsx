import { Field } from '../components/Field';
import { Scoreboard } from '../components/Scoreboard';
import { Spectrum } from '../components/Spectrum';
import '../styles/custom-utilities.css';

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
  return (
    <div className='main-container flex justify-center items-center'>
      <Scoreboard />
      <Field />
      <Spectrum />
    </div>
  );
};
