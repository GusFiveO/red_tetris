import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { playerMove } from '../store/actions/socketActions';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { getColorForNumber } from '../utils/gameUtils';
import NextPiece from './NextPiece';

const COLUMNS = 10;
const ROWS = 20;

interface FieldProps {
  message?: string;
}

export const Field: React.FC<FieldProps> = ({ message }) => {
  const { room } = useParams();
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

  const createGrid = (field: number[][]) => {
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
  };

  const fieldComponent = useMemo(() => {
    return createGrid(field);
  }, [field]);

  return (
    <div className='w-fit flex-col'>
      <div className='text-center'>SCORE: {score}</div>
      <div>
        <NextPiece>
          {message && (
            <div className='absolute inset-0 flex justify-center items-center bg-black opacity-80'></div>
          )}
        </NextPiece>
      </div>
      <div className='relative field-container'>
        {fieldComponent}
        {message && (
          <div className='absolute inset-0 flex justify-center items-center bg-black opacity-80'>
            <div className='text-4xl text-white font-bold '>{message}</div>
          </div>
        )}
      </div>
    </div>
  );
};
