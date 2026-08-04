import React, { useState } from "react";
import { Grid, Typography, Box, Tabs, Tab, Paper, Skeleton } from "@mui/material";
import SuperAdminDashboard from "../../components/Dashboard/SuperAdmin";
import ExecutivesDashboard from "../../components/Dashboard/Executives";
import DoctorsDashboard from "../../components/Dashboard/Doctors";
import NursesDashboard from "../../components/Dashboard/Nurses";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "store/store";

// Default data for initial state
const defaultHospitalData = {
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
  isLoading: true,
};

// Define the dashboard data interface
interface DashboardData {
  isLoading: boolean;
  hospitalData?: {
    hospitals: Array<{
      name: string;
      revenue: number;
      performance: number;
      patients: number;
    }>;
    isLoading: boolean;
  };
}

const Dashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [dashboardData, setDashboardData] = React.useState<DashboardData>({
    isLoading: true,
    // Other data will use the default values from the dashboard component
  });
  // const { t } = useTranslation();
  const { t }: { t: (key: string) => string } = useTranslation();
  const { userData, loading } = useAppSelector((state) => state.authReducer);

  console.log("userData",userData);  

  React.useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setDashboardData({
        isLoading: false,
        hospitalData: {
          hospitals: [
            {
              name: "CareSphere Da Nang",
              revenue: 2000000,
              performance: 92,
              patients: 12500,
            },
            // ... more hospitals
          ],
          isLoading: false,
        },
        // ... other data
      });
    }, 1500);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  return (
    <Paper
      sx={{
        p: { xs: 1, sm: 2 },
        borderRadius: 2,
        boxShadow:
          '-8px 0 6px -4px rgba(0, 0, 0, 0.1), 8px 0 6px -4px rgba(0, 0, 0, 0.1)',
        overflow: 'auto',
      }}
    >
      <Box>
      {userData?.group == undefined && (
        <Box sx={{ width: '100%' }}>
          <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={400} sx={{ mt: 2 }} />
            </Grid>
          </Grid>
        </Box>
      )}
      {userData?.group == 'admin' && 
        <><Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="dashboard tabs"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {/* <Tab label={t("dashboard.tab1")} /> */}
          <Tab label={t("dashboard.tab2")} />
          <Tab label={t("dashboard.tab3")} />
          <Tab label={t("dashboard.tab4")} />
        </Tabs>
          <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* {tabValue === 0 && <SuperAdminDashboard />} */}
          {tabValue === 0 && <ExecutivesDashboard />}
          {tabValue === 1 && <DoctorsDashboard />}
          {tabValue === 2 && <NursesDashboard />}
        </Grid>
        </>
      }
      {userData?.group == 'doctor' && 
        <DoctorsDashboard />
      }  
      {userData?.group == 'nurse' && 
        <NursesDashboard />
      }               
      </Box>
    </Paper>
  );
};

export default Dashboard;
