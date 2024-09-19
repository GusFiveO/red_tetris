import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Button } from '../components/Button';
import { Field } from '../components/Field';
import ModalButton from '../components/ModalButton';
import { Spectrum } from '../components/Spectrum';
import {
  addOpponent,
  removeOpponent,
  updateOpponentFirstLine,
} from '../store/features/opponentsSlice';
import {
  updatePlayerField,
  updatePlayerScore,
} from '../store/features/playerSlice';
import { useAppDispatch } from '../store/store';
import '../styles/custom-utilities.css';
import { Player } from '../types';

const socket = io(import.meta.env.VITE_API_URL);
export const SocketContext = React.createContext(socket);

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
  const [isReady, setIsReady] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.emit('joinRoom', room, playerName);

    console.log('Use effect');
    function onCurrentPlayers(players: Player[]) {
      console.log('currentPlayers: ', players);
      players.forEach((player) => dispatch(addOpponent(player)));
    }

    function onPlayerJoined(player: Player) {
      console.log('playerJoined: ', player);
      dispatch(addOpponent(player));
    }

    function onPlayerLeaved(playerId: string) {
      console.log('playerLeaved: ', playerId);
      dispatch(removeOpponent(playerId));
    }

    function onGameAlreadyStarted(message: string) {
      alert(message);
    }

    function onUpdateGameState(payload: { field: number[][]; score: number }) {
      const { field, score } = payload;
      console.log(field);
      dispatch(updatePlayerField(field));
      dispatch(updatePlayerScore(score));
    }

    function onUpdateFirstLine(payload: {
      playerId: string;
      firstLine: number;
    }) {
      const { playerId, firstLine } = payload;
      console.log('updateFirstLine:', playerId, firstLine);
      dispatch(
        updateOpponentFirstLine({ playerId: playerId, firstLine: firstLine })
      );
    }

    function onGameOver(payload: { message: string }) {
      const { message } = payload;
      alert(message);
    }

    function onGameWin(payload: { message: string }) {
      const { message } = payload;
      alert(message);
    }

    socket.on('currentPlayers', onCurrentPlayers);
    socket.on('playerLeaved', onPlayerLeaved);
    socket.on('playerJoined', onPlayerJoined);
    socket.on('gameAlreadyStarted', onGameAlreadyStarted);
    socket.on('updateGameState', onUpdateGameState);
    socket.on('updateFirstLine', onUpdateFirstLine);
    socket.on('gameOver', onGameOver);
    socket.on('gameWin', onGameWin);
    return () => {
      socket.off('currentPlayers', onCurrentPlayers);
      socket.off('playerLeaved', onPlayerLeaved);
      socket.off('playerJoined', onPlayerJoined);
      socket.off('gameAlreadyStarted', onGameAlreadyStarted);
      socket.off('updateGameState', onUpdateGameState);
      socket.off('updateFirstLine', onUpdateFirstLine);
      socket.off('gameOver', onGameOver);
      socket.off('gameWin', onGameWin);
    };
  }, [dispatch]);

  function leaveRoom() {
    socket.emit('leaveRoom');
    navigate('/');
  }

  function changeReadyState(roomName: string | undefined, newState: boolean) {
    socket.emit('playerReady', { roomName, newState });
    setIsReady(newState);
    console.log(`player ${newState ? 'not ready' : 'ready'}`);
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
          <Button onClick={leaveRoom}>yes</Button>
        </ModalButton>
      </div>
      <Button onClick={() => changeReadyState(room, !isReady)}>
        {isReady ? 'no more ready ?' : 'ready ?'}
      </Button>
      <SocketContext.Provider value={socket}>
        <Field />
      </SocketContext.Provider>
      <Spectrum />
    </div>
  );
};
