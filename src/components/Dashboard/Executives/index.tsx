import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import {
  AttachMoney as RevenueIcon,
  Person as PersonIcon,
  CalendarToday as AppointmentIcon,
  Group as GroupIcon,
  Star as StarIcon,
  Timer as TimerIcon,
} from "@mui/icons-material";
import AppointmentTrendChart from "./AppointmentTrendChart";
import PaymentAverageChart from "./PaymentAverageChart";
import TopSellingMedicinesChart from "./TopSellingMedicinesChart";
import EmailCampaignsChart from "./EmailCampaignsChart";
import AIUsageChart from "./AIUsageChart";
import DoctorAvailabilityChart from "./DoctorAvailabilityChart";
import PatientsBySpecialist from "./PatientsBySpecialist";
import TopReferralsByDoctor from "./TopReferralsByDoctor";
import PatientSatisfactionCard from "./PatientSatisfactionCard";
import RevenueBreakdownCard from "./RevenueBreakdownCard";
import styles from "./ExecutivesDashboard.module.scss";
import { useTranslation } from "react-i18next";
import { t } from "i18next"

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
  <Paper className={styles.metricCard} sx={{
    backgroundColor: "#ffffff",
    borderLeft: "4px solid #009bab",
    display: "flex",
    alignItems: "center",
    height: "100%",
    borderRadius: "15px",
  }}>
    <Box sx={{
      fontSize: "25px",
      marginRight: "16px",
      color: "#009bab",
      padding: "8px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {icon}
    </Box>
    <Box className={styles.metricCardContent}>
      <Typography className={styles.metricCardValue} sx={{ color: "#009bab", fontSize: "24px", fontWeight: 600 }}>{value}</Typography>
      <Typography className={styles.metricCardTitle} sx={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "14px", fontWeight: 500 }}>{title}</Typography>
      <Typography
        className={styles.metricCardChange}
        sx={{
          color: change.startsWith("+") ? "success.main" : "error.main",
          fontSize: "12px",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}
      >
        {change}
      </Typography>
    </Box>
  </Paper>
);

const ExecutivesDashboard: React.FC = () => {
  // const { t }: { t: (key: string) => string } = useTranslation();

  // Sample data for appointments
  const appointmentData = {
    monthly: [
      { month: t("jan"), appointments: 1250 },
      { month: t("feb"), appointments: 1420 },
      { month: t("mar"), appointments: 1680 },
      { month: t("apr"), appointments: 1890 },
      { month: t("may"), appointments: 2100 },
      { month: t("jun"), appointments: 2350 },
    ],
    weekly: [
      { week: `${t("week")} 1`, appointments: 320 },
      { week: `${t("week")} 2`, appointments: 380 },
      { week: `${t("week")} 3`, appointments: 420 },
      { week: `${t("week")} 4`, appointments: 450 },
    ],
    daily: [
      { day: t("Mon"), appointments: 85 },
      { day: t("Tue"), appointments: 92 },
      { day: t("Wed"), appointments: 88 },
      { day: t("Thu"), appointments: 95 },
      { day: t("Fri"), appointments: 82 },
    ],
  };

  // Sample data for payment averages
  const paymentData = [
    { month: t("jan"), value: 850000 },
    { month: t("feb"), value: 920000 },
    { month: t("mar"), value: 980000 },
    { month: t("apr"), value: 1050000 },
    { month: t("may"), value: 1120000 },
    { month: t("jun"), value: 1180000 },
  ];

  // Sample data for top selling medicines
  const medicineData = [
    { name: t("dashboard.Paracetamol"), sales: 850, revenue: 42500000 },
    { name: t("dashboard.Amoxicillin"), sales: 720, revenue: 57600000 },
    { name: t("dashboard.Omeprazole"), sales: 680, revenue: 54400000 },
    { name: t("dashboard.Metformin"), sales: 620, revenue: 37200000 },
    { name: t("dashboard.Atorvastatin"), sales: 580, revenue: 46400000 },
  ];

  // Sample data for top feedback
  const feedbackData = [
    {
      patient: "Nguyen Van X",
      rating: 5,
      comment: "Excellent service, doctors are very dedicated",
    },
    { patient: "Tran Thi Y", rating: 4, comment: "Professional staff service" },
    { patient: "Le Van Z", rating: 5, comment: "Modern facilities, very clean" },
    {
      patient: "Pham Thi W",
      rating: 4,
      comment: "Reasonable waiting time for examination",
    },
    {
      patient: "Hoang Van V",
      rating: 5,
      comment: "Doctors explain conditions very clearly",
    },
  ];

  // Sample data for email campaigns
  const emailCampaignData = [
    { month: t("jan"), sent: 1200, opened: 960, clicked: 480 },
    { month: t("feb"), sent: 1350, opened: 1080, clicked: 540 },
    { month: t("mar"), sent: 1500, opened: 1200, clicked: 600 },
    { month: t("apr"), sent: 1650, opened: 1320, clicked: 660 },
    { month: t("may"), sent: 1800, opened: 1440, clicked: 720 },
    { month: t("jun"), sent: 1950, opened: 1560, clicked: 780 },
  ];

  // Sample data for AI usage
  const aiUsageData = [
    { month: t("jan"), consultations: 250, accuracy: 94 },
    { month: t("feb"), consultations: 280, accuracy: 95 },
    { month: t("mar"), consultations: 320, accuracy: 96 },
    { month: t("apr"), consultations: 350, accuracy: 95 },
    { month: t("may"), consultations: 380, accuracy: 97 },
    { month: t("jun"), consultations: 420, accuracy: 98 },
  ];

  // Sample data for doctor availability
  const doctorAvailabilityData = [
    { doctor: "Dr. Nguyen Van A", available: 85, total: 100 },
    { doctor: "Dr. Tran Thi B", available: 80, total: 100 },
    { doctor: "Dr. Le Van C", available: 90, total: 100 },
    { doctor: "Dr. Pham Thi D", available: 75, total: 100 },
    { doctor: "Dr. Hoang Van E", available: 88, total: 100 },
  ];

  // Sample data for conference stats
  const conferenceData = {
    video: [
      { date: "2024-01-01", count: 12 },
      { date: "2024-01-02", count: 15 },
      { date: "2024-01-03", count: 18 },
      { date: "2024-01-04", count: 14 },
      { date: "2024-01-05", count: 16 },
    ],
    audio: [
      { date: "2024-01-01", count: 18 },
      { date: "2024-01-02", count: 22 },
      { date: "2024-01-03", count: 25 },
      { date: "2024-01-04", count: 20 },
      { date: "2024-01-05", count: 23 },
    ],
  };

  // Sample data for patients by specialist
  const patientsBySpecialistData = [
    { specialist: t("dashboard.Cardiology"), patients: 180 },
    { specialist: t("dashboard.Pediatrics"), patients: 220 },
    { specialist: t("dashboard.Dermatology"), patients: 150 },
    { specialist: t("dashboard.InternalMedicine"), patients: 190 },
    { specialist: "ENT", patients: 160 },
  ];

  // Sample data for top referrals by doctor
  const topReferralsData = [
    { doctor: "Dr. Nguyen Van A", referrals: 65, patients: 58 },
    { doctor: "Dr. Tran Thi B", referrals: 58, patients: 52 },
    { doctor: "Dr. Le Van C", referrals: 52, patients: 48 },
    { doctor: "Dr. Pham Thi D", referrals: 48, patients: 42 },
    { doctor: "Dr. Hoang Van E", referrals: 42, patients: 38 },
  ];

  const satisfactionData = [
    { category: "Doctor Care", score: 4.8, total: 1245 },
    { category: "Nursing Care", score: 4.7, total: 1245 },
    { category: "Facility", score: 4.6, total: 1245 },
    { category: "Overall Experience", score: 4.7, total: 1245 },
  ];

  const revenueBreakdownData = [
    { name: t("dashboard.OutpatientServices"), value: 2500000000 },
    { name: t("dashboard.InpatientServices"), value: 1800000000 },
    { name: t("dashboard.DiagnosticServices"), value: 1200000000 },
    { name: t("dashboard.Pharmacy"), value: 800000000 },
    { name: t("dashboard.OtherServices"), value: 400000000 },
  ];

  const patientSatisfactionData = [
    { category: t("dashboard.OverallExperience"), score: 4.5, total: 1250 },
    { category: t("dashboard.MedicalCare"), score: 4.7, total: 1200 },
    { category: t("dashboard.StaffCourtesy"), score: 4.6, total: 1150 },
    { category: t("dashboard.FacilityCleanliness"), score: 4.8, total: 1100 },
  ];



  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Box >
          <MetricCard
            title={t("dashboard.total_revenue")}
            value="$2.4M"
            change={`+12.5% ${t("dashboard.from_last_month")}`}
            icon={<RevenueIcon className={styles.metricCardIcon} sx={{ color: "#009bab" }} />}
          />
        </Box>
        <Box >
          <MetricCard
            title={t("dashboard.total_patients")}
            value="12,450"
            change={`+8.3% ${t("dashboard.from_last_month")}`}
            icon={<PersonIcon className={styles.metricCardIcon} sx={{ color: "#009bab" }} />}
          />
        </Box>
        <Box >
          <MetricCard
            title={t("appointments")}
            value="3,280"
            change={`+5.7% ${t("dashboard.from_last_month")}`}
            icon={<AppointmentIcon className={styles.metricCardIcon} sx={{ color: "#009bab" }} />}
          />
        </Box>
        <Box >
          <MetricCard
            title={t("dashboard.staff_utilization")}
            value="87%"
            change={`+2.1% ${t("dashboard.from_last_month")}`}
            icon={<GroupIcon className={styles.metricCardIcon} sx={{ color: "#009bab" }} />}
          />
        </Box>
        <Box >
          <MetricCard
            title={t("dashboard.patient_satisfaction")}
            value="4.7/5"
            change={`+0.3 ${t("dashboard.from_last_month")}`}
            icon={<StarIcon className={styles.metricCardIcon} sx={{ color: "#009bab" }} />}
          />
        </Box>
        <Box >
          <MetricCard
            title={t("dashboard.average_patient_time")}
            value="1.5h"
            change={`-0.3 ${t("dashboard.from_last_month")}`}
            icon={<TimerIcon className={styles.metricCardIcon} sx={{ color: "#009bab" }} />}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <div className={styles.chartCard}>
            <AppointmentTrendChart data={appointmentData} />
          </div>
        </Grid>
        <Grid item xs={12} md={5}>
          <div className={styles.chartCard}>
            <TopReferralsByDoctor data={topReferralsData} />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <RevenueBreakdownCard data={revenueBreakdownData} />
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={styles.chartCard}>
            <TopSellingMedicinesChart data={medicineData} />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <PaymentAverageChart data={paymentData} />
        </Grid>
        <Grid item xs={12} md={7}>
          <PatientSatisfactionCard data={patientSatisfactionData} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className={styles.chartCard}>
                <EmailCampaignsChart data={emailCampaignData} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={styles.chartCard}>
                <AIUsageChart data={aiUsageData} />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.chartCard}>
            <DoctorAvailabilityChart data={doctorAvailabilityData} />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.chartCard}>
            <PatientsBySpecialist data={patientsBySpecialistData} />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExecutivesDashboard;
