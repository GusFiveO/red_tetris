import { useContext, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../pages/Game';
import { playerMove } from '../store/actions/socketActions';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { getColorForNumber } from '../utils/gameUtils';
import NextPiece from './NextPiece';

const COLUMNS = 10;
const ROWS = 20;

export const Field = () => {
  const { room } = useParams();
  const socket = useContext(SocketContext);
  const field = useAppSelector((state: RootState) => state.player.field);
  const score = useAppSelector((state: RootState) => state.player.score);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let lastKeyPressTime = 0;
    const throttleInterval = 200;

    const handleKeyPress = (event: KeyboardEvent) => {
      const currentTime = new Date().getTime();
      if (
        event.key == ' ' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp'
      ) {
        event.preventDefault();
      }
      // if (currentTime - lastKeyPressTime > throttleInterval) {
      //   if (event.key === 'ArrowUp') {
      //     console.log(event.key);
      //     socket.emit('playerMove', { roomName: room, moveType: 'rotate' });
      //   } else if (event.key === 'ArrowDown') {
      //     console.log(event.key);
      //     socket.emit('playerMove', { roomName: room, moveType: 'drop' });
      //   } else if (event.key === 'ArrowLeft') {
      //     console.log(event.key);
      //     socket.emit('playerMove', { roomName: room, moveType: 'left' });
      //   } else if (event.key === 'ArrowRight') {
      //     console.log(event.key);
      //     socket.emit('playerMove', { roomName: room, moveType: 'right' });
      //   } else if (event.key === ' ') {
      //     socket.emit('playerMove', { roomName: room, moveType: 'hardDrop' });
      //     console.log(field);
      //   }
      if (currentTime - lastKeyPressTime > throttleInterval) {
        // Dispatch playerMove action instead of using socket.emit
        if (event.key === 'ArrowUp') {
          dispatch(playerMove(room, 'rotate'));
        } else if (event.key === 'ArrowDown') {
          dispatch(playerMove(room, 'drop'));
        } else if (event.key === 'ArrowLeft') {
          dispatch(playerMove(room, 'left'));
        } else if (event.key === 'ArrowRight') {
          dispatch(playerMove(room, 'right'));
        } else if (event.key === ' ') {
          dispatch(playerMove(room, 'hardDrop'));
        }

        lastKeyPressTime = currentTime;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [dispatch, field]);

  const fieldComponent = useMemo(() => {
    return field.map((row, rowIndex) => (
      <div key={rowIndex} className='flex'>
        {row.map((elem, colIndex) => (
          <div
            key={colIndex}
            className={`block ${getColorForNumber(elem)}`}
          ></div>
        ))}
      </div>
    ));
  }, [field]);

  return (
    <div className='w-fit flex-col'>
      <div className='text-center'>SCORE: {score}</div>
      <NextPiece />
      <div className='field-container'>{fieldComponent}</div>
    </div>
  );
};
