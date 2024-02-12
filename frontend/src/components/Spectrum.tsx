import { PlayerSpectrum } from '../pages/Game';
import '../styles/custom-utilities.css';
import '../styles/hide-scrollbar.css';
import { createMatrix } from '../utils/gameUtils';

const COLUMNS = 10;
const ROWS = 20;

type SpectrumProps = {
  opponentList: PlayerSpectrum[];
};

export const Spectrum = ({ opponentList }: SpectrumProps) => {
  const opponentsComponent = opponentList
    .sort((a, b) => {
      return a.score > b.score ? 1 : 0;
    })
    .map(({ name, firstLine }) => {
      const zerosMatrix = createMatrix(ROWS, COLUMNS);
      return (
        <div
          key={name}
          className='flex flex-col items-center justify-center m-2 md:text-base text-xs'
        >
          <div>{name}</div>
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
      );
    });

  return (
    <div className='info-container scrollbar-hide'>{opponentsComponent}</div>
  );
};
