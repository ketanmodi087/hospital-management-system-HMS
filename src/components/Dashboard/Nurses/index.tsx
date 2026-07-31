import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  Chip,
  Divider,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  AccessTime,
  CheckCircle,
  Pending,
  Schedule,
  LocalHospital,
  People,
  Warning,
  Star,
} from "@mui/icons-material";
import styles from "./NursesDashboard.module.scss";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import TaskCompletionChart from "./TaskCompletionChart";
import PatientCareMetricsChart from "./PatientCareMetricsChart";
import { useTranslation } from "react-i18next";

// Define types for the MetricCard props
interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
}

// Define types for task data
interface Task {
  type: string;
  taskType: string;
  priority: string;
  time: string;
  location: string;
  roomNumber: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  statusValue: string;
}

// Sample data for the dashboard
const taskCompletionData = [
  { date: "Jan", tasks: 180, completed: 175, pending: 5 },
  { date: "Feb", tasks: 195, completed: 188, pending: 7 },
  { date: "Mar", tasks: 205, completed: 198, pending: 7 },
  { date: "Apr", tasks: 190, completed: 185, pending: 5 },
  { date: "May", tasks: 210, completed: 202, pending: 8 },
  { date: "Jun", tasks: 220, completed: 215, pending: 5 },
];

const patientCareMetrics = [
  { category: "Patient Response Time", score: 95, target: 90 },
  { category: "Medication Accuracy", score: 98, target: 95 },
  { category: "Patient Satisfaction", score: 92, target: 90 },
  { category: "Documentation Quality", score: 94, target: 90 },
  { category: "Care Plan Adherence", score: 96, target: 95 },
];

const shiftWorkloadData = {
  series: [40, 30, 30],
  labels: ["Morning", "Afternoon", "Night"],
};

const upcomingTasks: Task[] = [
  {
    type: "Medication",
    taskType: "Medication",
    priority: "High",
    time: "09:00 AM",
    location: "Room 301",
    roomNumber: "301",
    description: "Administer morning medication to patient",
    status: "Pending",
    statusValue: "pending",
  },
  {
    type: "Vital Signs Check",
    taskType: "Vital Signs Check",
    priority: "Medium",
    time: "09:30 AM",
    location: "Room 205",
    roomNumber: "205",
    description: "Regular vital signs monitoring and recording",
    status: "Pending",
    statusValue: "pending",
  },
  {
    type: "Wound Dressing",
    taskType: "Wound Dressing",
    priority: "High",
    time: "10:00 AM",
    location: "Room 210",
    roomNumber: "210",
    description: "Change wound dressing and assess healing progress",
    status: "In Progress",
    statusValue: "inProgress",
  },
  {
    type: "Patient Assessment",
    taskType: "Patient Assessment",
    priority: "Medium",
    time: "10:30 AM",
    location: "Room 215",
    roomNumber: "215",
    description: "Conduct routine patient assessment and documentation",
    status: "Pending",
    statusValue: "pending",
  },
];

const bedOccupancyData = [
  { ward: "General Ward", occupied: 28, total: 30 },
  { ward: "ICU", occupied: 8, total: 10 },
  { ward: "Pediatric", occupied: 15, total: 20 },
  { ward: "Surgical", occupied: 18, total: 20 },
  { ward: "Emergency", occupied: 9, total: 10 },
];

// MetricCard component
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
}) => {
  return (
    <Paper className={styles.metricCard} sx={{ borderRadius: "15px" }} >
      <Icon className={styles.metricCardIcon} />
      <Box className={styles.metricCardContent}>
        <Typography className={styles.metricCardValue}>{value}</Typography>
        <Typography className={styles.metricCardTitle}>{title}</Typography>
        <Typography
          className={styles.metricCardChange}
          sx={{
            color: change >= 0 ? "success.main" : "error.main",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {change >= 0 ? (
            <TrendingUp sx={{ fontSize: 16 }} />
          ) : (
            <TrendingDown sx={{ fontSize: 16 }} />
          )}
          {Math.abs(change)}%
        </Typography>
      </Box>
    </Paper>
  );
};

// Shift workload chart component
const ShiftWorkloadChart = ({ data }: { data: any }) => {
  const options: ApexOptions = {
    chart: {
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    colors: ["#009bab", "#ffd166", "#4ecdc4"],
    labels: data.labels,
    legend: {
      position: "bottom",
      fontSize: "13px",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
            },
            value: {
              show: true,
              fontSize: "16px",
              formatter: function (val: string) {
                return val + "%";
              },
            },
            total: {
              show: true,
              label: "Total",
              formatter: function () {
                return "100%";
              },
            },
          },
        },
      },
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Shift Workload Distribution
      </Typography>
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ReactApexChart
          options={options}
          series={data.series}
          type="donut"
          height={350}
        />
      </Box>
    </Box>
  );
};

