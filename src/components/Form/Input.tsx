import React from 'react';
import { useTimeDataContext } from '@/context/TimeDataContext';

interface InputProps {
  id: string;
  section: 'start' | 'end' | 'interval';
  fraction: 'hour' | 'minute' | 'second';
  spanContent: 'h' | 'm' | 's';
  nextNode?: HTMLInputElement | undefined;
}

export default function Input({
  id,
  section,
  fraction,
  spanContent,
  nextNode,
}: InputProps): JSX.Element {
  const { timeData, setTimeData } = useTimeDataContext();

  const [inputValue, setInputValue] = React.useState<{ value: string; zeroOccurance: number }>({
    value: timeData[section][fraction] ? String(timeData[section][fraction]) : '',
    zeroOccurance: 0,
  });

  return (
    <label htmlFor={id} className="input-group" key={id}>
      <input
        id={id}
        type="number"
        className="input input-bordered text-center"
        value={inputValue.value.padStart(2, '0')}
        onChange={({ target: { value }, nativeEvent }) => {
          if ((nativeEvent as any).data === '0') {
            const zeroOccurance = inputValue.zeroOccurance + 1;
            setInputValue((prev) => ({
              ...prev,
              zeroOccurance: prev.zeroOccurance + 1,
            }));

            if (zeroOccurance === 2 && nextNode) {
              nextNode.focus();
              setInputValue((prev) => ({
                ...prev,
                zeroOccurance: 0,
              }));
              setTimeData((prev) => ({
                ...prev,
                [section]: { ...prev[section], [fraction]: value ? +value : 0 },
              }));
              return;
            }
          }

          if (+value < (fraction === 'hour' ? 24 : 60) && +value >= 0) {
            setInputValue((prev) => ({ ...prev, value: value.replace(/0+/, '') }));
            setTimeData((prev) => ({
              ...prev,
              [section]: { ...prev[section], [fraction]: +value },
            }));
          }

          if (
            value.length === 2 ||
            +value > (fraction === 'hour' ? 2 : 5) ||
            (!value.endsWith('0') && inputValue.zeroOccurance !== 0)
          ) {
            if (nextNode) nextNode.focus();
            setInputValue((prev) => ({
              ...prev,
              zeroOccurance: 0,
            }));
            setTimeData((prev) => ({
              ...prev,
              [section]: { ...prev[section], [fraction]: value ? +value : 0 },
            }));
          }
        }}
        onKeyDown={(e) => {
          if (['e', '+', '-'].includes(e.key)) e.preventDefault();
          else if (['Backspace', 'Delete'].includes(e.key)) {
            e.preventDefault();
            setInputValue((prev) => ({ ...prev, value: '0' }));
            setTimeData((prev) => ({
              ...prev,
              [section]: { ...prev[section], [fraction]: 0 },
            }));
          }
        }}
        onFocus={(e) => e.target.select()}
      />
      <span title={fraction}>{spanContent}</span>
    </label>
  );
}

Input.defaultProps = { nextNode: undefined };
