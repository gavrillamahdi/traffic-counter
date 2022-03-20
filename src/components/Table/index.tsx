import React from 'react';
import clsx from 'clsx';

import { useTableContext } from '@/context/TableContext';
import { ColumnType } from '@/types/ExcelJsType';

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
          <tr className="grid grid-cols-10">
            {tableHead.map((column, index) => (
              <th
                key={column}
                className={clsx(
                  index === 0 && 'col-span-1',
                  index === 1 && 'col-span-3',
                  index > 1 && 'col-span-2'
                )}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.no} className="grid grid-cols-10">
              {Object.values(row).map((value, index) => (
                <td
                  key={index} // eslint-disable-line react/no-array-index-key
                  className={clsx(
                    index === 0 && 'col-span-1',
                    index === 1 && 'col-span-3',
                    index > 1 && 'col-span-2'
                  )}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
