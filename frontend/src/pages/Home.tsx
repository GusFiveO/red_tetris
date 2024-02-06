import { Button } from '../components/Button';
import { withAuth } from '../hoc/AuthHoc';

export const Home = withAuth(() => {
  return (
    <div className='flex flex-col items-center justify-center bg-slate-800 h-svh'>
      <div className='text-white bg-red-500'>RED-TETRIS</div>
      <Button className='text-white bg-red-500'>PLAY</Button>
    </div>
  );
});
