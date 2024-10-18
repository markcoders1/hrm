import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars({
    width = "700",
    height = 300
}) {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['group A'] }]}
      series={[{ data: [4] }, { data: [1] }, { data: [2] }]}
      width={width}
      height={height}
    />
  );
}