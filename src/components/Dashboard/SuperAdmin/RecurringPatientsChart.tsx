import React from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styles from "./RecurringPatientsChart.module.scss";
import { useTranslation } from "react-i18next";

interface RecurringPatientsData {
  patients: Array<{
    name: string;
    visits: number;
    ratio: number;
  }>;
}

interface RecurringPatientsChartProps {
  data: RecurringPatientsData;
}

const RecurringPatientsChart: React.FC<RecurringPatientsChartProps> = ({ data }) => {
  const { t }: { t: (key: string) => string } = useTranslation();
  return (
    <Paper className={styles.chartContainer}>
      <Box className={styles.header}>
        <Typography variant="h6" className={styles.title}>
        {t("dashboard.top_5_recurring_patients")}
        </Typography>
      </Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{t("patient_name")}</TableCell>
              <TableCell align="right">{t("visits")}</TableCell>
              <TableCell align="right">{t("recurring_ratio")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.patients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {patient.name}
                </TableCell>
                <TableCell align="right">{patient.visits}</TableCell>
                <TableCell align="right">{patient.ratio}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RecurringPatientsChart; 