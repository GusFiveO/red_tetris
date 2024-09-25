import { useMemo } from 'react';
import { RootState, useAppSelector } from '../store/store';
import { getColorForNumber } from '../utils/gameUtils';

const NextPiece = () => {
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

  return <div className='field-container'>{nextPieceComponent}</div>;
};

export default NextPiece;
