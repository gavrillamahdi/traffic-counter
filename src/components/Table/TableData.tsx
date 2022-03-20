import React from 'react';

import { useTableContext } from '@/context/TableContext';

interface TableDataProps {
  rowIndex: number;
  colKey: 'hv' | 'lv' | 'mc';
}

export default function TableData({ rowIndex, colKey }: TableDataProps): JSX.Element {
  const { data, setData } = useTableContext();

  // const [counter, setCounter] = React. useState<number>(data[rowIndex][colKey]);
  return (
    <td className="col-span-2">
      <div className="flex items-center justify-between">
        <span>{data[rowIndex][colKey]}</span>
        <div className="mr-4">
          <button title="decrement" type="button" className="btn btn-circle btn-sm mr-1">
            -
          </button>
          <button title="increment" type="button" className="btn btn-circle btn-sm">
            +
          </button>
        </div>
      </div>
    </td>
  );
}
