import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars({
    width = 700,
    height = 300,
    labels = ['Commission', 'Tax', 'Salary'],
    data = [0, 0, 0]
}) {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: labels }]}
      series={[
        { 
          data: data,
          color: ['#b3d1f7', '#99c1f1', '#80b2eb']  // Light blue shades
        }
      ]}
      width={width}
      height={height}
    />
  );
}
