import { Button } from '../components/Button';
import { withAuth } from '../hoc/RootHoc';
import '../styles/custom-utilities.css';

export const Home = withAuth(() => {
  return (
    <div className='main-container flex flex-col items-center justify-center'>
      <div className='bg-red-500'>RED-TETRIS</div>
      <Button
        onClick={() => (window.location.href = 'http://localhost:3000/#lol')}
      >
        PLAY
      </Button>
    </div>
  );
});
