import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import styles from './ExecutivesDashboard.module.scss';
import { useTranslation } from 'react-i18next';

interface RevenueBreakdownData {
  name: string;
  value: number;
  color?: string;
}

interface RevenueBreakdownCardProps {
  data: RevenueBreakdownData[];
}

const RevenueBreakdownCard: React.FC<RevenueBreakdownCardProps> = ({ data }) => {
  const totalRevenue = data.reduce((sum, item) => sum + item.value, 0);
  const highestRevenue = Math.max(...data.map(item => item.value));
  const highestRevenueItem = data.find(item => item.value === highestRevenue);
  const averageRevenue = totalRevenue / data.length;
  const { t }: { t: (key: string) => string } = useTranslation();

  // Format large numbers with abbreviations
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

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      height: 300,
      toolbar: {
        show: false,
      },
    },
    labels: data.map(item => item.name),
    colors: ['#009bab', '#abdfe1', '#00749b', '#0056b3', '#99ccff'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: t("dashboard.total_revenue"),
              formatter: (w) => {
                return `$${formatCurrency(totalRevenue)}`;
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => typeof val === 'number' ? `${val.toFixed(1)}%` : `${val}%`,
    },
    tooltip: {
      y: {
        formatter: (value) => `$${formatCurrency(value)}`,
      },
    },
    legend: {
      position: 'bottom',
      fontSize: '12px',
    },
  };

  const series = data.map(item => item.value);

  return (
    <Card className={styles.chartCard}>
      <CardContent>
        <Box className={styles.chartHeader}>
          <Typography variant="h6" component="h3">
            {t('dashboard.revenue_breakdown')}
          </Typography>
        </Box>
        <Box className={styles.chartContent}>
          <Box className={styles.chart}>
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
              height={350}
            />
          </Box>
        </Box>
        <Box className={styles.summaryStats}>
          <Box className={styles.statItem}>
            <Typography className={styles.statLabel}>{t("dashboard.total_revenue")}</Typography>
            <Typography className={styles.statValue}>
              ${formatCurrency(totalRevenue)}
            </Typography>
          </Box>
          <Box className={styles.statItem}>
            <Typography className={styles.statLabel}>{t("dashboard.highest_revenue")}</Typography>
            <Typography className={styles.statValue}>
              {highestRevenueItem?.name}
            </Typography>
          </Box>
          <Box className={styles.statItem}>
            <Typography className={styles.statLabel}>{t("dashboard.average_revenue")}</Typography>
            <Typography className={styles.statValue}>
              ${formatCurrency(averageRevenue)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RevenueBreakdownCard; 