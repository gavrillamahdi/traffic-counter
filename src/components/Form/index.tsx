/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */
import React, { useState } from 'react';

import InputSection from '@/components/Form/InputSection';
import { useTimeDataContext } from '@/context/TimeDataProvider';

interface FormProps {}

// id constant
const START_ID_HOUR = 'start-hour';
const START_ID_MINUTE = 'start-minute';
const START_ID_SECOND = 'start-second';
const END_ID_HOUR = 'end-hour';
const END_ID_MINUTE = 'end-minute';
const END_ID_SECOND = 'end-second';
const INTERVAL_ID_HOUR = 'interval-hour';
const INTERVAL_ID_MINUTE = 'interval-minute';
const INTERVAL_ID_SECOND = 'interval-second';

// collection of ids
const START_ID = [START_ID_HOUR, START_ID_MINUTE, START_ID_SECOND];
const END_ID = [END_ID_HOUR, END_ID_MINUTE, END_ID_SECOND];
const INTERVAL_ID = [INTERVAL_ID_HOUR, INTERVAL_ID_MINUTE, INTERVAL_ID_SECOND];

// span content
const SPAN_CONTENT: ['h', 'm', 's'] = ['h', 'm', 's'];

// time constant
const FRACTIONS: ['hour', 'minute', 'second'] = ['hour', 'minute', 'second'];

const sliceNodeList = (
  nodeList: NodeListOf<HTMLInputElement>,
  start: number,
  end?: number | undefined
): HTMLInputElement[] => Array.from(nodeList).slice(start, end);

export default function Form({}: FormProps): JSX.Element {
  const { timeData } = useTimeDataContext();

  const [inputEls, setInputEls] = useState<NodeListOf<HTMLInputElement>>();

  React.useEffect(() => {
    setInputEls(document.querySelectorAll('input[type=number]'));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-x-20 gap-y-8 md:grid-cols-2 lg:mx-auto lg:w-4/5"
    >
      {['Start Survey Time', 'End Survey Time', 'Interval Time'].map((title, index) => (
        <InputSection
          key={title}
          inputSectionName={title}
          section={Object.keys(timeData)[index] as 'start' | 'end' | 'interval'}
          inputIds={[START_ID, END_ID, INTERVAL_ID][index]}
          fractions={FRACTIONS}
          spanContents={SPAN_CONTENT}
          nextNode={
            inputEls
              ? sliceNodeList(inputEls, index * 3, index * 3 + 3 === 9 ? index * 3 + 3 : undefined)
              : undefined
          }
        />
      ))}

      <section className="flex justify-end pt-10 md:col-span-2 md:pt-2">
        <button id="submit" className="btn btn-primary" type="submit">
          Create Table
        </button>
      </section>
    </form>
  );
}
