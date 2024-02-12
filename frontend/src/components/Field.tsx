import { getColorForNumber } from '../utils/gameUtils';

type FieldProps = {
  field: number[][];
};

export const Field = ({ field }: FieldProps) => {
  const fieldComponent = field.map((row, rowIndex) => (
    <div key={rowIndex} className='flex'>
      {row.map((elem, colIndex) => (
        <div
          key={colIndex}
          className={`block ${getColorForNumber(elem)}`}
        ></div>
      ))}
    </div>
  ));
  return <div className='field-container'>{fieldComponent}</div>;
};
