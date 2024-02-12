import { ScoreInfo } from '../pages/Game';
import '../styles/custom-utilities.css';
import '../styles/hide-scrollbar.css';

type ScoreboardProps = {
  scoreList: ScoreInfo[];
};

export const Scoreboard = ({ scoreList }: ScoreboardProps) => {
  const scoreComponent = scoreList
    .sort((a, b) => {
      return a.score > b.score ? 1 : 0;
    })
    .map(({ name, score }) => (
      <div key={name} className='flex m-2 md:text-base text-xs'>
        {`${name.padEnd(12, '\u00A0')}:  ${score
          .toString()
          .padStart(4, '\u00A0')}`}
      </div>
    ));
  return (
    <div className='info-container p-1 scrollbar-hide'>
      <div>SCOREBOARD</div>
      <div>{scoreComponent}</div>
    </div>
  );
};
