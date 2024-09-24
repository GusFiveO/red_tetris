import { Scoreboard } from '../components/Scoreboard';
import '../styles/custom-utilities.css';

export const Home = () => {
  return (
    <div className='main-container flex flex-col items-center justify-center'>
      <div className='bg-red-500'>RED-TETRIS</div>

      <Scoreboard />
      {/* <Button
        onClick={() => api.post('/scoreboard', { name: 'lol', score: 1000 })}
      >
        PUSH SCORE
      </Button> */}
      <div>To join a game use the URL "/:room/:player_name"</div>
    </div>
  );
};
