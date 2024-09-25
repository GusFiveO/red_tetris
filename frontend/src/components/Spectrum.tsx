import { RootState, useAppSelector } from '../store/store';
import '../styles/custom-utilities.css';
import '../styles/hide-scrollbar.css';
import { createMatrix } from '../utils/gameUtils';

const COLUMNS = 10;
const ROWS = 20;

export const Spectrum = () => {
  const opponentList = useAppSelector((state: RootState) => state.opponents);
  // const id = useAppSelector((state: RootState) => state.player.id);

  // console.log('id:', id);

  const opponentsComponent = [...opponentList]
    .sort((a, b) => {
      return a.score < b.score ? 1 : 0;
    })
    .map(({ name, firstLine }, index) => {
      const zerosMatrix = createMatrix(ROWS, COLUMNS);
      return (
        <div
          key={index}
          className='flex flex-col items-center justify-center w-38'
        >
          <div className='m-2 2xl:text-xl md:text-base text-xs'>
            {name.length > 8 ? name.substring(0, 8) + '...' : name}
          </div>
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
    <div className='info-container max-h-[50%] scrollbar-hide overflow-y-scroll w-fit'>
      {opponentsComponent}
    </div>
  );
};
