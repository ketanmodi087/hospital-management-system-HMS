import React, { useState, useEffect, useRef, LegacyRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact, { HighchartsReactRefObject } from "highcharts-react-official";
import data from "highcharts/modules/data";
import drilldown from "highcharts/modules/drilldown";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import accessibility from "highcharts/modules/accessibility";
import styles from "../styles/PieChart.module.css";
import { Skeleton } from "@mui/material";
import { ImArrowUpRight2 } from "react-icons/im";
import { ImArrowDownRight2 } from "react-icons/im";
import { AnyLengthString } from "aws-sdk/clients/comprehend";
import { Chart } from "highcharts";

data(Highcharts);
drilldown(Highcharts);
exporting(Highcharts);
exportData(Highcharts);
accessibility(Highcharts);

type Props = {
    chartData: { name: string; y: number; color: string }[];
    mainStat: string;
    subStat: string;
    details: { label: string; value: string }[];
    positive: boolean;
}
const PieChartComponent = ({ chartData, mainStat, subStat, details, positive, }: Props) => {
    const [loading, setLoading] = useState(true);
    const chartRef = useRef<HighchartsReact.RefObject>(null);
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleMouseEnter = (index: number) => {
        const chart = chartRef?.current?.chart;
        if (chart && chart.series[0].points[index]) {
            chart.series[0].points[index].setState("hover");
            chart.series[0].points.forEach((point, i) => {
                if (i !== index) {
                    point?.graphic?.attr({ opacity: 0.3 });
                }
            });
        }
    };

    const handleMouseLeave = (index: number) => {
        const chart = chartRef?.current?.chart;
        if (chart && chart.series[0].points[index]) {
            chart.series[0].points[index].setState("");
            chart.series[0].points.forEach((point) => {
                point?.graphic?.attr({ opacity: 1 });
            });
        }
    };

    const connectorColors = ["#007AFF", "#28CD41", "#AF52DE"];

    const options = {
        chart: {
            type: "pie",
            backgroundColor: "transparent",
            spacing: [0, 0, 0, 0],
            margin: [0, 0, 0, 0],
            height: 151,
            width: 175,
            plotShadow: false,
            events: {
                render(this: Chart) {
                    const chart = this;
                    setTimeout(() => {
                        if (chart?.series && chart?.series[0] && chart?.series[0].points) {
                            chart?.series[0].points?.forEach((point, index) => {
                                // Use type assertion to access `dataLabel` property
                                const dataLabel = (point as any).dataLabel;
                                if (dataLabel) {
                                    const connector = dataLabel?.connector;
                                    if (connector) {
                                        connector.attr({
                                            stroke: connectorColors[index] || "#000000",
                                            "stroke-width": 2,
                                        });
                                    }
                                }
                            });
                        }
                    }, 0);
                },
            },
        },
        title: { text: null },
        credits: { enabled: false },
        accessibility: {
            announceNewData: { enabled: true },
            point: { valueSuffix: "%" },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    distance: 5,
                    format: "{point.name}",
                    style: { fontSize: "1.4rem", fontWeight: "600" },
                    connectorWidth: 2,
                    connectorPadding: 5,
                },
                borderWidth: 2,
                shadow: false,
                states: { hover: { brightness: 0.1 } },
            },
        },
        tooltip: { enabled: false },
        series: [
            {
                name: "Browsers",
                colorByPoint: true,
                data: chartData,
            },
        ],
        exporting: { enabled: false },
    };

    const shimmerAnimation = `
    @keyframes shimmer {
      0% { background-position: -100% 0; }
      100% { background-position: 100% 0; }
    }
  `;

    const shimmerStyle: React.CSSProperties | undefined = {
        animation: "shimmer 1.5s infinite linear",
        background:
            "linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%)",
        backgroundSize: "1000px 100%",
        width: "13rem",
        height: "13rem",
        borderRadius: "50%",
        position: "relative",
        overflow: "hidden",
        marginLeft: "2rem",
    };

    return (
        <div className={styles.component}>
            <div className={styles.chartContainer}>
                <div className={styles.highchartsFigure}>
                    <style>{shimmerAnimation}</style>
                    {loading ? (
                        <div style={shimmerStyle}></div>
                    ) : (
                        <>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options}
                                ref={chartRef}
                            />
                            <span
                                className={
                                    positive ? styles.pro_active_up : styles.pro_active_down
                                }>
                                {positive ? (
                                    <ImArrowUpRight2 className={styles.up_arrow} />
                                ) : (
                                    <ImArrowDownRight2 className={styles.down_arrow} />
                                )}
                                <span className={styles.stats}>{subStat}</span>
                            </span>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.statsContainer}>
                {loading ? (
                    <>
                        <Skeleton
                            style={{
                                height: "5.5rem",
                                width: "8rem",
                            }}
                            variant="text"
                            className={styles.shimmer_stat}
                        />
                        <Skeleton
                            style={{
                                width: "50%",
                                marginBottom: "1rem",
                            }}
                            variant="text"
                            className={styles.shimmer_stat}
                        />
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className={styles.statRow}>
                                <Skeleton
                                    style={{
                                        width: "100%",
                                        marginTop: "2rem",
                                    }}
                                    variant="text"
                                    className={styles.shimmer_stat}
                                />
                            </div>
                        ))}
                    </>
                ) : (
                    <div className={styles.main}>
                        <p className={styles.mainStat}>{mainStat}</p>
                        <p className={styles.subStat}>
                            {positive ? (
                                <ImArrowUpRight2 className={styles.up_arrow} />
                            ) : (
                                <ImArrowDownRight2 className={styles.down_arrow} />
                            )}
                            <span className={styles.stats}>{subStat}</span>
                        </p>
                        <div className={styles.details_data}>
                            {details?.map((detail, index) => (
                                <div
                                    key={index}
                                    className={styles.statRow}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}>
                                    <div
                                        className={styles.box_color}
                                        style={{
                                            backgroundColor: chartData[index]?.color || "#000",
                                            cursor: "pointer",
                                        }}></div>
                                    <p className={styles.info}>
                                        {detail.label}{" "}
                                        <span className={styles.statValue}>{detail.value}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PieChartComponent;
