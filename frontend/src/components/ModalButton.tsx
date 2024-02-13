import { useState } from 'react';
import { Button } from './Button';

interface ModalButtonProps {
  buttonText: string;
  children: string | React.ReactNode;
}

const ModalButton = ({ buttonText, children }: ModalButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={openModal}>
        {buttonText}
        <img src='exit.svg' className='h-5 w-5 m-2'></img>
      </Button>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div
            className='fixed inset-0 bg-gray-900 opacity-80'
            onClick={closeModal}
          ></div>
          <div className='info-container z-50 p-2'>{children}</div>
        </div>
      )}
    </div>
  );
};

export default ModalButton;
