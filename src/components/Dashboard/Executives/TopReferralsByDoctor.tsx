import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useTranslation } from 'react-i18next';

interface ReferralData {
  doctor: string;
  referrals: number;
  patients: number;
}

interface TopReferralsByDoctorProps {
  data: ReferralData[];
}

const TopReferralsByDoctor: React.FC<TopReferralsByDoctorProps> = ({ data }) => {
  // Calculate percentages for referrals
  const { t }: { t: (key: string) => string } = useTranslation();
  const maxReferrals = Math.max(...data.map(item => item.referrals));
  const referralPercentages = data.map(item => 
    Math.round((item.referrals / maxReferrals) * 100)
  );

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
        horizontal: true,
        borderRadius: 6,
        dataLabels: {
          position: 'top',
        },
        barHeight: '70%',
        distributed: false,
        rangeBarOverlap: true,
        rangeBarGroupRows: false,
      },
    },
    colors: ['#009bab', '#abdfe1'],
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opts: any) {
        return opts.seriesIndex === 0 ? `${formatNumber(val)} referrals` : `${formatNumber(val)} patients`;
      },
      style: {
        fontSize: '13px',
        colors: ['#333']
      }
    },
    xaxis: {
      categories: data.map(item => item.doctor),
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
            formatter: () => t('referrals')
          },
          formatter: (value: number) => `${formatNumber(value)} ${t('referrals')}`
        },
        {
          title: {
            formatter: () => t('patients')
          },
          formatter: (value: number) => `${formatNumber(value)} ${t('patients')}`
        }
      ]
    },
    legend: {
      fontSize: '13px',
      position: 'top',
      labels: {
        colors: '#000000'
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
      name: t('referrals'),
      data: data.map(item => item.referrals)
    },
    {
      name: t('patients'),
      data: data.map(item => item.patients)
    }
  ];

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        {t("dashboard.top_referrals_by_doctor")}
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

export default TopReferralsByDoctor; 