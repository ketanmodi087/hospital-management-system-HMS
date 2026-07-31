import React from 'react';
import { Typography, Box } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import styles from './ExecutivesDashboard.module.scss';
import { useTranslation } from 'react-i18next';

interface PaymentData {
  month: string;
  value: number;
}

interface PaymentAverageChartProps {
  data: PaymentData[];
}

const PaymentAverageChart: React.FC<PaymentAverageChartProps> = ({ data }) => {
  // Format large numbers with abbreviations
  const { t }: { t: (key: string) => string } = useTranslation();
  const formatCurrency = (num: number): string => {
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

  const averagePayment = data.reduce((sum, item) => sum + item.value, 0) / data.length;
  const highestPayment = Math.max(...data.map(item => item.value));
  const highestPaymentMonth = data.find(item => item.value === highestPayment)?.month;
  const lowestPayment = Math.min(...data.map(item => item.value));
  const lowestPaymentMonth = data.find(item => item.value === lowestPayment)?.month;

  const options: ApexOptions = {
    chart: {
      type: 'area',
      height: 400,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
    xaxis: {
      categories: data.map(item => item.month),
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${formatCurrency(value)}`,
      },
    },
    tooltip: {
      y: {
        formatter: (value) => `$${formatCurrency(value)}`,
      },
    },
    colors: ['#009bab'],
  };

  const series = [{
    name: t('average_payment'),
    data: data.map(item => item.value),
  }];

  return (
    <Box className={styles.chartCard}>
      <Box className={styles.chartHeader}>
        <Typography variant="h6" component="h3">
          {t('payment_average')}
        </Typography>
      </Box>
      <Box className={styles.chartContent}>
        <Box className={styles.chart}>
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={400}
          />
        </Box>
      </Box>
      <Box className={styles.summaryStats}>
        <Box className={styles.statItem}>
          <Typography className={styles.statLabel}>{t('average_payment')}</Typography>
          <Typography className={styles.statValue}>
            ${formatCurrency(averagePayment)}
          </Typography>
        </Box>
        <Box className={styles.statItem}>
          <Typography className={styles.statLabel}>{t('highest_payment')}</Typography>
          <Typography className={styles.statValue}>
            ${formatCurrency(highestPayment)}
          </Typography>
        </Box>
        <Box className={styles.statItem}>
          <Typography className={styles.statLabel}>{t('lowest_payment')}</Typography>
          <Typography className={styles.statValue}>
            ${formatCurrency(lowestPayment)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentAverageChart; 