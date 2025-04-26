import { useState } from 'react';
import { setStartingLevel } from '../store/features/gameSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

export const LevelSelector = () => {
  const startLevel = useAppSelector((state: RootState) => state.game.level);
  const [level, setLevel] = useState<number>(startLevel);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLevel = parseInt(event.target.value);
    dispatch(setStartingLevel(newLevel));
    setLevel(newLevel);
  };

  return (
    <div className=' flex flex-col items-center'>
      <label htmlFor='level'>Level</label>
      <label htmlFor='level'>{level}</label>
      <input
        type='range'
        id='level'
        value={level}
        min={1}
        max={29}
        onChange={handleChange}
        className='bg-slate-800 border border-slate-400 rounded-md p-1 w-24'
      />
    </div>
  );
};
