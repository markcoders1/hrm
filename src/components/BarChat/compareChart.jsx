import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function CompareBars({
    width = "700",
    height = 300,
    data = [0, 0, 0]
}) {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['Comission', 'Tax', 'Salary'] }]}
      series={[{ data, color: ['#b3d1f7', '#99c1f1', '#80b2eb'] }]}
      width={width}
      height={height}
    />
  );
}