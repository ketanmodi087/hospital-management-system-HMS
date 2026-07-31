import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface StaffActivityData {
  name: string;
  appointments: number;
  patients: number;
}

interface StaffActivityChartProps {
  data: StaffActivityData[];
}

const StaffActivityChart: React.FC<StaffActivityChartProps> = ({ data }) => {
  // Format large numbers with abbreviations
  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  };

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      },
      stacked: false,
      animations: {
        enabled: true,
        speed: 800
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
        dataLabels: {
          position: 'top',
        },
        columnWidth: '60%',
        distributed: false,
        rangeBarOverlap: true,
        rangeBarGroupRows: false,
      },
    },
    colors: ['#0056b3', '#0078d4'],
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opts: any) {
        return formatNumber(val);
      },
      style: {
        fontSize: '13px',
        colors: ['#333']
      }
    },
    xaxis: {
      categories: data.map(item => item.name),
      labels: {
        style: {
          fontSize: '13px'
        },
        rotate: -45,
        rotateAlways: true,
        trim: true,
        maxHeight: 100
      },
      tickPlacement: 'on'
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '13px'
        }
      }
    },
    tooltip: {
      theme: 'light',
      y: [
        {
          title: {
            formatter: () => 'Appointments'
          },
          formatter: (value: number) => `${formatNumber(value)} appointments`
        },
        {
          title: {
            formatter: () => 'Patients'
          },
          formatter: (value: number) => `${formatNumber(value)} patients`
        }
      ]
    },
    legend: {
      fontSize: '13px',
      position: 'top'
    },
    grid: {
      borderColor: '#f1f1f1',
      row: {
        colors: ['transparent', 'transparent'],
        opacity: 0.5
      }
    }
  };

  const series = [
    {
      name: 'Appointments',
      data: data.map(item => item.appointments)
    },
    {
      name: 'Patients',
      data: data.map(item => item.patients)
    }
  ];

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Staff Activity
      </Typography>
      <Box sx={{ width: '100%', height: 'calc(100% - 50px)' }}>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={300}
        />
      </Box>
    </Box>
  );
};

export default StaffActivityChart; 