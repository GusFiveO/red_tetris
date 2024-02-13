import { RootState, useAppSelector } from '../store/store';
import '../styles/custom-utilities.css';
import '../styles/hide-scrollbar.css';

export const Scoreboard = () => {
  const playerScore = useAppSelector((state: RootState) => state.player.score);
  const opponentList = useAppSelector((state: RootState) => state.opponents);

  const scoreComponent = [...opponentList]
    .sort((a, b) => {
      return a.score < b.score ? 1 : 0;
    })
    .map(({ name, score }) => (
      <div key={name} className='m-2 2xl:text-xl md:text-base text-xs'>
        {`${name.padEnd(12, '\u00A0')}:  ${score
          .toString()
          .padStart(4, '\u00A0')}`}
      </div>
    ));
  return (
    <div className='flex flex-col items-center h-1/2'>
      <div className='info-container overflow-y-scroll scrollbar-hide'>
        <div className='flex flex-col items-center max-h-20 mx-1'>
          <div className='flex mt-1 2xl:text-xl md:text-base text-xs'>
            SCOREBOARD
          </div>
          <div className='flex mt-2 2xl:text-xl md:text-base text-xs text-lime-500 '>
            {`${'You'.padEnd(12, '\u00A0')}:  ${playerScore
              .toString()
              .padStart(4, '\u00A0')}`}
          </div>
          <hr className='h-px border border-slate-500 w-full'></hr>
        </div>
        <div>{scoreComponent}</div>
      </div>
    </div>
  );
};
