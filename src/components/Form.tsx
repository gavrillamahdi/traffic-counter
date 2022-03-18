/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */
import React from 'react';

interface FormProps {}

const START_ID_HOUR = 'start-hour';
const START_ID_MINUTE = 'start-minute';
const START_ID_SECOND = 'start-second';
const END_ID_HOUR = 'end-hour';
const END_ID_MINUTE = 'end-minute';
const END_ID_SECOND = 'end-second';
const INTERVAL_ID_HOUR = 'interval-hour';
const INTERVAL_ID_MINUTE = 'interval-minute';
const INTERVAL_ID_SECOND = 'interval-second';

export default function Form({}: FormProps): JSX.Element {
  return (
    <form
      action=""
      className="grid grid-cols-1 gap-x-20 gap-y-8 md:grid-cols-2 lg:mx-auto lg:w-4/5"
    >
      {/* start sruvey time section */}
      <section className="form-control w-full">
        <label htmlFor={START_ID_HOUR} className="label">
          <span className="font-semibold">Start Survey Time</span>
        </label>
        <div className="grid grid-cols-3 gap-1">
          <label htmlFor={START_ID_HOUR} className="input-group">
            <input id={START_ID_HOUR} type="text" className="input input-bordered" />
            <span>h</span>
          </label>
          <label htmlFor={START_ID_MINUTE} className="input-group">
            <input id={START_ID_MINUTE} type="text" className="input input-bordered" />
            <span>m</span>
          </label>
          <label htmlFor={START_ID_SECOND} className="input-group">
            <input id={START_ID_SECOND} type="text" className="input input-bordered" />
            <span>s</span>
          </label>
        </div>
      </section>

      {/* end survey time section */}
      <section className="form-control w-full">
        <label htmlFor={END_ID_HOUR} className="label">
          <span className="font-semibold">End Survey Time</span>
        </label>
        <div className="grid grid-cols-3 gap-1">
          <label htmlFor={END_ID_HOUR} className="input-group">
            <input id={END_ID_HOUR} type="text" className="input input-bordered" />
            <span>h</span>
          </label>
          <label htmlFor={END_ID_MINUTE} className="input-group">
            <input id={END_ID_MINUTE} type="text" className="input input-bordered" />
            <span>m</span>
          </label>
          <label htmlFor={END_ID_SECOND} className="input-group">
            <input id={END_ID_SECOND} type="text" className="input input-bordered" />
            <span>s</span>
          </label>
        </div>
      </section>

      <hr className="rounded-full border-t-2 border-primary/10 md:col-span-2" />
      {/* time interval section */}
      <section className="form-control w-full">
        <label htmlFor={INTERVAL_ID_HOUR} className="label">
          <span className="font-semibold">Time Interval</span>
        </label>
        <div className="grid grid-cols-3 gap-1">
          <label htmlFor={INTERVAL_ID_HOUR} className="input-group">
            <input id={INTERVAL_ID_HOUR} type="text" className="input input-bordered" />
            <span>h</span>
          </label>
          <label htmlFor={INTERVAL_ID_MINUTE} className="input-group">
            <input id={INTERVAL_ID_MINUTE} type="text" className="input input-bordered" />
            <span>m</span>
          </label>
          <label htmlFor={INTERVAL_ID_SECOND} className="input-group">
            <input id={INTERVAL_ID_SECOND} type="text" className="input input-bordered" />
            <span>s</span>
          </label>
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
