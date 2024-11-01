import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

export default function FinancePieChart() {
  // Define dummy data with values representing percentages
  const data = [
    { label: 'Total Expenses', value: 70 },
    { label: 'Utilized', value: 20 },
    { label: 'Budget', value: 10 },
  ];

  return (
    <PieChart

      series={[
        {
          data,
          innerRadius: 5, // Slight inner space
          outerRadius: 100, // Controls the pie chart size
          spacing: 25, // Adds space between slices
          colors: ['#157AFF', '#157AFF !important', '#157AFF !important'], 
          paddingAngle: 5,
        
          label: {
            visible: true,
            format: ({ datum }) => `${datum.value}%`, // Display percentage values in each slice
            fontSize: 24,
            color: 'white',
          },
          tooltip: {
            visible: false, // Enables the tooltip
            format: ({ datum }) => `${datum.label}: ${datum.value}%`, // Display label and percentage on hover
          },
        },
      ]}
      height={300}
      width={300} // Adjust width and height as needed
      legend={{ visible: false }} // Removes the legend
    />
  );
}
