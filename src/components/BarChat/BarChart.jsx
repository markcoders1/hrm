import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars({
  labels = ['Week1', 'Week2', 'Week3', 'Week4'],
  data = [30000, 4000, 10000, 50000],
}) {
  // Initialize state with window dimensions
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth * 0.4, 
    height: window.innerHeight * 0.5, 
  });

  useEffect(() => {
    
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth * 0.4, // Adjust as needed
        height: window.innerHeight * 0.5, 
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

   
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <BarChart
        xAxis={[{ scaleType: 'band', data: labels }]}
        series={[
          { 
            data: data,
            color: ['#b3d1f7', '#99c1f1', '#80b2eb'], 
          },
        ]}
        width={dimensions.width}
        height={dimensions.height}
        // Optionally, add margins or other props as needed
      />
    </div>
  );
}
