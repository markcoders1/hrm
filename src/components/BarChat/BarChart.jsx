import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars({
    width = 700,
    height = 300,
    labels = ['Week1', 'Week2', 'Week3', 'Week4'],
    data = [30, 4000, 1000, 50000],
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
