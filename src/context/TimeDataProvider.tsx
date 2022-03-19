import React, { useState } from 'react';

import { TimeData, Time } from '@/types/TimeDataType';

interface TimeDataProviderProps {
  children: React.ReactNode;
}

interface TimeDataContextType {
  timeData: TimeData;
  setTimeData?: (timeData: TimeData) => void;
}

const TIME: Time = {
  hour: 0,
  minute: 0,
  second: 0,
};

const TIME_DATA = { start: TIME, end: TIME, interval: TIME };

const TimeDataContext = React.createContext<TimeDataContextType>({
  timeData: TIME_DATA,
});

export function TimeDataProvider({ children }: TimeDataProviderProps): JSX.Element {
  const [timeData, setTimeData] = useState<TimeData>(TIME_DATA);

  const contextVal = React.useMemo(() => ({ timeData, setTimeData }), [timeData]);

  return <TimeDataContext.Provider value={contextVal}>{children}</TimeDataContext.Provider>;
}

export const useTimeDataContext = () => React.useContext(TimeDataContext);
