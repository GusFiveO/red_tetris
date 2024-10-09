import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Button } from '../components/Button';
import { Field } from '../components/Field';
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

  const gameState = useAppSelector((state: RootState) => state.game.gameState);
  const isRunning = useAppSelector((state: RootState) => state.game.isRunning);
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
        <Button onClick={leaveRoom}>
          QUIT <img src='/exit.svg' className='h-5 w-5 m-2'></img>
        </Button>
      </div>
      <div className='w-[45%] flex flex-col items-end'>
        {!isRunning && isOwner ? (
          <Button onClick={() => startGame(room)}>start</Button>
        ) : null}
      </div>
      <div className='w-2/3 flex  items-center'>
        <SocketContext.Provider value={socket}>
          <Field
            message={
              gameState === GameState.GameOver
                ? 'YOU LOSE 😰'
                : gameState === GameState.GameWin
                ? 'YOU WIN !'
                : undefined
            }
          />
        </SocketContext.Provider>
        <Spectrum />
      </div>
    </div>
  );
};
