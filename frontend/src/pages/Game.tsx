import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Button } from '../components/Button';
import { Field } from '../components/Field';
import Modal from '../components/Modal';
import ModalButton from '../components/ModalButton';
import { Spectrum } from '../components/Spectrum';
import {
  connectSocket,
  disconnectSocket,
  emitSocketEvent,
} from '../store/actions/socketActions';
import { GameState } from '../store/features/gameSlice';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import '../styles/custom-utilities.css';

const socket = io(import.meta.env.VITE_API_URL);
export const SocketContext = React.createContext(socket);

export type ScoreInfo = {
  name: string;
  score: number;
};

export const Game = () => {
  const { room, playerName } = useParams();
  // const [gameState, setGameState] = useState<GameState>(GameState.InLobby);
  const [modalText, setModalText] = useState<string | null>(null);

  const gameState = useAppSelector((state: RootState) => state.game.gameState);
  const isOwner = useAppSelector((state: RootState) => state.game.isOwner);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (room && playerName) {
      dispatch(
        connectSocket(import.meta.env.VITE_API_URL as string, room, playerName)
      );
    }

    return () => {
      dispatch(disconnectSocket());
    };
  }, [dispatch, room, playerName]);

  function leaveRoom() {
    dispatch(emitSocketEvent('leaveRoom'));
    navigate('/');
  }

  function startGame(roomName: string | undefined) {
    dispatch(emitSocketEvent('startGame', roomName));
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
      <div className='w-[45%] flex flex-col items-end'>
        {gameState === GameState.InLobby && isOwner ? (
          <Button onClick={() => startGame(room)}>start</Button>
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
