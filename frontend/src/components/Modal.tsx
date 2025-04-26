const Modal = ({ children }: { children: string | React.ReactNode }) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='fixed inset-0 bg-gray-900 opacity-80'></div>
      <div className='info-container z-50 p-2'>{children}</div>
    </div>
  );
};

export default Modal;
