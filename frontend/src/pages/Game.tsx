import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Button } from '../components/Button';
import { Field } from '../components/Field';
import Modal from '../components/Modal';
import ModalButton from '../components/ModalButton';
import { Spectrum } from '../components/Spectrum';
import {
  addOpponent,
  removeOpponent,
  updateOpponentFirstLine,
} from '../store/features/opponentsSlice';
import {
  Piece,
  updatePlayerField,
  updatePlayerNextPiece,
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

enum GameState {
  GameOver,
  GameWin,
  InGame,
  InLobby,
}

export const Game = () => {
  const { room, playerName } = useParams();
  const [gameState, setGameState] = useState<GameState>(GameState.InLobby);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string | null>(null);

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
      setGameState(GameState.InGame);
      setModalText(message);
    }

    function onUpdateGameState(payload: {
      field: number[][];
      score: number;
      piece: Piece;
    }) {
      const { field, score, piece } = payload;
      dispatch(updatePlayerField({ field: field, piece: piece }));
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

    function onUpdateNextPiece(payload: { nextPiece: Piece }) {
      const { nextPiece } = payload;
      console.log('updateNextPiece:', nextPiece);
      dispatch(updatePlayerNextPiece(nextPiece));
    }

    function onGameStarted() {
      if (gameState !== GameState.InGame) {
        setGameState(GameState.InGame);
      }
      setIsReady(false);
    }

    function onGameOver(payload: { message: string }) {
      const { message } = payload;
      setGameState(GameState.GameOver);
      // alert(message);
      setModalText(message);
    }

    function onGameWin(payload: { message: string }) {
      const { message } = payload;
      setGameState(GameState.GameWin);
      // alert(message);

      setModalText(message);
    }

    socket.on('currentPlayers', onCurrentPlayers);
    socket.on('playerLeaved', onPlayerLeaved);
    socket.on('playerJoined', onPlayerJoined);
    socket.on('gameAlreadyStarted', onGameAlreadyStarted);
    socket.on('updateGameState', onUpdateGameState);
    socket.on('updateFirstLine', onUpdateFirstLine);
    socket.on('updateNextPiece', onUpdateNextPiece);
    socket.on('gameStarted', onGameStarted);
    socket.on('gameOver', onGameOver);
    socket.on('gameWin', onGameWin);
    return () => {
      socket.off('currentPlayers', onCurrentPlayers);
      socket.off('playerLeaved', onPlayerLeaved);
      socket.off('playerJoined', onPlayerJoined);
      socket.off('gameAlreadyStarted', onGameAlreadyStarted);
      socket.off('updateGameState', onUpdateGameState);
      socket.off('updateFirstLine', onUpdateFirstLine);
      socket.off('updateNextPiece', onUpdateNextPiece);
      socket.off('gameStarted', onGameStarted);
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
      <div className='w-1/3 flex flex-col items-end'>
        {gameState === GameState.InLobby ? (
          <Button onClick={() => changeReadyState(room, !isReady)}>
            {isReady ? 'no more ready ?' : 'ready ?'}
          </Button>
        ) : null}
      </div>
      <div className='w-2/3 flex  items-center'>
        <SocketContext.Provider value={socket}>
          <Field />
        </SocketContext.Provider>
        <Spectrum />
        {modalText === null ? null : (
          <Modal>
            {modalText}
            {gameState === GameState.GameOver ||
            gameState === GameState.GameWin ? (
              <Button onClick={() => window.location.reload()}>
                play again
              </Button>
            ) : gameState === GameState.InGame ? (
              <Button onClick={leaveRoom}>quit</Button>
            ) : null}
          </Modal>
        )}
      </div>
    </div>
  );
};
