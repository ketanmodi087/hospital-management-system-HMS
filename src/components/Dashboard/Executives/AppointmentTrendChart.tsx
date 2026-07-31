import React, { useState } from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useTranslation } from 'react-i18next';

interface AppointmentData {
  monthly: { month: string; appointments: number }[];
  weekly: { week: string; appointments: number }[];
  daily: { day: string; appointments: number }[];
}

interface AppointmentTrendChartProps {
  data: AppointmentData;
}

const AppointmentTrendChart: React.FC<AppointmentTrendChartProps> = ({ data }) => {
  const [timeframe, setTimeframe] = useState<'monthly' | 'weekly' | 'daily'>('monthly');
  const { t }: { t: (key: string) => string } = useTranslation();
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

  const handleTimeframeChange = (
    event: React.MouseEvent<HTMLElement>,
    newTimeframe: 'monthly' | 'weekly' | 'daily' | null
  ) => {
    if (newTimeframe !== null) {
      setTimeframe(newTimeframe);
    }
  };

  const getChartData = () => {
    switch (timeframe) {
      case 'monthly':
        return data.monthly;
      case 'weekly':
        return data.weekly;
      case 'daily':
        return data.daily;
      default:
        return data.monthly;
    }
  };

  const getXAxisLabel = () => {
    switch (timeframe) {
      case 'monthly':
        return t('month');
      case 'weekly':
        return t('week');
      case 'daily':
        return t('day');
      default:
        return t('month');
    }
  };

  const chartData = getChartData();
  const xAxisLabel = getXAxisLabel();

  const options: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
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
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    colors: ['#009bab'],
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return formatNumber(val);
      },
      style: {
        fontSize: '13px',
        colors: ['#333']
      }
    },
    xaxis: {
      categories: chartData.map(item => {
        if (timeframe === 'monthly') {
          return (item as { month: string }).month;
        } else if (timeframe === 'weekly') {
          return (item as { week: string }).week;
        } else {
          return (item as { day: string }).day;
        }
      }),
      labels: {
        style: {
          fontSize: '13px',
          colors: '#000000'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      title: {
        text: xAxisLabel,
        style: {
          fontSize: '14px',
          fontWeight: 500
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return formatNumber(val);
        },
        style: {
          fontSize: '13px',
          colors: '#000000'
        }
      },
      title: {
        text: t('appointments'),
        style: {
          fontSize: '14px',
          fontWeight: 500
        }
      }
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (value: number) => `${formatNumber(value)} ${t('appointments')}`
      }
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
      name: t('appointments'),
      data: chartData.map(item => item.appointments)
    }
  ];

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2">
          {t("dashboard.appointment_trends")}
        </Typography>
        <ToggleButtonGroup
          value={timeframe}
          exclusive
          onChange={handleTimeframeChange}
          aria-label="timeframe"
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              border: '1px solid #e0e0e0',
              borderRadius: '0',
              mx: 0,
              px: 2,
              color: 'rgba(0, 0, 0, 0.7)',
              textTransform: 'none',
              '&:first-of-type': {
                borderTopLeftRadius: '20px',
                borderBottomLeftRadius: '20px',
              },
              '&:last-of-type': {
                borderTopRightRadius: '20px',
                borderBottomRightRadius: '20px',
              },
              '&.Mui-selected': {
                backgroundColor: '#009bab',
                color: '#ffffff',
                borderColor: '#009bab',
                '&:hover': {
                  backgroundColor: '#008999',
                },
              },
              '&:hover': {
                backgroundColor: 'rgba(0, 155, 171, 0.08)',
              },
            },
            '& .MuiToggleButton-root + .MuiToggleButton-root': {
              borderLeft: 0,
            },
            '& .Mui-selected + .MuiToggleButton-root': {
              borderLeftColor: '#009bab',
            },
          }}
        >
          <ToggleButton value="monthly" aria-label="monthly">
          {t("monthly")}
          </ToggleButton>
          <ToggleButton value="weekly" aria-label="weekly">
          {t("weekly")}
          </ToggleButton>
          <ToggleButton value="daily" aria-label="daily">
          {t("daily")}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ width: '100%', height: 'calc(100% - 50px)' }}>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={300}
        />
      </Box>
    </Box>
  );
};

export default AppointmentTrendChart; 