import React from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Rating } from "@mui/material";
import styles from "./TopDoctorsChart.module.scss";
import { useTranslation } from "react-i18next";

interface DoctorData {
  doctors: Array<{
    name: string;
    specialty: string;
    reviews: number;
    rating: number;
    patients: number;
  }>;
}

interface TopDoctorsChartProps {
  data: DoctorData;
}

const TopDoctorsChart: React.FC<TopDoctorsChartProps> = ({ data }) => {
  const { t }: { t: (key: string) => string } = useTranslation();
  return (
    <Paper className={styles.chartContainer}>
      <Box className={styles.header}>
        <Typography variant="h6" className={styles.title}>
          {t("dashboard.top_doctors_by_reviews")}
        </Typography>
      </Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{t("doctor_name")}</TableCell>
              <TableCell>{t("specialty")}</TableCell>
              <TableCell align="right">{t("reviews")}</TableCell>
              <TableCell align="right">{t("rating")}</TableCell>
              <TableCell align="right">{t("patients")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.doctors.map((doctor, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {doctor.name}
                </TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell align="right">{doctor.reviews}</TableCell>
                <TableCell align="right">
                  <Rating value={doctor.rating} readOnly size="small" />
                </TableCell>
                <TableCell align="right">{doctor.patients}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TopDoctorsChart; 