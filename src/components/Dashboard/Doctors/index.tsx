import React from "react";
import { Box, Grid, Paper, Typography, Divider } from "@mui/material";
import styles from "./DoctorsDashboard.module.scss";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StarIcon from "@mui/icons-material/Star";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicationIcon from "@mui/icons-material/Medication";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTranslation } from "react-i18next";
import { t } from "i18next";



// Metric card component
const MetricCard = ({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}) => (
  <Paper className={styles.metricCard} sx={{ borderRadius: "15px", }}>
    <Box
      sx={{
        fontSize: "32px",
        color: "#009bab",
      }}
    >
      {icon}
    </Box>
    <Box className={styles.metricCardContent}>
      <Typography className={styles.metricCardValue}>{value}</Typography>
      <Typography className={styles.metricCardTitle}>{title}</Typography>
      <Typography
        className={styles.metricCardChange}
        sx={{
          color: change.startsWith("+") ? "success.main" : "error.main",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        {change}
      </Typography>
    </Box>
  </Paper>
);

// Appointment trend chart component
const AppointmentTrendChart = ({ data }: { data: any[] }) => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
      stacked: false,
      animations: {
        enabled: true,
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
    colors: ["#009bab", "#abdfe1", "#ff6b6b"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: data.map((item) => item.date),
      labels: {
        style: {
          fontSize: "12px",
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
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      theme: "light",
      y: [
        {
          title: {
            formatter: () => t("total"),
          },
        },
        {
          title: {
            formatter: () => t("completed"),
          },
        },
        {
          title: {
            formatter: () => t("cancelled"),
          },
        },
      ],
    },
    legend: {
      position: "top",
      fontSize: "13px",
    },
    grid: {
      borderColor: "#f1f1f1",
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.5,
      },
    },
  };

  const series = [
    {
      name: t("dashboard.total_appointments"),
      data: data.map((item) => item.appointments),
    },
    {
      name: t("completed"),
      data: data.map((item) => item.completed),
    },
    {
      name: t("cancelled"),
      data: data.map((item) => item.cancelled),
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
        {t("dashboard.appointment_trends")}
      </Typography>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </Box>
    </Box>
  );
};

// Patient satisfaction chart component
const PatientSatisfactionChart = ({ data }: { data: any[] }) => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      stacked: false,
      animations: {
        enabled: true,
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
        horizontal: true,
        borderRadius: 6,
        dataLabels: {
          position: "top",
        },
        barHeight: "70%",
        distributed: false,
        rangeBarOverlap: true,
        rangeBarGroupRows: false,
      },
    },
    colors: ["#009bab"],
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(1);
      },
      style: {
        fontSize: "13px",
        colors: ["#333"],
      },
    },
    xaxis: {
      categories: data.map((item) => item.category),
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: 500,
        },
        rotate: -45,
        rotateAlways: true,
        trim: false,
        maxHeight: 100,
        minHeight: 100,
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
          return val.toFixed(1) + " / 5.0";
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
  };

  const series = [
    {
      name: "Satisfaction Score",
      data: data.map((item) => item.score),
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
        {t('dashboard.patient_satisfaction')}
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

// Patient demographics chart component
const PatientDemographicsChart = ({ data }: { data: any }) => {
  const options: ApexOptions = {
    chart: {
      type: "donut",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
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
    colors: ["#009bab", "#abdfe1", "#ffd166", "#ff6b6b", "#4ecdc4"],
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
              fontWeight: 600,
              color: "#333",
            },
            value: {
              show: true,
              fontSize: "16px",
              fontWeight: 600,
              color: "#333",
              formatter: function (val: string) {
                return val + "%";
              },
            },
            total: {
              show: true,
              label: t("total"),
              fontSize: "14px",
              fontWeight: 600,
              color: "#333",
              formatter: function (w: any) {
                return "100%";
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: function (val: number) {
          return val + "%";
        },
      },
    },
  };

  const series = data.series;

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
        {t("dashboard.PatientDemographics")}
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
          series={series}
          type="donut"
          height={350}
        />
      </Box>
    </Box>
  );
};

// Treatment success chart component
const TreatmentSuccessChart = ({ data }: { data: any[] }) => {
  const options: ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      stacked: false,
      animations: {
        enabled: true,
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
    colors: ["#009bab"],
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val + "%";
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 5,
      colors: ["#009bab"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    xaxis: {
      categories: data.map((item) => item.month),
      labels: {
        style: {
          fontSize: "12px",
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
          fontSize: "12px",
        },
        formatter: function (val: number) {
          return val + "%";
        },
      },
      min: 80,
      max: 100,
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: function (val: number) {
          return val + "% success rate";
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
  };

  const series = [
    {
      name: `${t('dashboard.TreatmentSuccess')} ${t('Rate')}`,
      data: data.map((item) => item.success),
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
        {t('dashboard.TreatmentSuccess')} {t('Rate')}
      </Typography>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </Box>
    </Box>
  );
};

// Upcoming appointments component
const UpcomingAppointments = ({ appointments }: { appointments: any[] }) => {
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
        {t("dashboard.UpcomingAppointments")}
      </Typography>
      <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
        {appointments.map((appointment) => (
          <Box key={appointment.id} className={styles.appointmentCard}>
            <Box className={styles.appointmentHeader}>
              <Typography className={styles.appointmentTitle}>
                {appointment.appointmentType}
              </Typography>
              <Typography className={styles.appointmentTime}>
                {appointment.appointmentDate} at {appointment.appointmentTime}
              </Typography>
            </Box>
            <Box className={styles.appointmentPatient}>
              <Box className={styles.patientAvatar}>
                {appointment.patientName.charAt(0)}
              </Box>
              <Box className={styles.patientInfo}>
                <Typography className={styles.patientName}>
                  {appointment.patientName}
                </Typography>
                <Typography className={styles.patientDetails}>
                  {appointment.patientAge} years • {appointment.patientGender}
                </Typography>
              </Box>
            </Box>
            <Box className={styles.appointmentActions}>
              <Box
                className={`${styles.actionButton} ${styles.secondaryButton}`}
                sx={{
                  backgroundColor:
                    appointment.status === "Confirmed"
                      ? "success.light"
                      : appointment.status === "Pending"
                        ? "warning.light"
                        : "error.light",
                  color:
                    appointment.status === "Confirmed"
                      ? "success.dark"
                      : appointment.status === "Pending"
                        ? "warning.dark"
                        : "error.dark",
                }}
              >
                {appointment.statusValue}
              </Box>
              <Box className={`${styles.actionButton} ${styles.primaryButton}`}>
                {t('view')} {t('details')}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// Notifications component
const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "New patient referral",
      message: "Dr. Smith has referred a new patient to you.",
      time: `10 ${t('minutes')} ${t('ago')}`,
      read: false,
    },
    {
      id: 2,
      title: "Lab results available",
      message: "Lab results for patient Nguyen Van A are now available.",
      time: `1 ${t('hour')} ${t('ago')}`,
      read: false,
    },
    {
      id: 3,
      title: "Schedule update",
      message: "Your schedule has been updated for tomorrow.",
      time: `2 ${t('hour')} ${t('ago')}`,
      read: true,
    },
    {
      id: 4,
      title: "Patient feedback",
      message: "You have received new feedback from a patient.",
      time: `3 ${t('hour')} ${t('ago')}`,
      read: true,
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
        {t('Notifications')}
      </Typography>
      <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
        {notifications.map((notification) => (
          <Box
            key={notification.id}
            className={styles.appointmentCard}
            sx={{
              backgroundColor: notification.read
                ? "white"
                : "rgba(0, 155, 171, 0.05)",
              borderLeft: notification.read
                ? "4px solid #f0f0f0"
                : "4px solid #009bab",
            }}
          >
            <Box className={styles.appointmentHeader}>
              <Typography className={styles.appointmentTitle}>
                {notification.title}
              </Typography>
              <Typography className={styles.appointmentTime}>
                {notification.time}
              </Typography>
            </Box>
            <Typography className={styles.patientDetails}>
              {notification.message}
            </Typography>
            <Box className={styles.appointmentActions}>
              <Box className={`${styles.actionButton} ${styles.primaryButton}`}>
                {t('view')}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const DoctorsDashboard: React.FC = () => {
  // const { t }: { t: (key: string) => string } = useTranslation();

  // Sample data for the dashboard
  const appointmentData = [
    { date: t("jan"), appointments: 120, completed: 110, cancelled: 10 },
    { date: t("feb"), appointments: 135, completed: 125, cancelled: 10 },
    { date: t("mar"), appointments: 150, completed: 140, cancelled: 10 },
    { date: t("apr"), appointments: 145, completed: 135, cancelled: 10 },
    { date: t("may"), appointments: 160, completed: 150, cancelled: 10 },
    { date: t("jun"), appointments: 175, completed: 165, cancelled: 10 },
  ];

  const patientSatisfactionData = [
    { category: "Communication", score: 4.8, total: 150 },
    { category: "Diagnosis Accuracy", score: 4.9, total: 150 },
    { category: "Treatment Effectiveness", score: 4.7, total: 150 },
    { category: "Follow-up Care", score: 4.6, total: 150 },
    { category: "Overall Experience", score: 4.8, total: 150 },
  ];

  const patientDemographicsData = {
    series: [35, 25, 20, 15, 5],
    labels: ["18-30", "31-45", "46-60", "61-75", "76+"],
  };

  const treatmentSuccessData = [
    { month: t("jan"), success: 92, total: 100 },
    { month: t("feb"), success: 94, total: 100 },
    { month: t("mar"), success: 91, total: 100 },
    { month: t("apr"), success: 93, total: 100 },
    { month: t("may"), success: 95, total: 100 },
    { month: t("jun"), success: 96, total: 100 },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patientName: "Nguyen Van A",
      patientAge: 45,
      patientGender: t("Male"),
      appointmentTime: "09:00 AM",
      appointmentDate: "Today",
      appointmentType: "Follow-up",
      status: "Confirmed",
      statusValue: t("confirmed")
    },
    {
      id: 2,
      patientName: "Tran Thi B",
      patientAge: 32,
      patientGender: t("Female"),
      appointmentTime: "10:30 AM",
      appointmentDate: "Today",
      appointmentType: "New Patient",
      status: "Confirmed",
      statusValue: t("confirmed"),
    },
    {
      id: 3,
      patientName: "Le Van C",
      patientAge: 58,
      patientGender: t("Male"),
      appointmentTime: "02:00 PM",
      appointmentDate: "Today",
      appointmentType: "Consultation",
      status: "Pending",
      statusValue: t("pending"),
    },
    {
      id: 4,
      patientName: "Pham Thi D",
      patientAge: 27,
      patientGender: t("Female"),
      appointmentTime: "09:15 AM",
      appointmentDate: "Tomorrow",
      appointmentType: "Follow-up",
      status: "Confirmed",
      statusValue: t("confirmed"),
    },
    {
      id: 5,
      patientName: "Hoang Van E",
      patientAge: 63,
      patientGender: t("Male"),
      appointmentTime: "11:00 AM",
      appointmentDate: "Tomorrow",
      appointmentType: "New Patient",
      status: "Confirmed",
      statusValue: t("confirmed"),
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <MetricCard
            title={t("dashboard.total_patients")}
            value="1,245"
            change="+8.3% from last month"
            icon={
              <PersonIcon
                className={styles.metricCardIcon}
                sx={{ color: "#009bab" }}
              />
            }
          />
        </Box>
        <Box>
          <MetricCard
            title={t("dashboard.appointments_today")}
            value="12"
            change="+2 from yesterday"
            icon={
              <CalendarTodayIcon
                className={styles.metricCardIcon}
                sx={{ color: "#009bab" }}
              />
            }
          />
        </Box>
        <Box>
          <MetricCard
            title={t("dashboard.PatientRating")}
            value="4.8/5"
            change="+0.2 from last month"
            icon={
              <StarIcon
                className={styles.metricCardIcon}
                sx={{ color: "#009bab" }}
              />
            }
          />
        </Box>
        <Box>
          <MetricCard
            title={t("dashboard.TreatmentSuccess")}
            value="94%"
            change="+2.1% from last month"
            icon={
              <TrendingUpIcon
                className={styles.metricCardIcon}
                sx={{ color: "#009bab" }}
              />
            }
          />
        </Box>
        <Box>
          <MetricCard
            title={t("dashboard.AvgConsultation")}
            value="18 min"
            change="-2 min from last month"
            icon={
              <AccessTimeIcon
                className={styles.metricCardIcon}
                sx={{ color: "#009bab" }}
              />
            }
          />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Charts and Appointments */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <div className={styles.chartCard}>
            <AppointmentTrendChart data={appointmentData} />
          </div>
        </Grid>
        <Grid item xs={12} md={5}>
          <div className={styles.chartCard}>
            <UpcomingAppointments appointments={upcomingAppointments} />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.chartCard}>
            <PatientSatisfactionChart data={patientSatisfactionData} />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.chartCard}>
            <PatientDemographicsChart data={patientDemographicsData} />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.chartCard}>
            <TreatmentSuccessChart data={treatmentSuccessData} />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.chartCard}>
            <Notifications />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorsDashboard;
