import { useEffect, useState } from 'react';
import api from '../api/api';
import '../styles/custom-utilities.css';
import '../styles/hide-scrollbar.css';

interface ScoreInfo {
  name: string;
  score: number;
}

export const Scoreboard = () => {
  const [scoreboardInfo, setScoreboardInfo] = useState<ScoreInfo[]>([]);

  useEffect(() => {
    const getScoreboardInfo = async () => {
      const response = await api.get('/scoreboard');
      setScoreboardInfo(response.data);
    };
    getScoreboardInfo();
  }, []);
  const scoreComponent = [...scoreboardInfo]
    .sort((a, b) => {
      // return a.score < b.score ? 0 : -1;
      return a.score < b.score ? 1 : 0;
    })
    .map(({ name, score }, index) => (
      <div key={index} className='m-2 2xl:text-xl md:text-base text-xs'>
        {/* {`${name.padEnd(12, '\u00A0')}:  ${score
          .toString()
          .padStart(4, '\u00A0')}`} */}
        {`${(name.length > 8 ? name.substring(0, 8) + '...' : name).padEnd(
          12,
          '\u00A0'
        )}:  ${score.toString().padStart(4, '\u00A0')}`}
      </div>
    ));
  return (
    <div className='flex flex-col items-center h-1/2 m-3'>
      <div className='flex info-container overflow-auto scrollbar-hide h-full'>
        <div className='flex flex-col items-center max-h-20 mx-1'>
          <div className='flex mt-1 2xl:text-xl md:text-base text-xs'>
            SCOREBOARD
          </div>
        </div>
        <hr className='h-px border border-slate-500 w-full'></hr>
        <div className='overflow-y-scroll scrollbar-hide max-w-60'>
          {scoreComponent.length === 0 ? (
            <div className='text-center p-2'>No score stored</div>
          ) : (
            scoreComponent
          )}
        </div>
      </div>
    </div>
  );
};
