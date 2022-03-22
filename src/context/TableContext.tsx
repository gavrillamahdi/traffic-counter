/* eslint-disable no-extend-native */
import React from 'react';

import useLocalStorage from '@/hooks/useLocalStorage';
import { RowType } from '@/types/ExcelJsType';

interface TableContextProps {
  children: React.ReactNode;
  timeRanges: string[];
}

interface TableContextType {
  data: RowType[];
  setData: React.Dispatch<React.SetStateAction<RowType[]>>;
}

const TableContext = React.createContext<TableContextType>({ data: [], setData: () => {} });

export function TableContextProvider({ children, timeRanges }: TableContextProps): JSX.Element {
  const mapToRowType = React.useCallback(
    (data: string[]): RowType[] =>
      data.map((item, index) => ({
        no: index + 1,
        waktu: item,
        mc: 0,
        lv: 0,
        hv: 0,
      })),
    [timeRanges]
  );

  const [dataMapped, setDataMapped] = useLocalStorage<RowType[]>('data', mapToRowType(timeRanges));

  React.useEffect(() => {
    let isSame: boolean = true;
    if (dataMapped.length !== timeRanges.length) isSame = false;
    else {
      for (let i = 0; i < dataMapped.length; i += 1) {
        if (dataMapped[i].waktu !== timeRanges[i]) {
          isSame = false;
          break;
        }
      }
    }

    if (!isSame) {
      setDataMapped(mapToRowType(timeRanges));
    }
  }, [timeRanges]);

  const contextVal = React.useMemo(
    () => ({ data: dataMapped, setData: setDataMapped }),
    [dataMapped]
  );

  return <TableContext.Provider value={contextVal}>{children}</TableContext.Provider>;
}

export const useTableContext = () => React.useContext(TableContext);
