import React from 'react';
import { useTimeDataContext } from '@/context/TimeDataProvider';

interface InputProps {
  id: string;
  fraction: 'hour' | 'minute' | 'second';
  spanContent: 'h' | 'm' | 's';
  nextNode?: HTMLInputElement | undefined;
}

export default function Input({ id, fraction, spanContent, nextNode }: InputProps): JSX.Element {
  const { setTimeData } = useTimeDataContext();

  const [inputValue, setInputValue] = React.useState<string>('0');
  console.log(inputValue);

  return (
    <label htmlFor={id} className="input-group" key={id}>
      <input
        id={id}
        type="number"
        className="input input-bordered text-center"
        value={inputValue.padStart(2, '0')}
        onChange={({ target: { value } }) => {
          console.log(value, typeof value);
          if (+value < (fraction === 'hour' ? 24 : 60) && +value >= 0) {
            setInputValue(value);
          }
          if (value.length >= 2 || +value > (fraction === 'hour' ? 2 : 5)) {
            if (nextNode) nextNode.focus();
          }
        }}
        onKeyDown={(e) => {
          if (['e', '+', '-'].includes(e.key)) e.preventDefault();
          else if (['Backspace', 'Delete'].includes(e.key)) setInputValue('00');
        }}
        onFocus={(e) => e.target.select()}
      />
      <span title={fraction}>{spanContent}</span>
    </label>
  );
}

Input.defaultProps = { nextNode: undefined };
