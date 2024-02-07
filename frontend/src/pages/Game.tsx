import '../styles/custom-utilities.css';

type GameProps = {
  hash?: string;
};

export const Game = ({ hash }: GameProps) => {
  return (
    <div className='main-container flex flex-col items-center justify-center'>
      <div>GAME : {hash}</div>
    </div>
  );
};
