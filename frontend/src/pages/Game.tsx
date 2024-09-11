import { Button } from '../components/Button';
import { Field } from '../components/Field';
import ModalButton from '../components/ModalButton';
import { Scoreboard } from '../components/Scoreboard';
import { Spectrum } from '../components/Spectrum';
import '../styles/custom-utilities.css';
import { useParams } from 'react-router-dom' 

export type PlayerSpectrum = {
  name: string;
  firstLine: number;
  score: number;
};

export type ScoreInfo = {
  name: string;
  score: number;
};

export const Game = () => {

  const { room, player_name } = useParams();

  console.log(room, player_name)
  return (
    <div className='main-container flex justify-center items-center'>
      <div className='fixed start-px top-px text-2xl text-slate-600'>
        room : {room}
      </div>
      <div className='fixed right-px top-px'>
        <ModalButton buttonText='QUIT'>
          <div>Leave Game ?</div>
          <Button>yes</Button>
        </ModalButton>
      </div>
      <Scoreboard />
      <Field />
      <Spectrum />
    </div>
  );
};
