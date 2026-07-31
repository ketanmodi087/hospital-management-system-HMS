import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useTranslation } from 'react-i18next';

interface TaskCompletionChartProps {
  data: any[];
}

const TaskCompletionChart: React.FC<TaskCompletionChartProps> = ({ data }) => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const options: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        speed: 800,
      }
    },
    colors: ['#009bab', '#28a745', '#dc3545'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: data.map(item => item.date),
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: function (val: number) {
          return val + ' tasks';
        }
      }
    },
    legend: {
      position: 'top',
      fontSize: '13px'
    }
  };

  const series = [
    {
      name: `${t('total')} ${t('tasks')}`,
      data: data.map(item => item.tasks)
    },
    {
      name: t('completed'),
      data: data.map(item => item.completed)
    },
    {
      name: t('pending'),
      data: data.map(item => item.pending)
    }
  ];

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </Box>
    </Box>
  );
};

export default TaskCompletionChart; 