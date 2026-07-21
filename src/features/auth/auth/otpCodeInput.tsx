import { useState } from "react";
import { Grid, IconButton, TextField } from "@mui/material";
import OtpInput from "react-otp-input";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function OtpCodeInput(props: any) {
  const { otpcode,setOTPCode } = props;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={10}>
        <OtpInput
          value={otpcode}
          onChange={setOTPCode}
          numInputs={6}
          inputType={!showPassword ? "password" : "text"}          
          renderSeparator={<span style={{ width: "8px" }}></span>}
          renderInput={(props) => (
            <TextField 
              inputProps={{
                ...props,              
                onKeyPress: (event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault(); // Prevents non-numeric input
                  }
                },                            
              }}
              inputMode="numeric"                      
              variant="standard" 
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        >
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </Grid>
    </Grid>
  );
}
