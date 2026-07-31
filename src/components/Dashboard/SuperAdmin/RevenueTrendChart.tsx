import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import styles from "./RevenueTrendChart.module.scss";
import { useTranslation } from "react-i18next";

type RevenueDataType = {
  months: string[];
  hospitals: Record<string, number[]>;
  departments: Record<string, number[]>;
};

// Sample data - replace with actual data from your API
const revenueData: RevenueDataType = {
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  hospitals: {
    "CareSphere Da Nang": [
      1200000, 1350000, 1280000, 1420000, 1500000, 1650000, 1580000, 1720000,
      1680000, 1850000, 1920000, 2000000,
    ],
    "CareSphere Sai Gon": [
      980000, 1050000, 1120000, 1080000, 1150000, 1220000, 1180000, 1250000,
      1320000, 1380000, 1420000, 1500000,
    ],
    "CareSphere Cuu Long": [
      850000, 920000, 880000, 950000, 1020000, 980000, 1050000, 1120000,
      1080000, 1150000, 1220000, 1180000,
    ],
  },
  departments: {
    Cardiology: [
      450000, 480000, 460000, 500000, 520000, 550000, 530000, 560000, 540000,
      580000, 600000, 620000,
    ],
    Orthopedics: [
      380000, 400000, 390000, 420000, 440000, 460000, 450000, 480000, 470000,
      500000, 520000, 540000,
    ],
    Neurology: [
      320000, 340000, 330000, 360000, 380000, 400000, 390000, 420000, 410000,
      440000, 460000, 480000,
    ],
  },
};

const RevenueTrendChart: React.FC = () => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const [viewType, setViewType] = useState<"hospital" | "department">(
    "hospital"
  );
  const [selectedItems, setSelectedItems] = useState<string[]>([
    "CareSphere Da Nang",
    "CareSphere Sai Gon",
    "CareSphere Cuu Long",
  ]);
  const [chartHeight, setChartHeight] = useState(300);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateChartHeight = () => {
      if (chartContainerRef.current) {
        const containerHeight = chartContainerRef.current.clientHeight;
        // Calculate height based on container size, accounting for header and filters
        const newHeight = Math.max(180, containerHeight - 50);
        setChartHeight(newHeight);
      }
    };

    updateChartHeight();
    window.addEventListener("resize", updateChartHeight);

    return () => {
      window.removeEventListener("resize", updateChartHeight);
    };
  }, []);

  const handleViewTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newViewType: "hospital" | "department"
  ) => {
    if (newViewType !== null) {
      setViewType(newViewType);
      // Reset selected items when switching view type
      setSelectedItems(
        Object.keys(
          revenueData[newViewType === "hospital" ? "hospitals" : "departments"]
        )
      );
    }
  };

  const handleItemToggle = (item: string) => {
    setSelectedItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      }
      return [...prev, item];
    });
  };

  // Transform data for ApexCharts
  const series =
    selectedItems?.length > 0
      ? selectedItems.map((item) => {
          return {
            name: item,
            data: revenueData.months.map((month, index) => {
              return viewType === "hospital"
                ? revenueData.hospitals[item][index]
                : revenueData.departments[item][index];
            }),
          };
        })
      : [
          {
            name: "No data",
            data: revenueData.months.map(() => 0),
          },
        ];

  // Use theme primary and secondary colors
  const COLORS = ["#009bab", "#abdfe1", "#00749b", "#00bcd4", "#80deea"];

  const chartOptions = {
    chart: {
      height: chartHeight,
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
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
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: revenueData.months,
      labels: {
        style: {
          fontSize: "13px",
        },
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
        formatter: function (val: number) {
          return `$${(val / 1000000).toFixed(1)}M`;
        },
      },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: function (val: number) {
          return `$${(val / 1000000).toFixed(1)}M`;
        },
      },
    },
    grid: {
      borderColor: "#f1f1f1",
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.5,
      },
    },
    colors: selectedItems.length > 0 ? COLORS : ["#009bab"],
    legend: {
      position: "top" as const,
      horizontalAlign: "right" as const,
      fontSize: "13px",
      markers: {
        size: 6,
        strokeWidth: 0,
        shape: "circle" as const,
        offsetX: 0,
        offsetY: 0,
      },
    },
  };

  return (
    <Paper
      className={styles.chartContainer}
      sx={{ width: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box className={styles.header}>
        <Typography variant="h6">{t("dashboard.revenue_trend_analysis")}</Typography>
        <ToggleButtonGroup
          value={viewType}
          exclusive
          onChange={handleViewTypeChange}
          size="small"
          sx={{
            "& .MuiToggleButton-root": {
              color: "rgba(0, 0, 0, 0.6)",
              borderColor: "rgba(0, 0, 0, 0.12)",
              borderRadius: "0",
              padding: "4px 12px",
              minHeight: "28px",
              fontSize: "10px",
              "&:first-of-type": {
                borderTopLeftRadius: "20px",
                borderBottomLeftRadius: "20px",
              },
              "&:last-of-type": {
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
              },
              "&.Mui-selected": {
                color: "#ffffff",
                backgroundColor: "#009bab",
                "&:hover": {
                  backgroundColor: "#00749b",
                },
              },
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            },
          }}
        >
          <ToggleButton value="hospital">{t("dashboard.by_hospital")}</ToggleButton>
          <ToggleButton value="department">{t("dashboard.by_department")}</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box className={styles.filters}>
        {(viewType === "hospital"
          ? Object.keys(revenueData.hospitals)
          : Object.keys(revenueData.departments)
        ).map((item) => (
          <ToggleButton
            key={item}
            value={item}
            selected={selectedItems.includes(item)}
            onChange={() => handleItemToggle(item)}
            size="small"
            sx={{
              color: "rgba(0, 0, 0, 0.6)",
              borderColor: "rgba(0, 0, 0, 0.12)",
              borderRadius: "20px",
              margin: "0 4px 4px 0",
              padding: "4px 12px",
              minHeight: "28px",
              fontSize: "10px",
              "&.Mui-selected": {
                color: "#ffffff",
                backgroundColor: "#009bab",
                "&:hover": {
                  backgroundColor: "#00749b",
                },
              },
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            {item}
          </ToggleButton>
        ))}
      </Box>

      <Box
        className={styles.chart}
        ref={chartContainerRef}
        sx={{ width: "100%", minWidth: 0 }}
      >
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

export default RevenueTrendChart;
