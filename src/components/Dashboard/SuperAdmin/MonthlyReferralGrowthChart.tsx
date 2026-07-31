import React, { useRef, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from './MonthlyReferralGrowthChart.module.scss';
import { useTranslation } from 'react-i18next';

interface MonthlyReferralData {
  month: string;
  referrals: number;
  growth: number;
  target: number;
}

interface MonthlyReferralGrowthChartProps {
  data: {
    monthlyData: MonthlyReferralData[];
    totalReferrals: number;
    averageGrowth: number;
  };
}

const MonthlyReferralGrowthChart: React.FC<MonthlyReferralGrowthChartProps> = ({ data }) => {
  const [chartHeight, setChartHeight] = useState(250);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { t }: { t: (key: string) => string } = useTranslation();
  useEffect(() => {
    const updateChartHeight = () => {
      if (chartContainerRef.current) {
        const containerHeight = chartContainerRef.current.clientHeight;
        // Account for header and padding
        const newHeight = Math.max(140, containerHeight - 200);
        setChartHeight(newHeight);
      }
    };

    updateChartHeight();
    window.addEventListener('resize', updateChartHeight);
    return () => window.removeEventListener('resize', updateChartHeight);
  }, []);

  const chartOptions = {
    chart: {
      type: 'area',
      height: chartHeight,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
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
    dataLabels: {
      enabled: false
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
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: data.monthlyData.map(item => item.month),
      labels: {
        style: {
          fontSize: '13px'
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
          fontSize: '13px'
        },
        formatter: function (value: number) {
          return value.toLocaleString();
        }
      }
    },
    colors: ['#009bab'],
    grid: {
      borderColor: '#f1f1f1',
      row: {
        colors: ['transparent', 'transparent'],
        opacity: 0.5
      }
    },
    tooltip: {
      y: {
        formatter: function (value: number) {
          return value.toLocaleString();
        }
      },
      style: {
        fontSize: '13px'
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 300
          }
        }
      }
    ]
  };

  const series = [
    {
      name: 'Referrals',
      data: data.monthlyData.map(item => item.referrals)
    }
  ];

  // Calculate growth indicators
  const growthIndicators = data.monthlyData.map((item, index) => {
    if (index === 0) return null;
    
    const prevReferrals = data.monthlyData[index - 1].referrals;
    const growth = ((item.referrals - prevReferrals) / prevReferrals) * 100;
    
    return {
      month: item.month,
      growth: growth
    };
  }).filter((indicator): indicator is { month: string; growth: number } => indicator !== null);

  return (
    <div className={styles.chartContainer} ref={chartContainerRef}>
      <div className={styles.chartHeader}>
      <h3>{t('dashboard.monthly_referral_growth')}</h3>
      </div>
      <div className={styles.chartContent}>
        <div className={styles.chart}>
          <ReactApexChart
            options={chartOptions as any}
            series={series}
            type="area"
            height={chartHeight}
          />
        </div>
        <div className={styles.growthIndicators}>
          {growthIndicators.map((indicator, index) => (
            <div key={index} className={styles.growthIndicator}>
              <span className={styles.month}>{indicator?.month}</span>
              <span className={`${styles.growth} ${indicator?.growth >= 0 ? styles.positive : styles.negative}`}>
                {indicator?.growth >= 0 ? '+' : ''}{indicator?.growth.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
        <div className={styles.summaryStats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{t("dashboard.total_referrals")}</span>
            <span className={styles.statValue}>{data.totalReferrals.toLocaleString()}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{t("dashboard.average_growth")}</span>
            <span className={`${styles.statValue} ${data.averageGrowth >= 0 ? styles.positive : styles.negative}`}>
              {data.averageGrowth >= 0 ? '+' : ''}{data.averageGrowth.toFixed(1)}%
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{t("dashboard.latest_month")}</span>
            <span className={styles.statValue}>{data.monthlyData[data.monthlyData.length - 1].referrals.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyReferralGrowthChart; 