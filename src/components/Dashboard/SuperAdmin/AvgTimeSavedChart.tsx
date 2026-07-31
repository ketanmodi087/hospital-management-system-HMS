import React, { useRef, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from './AvgTimeSavedChart.module.scss';
import { useTranslation } from 'react-i18next';

interface TimeSavedData {
  month: string;
  timeSaved: number;
  appointments: number;
}

interface AvgTimeSavedChartProps {
  data: {
    monthlyData: TimeSavedData[];
    totalTimeSaved: number;
    averageTimeSaved: number;
    totalAppointments: number;
  };
}

const AvgTimeSavedChart: React.FC<AvgTimeSavedChartProps> = ({ data }) => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const [chartHeight, setChartHeight] = useState(250);
  const chartContainerRef = useRef<HTMLDivElement>(null);

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

  const chartOptions = {
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
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758']
      },
      formatter: function (val: number) {
        return val + ' min';
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
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
      title: {
        text: 'Minutes Saved',
        style: {
          fontSize: '13px'
        }
      },
      labels: {
        style: {
          fontSize: '13px'
        },
        formatter: function (value: number) {
          return value + ' min';
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
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
          return value + ' minutes saved';
        }
      },
      style: {
        fontSize: '13px'
      }
    }
  };

  const series = [
    {
      name: 'Time Saved',
      data: data.monthlyData.map(item => item.timeSaved)
    }
  ];

  return (
    <div className={styles.chartContainer} ref={chartContainerRef}>
      <div className={styles.chartHeader}>
        <h3>{t("dashboard.avg_time_save_scheduling")}</h3>
      </div>
      <div className={styles.chartContent}>
        <div className={styles.chart}>
          <ReactApexChart
            options={chartOptions as any}
            series={series}
            type="bar"
            height={chartHeight}
          />
        </div>
        <div className={styles.summaryStats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{t("dashboard.total_time_saved")}</span>
            <span className={styles.statValue}>{data.totalTimeSaved.toLocaleString()} min</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{t("dashboard.avg_time_per_appointment")}</span>
            <span className={styles.statValue}>{data.averageTimeSaved.toFixed(1)} min</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{t("dashboard.total_appointments")}</span>
            <span className={styles.statValue}>{data.totalAppointments.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvgTimeSavedChart; 