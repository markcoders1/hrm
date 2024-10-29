import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBarsForSales({
    width = 700,
    height = 300,
    labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data = [10000, 15000, 20000, 18000]  // Example dummy data in rupees
}) {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: labels }]}
      yAxis={[{ label: 'Rupees' }]}
      series={[
        { data: data, label: 'Sales', color: '#80b2eb' }  // Single series for weekly sales
      ]}
      width={width}
      height={height}
    />
  );
}
