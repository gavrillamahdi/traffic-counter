import React from 'react';

import HeadIcon from '@/components/HeadIcon';
import Header from '@/components/Header';
import Form from '@/components/Form';
import Table from '@/components/Table';

import useLocalStorage from '@/hooks/useLocalStorage';

import { TimeDataContextProvider } from '@/context/TimeDataContext';
import { TableContextProvider } from '@/context/TableContext';

import { ColumnType } from '@/types/ExcelJsType';

const COLUMN: ColumnType[] = [
  { header: 'No', key: 'no' },
  { header: 'Waktu', key: 'waktu' },
  { header: 'MC', key: 'mc' },
  { header: 'LV', key: 'lv' },
  { header: 'HV', key: 'hv' },
];

export default function App(): JSX.Element {
  const [timeRanges, setTimeRanges] = useLocalStorage<string[]>('time-range', []);

  return (
    <>
      <HeadIcon />
      <Header />

      <main className="p-10">
        <TimeDataContextProvider>
          <Form setData={setTimeRanges} />
        </TimeDataContextProvider>

        <TableContextProvider timeRanges={timeRanges}>
          <Table columns={COLUMN} />
        </TableContextProvider>
      </main>
    </>
  );
}
