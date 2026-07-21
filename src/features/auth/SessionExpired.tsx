import * as React from "react";
import {
  Button,
  CssBaseline,
  Paper,
  Box,
  Grid,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SessionExpired() {
  const navigate = useNavigate();
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[300]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "650px",
        }}
      >
        <Grid
          item
          xs={12}
          component={Paper}
          elevation={6}
          square
          sx={{
            width: "fit-content",
            margin: "auto",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 4,
              maxWidth: "500px",
            }}
          >
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <img
                src="/assets/images/CareSphere-logo.svg"
                width={100}
                height={40}
                style={{
                  objectFit: "contain",
                  width: "200px",
                  marginBottom: 20,
                }}
              />
              <Alert severity="error">
                <AlertTitle>Your Session has Expired</AlertTitle>
                Please Login again
              </Alert>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2, float: "left" }}
                onClick={() => navigate("/")}
                style={{ background: "var(--cta-button-bg)" }}
              >
                Go to Login
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
