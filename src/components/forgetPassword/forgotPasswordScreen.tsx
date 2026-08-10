import React from 'react'
import { Box, TextField, Typography } from '@mui/material';
import Link from "@mui/material/Link";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { HtmlTooltip } from '../../constants';


interface Props {
    handleSubmit: (e: any) => void;
    step: any;
    userData: any;
    showPassword: any;
    loading: boolean;
    handleChange: (e: any) => void;
    handleCodeChange: (e: any) => void;
    handleClickShowPassword: () => void;
    handleMouseDownPassword: () => void;
    navigate: any
}
export default function ForgotPasswordScreen({
    handleSubmit,
    step,
    userData,
    handleChange,
    handleCodeChange,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    loading,
    navigate,
}: Props) {
    return (
        <Box
            sx={{
                mt: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // maxWidth: "500px",
            }}
        >
            <Box sx={{ display: "flex", gap: "7px" }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mt: 4, fontWeight: "bold", fontSize: "25px" }}
                >
                    Forgot
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mt: 4, fontSize: "25px" }}
                >
                    your password?
                </Typography>
            </Box>

            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ p: 3 }}
            >
                {step === 1 && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="left"
                        sx={{ my: 2 }}
                    >
                        Enter your email and we'll send you a verification code to reset
                        your password.
                    </Typography>
                )}

                {step === 2 && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="left"
                        sx={{
                            my: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            justifyContent: "center",
                        }}
                    >
                        <CheckCircleRoundedIcon color="success" /> Verification code
                        sent successfully to your email.
                    </Typography>
                )}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    disabled={step === 2}
                    value={userData.email}
                    onChange={handleChange}
                />

                {step === 2 && (
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="code"
                        label="Verification Code"
                        name="code"
                        autoComplete="code"
                        autoFocus
                        value={userData.code}
                        onChange={handleCodeChange}
                        inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            maxLength: 6,
                        }}
                    />
                )}
                {step === 2 && (
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="New Password"
                        name="password"
                        autoComplete="new-password"
                        type={showPassword ? "text" : "password"}
                        // autoFocus
                        value={userData.password}
                        onChange={handleChange}
                        InputProps={{
                            // <-- This is where the toggle button is added.
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? (
                                            <HtmlTooltip
                                                title={"Hide password"}
                                                arrow
                                                placement="bottom"
                                            >
                                                <VisibilityOffIcon />
                                            </HtmlTooltip>
                                        ) : (
                                            <HtmlTooltip
                                                title={"Show password"}
                                                arrow
                                                placement="bottom"
                                            >
                                                <VisibilityIcon />
                                            </HtmlTooltip>
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            inputProps: {
                                autoComplete: "new-password", // Change to 'new-password' to avoid auto-complete issues
                            },
                        }}
                    />
                )}
                {/* <LoginType  page={'forgot'} /> */}
                <Box
                    style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        marginTop: "16px",
                        // flexDirection: "column",
                    }}
                >
                    <LoadingButton
                        className="ga-login"
                        loading={loading}
                        variant="contained"
                        type="submit"
                        loadingPosition="center"
                        fullWidth
                    >
                        {step === 2 ? `UPDATE PASSWORD` : `SUBMIT`}
                    </LoadingButton>
                </Box>
                <Box
                    style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        marginTop: "8px",
                        flexDirection: "column",
                    }}
                >
                    <Link onClick={() => navigate("/login")} variant="body2">
                        Back to sign in
                    </Link>
                </Box>
            </Box>
            {/* <Box sx={{ position: "fixed", bottom: "0px" }}>
                <Copyright sx={{ my: 2 }} />
            </Box> */}
        </Box>
    )
}
