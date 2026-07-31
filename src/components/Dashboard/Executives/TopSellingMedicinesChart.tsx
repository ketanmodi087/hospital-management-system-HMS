import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import styles from './ExecutivesDashboard.module.scss';
import { useTranslation } from 'react-i18next';

interface MedicineData {
  name: string;
  sales: number;
  revenue: number;
}

interface TopSellingMedicinesChartProps {
  data: MedicineData[];
}

const TopSellingMedicinesChart: React.FC<TopSellingMedicinesChartProps> = ({ data }) => {
  // Format large numbers with abbreviations
  const { t }: { t: (key: string) => string } = useTranslation();
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

  // Calculate summary statistics
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const topSellingMedicine = data.reduce((max, item) => 
    item.sales > max.sales ? item : max, data[0]);

  const options: ApexOptions = {
    chart: {
      type: 'bar' as const,
      toolbar: {
        show: false
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
        return opts.seriesIndex === 0 ? `${formatNumber(val)} units` : `$${formatNumber(val)}`;
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
          fontSize: '12px',
          fontWeight: 500
        },
        rotate: -45,
        rotateAlways: true,
        trim: false,
        maxHeight: 100,
        minHeight: 100
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
          fontSize: '13px'
        }
      }
    },
    tooltip: {
      theme: 'light',
      y: [
        {
          title: {
            formatter: () => t('sales')
          },
          formatter: (value: number) => `${formatNumber(value)} units`
        },
        {
          title: {
            formatter: () => t('revenue')
          },
          formatter: (value: number) => `$${formatNumber(value)}`
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
      name: t('sales'),
      data: data.map(item => item.sales)
    },
    {
      name: t('revenue'),
      data: data.map(item => item.revenue)
    }
  ];

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        {t("dashboard.top_selling_medicines")}
      </Typography>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={420}
        />
      </Box>
      <Box className={styles.summaryStats}>
        <Box className={styles.statItem}>
          <Typography className={styles.statLabel}>{t("total_sales")}</Typography>
          <Typography className={styles.statValue}>
            {formatNumber(totalSales)} units
          </Typography>
        </Box>
        <Box className={styles.statItem}>
          <Typography className={styles.statLabel}>{t("dashboard.total_revenue")}</Typography>
          <Typography className={styles.statValue}>
            ${formatNumber(totalRevenue)}
          </Typography>
        </Box>
        <Box className={styles.statItem}>
          <Typography className={styles.statLabel}>{t("top_seller")}</Typography>
          <Typography className={styles.statValue}>
            {topSellingMedicine.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TopSellingMedicinesChart; 