import Excel from 'exceljs';
import { saveAs } from 'file-saver';
import { ColumnType, RowType } from '@/types/ExcelJsType';

const COLUMN: ColumnType[] = [
  { header: 'No', key: 'no' },
  { header: 'Waktu', key: 'waktu' },
  { header: 'MC', key: 'mc' },
  { header: 'LV', key: 'lv' },
  { header: 'HV', key: 'hv' },
];

const data: string[] = ['12', '13', '14', '15'];

const row: RowType[] = data.map((item, index) => ({
  no: index + 1,
  waktu: item,
  mc: 0,
  lv: 0,
  hv: 0,
}));

export default async function saveExcel() {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('tes');

  worksheet.columns = COLUMN;

  row.forEach((item) => worksheet.addRow(item));
  const buf = await workbook.xlsx.writeBuffer();

  saveAs(new Blob([buf]), 'coba.xlsx');
}
