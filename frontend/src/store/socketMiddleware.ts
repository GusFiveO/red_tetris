// socketMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { Piece, Player } from '../types';
import {
  GameState,
  setGameState,
  setIsOwner,
  setIsRunning,
} from './features/gameSlice';
import {
  addOpponent,
  removeOpponent,
  updateOpponentSpectrum,
} from './features/opponentsSlice';
import {
  updatePlayerField,
  updatePlayerNextPiece,
  updatePlayerScore,
} from './features/playerSlice';

// Action types for socket events
const SOCKET_CONNECT = 'SOCKET_CONNECT';
const SOCKET_DISCONNECT = 'SOCKET_DISCONNECT';
const SOCKET_EMIT = 'SOCKET_EMIT';

export const socketMiddleware: Middleware = (store) => {
  let socket: Socket | null = null;

  return (next) => (action: any) => {
    switch (action.type) {
      case SOCKET_CONNECT:
        if (socket) {
          socket.disconnect();
        }

        socket = io(action.payload.url);

        socket.emit('joinRoom', action.payload.room, action.payload.playerName);

        // Socket event listeners

        socket.on('owner', () => {
          console.log('OWNER');
          store.dispatch(setIsOwner(true));
        });

        socket.on('currentPlayers', (players: Player[]) => {
          players.forEach((player) => store.dispatch(addOpponent(player)));
        });

        socket.on('playerJoined', (player: Player) => {
          store.dispatch(addOpponent(player));
        });

        socket.on('playerLeaved', (playerId: string) => {
          store.dispatch(removeOpponent(playerId));
        });

        socket.on(
          'updateGameState',
          (payload: { field: number[][]; score: number; piece: Piece }) => {
            const { field, score, piece } = payload;
            store.dispatch(updatePlayerField({ field, piece }));
            store.dispatch(updatePlayerScore(score));
          }
        );

        socket.on('updateNextPiece', (payload: { nextPiece: Piece }) => {
          store.dispatch(updatePlayerNextPiece(payload.nextPiece));
        });

        socket.on(
          'updateSpectrum',
          (payload: { playerId: string; spectrum: number[] }) => {
            store.dispatch(
              updateOpponentSpectrum({
                playerId: payload.playerId,
                spectrum: payload.spectrum,
              })
            );
          }
        );

        socket.on('gameStarted', () => {
          store.dispatch(setGameState(GameState.InGame));
          store.dispatch(setIsRunning(true));
        });

        socket.on('gameEnded', () => {
          console.log('GAME ENDED');
          store.dispatch(setIsRunning(false));
          store.dispatch(setGameState(GameState.InLobby));
        });

        socket.on('gameOver', (message: string) => {
          console.log('GAME OVER');
          store.dispatch({ type: 'GAME_OVER', payload: message });
          store.dispatch(setGameState(GameState.GameOver));
        });

        socket.on('gameWin', (message: string) => {
          console.log('GAME WIN');
          store.dispatch({ type: 'GAME_WIN', payload: message });
          store.dispatch(setGameState(GameState.GameWin));
        });
        break;

      case SOCKET_EMIT:
        if (socket) {
          socket.emit(action.payload.event, action.payload.data);
        }
        break;

      case SOCKET_DISCONNECT:
        if (socket) {
          socket.disconnect();
          socket = null;
        }
        break;

      default:
        return next(action);
    }
  };
};