// Upcoming tasks component
const UpcomingTasks = ({ tasks }: { tasks: any[] }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Upcoming Tasks
      </Typography>
      <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
        {tasks.map((task) => (
          <Box key={task.id} className={styles.taskCard}>
            <Box className={styles.taskHeader}>
              <Typography className={styles.taskTitle}>
                {task.taskType}
                <span
                  className={`${styles.badge} ${task.priority === "High"
                    ? styles.priorityHigh
                    : task.priority === "Medium"
                      ? styles.priorityMedium
                      : styles.priorityLow
                    }`}
                >
                  {task.priority}
                </span>
              </Typography>
              <Typography className={styles.taskTime}>{task.time}</Typography>
            </Box>
            <Box className={styles.taskDetails}>
              <Box className={styles.patientInfo}>
                <Typography className={styles.patientName}>
                  {task.patientName} • Room {task.roomNumber}
                </Typography>
                <Typography className={styles.taskDescription}>
                  {task.description}
                </Typography>
              </Box>
            </Box>
            <Box className={styles.taskActions}>
              <Box
                className={`${styles.actionButton} ${styles.secondaryButton} ${task.status === "Pending"
                  ? styles.statusPending
                  : task.status === "In Progress"
                    ? styles.statusInProgress
                    : styles.statusCompleted
                  }`}
              >
                {task.status}
              </Box>
              <Box className={`${styles.actionButton} ${styles.primaryButton}`}>
                Start Task
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// Bed occupancy chart component
const BedOccupancyChart = ({ data }: { data: any[] }) => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
        dataLabels: {
          position: "top",
        },
      },
    },
    colors: ["#009bab"],
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opt: any) {
        const total = data[opt.dataPointIndex].total;
        return `${val}/${total} (${Math.round((val / total) * 100)}%)`;
      },
      style: {
        fontSize: "12px",
      },
    },
    xaxis: {
      categories: data.map((item) => item.ward),
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
  };

  const series = [
    {
      name: "Occupied Beds",
      data: data.map((item) => item.occupied),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        Bed Occupancy by Ward
      </Typography>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </Box>
    </Box>
  );
};

const NursesDashboard: React.FC = () => {

  const { t }: { t: (key: string) => string } = useTranslation();
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <MetricCard
            title={t("dashboard.total_patients")}
            value="156"
            change={12}
            icon={People}
          />
        </Box>
        <Box>
          <MetricCard
            title={`${t("tasks")} ${t('completed')}`}
            value="89%"
            change={5}
            icon={CheckCircle}
          />
        </Box>
        <Box>
          <MetricCard
            title={t('dashboard.average_response_time')}
            value="4.2min"
            change={-8}
            icon={AccessTime}
          />
        </Box>
        <Box>
          <MetricCard
            title={t('dashboard.critical_alerts')}
            value="3"
            change={-25}
            icon={Warning}
          />
        </Box>
        <Box>
          <MetricCard
            title={t('dashboard.patient_satisfaction')}
            value="4.8/5"
            change={8}
            icon={Star}
          />
        </Box>
      </Box>
      <Divider sx={{ my: 3 }} />
      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box className={styles.chartCard}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {t('dashboard.task_completion_trends')}
            </Typography>
            <TaskCompletionChart data={taskCompletionData} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className={styles.chartCard}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {t('dashboard.patient_care_metrics')}
            </Typography>
            <PatientCareMetricsChart data={patientCareMetrics} />
          </Box>
        </Grid>

        {/* Task List */}
        <Grid item xs={12}>
          <Box className={styles.taskList}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              {t('dashboard.upcoming_tasks')}
            </Typography>
            <List>
              {upcomingTasks.map((task, index) => (
                <ListItem
                  key={index}
                  className={styles.taskItem}
                  sx={{ mb: 2 }}
                >
                  <Box sx={{ width: "100%" }}>
                    <Box className={styles.taskHeader}>
                      <Typography className={styles.taskType}>
                        {task.taskType}
                      </Typography>
                      <Chip
                        label={t(task.priority)}
                        size="small"
                        className={`${styles.taskPriority
                          } ${task.priority.toLowerCase()}`}
                      />
                    </Box>
                    <Box className={styles.taskDetails}>
                      <Typography variant="body2">
                        <AccessTime
                          sx={{ fontSize: 16, mr: 1, verticalAlign: "middle" }}
                        />
                        {task.time}
                      </Typography>
                      <Typography variant="body2">
                        <LocalHospital
                          sx={{ fontSize: 16, mr: 1, verticalAlign: "middle" }}
                        />
                        {task.roomNumber}
                      </Typography>
                    </Box>
                    <Typography className={styles.taskDescription}>
                      {task.description}
                    </Typography>
                    <Box
                      className={`${styles.taskStatus
                        } ${task.status.toLowerCase()}`}
                    >
                      {task.status === "Pending" ? (
                        <Pending sx={{ fontSize: 16 }} />
                      ) : task.status === "In Progress" ? (
                        <Schedule sx={{ fontSize: 16 }} />
                      ) : (
                        <CheckCircle sx={{ fontSize: 16 }} />
                      )}
                      <Typography variant="body2">{t(task.statusValue)}</Typography>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NursesDashboard;
