import React, { useRef, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from './StaffUtilizationChart.module.scss';
import { useTranslation } from 'react-i18next';

interface StaffData {
  department: string;
  staffCount: number;
  utilizationRate: number;
  targetRate: number;
  efficiency: number;
}

interface StaffUtilizationChartProps {
  data: {
    staffData: StaffData[];
    overallUtilization: number;
    overallEfficiency: number;
  };
}

const StaffUtilizationChart: React.FC<StaffUtilizationChartProps> = ({ data }) => {

  const { t }: { t: (key: string) => string } = useTranslation();
  const [chartHeight, setChartHeight] = useState(250);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateChartHeight = () => {
      if (chartContainerRef.current) {
        const containerHeight = chartContainerRef.current.clientHeight;
        // Account for header and padding
        const newHeight = Math.max(200, containerHeight - 80);
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
      stacked: false,
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
        borderRadius: 6,
        dataLabels: {
          position: 'center'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(0) + '%';
      },
      style: {
        fontSize: '13px',
        fontWeight: 500
      }
    },
    xaxis: {
      categories: data.staffData.map(item => item.department),
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
        }
      }
    },
    colors: ['#009bab', '#abdfe1'],
    grid: {
      borderColor: '#f1f1f1',
      row: {
        colors: ['transparent', 'transparent'],
        opacity: 0.5
      }
    },
    legend: {
      position: 'bottom',
      fontSize: '13px',
      fontWeight: 500,
      markers: {
        width: 12,
        height: 12,
        radius: 6
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    tooltip: {
      y: {
        formatter: function (value: number) {
          return value.toFixed(1) + '%';
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
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  const series = [
    {
      name: 'Utilization',
      data: data.staffData.map(item => item.utilizationRate)
    },
    {
      name: 'Target',
      data: data.staffData.map(item => item.targetRate)
    }
  ];

  return (
    <div className={styles.chartContainer} ref={chartContainerRef}>
      <div className={styles.chartHeader}>
        <h3>{t('dashboard.staff_utilization_efficiency')}</h3>
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
            <span className={styles.statLabel}>{t("dashboard.overall_utilization")}</span>
            <span className={styles.statValue}>{data.overallUtilization.toFixed(1)}%</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{t("dashboard.efficiency_score")}</span>
            <span className={styles.statValue}>{data.overallEfficiency.toFixed(1)}%</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>{t("dashboard.total_staff")}</span>
            <span className={styles.statValue}>{data.staffData.reduce((sum, item) => sum + item.staffCount, 0).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffUtilizationChart; 