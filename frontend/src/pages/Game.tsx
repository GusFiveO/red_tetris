import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Button } from '../components/Button';
import { Field } from '../components/Field';
import ModalButton from '../components/ModalButton';
import { Spectrum } from '../components/Spectrum';
import { addOpponent, removeOpponent } from '../store/features/opponentsSlice';
import { updatePlayerField } from '../store/features/playerSlice';
import { useAppDispatch } from '../store/store';
import '../styles/custom-utilities.css';
import { Player } from '../types';

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

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  socket.emit('joinRoom', room, playerName);

  useEffect(() => {
    console.log('Use effect');
    function onCurrentPlayers(players: Player[]) {
      console.log('currentPlayers: ', players);
      players.forEach((player) => dispatch(addOpponent(player)));
    }

    function onPlayerJoined(player: Player) {
      console.log('playerJoined: ', player);
      dispatch(addOpponent(player));
    }

    function onPlayerLeaved(playerName: string) {
      console.log('playerLeaved: ', playerName);
      dispatch(removeOpponent(playerName));
    }

    function onGameAlreadyStarted(message: string) {
      console.log(message);
      alert(message);
    }

    function onUpdateGameState(payload: { field: number[][] }) {
      const { field } = payload;
      // console.log(field);
      dispatch(updatePlayerField(field));
    }

    socket.on('currentPlayers', onCurrentPlayers);
    socket.on('playerLeaved', onPlayerLeaved);
    socket.on('playerJoined', onPlayerJoined);
    socket.on('gameAlreadyStarted', onGameAlreadyStarted);
    socket.on('updateGameState', onUpdateGameState);
    return () => {
      socket.off('currentPlayers', onCurrentPlayers);
      socket.off('playerLeaved', onPlayerLeaved);
      socket.off('playerJoined', onPlayerJoined);
      socket.off('gameAlreadyStarted', onGameAlreadyStarted);
      socket.off('updateGameState', onUpdateGameState);
    };
  }, [dispatch]);

  function startGame(roomName: string | undefined) {
    socket.emit('startGame', roomName);
    console.log('game started');
  }

  console.log(room, playerName);

  return (
    <div className='main-container flex justify-center items-center'>
      <div className='fixed start-px top-px text-2xl text-slate-600'>
        room : {room}
      </div>
      <div className='fixed right-px top-px'>
        <ModalButton buttonText='QUIT'>
          <div>Leave Game ?</div>
          <Button onClick={() => navigate('/')}>yes</Button>
        </ModalButton>
      </div>
      <Button onClick={() => startGame(room)}>start</Button>
      <Field />
      <Spectrum />
    </div>
  );
};
