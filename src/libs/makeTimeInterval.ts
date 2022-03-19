/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import isBetween from 'dayjs/plugin/isBetween';
import duration from 'dayjs/plugin/duration';

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

export default function makeTimeInterval(timeData: TimeData): string[] {
  // initialize array of strings
  const arrayOfTime: string[] = [];

  // initialize dayjs
  dayjs.extend(objectSupport);
  dayjs.extend(isBetween);
  dayjs.extend(duration);

  // @ts-ignore
  const start = dayjs(timeData.start); // @ts-ignore
  const end = dayjs(timeData.end); // @ts-ignore
  const interval = dayjs.duration(timeData.interval).asMilliseconds(); // convert to milliseconds

  let current: dayjs.Dayjs = start.clone();

  while (true) {
    arrayOfTime.push(
      `${current.format('HH:mm:ss')} - ${current.add(interval, 'ms').format('HH:mm:ss')}`
    );

    current = current.add(interval, 'ms');
    if (!current.isBetween(start, end, null, '[)')) break;
  }

  return arrayOfTime;
}
