import { Box, Grid } from "@mui/material";
import { TenantUsersTable } from "molecules";

const TenantUsers = () => {
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Grid container paddingX={1} spacing={4} paddingY={1}>
        <Grid item xs={12}>
          <TenantUsersTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenantUsers;
