import * as React from "react";
import { Button, TextField, Link, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { AuthLayout } from "components";
import { Copyright } from "molecules";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {};
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value.trimStart(),
    });
  };

  return (
    <AuthLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          mx: "auto",
          maxWidth: "400px",
        }}
      >
        <img
          src="/assets/images/CareSphere-logo.svg"
          width={100}
          height={40}
          style={{ objectFit: "contain", width: "200px" }}
        />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            align="left"
            sx={{ my: 2 }}
          >
            Please provide your email address and we'll send you instructions on
            how to signup in the system.
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              navigate("/tenantList");
            }}
            style={{ backgroundColor: "var(--cta-button-bg)", minWidth: 150 }}
          >
            Sign Up
          </Button>

          <Link
            onClick={() => navigate("/")}
            variant="body2"
            sx={{ mt: 2, float: "right" }}
          >
            Already have an account? Sign in
          </Link>
        </Box>
        <Typography
          variant="caption"
          color="text.secondary"
          align="left"
          sx={{ my: 2 }}
        >
          By signing up, I agree to the <b>Privacy Policy</b> and{" "}
          <b>Terms of Service</b>.
        </Typography>
        <Copyright sx={{ mt: 2 }} />
      </Box>
    </AuthLayout>
  );
};

export default SignUp;
