import React, { useRef, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface ReferralData {
  source: string;
  revenue: number;
  patients: number;
  percentage: number;
}

interface RevenueByReferralChartProps {
  data: {
    referralData: ReferralData[];
    totalRevenue: number;
  };
}

const RevenueByReferralChart: React.FC<RevenueByReferralChartProps> = ({
  data,
}) => {
  const [chartHeight, setChartHeight] = useState(250);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const { t }: { t: (key: string) => string } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current?.chart) {
        chartRef.current.chart.resize(); // <- manual resize
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const updateChartHeight = () => {
      if (chartContainerRef.current) {
        const containerHeight = chartContainerRef.current.clientHeight;
        // Account for header and padding
        const newHeight = Math.max(250, containerHeight - 80);
        setChartHeight(newHeight);
      }
    };

    updateChartHeight();
    window.addEventListener("resize", updateChartHeight);
    return () => window.removeEventListener("resize", updateChartHeight);
  }, []);

  const chartOptions = {
    chart: {
      type: "donut",
      height: chartHeight,
      toolbar: {
        show: false,
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
    labels: data.referralData.map((item) => item.source),
    colors: ["#009bab", "#abdfe1", "#00749b", "#80deea", "#00264d"],
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "13px",
              fontWeight: 500,
              color: "#333",
            },
            value: {
              show: true,
              fontSize: "16px",
              fontWeight: 600,
              color: "#009bab",
              formatter: function (val: number) {
                return "$" + val.toLocaleString();
              },
            },
            total: {
              show: true,
              label: t("dashboard.total_revenue"),
              fontSize: "13px",
              fontWeight: 500,
              color: "#333",
              formatter: function (w: any) {
                return (
                  "$" +
                  w.globals.seriesTotals
                    .reduce((a: number, b: number) => a + b, 0)
                    .toLocaleString()
                );
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(1) + "%";
      },
      style: {
        fontSize: "13px",
        fontWeight: 500,
      },
      background: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        opacity: 0.3,
        blur: 3,
        left: 1,
        top: 1,
      },
    },
    legend: {
      position: "bottom",
      fontSize: "13px",
      fontWeight: 500,
      markers: {
        width: 12,
        height: 12,
        radius: 6,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    tooltip: {
      y: {
        formatter: function (value: number) {
          return "$" + value.toLocaleString();
        },
      },
      x: {
        show: false,
      },
      style: {
        fontSize: "13px",
      },
    },
    responsive: [
      {
        height: 250,
        breakpoint: 480,
        options: {
          chart: {
            height: 250,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series = data.referralData.map((item) => item.revenue);

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 2,
        padding: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      ref={chartContainerRef}
    >
      {/* Header */}
      <Box mb={2}>
        <Typography variant="h6">
          {t("dashboard.revenue_by_referral_source")}
        </Typography>
      </Box>

      {/* Chart */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight={}
        height={"100%"}
        width="100%"
      >
        <ReactApexChart
          ref={chartRef}
          options={chartOptions as any}
          series={series}
          type="donut"
          height={chartHeight}
          width="100%"
        />
      </Box>

      {/* Summary Stats */}
      <Divider sx={{ my: 3 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} textAlign="center">
          <Typography variant="caption" color="textSecondary">
            {t("dashboard.total_revenue")}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            ${data.totalRevenue.toLocaleString()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} textAlign="center">
          <Typography variant="caption" color="textSecondary">
            {t("dashboard.topSource")}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            {data.referralData[0]?.source || "N/A"}
          </Typography>
          <Typography variant="body2" color="info.main">
            {data.referralData[0]?.percentage.toFixed(1)}%
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} textAlign="center">
          <Typography variant="caption" color="textSecondary">
            {t("dashboard.total_patients")}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            {data.referralData
              .reduce((sum, item) => sum + item.patients, 0)
              .toLocaleString()}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RevenueByReferralChart;
