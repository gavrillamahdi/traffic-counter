import React from 'react';
import { nanoid } from 'nanoid/non-secure';

import { RowType } from '@/types/ExcelJsType';

interface TableContextProps {
  children: React.ReactNode;
  timeRanges: string[];
}

interface RowTypeWithId extends RowType {
  id: string;
}

interface TableContextType {
  data: RowTypeWithId[];
  setData: React.Dispatch<React.SetStateAction<RowTypeWithId[]>>;
}

const TableContext = React.createContext<TableContextType>({ data: [], setData: () => {} });

export function TableContextProvider({ children, timeRanges }: TableContextProps): JSX.Element {
  const mapToRowTypeWithId = (data: string[]): RowTypeWithId[] =>
    data.map((item, index) => ({
      id: nanoid(),
      no: index + 1,
      waktu: item,
      mc: 0,
      lv: 0,
      hv: 0,
    }));

  const [dataMapped, setDataMapped] = React.useState<RowTypeWithId[]>(
    mapToRowTypeWithId(timeRanges)
  );

  React.useEffect(() => {
    setDataMapped(mapToRowTypeWithId(timeRanges));
  }, [timeRanges]);

  const contextVal = React.useMemo(
    () => ({ data: dataMapped, setData: setDataMapped }),
    [dataMapped]
  );

  return <TableContext.Provider value={contextVal}>{children}</TableContext.Provider>;
}

export const useTableContext = () => React.useContext(TableContext);
