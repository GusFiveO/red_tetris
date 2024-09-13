import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Button } from '../components/Button';
import { Field } from '../components/Field';
import ModalButton from '../components/ModalButton';
import { Spectrum } from '../components/Spectrum';
import { addOpponent, removeOpponent } from '../store/features/opponentsSlice';
import { useAppDispatch } from '../store/store';
import '../styles/custom-utilities.css';

const socket = io('localhost:5000');

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
  const { room, playerName } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    function onCurrentPlayers(players: string[]) {
      console.log('currentPlayers: ', players);
      players.forEach((name: string) => dispatch(addOpponent(name)));
    }

    function onPlayerLeaved(playerName: string) {
      console.log('playerLeaved: ', playerName);
      dispatch(removeOpponent(playerName));
    }

    socket.on('currentPlayers', onCurrentPlayers);
    socket.on('playerLeaved', onPlayerLeaved);
    return () => {
      socket.off('currentPlayers', onCurrentPlayers);
      socket.off('playerLeaved', onPlayerLeaved);
    };
  }, [dispatch]);
  console.log(room, playerName);
  socket.emit('joinRoom', room, playerName);

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
      <Field />
      <Spectrum />
    </div>
  );
};
