import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import styles from "./TopHospitalsChart.module.scss";
import { useTranslation } from "react-i18next";

// Add this interface at the top of the file
interface TopHospitalsChartProps {
  data: any; // Replace 'any' with a more specific type if possible
}

// Sample data - replace with actual data from your API
const hospitalData = {
  hospitals: [
    {
      name: "CareSphere Da Nang",
      revenue: 2000000,
      performance: 92,
      patients: 12500,
    },
    {
      name: "CareSphere Sai Gon",
      revenue: 1500000,
      performance: 88,
      patients: 9800,
    },
    {
      name: "CareSphere Cuu Long",
      revenue: 1180000,
      performance: 85,
      patients: 8200,
    },
    {
      name: "CareSphere Phu Tho",
      revenue: 950000,
      performance: 82,
      patients: 6500,
    },
    { name: "CareSphere Vinh", revenue: 880000, performance: 80, patients: 5800 },
    {
      name: "CareSphere Nha Trang",
      revenue: 820000,
      performance: 78,
      patients: 5200,
    },
    {
      name: "CareSphere Quy Nhon",
      revenue: 750000,
      performance: 75,
      patients: 4800,
    },
    {
      name: "CareSphere Dong Nai",
      revenue: 680000,
      performance: 72,
      patients: 4200,
    },
  ],
};

const TopHospitalsChart: React.FC<TopHospitalsChartProps> = ({ data }) => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const [viewType, setViewType] = useState<"revenue" | "performance">(
    "revenue"
  );
  const [chartHeight, setChartHeight] = useState(250);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateChartHeight = () => {
      if (chartContainerRef.current) {
        const containerHeight = chartContainerRef.current.clientHeight;
        // Calculate height based on container size, accounting for header
        const newHeight = Math.max(210, containerHeight - 50);
        setChartHeight(newHeight);
      }
    };

    updateChartHeight();
    window.addEventListener('resize', updateChartHeight);
    
    return () => {
      window.removeEventListener('resize', updateChartHeight);
    };
  }, []);

  const handleViewTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newViewType: "revenue" | "performance"
  ) => {
    if (newViewType !== null) {
      setViewType(newViewType);
    }
  };

  // Sort hospitals by the selected metric
  const sortedData = [...hospitalData.hospitals]
    .sort((a, b) => {
      if (viewType === "revenue") {
        return b.revenue - a.revenue;
      } else {
        return b.performance - a.performance;
      }
    })
    .slice(0, 5); // Get top 5

  // Format data for the chart
  const chartData = sortedData.map((hospital) => ({
    name: hospital.name,
    value: viewType === "revenue" ? hospital.revenue : hospital.performance,
    patients: hospital.patients,
  }));

  // Helper function to format values for display
  const formatValue = (val: number, type: "revenue" | "performance") => {
    if (type === "revenue") {
      return `$${(val / 1000000).toFixed(1)}M`;
    } else {
      return `${val}%`;
    }
  };

  const chartOptions = {
    chart: {
      height: chartHeight,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      parentHeightOffset: 0,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
        borderRadius: 4,
        barHeight: "70%",
        distributed: false,
        rangeBarOverlap: true,
        rangeBarGroupRows: false,
        columnWidth: "80%",
        colors: {
          ranges: [
            {
              from: 0,
              to: 1000000,
              color: "#abdfe1",
            },
            {
              from: 1000000,
              to: 2000000,
              color: "#00749b",
            },
            {
              from: 2000000,
              to: 3000000,
              color: "#009bab",
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return formatValue(val, viewType);
      },
      style: {
        fontSize: "13px",
        colors: ["#333"],
      },
      offsetX: 0,
    },
    xaxis: {
      categories: chartData.map((item) => item.name),
      labels: {
        style: {
          fontSize: "13px",
        },
        trim: false,
        hideOverlappingLabels: false
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "13px",
        },
      },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: function (val: number) {
          return formatValue(val, viewType);
        },
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        const hospital = chartData[dataPointIndex];
        return `
          <div class="apexcharts-tooltip-title" style="font-weight: bold; margin-bottom: 5px;">
            ${hospital.name}
          </div>
          <div style="margin-bottom: 3px;">
            ${viewType === "revenue" ? "Revenue" : "Performance"}: ${
          formatValue(hospital.value, viewType)
        }
          </div>
          <div>
            Patients: ${hospital.patients.toLocaleString()}
          </div>
        `;
      },
    },
    grid: {
      padding: {
        left: 20
      },
      borderColor: "#f1f1f1",
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.5,
      },
    },
    colors: ["#1976d2"],
    title: {
      text: undefined,
    },
    legend: {
      show: false,
      position: 'top' as const,
    },
  };

  const series = [
    {
      name: viewType === "revenue" ? "Revenue" : "Performance",
      data: chartData.map((item) => item.value),
    },
  ];

  return (
    <Paper className={styles.chartContainer} sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box className={styles.header}>
        <Typography variant="h6">{t("dashboard.top_hospital")}</Typography>
        <ToggleButtonGroup
          value={viewType}
          exclusive
          onChange={handleViewTypeChange}
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              color: 'rgba(0, 0, 0, 0.6)',
              borderColor: 'rgba(0, 0, 0, 0.12)',
              borderRadius: '0',
              padding: '4px 12px',
              minHeight: '28px',
              fontSize: '10px',
              '&:first-of-type': {
                borderTopLeftRadius: '20px',
                borderBottomLeftRadius: '20px',
              },
              '&:last-of-type': {
                borderTopRightRadius: '20px',
                borderBottomRightRadius: '20px',
              },
              '&.Mui-selected': {
                color: '#ffffff',
                backgroundColor: '#009bab',
                '&:hover': {
                  backgroundColor: '#00749b',
                },
              },
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            },
          }}
        >
          <ToggleButton value="revenue">{t("dashboard.by_revenue")}</ToggleButton>
          <ToggleButton value="performance">{t("dashboard.by_performance")}</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box className={styles.chart} ref={chartContainerRef} sx={{ width: '100%', minWidth: 0 }}>
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="bar"
          height={chartHeight}
          width="100%"
        />
      </Box>
    </Paper>
  );
};

export default TopHospitalsChart;
