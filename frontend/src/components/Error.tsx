import '../styles/custom-utilities.css';
import { LinkButton } from './LinkButton';

type ErrorProps = {
  message?: string;
};

export const Error = ({ message }: ErrorProps) => {
  return (
    <div className='main-container flex flex-col items-center justify-center'>
      <h1>ERROR</h1>
      <div>{message}</div>
      <LinkButton href='/'>BACK TO HOME</LinkButton>
    </div>
  );
};
