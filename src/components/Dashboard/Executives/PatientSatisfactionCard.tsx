import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import styles from './ExecutivesDashboard.module.scss';
import { useTranslation } from 'react-i18next';

interface PatientSatisfactionData {
  category: string;
  score: number;
  total: number;
}

interface PatientSatisfactionCardProps {
  data: PatientSatisfactionData[];
}

const PatientSatisfactionCard: React.FC<PatientSatisfactionCardProps> = ({ data }) => {
  const averageScore = data.reduce((sum, item) => sum + item.score, 0) / data.length;
  const highestScore = Math.max(...data.map(item => item.score));
  const highestScoreItem = data.find(item => item.score === highestScore);
  const totalResponses = data.reduce((sum, item) => sum + item.total, 0);
  const { t }: { t: (key: string) => string } = useTranslation();
  const options: ApexOptions = {
    chart: {
      type: 'radar',
      height: 450,
      toolbar: {
        show: false,
      },
      parentHeightOffset: 0
    },
    xaxis: {
      categories: data.map(item => item.category),
      labels: {
        style: {
          fontSize: '12px',
          colors: Array(data.length).fill('#000000')
        },
        formatter: function(value) {
          if (value.length > 12) {
            const words = value.split(' ');
            return words.join('\n');
          }
          return value;
        }
      }
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        formatter: function(val: number) {
          return val.toString() + '%';
        },
        style: {
          fontSize: '12px',
          colors: '#000000'
        }
      }
    },
    colors: ['#009bab'],
    fill: {
      opacity: 0.3,
    },
    stroke: {
      width: 2,
    },
    markers: {
      size: 4,
    },
    plotOptions: {
      radar: {
        size: 165,
        offsetX: 0,
        polygons: {
          strokeColors: '#abdfe1',
          strokeWidth: '1',
          fill: {
            colors: ['#ffffff', '#f8f8f8'],
          },
          connectorColors: '#abdfe1'
        },
      },
    },
    grid: {
      show: true,
      padding: {
        top: 40,
        bottom: 40,
        left: 60,
        right: 60
      }
    }
  };

  const series = [{
    name: 'Satisfaction Score',
    data: data.map(item => item.score * 20), // Convert 5-point scale to percentage
  }];

  return (
    <Card className={styles.chartCard}>
      <CardContent>
        <Box className={styles.chartHeader}>
          <Typography variant="h6" component="h3">
            {t('dashboard.patient_satisfaction')}
          </Typography>
        </Box>
        <Box className={styles.chartContent}>
          <Box className={styles.chart} sx={{ 
            mx: 'auto', 
            width: '100%', 
            maxWidth: '750px',
            '& .apexcharts-canvas': {
              margin: '0 auto',
              width: '100% !important'
            }
          }}>
            <ReactApexChart
              options={options}
              series={series}
              type="radar"
              height={500}
              width="100%"
            />
          </Box>
        </Box>
        <Box className={styles.summaryStats}>
          <Box className={styles.statItem}>
            <Typography className={styles.statLabel}>{t('dashboard.average_score')}</Typography>
            <Typography className={styles.statValue}>
              {averageScore.toFixed(1)}/5.0
            </Typography>
          </Box>
          <Box className={styles.statItem}>
            <Typography className={styles.statLabel}>{t('dashboard.highest_score')}</Typography>
            <Typography className={styles.statValue}>
              {highestScoreItem?.category}
            </Typography>
          </Box>
          <Box className={styles.statItem}>
            <Typography className={styles.statLabel}>{t('dashboard.total_responses')}</Typography>
            <Typography className={styles.statValue}>
              {totalResponses.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PatientSatisfactionCard; 