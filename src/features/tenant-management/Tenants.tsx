import { Box, Grid } from "@mui/material";
import { DataTable } from "molecules";

const Tenants = () => {
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Grid container paddingX={1} spacing={4} paddingY={1}>
        <Grid item xs={12}>
          <DataTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tenants;
