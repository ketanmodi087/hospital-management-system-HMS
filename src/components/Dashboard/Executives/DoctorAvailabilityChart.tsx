import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { t } from 'i18next';

interface DoctorAvailabilityData {
  doctor: string;
  available: number;
  total: number;
}

interface DoctorAvailabilityChartProps {
  data: DoctorAvailabilityData[];
}

const DoctorAvailabilityChart: React.FC<DoctorAvailabilityChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: 'bar' as const,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      stacked: true,
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
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      },
    },
    colors: ['#009bab', '#e8f5f6'],
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opts: any) {
        return opts.seriesIndex === 0 ? `${val}%` : '';
      },
      style: {
        fontSize: '13px',
        colors: ['#fff', '#000000']
      }
    },
    xaxis: {
      categories: data.map(item => item.doctor),
      labels: {
        style: {
          fontSize: '13px',
          colors: '#000000'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '13px',
          colors: '#000000'
        }
      }
    },
    tooltip: {
      theme: 'light',
      y: [
        {
          title: {
            formatter: () =>  t('available')
          },
          formatter: (value: number) => `${value}%`
        },
        {
          title: {
            formatter: () => t('unavailable')
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
      name: t('available'),
      data: data.map(item => (item.available / item.total) * 100)
    },
    {
      name: t('unavailable'),
      data: data.map(item => ((item.total - item.available) / item.total) * 100)
    }
  ];

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        {t('dashboard.doctor_availability')}
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

export default DoctorAvailabilityChart; 