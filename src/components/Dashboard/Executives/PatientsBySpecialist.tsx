import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { t } from 'i18next';

interface PatientsBySpecialistData {
  specialist: string;
  patients: number;
}

interface PatientsBySpecialistProps {
  data: PatientsBySpecialistData[];
}

const PatientsBySpecialist: React.FC<PatientsBySpecialistProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      type: 'pie' as const,
      toolbar: {
        show: false
      },
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
    labels: data.map(item => item.specialist),
    colors: ['#009bab', '#33afbc', '#66c3cd', '#99d7de', '#cceaef'],
    legend: {
      position: 'bottom',
      fontSize: '13px',
      labels: {
        colors: '#000000'
      },
      markers: {
        size: 6,
        strokeWidth: 0,
        shape: 'circle'
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(1) + '%';
      },
      style: {
        fontSize: '13px',
        colors: ['#fff']
      }
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (value: number) => `${value} patients`
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '0%'
        }
      }
    }
  };

  const series = data.map(item => item.patients);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        {t("dashboard.patients_by_specialist")}
      </Typography>
      <Box sx={{ width: '100%', height: 'calc(100% - 50px)' }}>
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          height={300}
        />
      </Box>
    </Box>
  );
};

export default PatientsBySpecialist; 