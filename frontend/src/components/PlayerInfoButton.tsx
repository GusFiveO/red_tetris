import { ReactNode } from 'react';
import api from '../api/api';

type Props = {
  children: string | ReactNode;
};

const getMyInfo = async () => {
  const response = await api.get('/player/me');
  console.log(response);
};

export const PlayerInfoButton = ({ children }: Props) => {
  return (
    <>
      <button onClick={getMyInfo}>{children}</button>
    </>
  );
};
