import { useMemo } from 'react';
import { RootState, useAppSelector } from '../store/store';
import { getColorForNumber } from '../utils/gameUtils';

const NextPiece = ({ children }) => {
  const nextPiece = useAppSelector(
    (state: RootState) => state.player.nextPiece
  );

  const nextPieceComponent = useMemo(() => {
    return nextPiece.map((row, rowIndex) => (
      <div key={rowIndex} className='flex'>
        {row.map((elem, colIndex) => (
          <div
            key={colIndex}
            className={`block ${getColorForNumber(elem)}`}
          ></div>
        ))}
      </div>
    ));
  }, [nextPiece]);

  return (
    <div className='relative field-container'>
      {nextPieceComponent}
      {children}
    </div>
  );
};

export default NextPiece;
