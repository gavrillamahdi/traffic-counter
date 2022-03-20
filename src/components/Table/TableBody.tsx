import React from 'react';
import clsx from 'clsx';

import { RowType } from '@/types/ExcelJsType';
import TableData from './TableData';

interface RowTypeWithId extends RowType {
  id: string;
}

interface TableBodyProps {
  index: number;
  item: RowTypeWithId;
}

export default function TableBody({ index, item }: TableBodyProps): JSX.Element {
  return (
    <tr className="lg:grid lg:grid-cols-10">
      {Object.entries(item)
        .slice(1)
        .map(([key, value], i) =>
          i <= 1 ? (
            <th
              key={key}
              className={clsx(
                i === 0 && 'col-span-1',
                i === 1 &&
                  'col-span-3 whitespace-normal text-center md:whitespace-nowrap md:text-left'
              )}
            >
              {value}
            </th>
          ) : (
            <TableData key={key} colKey={key as 'mc' | 'lv' | 'hv'} rowIndex={index} />
          )
        )}
    </tr>
  );
}
