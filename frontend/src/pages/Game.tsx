import { Button } from '../components/Button';
import { Field } from '../components/Field';
import ModalButton from '../components/ModalButton';
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
      <div className='flex flex-col items-center'>
        <Scoreboard />
        <ModalButton buttonText='quit'>
          <div>Leave Game ?</div>
          <Button>yes</Button>
        </ModalButton>
      </div>
      <Field />
      <Spectrum />
    </div>
  );
};
