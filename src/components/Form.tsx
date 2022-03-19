/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */
import React, { useState } from 'react';

type Time = {
  hour: number;
  minute: number;
  second: number;
};

interface TimeData {
  start: Time;
  end: Time;
  interval: Time;
}

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
const SPAN_CONTENT = ['h', 'm', 's'];

// time constant
const TIME: ['hour', 'minute', 'second'] = ['hour', 'minute', 'second'];

export default function Form({}: FormProps): JSX.Element {
  const [data, setData] = React.useState<TimeData>(() => {
    const time: Time = {
      hour: 0,
      minute: 0,
      second: 0,
    };
    return { start: time, end: time, interval: time };
  });

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
      {/* start sruvey time section */}
      <section className="form-control w-full">
        <label htmlFor={START_ID_HOUR} className="label">
          <span className="font-semibold">Start Survey Time</span>
        </label>
        <div className="grid grid-cols-3 gap-1">
          {START_ID.map((id, i) => (
            <label htmlFor={id} className="input-group" key={id}>
              <input
                id={id}
                type="number"
                className="input input-bordered text-center"
                value={String(data.start[TIME[i]]).padStart(2, '0')}
                onChange={({ target: { value } }) => {
                  console.log(value);
                  if (+value < (i === 0 ? 24 : 60) && +value >= 0) {
                    setData((prev) => ({
                      ...prev,
                      start: { ...prev.start, [TIME[i]]: +value },
                    }));
                  }
                  if (String(+value).length === 2 || +value > (i === 0 ? 2 : 5)) {
                    (inputEls as NodeListOf<HTMLInputElement>)[i + 1].focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (['e', '+', '-'].includes(e.key)) e.preventDefault();
                  else if (['Backspace', 'Delete'].includes(e.key))
                    setData((prev) => ({
                      ...prev,
                      start: { ...prev.start, [TIME[i]]: 0 },
                    }));
                }}
                onFocus={(e) => e.target.select()}
              />
              <span title={TIME[i]}>{SPAN_CONTENT[i]}</span>
            </label>
          ))}
        </div>
      </section>

      {/* end survey time section */}
      <section className="form-control w-full">
        <label htmlFor={END_ID_HOUR} className="label">
          <span className="font-semibold">End Survey Time</span>
        </label>
        <div className="grid grid-cols-3 gap-1">
          {END_ID.map((id, i) => (
            <label htmlFor={id} className="input-group" key={id}>
              <input
                id={id}
                type="number"
                className="input input-bordered text-center"
                value={String(data.end[TIME[i]]).padStart(2, '0')}
                onChange={({ target: { value } }) => {
                  if (+value < (i === 0 ? 24 : 60) && +value >= 0) {
                    setData((prev) => ({
                      ...prev,
                      end: { ...prev.end, [TIME[i]]: +value },
                    }));
                  }
                  if (String(+value).length === 2 || +value > (i === 0 ? 2 : 5) || +value === 0) {
                    (inputEls as NodeListOf<HTMLInputElement>)[i + 3 + 1].focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (['e', '+', '-'].includes(e.key)) e.preventDefault();
                  else if (['Backspace', 'Delete'].includes(e.key))
                    setData((prev) => ({
                      ...prev,
                      end: { ...prev.end, [TIME[i]]: 0 },
                    }));
                }}
                onFocus={(e) => e.target.select()}
              />
              <span title={TIME[i]}>{SPAN_CONTENT[i]}</span>
            </label>
          ))}
        </div>
      </section>

      <hr className="rounded-full border-t-2 border-primary/10 md:col-span-2" />

      {/* time interval section */}
      <section className="form-control w-full">
        <label htmlFor={INTERVAL_ID_HOUR} className="label">
          <span className="font-semibold">Time Interval</span>
        </label>
        <div className="grid grid-cols-3 gap-1">
          {INTERVAL_ID.map((id, i) => (
            <label htmlFor={id} className="input-group" key={id}>
              <input
                id={id}
                type="number"
                className="input input-bordered text-center"
                value={String(data.interval[TIME[i]]).padStart(2, '0')}
                onChange={({ target: { value } }) => {
                  if (+value < (i === 0 ? 24 : 60) && +value >= 0) {
                    setData((prev) => ({
                      ...prev,
                      interval: { ...prev.interval, [TIME[i]]: +value },
                    }));
                  }
                  if (String(+value).length === 2 || +value > (i === 0 ? 2 : 5) || +value === 0) {
                    (inputEls as NodeListOf<HTMLInputElement>)[i + 6 + 1]?.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (['e', '+', '-'].includes(e.key)) e.preventDefault();
                  else if (['Backspace', 'Delete'].includes(e.key))
                    setData((prev) => ({
                      ...prev,
                      interval: { ...prev.interval, [TIME[i]]: 0 },
                    }));
                }}
                onFocus={(e) => e.target.select()}
              />
              <span title={TIME[i]}>{SPAN_CONTENT[i]}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="flex justify-end pt-10 md:col-span-2 md:pt-2">
        <button className="btn btn-primary" type="submit">
          Create Table
        </button>
      </section>
    </form>
  );
}
