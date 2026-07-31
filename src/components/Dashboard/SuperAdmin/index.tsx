import React from "react";
import { Box, Divider, Grid } from "@mui/material";
import TopCards from "./TopCards";
import RevenueTrendChart from "./RevenueTrendChart";
import TopHospitalsChart from "./TopHospitalsChart";
import RevenueByReferralChart from "./RevenueByReferralChart";
import StaffUtilizationChart from "./StaffUtilizationChart";
import MonthlyReferralGrowthChart from "./MonthlyReferralGrowthChart";
import AvgTimeSavedChart from "./AvgTimeSavedChart";
import TelehealthInfoChart from "./TelehealthInfoChart";
import RecurringPatientsChart from "./RecurringPatientsChart";
import TopDoctorsChart from "./TopDoctorsChart";
import styles from "./SuperAdmin.module.scss";
import { useTranslation } from "react-i18next";

const SuperAdminDashboard: React.FC = () => {

  const { t }: { t: (key: string) => string } = useTranslation();

  // Add this sample data
const sampleHospitalData = {
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
  ],
};

// Add this sample data
const sampleReferralData = {
  referralData: [
    { source: t("direct"), revenue: 2500000, patients: 1200, percentage: 35 },
    { source: t("insurance"), revenue: 1800000, patients: 900, percentage: 25 },
    { source: t("partners"), revenue: 1400000, patients: 700, percentage: 20 },
    { source: t("online"), revenue: 1050000, patients: 500, percentage: 15 },
    { source: t("other"), revenue: 350000, patients: 200, percentage: 5 },
  ],
  totalRevenue: 7100000,
};

// Add this sample data
const sampleStaffData = {
  staffData: [
    {
      department: t("doctors"),
      staffCount: 450,
      utilizationRate: 92,
      targetRate: 85,
      efficiency: 108,
    },
    {
      department: t("nurses"),
      staffCount: 780,
      utilizationRate: 88,
      targetRate: 80,
      efficiency: 110,
    },
    {
      department: t("technicians"),
      staffCount: 320,
      utilizationRate: 85,
      targetRate: 80,
      efficiency: 106,
    },
    {
      department: t("administrative"),
      staffCount: 180,
      utilizationRate: 82,
      targetRate: 75,
      efficiency: 109,
    },
    {
      department: t("support"),
      staffCount: 120,
      utilizationRate: 78,
      targetRate: 70,
      efficiency: 111,
    },
  ],
  overallUtilization: 85.0,
  overallEfficiency: 108.8,
};

const sampleMonthlyReferralData = {
  monthlyData: [
    { month: t("jan"), referrals: 120, growth: 0, target: 150 },
    { month: t("feb"), referrals: 145, growth: 20.8, target: 150 },
    { month: t("mar"), referrals: 168, growth: 15.9, target: 150 },
    { month: t("apr"), referrals: 192, growth: 14.3, target: 150 },
    { month: t("may"), referrals: 210, growth: 9.4, target: 150 },
    { month: t("jun"), referrals: 235, growth: 11.9, target: 150 },
  ],
  totalReferrals: 1070,
  averageGrowth: 12.1,
};

const sampleTimeSavedData = {
  monthlyData: [
    { month: t("jan"), timeSaved: 450, appointments: 1200 },
    { month: t("feb"), timeSaved: 520, appointments: 1350 },
    { month: t("mar"), timeSaved: 480, appointments: 1280 },
    { month: t("apr"), timeSaved: 510, appointments: 1320 },
    { month: t("may"), timeSaved: 540, appointments: 1400 },
    { month: t("jun"), timeSaved: 580, appointments: 1500 },
  ],
  totalTimeSaved: 3080,
  averageTimeSaved: 4.2,
  totalAppointments: 8050,
};

const sampleTelehealthData = {
  tenantData: [
    {
      tenant: "CareSphere Da Nang",
      consultations: 1250,
      satisfaction: 94,
      revenue: 187500,
      growth: 12.5,
    },
    {
      tenant: "CareSphere Sai Gon",
      consultations: 980,
      satisfaction: 92,
      revenue: 147000,
      growth: 10.2,
    },
    {
      tenant: "CareSphere Cuu Long",
      consultations: 820,
      satisfaction: 90,
      revenue: 123000,
      growth: 8.7,
    },
    {
      tenant: "CareSphere Phu Tho",
      consultations: 650,
      satisfaction: 88,
      revenue: 97500,
      growth: 7.5,
    },
    {
      tenant: "CareSphere Vinh",
      consultations: 580,
      satisfaction: 86,
      revenue: 87000,
      growth: 6.8,
    },
  ],
  totalConsultations: 4280,
  averageSatisfaction: 90.0,
  totalRevenue: 642000,
};

const sampleRecurringPatientsData = {
  patients: [
    { name: "Nguyen Van A", visits: 15, ratio: 92 },
    { name: "Tran Thi B", visits: 12, ratio: 85 },
    { name: "Le Van C", visits: 10, ratio: 78 },
    { name: "Pham Thi D", visits: 8, ratio: 72 },
    { name: "Hoang Van E", visits: 7, ratio: 65 },
  ],
};

const sampleDoctorsData = {
  doctors: [
    {
      name: "Dr. Nguyen Van An",
      specialty: "Cardiology",
      reviews: 245,
      rating: 4.9,
      patients: 1200,
    },
    {
      name: "Dr. Tran Thi Binh",
      specialty: "Pediatrics",
      reviews: 198,
      rating: 4.8,
      patients: 980,
    },
    {
      name: "Dr. Le Van Cuong",
      specialty: "Orthopedics",
      reviews: 176,
      rating: 4.7,
      patients: 850,
    },
    {
      name: "Dr. Pham Thi Dung",
      specialty: "Dermatology",
      reviews: 165,
      rating: 4.8,
      patients: 720,
    },
    {
      name: "Dr. Hoang Van Em",
      specialty: "Neurology",
      reviews: 142,
      rating: 4.9,
      patients: 680,
    },
  ],
};

  return (
    <Box sx={{ px: 2, py: 2 }}>
      <TopCards />
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        {/* First Row - Main Charts */}
        <Grid item xs={12} md={6}>
          <Box className={styles.chartCard}>
            <RevenueTrendChart />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className={styles.chartCard}>
            <TopHospitalsChart data={sampleHospitalData} />
          </Box>
        </Grid>

        {/* Second Row - Patient & Doctor Info */}
        <Grid item xs={12} md={6}>
          <Box className={styles.chartCard}>
            <RecurringPatientsChart data={sampleRecurringPatientsData} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className={styles.chartCard}>
            <TopDoctorsChart data={sampleDoctorsData} />
          </Box>
        </Grid>

        {/* Third Row - Performance Metrics */}
        <Grid item xs={12} md={4}>
          <Box className={styles.chartCard}>
            <RevenueByReferralChart data={sampleReferralData} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className={styles.chartCard}>
            <StaffUtilizationChart data={sampleStaffData} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className={styles.chartCard}>
            <MonthlyReferralGrowthChart data={sampleMonthlyReferralData} />
          </Box>
        </Grid>

        {/* Fourth Row - Additional Metrics */}
        <Grid item xs={12} md={6}>
          <Box className={styles.chartCard}>
            <AvgTimeSavedChart data={sampleTimeSavedData} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className={styles.chartCard}>
            <TelehealthInfoChart data={sampleTelehealthData} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuperAdminDashboard;
