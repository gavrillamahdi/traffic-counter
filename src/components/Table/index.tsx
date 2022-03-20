import React from 'react';
import clsx from 'clsx';

import { useTableContext } from '@/context/TableContext';
import { ColumnType } from '@/types/ExcelJsType';
import TableBody from './TableBody';

interface TableProps {
  columns: ColumnType[];
}

export default function Table({ columns }: TableProps): JSX.Element {
  const tableHead = columns.map(({ header }) => header);
  const { data } = useTableContext();

  return (
    <section className="mx-auto mt-12 w-full overflow-x-auto rounded-lg shadow-md shadow-base-content/10 md:w-11/12">
      <table className="table w-full">
        <thead>
          <tr className="lg:grid lg:grid-cols-10">
            {tableHead.map((column, index) => (
              <th
                key={column}
                className={clsx(
                  index === 0 && 'col-span-1',
                  index === 1 && 'col-span-3',
                  index > 1 && 'col-span-2 min-w-[8.75rem]'
                )}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <TableBody key={row.id} id={row.id} index={index} item={row} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
