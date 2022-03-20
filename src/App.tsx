import React from 'react';
import clsx from 'clsx';

import Navbar from '@/components/Navbar';
import Form from '@/components/Form';
import { TimeDataProvider } from '@/context/TimeDataProvider';
import { ColumnType, RowType } from '@/types/ExcelJsType';
import saveExcel from './libs/exportExcel';

const COLUMN: ColumnType[] = [
  { header: 'No', key: 'no' },
  { header: 'Waktu', key: 'waktu' },
  { header: 'MC', key: 'mc' },
  { header: 'LV', key: 'lv' },
  { header: 'HV', key: 'hv' },
];

export default function App(): JSX.Element {
  const [onTop, setOnTop] = React.useState<boolean>(true);
  React.useEffect(() => {
    const handleScroll = () => {
      setOnTop(window.pageYOffset === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [timeRanges, setTimeRanges] = React.useState<string[]>([]);
  console.log(timeRanges);

  return (
    <>
      <header className={clsx('sticky top-0', onTop || 'shadow-sm shadow-base-content/10')}>
        <Navbar />
      </header>
      <main className="p-10">
        <TimeDataProvider>
          <Form setData={setTimeRanges} />
        </TimeDataProvider>
        <button type="button" onClick={saveExcel}>
          tes
        </button>
      </main>
    </>
  );
}
