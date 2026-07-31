import React, { useRef, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from './TelehealthInfoChart.module.scss';
import { useTranslation } from 'react-i18next';

interface TelehealthData {
  tenant: string;
  consultations: number;
  satisfaction: number;
  revenue: number;
  growth: number;
}

interface TelehealthInfoChartProps {
  data: {
    tenantData: TelehealthData[];
    totalConsultations: number;
    averageSatisfaction: number;
    totalRevenue: number;
  };
}

const TelehealthInfoChart: React.FC<TelehealthInfoChartProps> = ({ data }) => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const [chartHeight, setChartHeight] = useState(250);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [viewType, setViewType] = useState<'consultations' | 'satisfaction' | 'revenue'>('consultations');

  useEffect(() => {
    const updateChartHeight = () => {
      if (chartContainerRef.current) {
        const containerHeight = chartContainerRef.current.clientHeight;
        const newHeight = Math.max(140, containerHeight - 200);
        setChartHeight(newHeight);
      }
    };

    updateChartHeight();
    window.addEventListener('resize', updateChartHeight);
    return () => window.removeEventListener('resize', updateChartHeight);
  }, []);

  const getChartOptions = () => {
    const baseOptions = {
      chart: {
        type: 'bar',
        height: chartHeight,
        toolbar: {
          show: false
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
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '55%',
          borderRadius: 4,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: 10,
        style: {
          fontSize: '12px',
          colors: ['#304758']
        },
        formatter: function (val: number) {
          if (viewType === 'satisfaction') {
            return val + '%';
          } else if (viewType === 'revenue') {
            return '$' + val.toLocaleString();
          } else {
            return val.toLocaleString();
          }
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: data.tenantData.map(item => item.tenant),
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
        title: {
          text: viewType === 'consultations' ? 'Consultations' : 
                viewType === 'satisfaction' ? 'Satisfaction Rate' : 'Revenue',
          style: {
            fontSize: '13px'
          }
        },
        labels: {
          style: {
            fontSize: '13px'
          },
          formatter: function (value: number) {
            if (viewType === 'satisfaction') {
              return value + '%';
            } else if (viewType === 'revenue') {
              return '$' + value.toLocaleString();
            } else {
              return value.toLocaleString();
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.85,
          stops: [50, 0, 100],
          colorStops: []
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
            if (viewType === 'satisfaction') {
              return value + '% satisfaction rate';
            } else if (viewType === 'revenue') {
              return '$' + value.toLocaleString() + ' revenue';
            } else {
              return value.toLocaleString() + ' consultations';
            }
          }
        },
        style: {
          fontSize: '13px'
        }
      }
    };

    return baseOptions;
  };

  const getSeriesData = () => {
    if (viewType === 'consultations') {
      return data.tenantData.map(item => item.consultations);
    } else if (viewType === 'satisfaction') {
      return data.tenantData.map(item => item.satisfaction);
    } else {
      return data.tenantData.map(item => item.revenue);
    }
  };

  const series = [
    {
      name: viewType === 'consultations' ? 'Consultations' : 
            viewType === 'satisfaction' ? 'Satisfaction Rate' : 'Revenue',
      data: getSeriesData()
    }
  ];

  return (
    <div className={styles.chartContainer} ref={chartContainerRef}>
      <div className={styles.chartHeader}>
        <h3>{t("dashboard.telehealth_information_by_tenant")}</h3>
        <div className={styles.viewToggle}>
          <button 
            className={`${styles.toggleButton} ${viewType === 'consultations' ? styles.active : ''}`}
            onClick={() => setViewType('consultations')}
          >
            {t("consultations")}
          </button>
          <button 
            className={`${styles.toggleButton} ${viewType === 'satisfaction' ? styles.active : ''}`}
            onClick={() => setViewType('satisfaction')}
          >
            {t("satisfaction")}
          </button>
          <button 
            className={`${styles.toggleButton} ${viewType === 'revenue' ? styles.active : ''}`}
            onClick={() => setViewType('revenue')}
          >
            {t("revenue")}
          </button>
        </div>
      </div>
      <div className={styles.chartContent}>
        <div className={styles.chart}>
          <ReactApexChart
            options={getChartOptions() as any}
            series={series}
            type="bar"
            height={chartHeight}
          />
        </div>
        <div className={styles.summaryStats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{t("dashboard.total_consultations")}</span>
            <span className={styles.statValue}>{data.totalConsultations.toLocaleString()}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{t("dashboard.avg_satisfaction")}</span>
            <span className={styles.statValue}>{data.averageSatisfaction.toFixed(1)}%</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{t("dashboard.total_revenue")}</span>
            <span className={styles.statValue}>${data.totalRevenue.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelehealthInfoChart; 