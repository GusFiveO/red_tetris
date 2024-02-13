import { RootState, useAppSelector } from '../store/store';
import '../styles/custom-utilities.css';
import '../styles/hide-scrollbar.css';

export const Scoreboard = () => {
  const playerScore = useAppSelector((state: RootState) => state.player.score);
  const opponentList = useAppSelector((state: RootState) => state.opponents);

  const scoreComponent = [...opponentList]
    .sort((a, b) => {
      return a.score > b.score ? 1 : 0;
    })
    .map(({ name, score }) => (
      <div key={name} className='m-2 2xl:text-xl md:text-base text-xs'>
        {`${name.padEnd(12, '\u00A0')}:  ${score
          .toString()
          .padStart(4, '\u00A0')}`}
      </div>
    ));
  return (
    <div className='h-full scrollbar-hide info-container'>
      <div className='flex flex-col items-center h-20 m-1'>
        <div className='flex flex-grow m-2 2xl:text-xl md:text-base text-xs'>
          SCOREBOARD
        </div>
        <div className='flex flex-grow m-2 2xl:text-xl md:text-base text-xs text-green-400 '>
          {`${'You'.padEnd(12, '\u00A0')}:  ${playerScore
            .toString()
            .padStart(4, '\u00A0')}`}
        </div>
        <hr className='h-px border border-slate-500 w-full'></hr>
      </div>
      <div className='h-[calc(100%-5rem)] overflow-y-scroll scrollbar-hide'>
        {scoreComponent}
      </div>
    </div>
  );
};
