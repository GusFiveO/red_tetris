import { useEffect, useState } from 'react';
import api from '../api/api';
import '../styles/custom-utilities.css';
import '../styles/hide-scrollbar.css';

// const opponentsSample = [
//   { name: 'Player 1', score: 100 },
//   { name: 'Player 2', score: 150 },
//   { name: 'Player 3', score: 80 },
//   { name: 'Player 4', score: 200 },
//   { name: 'Player 5', score: 120 },
//   { name: 'Player 6', score: 90 },
//   { name: 'Player 7', score: 110 },
//   { name: 'Player 8', score: 180 },
//   { name: 'Player 9', score: 160 },
//   { name: 'Player 10', score: 140 },
//   { name: 'Player 8', score: 180 },
//   { name: 'Player 9', score: 160 },
//   { name: 'Player 10', score: 140 },
//   { name: 'Player 8', score: 180 },
//   { name: 'Player 9', score: 160 },
//   { name: 'Player 10', score: 140 },
//   { name: 'Player 8', score: 180 },
//   { name: 'Player 9', score: 160 },
//   { name: 'Player 10', score: 140 },
//   { name: 'Player 8', score: 180 },
//   { name: 'Player 9', score: 160 },
//   { name: 'Player 10', score: 140 },
//   { name: 'Player 8', score: 180 },
//   { name: 'Player 9', score: 160 },
//   { name: 'Player 10', score: 140 },
// ];

export const Scoreboard = () => {
  const [scoreboardInfo, setScoreboardInfo] = useState([]);

  useEffect(() => {
    const getScoreboardInfo = async () => {
      const response = await api.get('/scoreboard');
      setScoreboardInfo(response.data);
    };
    getScoreboardInfo();
  }, []);
  // const scoreComponent = [...opponentsSample]
  const scoreComponent = [...scoreboardInfo]
    .sort((a, b) => {
      return a.score < b.score ? 1 : 0;
    })
    .map(({ name, score }, index) => (
      <div key={index} className='m-2 2xl:text-xl md:text-base text-xs'>
        {`${name.padEnd(12, '\u00A0')}:  ${score
          .toString()
          .padStart(4, '\u00A0')}`}
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
        <div className='overflow-y-scroll scrollbar-hide'>{scoreComponent}</div>
      </div>
    </div>
  );
};
