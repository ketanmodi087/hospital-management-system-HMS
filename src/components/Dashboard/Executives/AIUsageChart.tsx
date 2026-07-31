import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { t } from 'i18next';

interface AIUsageData {
  month: string;
  consultations: number;
  accuracy: number;
}

interface AIUsageChartProps {
  data: AIUsageData[];
}

const AIUsageChart: React.FC<AIUsageChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: 'line' as const,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      stacked: false,
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: ['#009bab', '#66c3cd'],
    markers: {
      size: 5,
      colors: ['#009bab', '#66c3cd'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7
      }
    },
    xaxis: {
      categories: data.map(item => item.month),
      labels: {
        style: {
          fontSize: '13px',
          colors: '#000000'
        }
      }
    },
    yaxis: [
      {
        title: {
          text: t('consultations'),
          style: {
            fontSize: '13px',
            color: '#000000'
          }
        },
        labels: {
          style: {
            fontSize: '13px',
            colors: '#000000'
          }
        }
      },
      {
        opposite: true,
        title: {
          text: `${t('accuracy')} (%)`,
          style: {
            fontSize: '13px',
            color: '#000000'
          }
        },
        labels: {
          style: {
            fontSize: '13px',
            colors: '#000000'
          },
          formatter: (val: number) => `${val}%`
        }
      }
    ],
    tooltip: {
      theme: 'light',
      y: [
        {
          title: {
            formatter: () => t('consultations')
          }
        },
        {
          title: {
            formatter: () => t('accuracy')
          },
          formatter: (value: number) => `${value}%`
        }
      ]
    },
    legend: {
      fontSize: '13px',
      position: 'top'
    }
  };

  const series = [
    {
      name: t('consultations'),
      type: 'line',
      data: data.map(item => item.consultations)
    },
    {
      name: t('accuracy'),
      type: 'line',
      data: data.map(item => item.accuracy)
    }
  ];

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        {t('dashboard.ai_usage')}
      </Typography>
      <Box sx={{ width: '100%', height: 'calc(100% - 50px)' }}>
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={240}
        />
      </Box>
    </Box>
  );
};

export default AIUsageChart; 