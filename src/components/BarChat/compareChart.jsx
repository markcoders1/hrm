import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function CompareBars({
    width = "700",
    height = 300,
    tax = 0,
    salary = 0,
    commission = 0
}) {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['Commission', 'Tax', 'Salary'] }]}
      series={[{ data: [commission, tax, salary] }]}
      width={width}
      height={height}
    />
  );
}
