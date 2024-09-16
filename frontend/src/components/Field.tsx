import { useEffect, useMemo } from 'react';
import { updatePlayerField } from '../store/features/playerSlice';
import { RootState, useAppDispatch, useAppSelector } from '../store/store';
import { createRandomMatrix, getColorForNumber } from '../utils/gameUtils';

const COLUMNS = 10;
const ROWS = 20;

export const Field = () => {
  const field = useAppSelector((state: RootState) => state.player.field);
  const score = useAppSelector((state: RootState) => state.player.score);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('Field component: ', field);

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
        if (event.key === 'ArrowUp') {
          console.log(event.key);
        } else if (event.key === 'ArrowDown') {
          console.log(event.key);
        } else if (event.key === 'ArrowLeft') {
          console.log(event.key);
        } else if (event.key === 'ArrowRight') {
          console.log(event.key);
        } else if (event.key === ' ') {
          dispatch(updatePlayerField(createRandomMatrix(ROWS, COLUMNS)));
          console.log(field);
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
    console.log('IN USE MEMO');
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
    <div>
      <div className='text-center'>SCORE: {score}</div>
      <div className='field-container'>{fieldComponent}</div>
    </div>
  );
};
