import { RootState, useAppSelector } from '../store/store';
import '../styles/custom-utilities.css';
import '../styles/hide-scrollbar.css';
import { createMatrix } from '../utils/gameUtils';

const COLUMNS = 10;
const ROWS = 20;

export const Spectrum = () => {
  const opponentList = useAppSelector((state: RootState) => state.opponents);

  const opponentsComponent = [...opponentList]
    .sort((a, b) => {
      return a.score > b.score ? 1 : 0;
    })
    .map(({ name, firstLine }) => {
      const zerosMatrix = createMatrix(ROWS, COLUMNS);
      return (
        <div
          key={name}
          className='flex flex-col items-center justify-center my-2'
        >
          <div className='m-2 2xl:text-xl md:text-base text-xs'>{name}</div>
          <div className='border border-slate-400 rounded'>
            {zerosMatrix.map((row, rowIndex) => (
              <div key={rowIndex} className='flex'>
                {row.map((elem, colIndex) => (
                  <div
                    key={colIndex}
                    className={`spectre-block ${
                      ROWS - rowIndex < firstLine ? 'bg-black' : 'bg-gray-600'
                    }`}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    });

  return (
    <div className='info-container scrollbar-hide'>{opponentsComponent}</div>
  );
};
