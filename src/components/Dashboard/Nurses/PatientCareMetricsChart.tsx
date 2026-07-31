import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface PatientCareMetricsChartProps {
  data: any[];
}

const PatientCareMetricsChart: React.FC<PatientCareMetricsChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
        dataLabels: {
          position: 'top',
        },
      },
    },
    colors: ['#009bab'],
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val + '%';
      },
      style: {
        fontSize: '12px'
      }
    },
    xaxis: {
      categories: data.map(item => item.category),
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      min: 80,
      max: 100,
      labels: {
        style: {
          fontSize: '12px'
        },
        formatter: function (val: number) {
          return val + '%';
        }
      }
    }
  };

  const series = [
    {
      name: 'Performance',
      data: data.map(item => item.score)
    }
  ];

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </Box>
    </Box>
  );
};

export default PatientCareMetricsChart; 