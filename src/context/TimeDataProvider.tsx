import React, { useState } from 'react';

interface TimeDataProviderProps {
  children: React.ReactNode;
}

const TimeDataContext = React.createContext({
  timeData: 'tes',
});

export function TimeDataProvider({ children }: TimeDataProviderProps): JSX.Element {
  const [timeData, setTimeData] = useState<string>('hehe');
  const contextVal = React.useMemo(() => ({ timeData, setTimeData }), [timeData]);

  return <TimeDataContext.Provider value={contextVal}>{children}</TimeDataContext.Provider>;
}

export const useTimeDataContext = React.useContext(TimeDataContext);
