import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useTranslation } from 'react-i18next';

interface EmailCampaignData {
  month: string;
  sent: number;
  opened: number;
  clicked: number;
}

interface EmailCampaignsChartProps {
  data: EmailCampaignData[];
}

const EmailCampaignsChart: React.FC<EmailCampaignsChartProps> = ({ data }) => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const options: ApexOptions = {
    chart: {
      type: 'area' as const,
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
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    colors: ['#009bab', '#33afbc', '#66c3cd'],
    dataLabels: {
      enabled: false
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
            formatter: () => t('sent')
          }
        },
        {
          title: {
            formatter: () => t('opened')
          }
        },
        {
          title: {
            formatter: () => t('clicked')
          }
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
      name: t('sent'),
      data: data.map(item => item.sent)
    },
    {
      name: t('opened'),
      data: data.map(item => item.opened)
    },
    {
      name: t('clicked'),
      data: data.map(item => item.clicked)
    }
  ];

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        {t('dashboard.email_campaigns')}
      </Typography>
      <Box sx={{ width: '100%', height: 'calc(100% - 50px)' }}>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={240}
        />
      </Box>
    </Box>
  );
};

export default EmailCampaignsChart; 