import React from "react";
import { Box, Paper, Typography, Skeleton, Grid } from "@mui/material";
import {
  People as PeopleIcon,
  LocalHospital as HospitalIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AttachMoney as RevenueIcon,
  Hotel as BedIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  CalendarToday as AppointmentIcon,
  CheckCircle as ApprovalIcon,
} from "@mui/icons-material";
import styles from "./TopCards.module.scss";
import { useTranslation } from "react-i18next";

interface TopCardsProps {
  isLoading?: boolean;
}

const TopCards: React.FC<TopCardsProps> = ({ isLoading = false }) => {
  const { t }: { t: (key: string) => string } = useTranslation();
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {[
          {
            icon: <RevenueIcon />,
            value: "$1.2B",
            label: t("dashboard.total_revenue"),
            isLoading,
          },
          {
            icon: <HospitalIcon />,
            value: "150",
            label: t("dashboard.total_hospitals"),
            isLoading,
          },
          // {
          //   icon: <BedIcon />,
          //   value: "2,900",
          //   label: t("dashboard.operating_beds"),
          //   isLoading: false,
          // },
          {
            icon: <GroupIcon />,
            value: "5,500",
            label: t("dashboard.hospital_staff"),
            isLoading,
          },
          {
            icon: <PersonIcon />,
            value: "5M+",
            label: t("dashboard.annu_patients_visits"),
            isLoading,
          },
          // {
          //   icon: <AppointmentIcon />,
          //   value: "5,000",
          //   label: t("dashboard.total_appointments"),
          //   isLoading,
          // },
          {
            icon: <ApprovalIcon />,
            value: "95%",
            label: t("dashboard.insurance_approval_rate"),
            isLoading: false,
          },
        ].map((card, index) => (
          <Paper
            key={index}
            className={styles.card}
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              gap: 2,
              padding: 2,
              borderRadius: "15px",
              backgroundColor: "#ffffff",
              borderLeft: "4px solid #009bab",
              height: "100%",
              width: "100%",
              maxWidth: "19em"
            }}
          >
            <Box className={styles.icon} sx={{ color: "#009bab" }}>
              {card.icon}
            </Box>
            <Box>
              {card.isLoading ? (
                <Skeleton variant="text" width={100} height={40} />
              ) : (
                <Typography className={styles.value} sx={{ color: "#009bab" }}>
                  {card.value}
                </Typography>
              )}
              <Typography
                className={styles.label}
                sx={{ color: "rgba(0, 0, 0, 0.7)" }}
              >
                {card.label}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default TopCards;
