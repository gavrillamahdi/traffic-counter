import React from 'react';
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
  const mapToRowType = (data: string[]): RowType[] =>
    data.map((item, index) => ({
      no: index + 1,
      waktu: item,
      mc: 0,
      lv: 0,
      hv: 0,
    }));

  const [dataMapped, setDataMapped] = React.useState<RowType[]>(mapToRowType(timeRanges));

  React.useEffect(() => {
    setDataMapped(mapToRowType(timeRanges));
  }, [timeRanges]);

  const contextVal = React.useMemo(
    () => ({ data: dataMapped, setData: setDataMapped }),
    [dataMapped]
  );

  return <TableContext.Provider value={contextVal}>{children}</TableContext.Provider>;
}

export const useTableContext = () => React.useContext(TableContext);
