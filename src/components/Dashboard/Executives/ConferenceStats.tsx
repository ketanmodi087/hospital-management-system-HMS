import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ConferenceData {
  video: Array<{ date: string; count: number }>;
  audio: Array<{ date: string; count: number }>;
}

interface ConferenceStatsProps {
  data: ConferenceData;
}

const ConferenceStats: React.FC<ConferenceStatsProps> = ({ data }) => {
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
    colors: ['#0056b3', '#0078d4'],
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: data.video.map(item => item.date),
      labels: {
        style: {
          fontSize: '13px'
        }
      }
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
            formatter: () => 'Video'
          }
        },
        {
          title: {
            formatter: () => 'Audio'
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
      name: 'Video',
      data: data.video.map(item => item.count)
    },
    {
      name: 'Audio',
      data: data.audio.map(item => item.count)
    }
  ];

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Conference Stats
      </Typography>
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

export default ConferenceStats; 