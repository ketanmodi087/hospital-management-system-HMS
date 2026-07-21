import { useCallback, useEffect, useState } from "react";
import {
  CssBaseline,
  TextField,
  Link,
  Box,
  Grid,
  Typography,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useAppDispatch } from "../../store/store";
import { putNotification } from "../../store/thunk/notificationThunk";
// import SnackBar from "../layout/snackBar";
import Amplify from "aws-amplify";
import { apiSetting } from "aws-export";
import {
  checkAuth,
  addLogToAws,
  setLoginwithtype,
} from "../../store/thunk/commonThunk";
import Copyright from "./copyright";
import { HtmlTooltip } from "../../constants";
import SingleSignOn from "./SingleSignOn";
// import { verifyUserForSingleSignInThunk } from "../../store/thunk/tenantUserThunk";
// import { notificationFail } from "../../store/slices/notificationSlice";
import OtpCodeInput from "./otpCodeInput";
import { sendMagicLink } from "store/thunk/sendMagicLink";

export default function SignInSide() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginwith, setLoginwith] = useState(process.env.REACT_APP_ENVIRONMENT);
  const [step, setStep] = useState<string | number>(1);
  const [loading, setLoading] = useState(false);
  const [resentLoader, setResentLoader] = useState(false);
  const [singleSignInLoading, setSingleSignInLoading] = useState(false);
  const [firstUser, setFirstUser] = useState<any>(null);
  const [destinationNumbr, setDestinationNumbr] = useState<any>(null);
  const [otpcode, setOTPCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState<boolean>(
    !!sessionStorage.getItem("rememberMe")
  );
  const [userData, setuserData] = useState({
    email: sessionStorage.getItem("rememberMe") || "",
    newPassword: "",
    password: "",
  });
  const [otpTimer, setOTPTimer] = useState(0);

  const timeOutCallback = useCallback(
    () => setOTPTimer((currTimer) => currTimer - 1),
    []
  );

  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(timeOutCallback, 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer, timeOutCallback]);

  const resetTimer = () => {
    if (!otpTimer) {
      setOTPTimer(60);
    }
  };

  useEffect(() => {
    Amplify.configure(apiSetting);

    dispatch(setLoginwithtype(loginwith));
    localStorage.removeItem("provider");
  }, [dispatch, loginwith]);

  const loginwithtype = localStorage.getItem("loginwith") || "";

  const handleChange = (event: any) => {
    setuserData({
      ...userData,
      [event.target.name]: event.target.value.trimLeft(),
    });
  };

  const rememberEmailAddress = () => {
    if (rememberMe) {
      sessionStorage.setItem("rememberMe", userData?.email);
    } else {
      sessionStorage.removeItem("rememberMe");
      setuserData({ email: "", newPassword: "", password: "" });
    }
  };

  // const singleSignIn = async () => {
  //   const isValid = validateUserCredential(false);
  //   if (!isValid) return;
  //   setSingleSignInLoading(true);
  //   dispatch(
  //     verifyUserForSingleSignInThunk({ email: userData?.email, env: loginwith })
  //   )
  //     .then((response:any) => {
  //       const { payload } = response;
  //       if (payload?.result?.status) {
  //         setStep("sso");
  //         rememberEmailAddress();
  //       } else {
  //         dispatch(notificationFail(payload?.result?.message));
  //       }
  //     })
  //     .finally(() => {
  //       setSingleSignInLoading(false);
  //     });
  // };

  const validateUserCredential = (checkPassword = true) => {
    if (userData.email === "") {
      dispatch(
        putNotification({ status: false, msg: "Please Enter User Email" })
      );
      return false;
    } else if (userData.password === "" && checkPassword) {
      dispatch(
        putNotification({ status: false, msg: "Please Enter Password" })
      );
      return false;
    }
    return true;
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { email, password, newPassword } = userData;
    const error = validateUserCredential();
    if (error) {
      setLoading(true);
      if (step === 1) {
        Auth.signIn(email, password)
          .then((user) => {
            setLoading(false);
            checkLoginCriteria(user);
          })
          .catch((err) => {
            setLoading(false);
            sendErroMessage(err);
            // dispatch(setInitialLogin(false));
          });
      }
      if (step === 2) {
        Auth.completeNewPassword(firstUser, newPassword)
          .then((user) => {
            setLoading(false);
            checkLoginCriteria(user);
          })
          .catch((err) => {
            setLoading(false);
            sendErroMessage(err);
            // dispatch(setInitialLogin(false));
          });
      }
      if (step === 3) {
        Auth.confirmSignIn(firstUser, otpcode, "SMS_MFA")
          .then((user) => {
            setLoading(false);
            checkLoginCriteria(user);
          })
          .catch((error) => {
            setLoading(false);
            sendErroMessage(error);
            // dispatch(setInitialLogin(false));
          });
      }
    }
  };

  const resendConfirmationCode = async (event: any) => {
    event.preventDefault();
    setResentLoader(true);
    const { email, password } = userData;
    if (firstUser !== null) {
      Auth.signIn(email, password)
        .then((user) => {
          setResentLoader(false);
          setFirstUser(user);
          resetTimer();
          dispatch(
            putNotification({
              status: true,
              msg:
                "Code sent on " + user.challengeParam.CODE_DELIVERY_DESTINATION,
            })
          );
        })
        .catch((err) => {
          console.error("Error resending code:", err);
        });
    }
  };

  const checkLoginCriteria = (user: any) => {
    if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
      setFirstUser(user);
      setStep(2);
    } else if (user.challengeName === "SMS_MFA" && step !== 3) {
      resetTimer();
      setFirstUser(user);
      setDestinationNumbr(user.challengeParam.CODE_DELIVERY_DESTINATION);
      setStep(3);
    } else {
      const logData = {
        userData: JSON.stringify([
          { userName: user.username, attributes: user.attributes },
        ]),
        apiName: "AuthsignIn",
        request: user.email,
        response: JSON.stringify([
          { userName: user.username, attributes: user.attributes },
        ]),
        type: "frontend",
      };
      rememberEmailAddress();
      dispatch(addLogToAws(logData));
      dispatch(checkAuth({}));
      // dispatch(setInitialLogin(true));
    }
  };

  const sendErroMessage = (error: any) => {
    const logData = {
      userData: "",
      apiName: "AuthsignIn",
      request: userData.email,
      response: JSON.stringify(error),
      type: "frontend",
    };
    dispatch(addLogToAws(logData));
    switch (error.code) {
      case "InvalidParameterException":
        dispatch(
          putNotification({
            status: false,
            msg: "Please Enter Valid User Email",
          })
        );
        break;
      case "UserNotFoundException":
        dispatch(
          putNotification({ status: false, msg: "User Does not Exist" })
        );
        break;
      case "NotAuthorizedException":
        if (
          error.message.includes(
            "Temporary password has expired and must be reset"
          )
        ) {
          dispatch(
            putNotification({
              status: false,
              msg: "Temporary password has expired and must be reset by Forgot Password",
            })
          );
        } else {
          dispatch(putNotification({ status: false, msg: error.message }));
        }
        break;
      case "LimitExceededException":
        dispatch(putNotification({ status: false, msg: error.message }));
        break;
      case "InvalidPasswordException":
        dispatch(
          putNotification({
            status: false,
            msg: "Passwords must have at least 14 characters including 1 lowercase, 1 uppercase, 1 number, and 1 special character.",
          })
        );
        break;
      case "CodeMismatchException":
        dispatch(putNotification({ status: false, msg: "Invalid code" }));
        break;
      default:
        dispatch(
          putNotification({
            status: false,
            msg: error.message ? error.message : "Something went wrong!",
          })
        );
        break;
    }
  };

  const signInWithFederatedProvider = async (provider: any) => {
    try {
      localStorage.setItem("provider", provider);
      const userData = await Auth.federatedSignIn({ provider });
      console.log("Federated sign-in user data:", userData);
    } catch (error) {
      sendErroMessage(error);
      console.error("Federated sign-in error", error);
    }
  };

  const generateMagicLink = () => {
    console.log("Generating magic link for email:", userData.email);
    dispatch(sendMagicLink({ email: userData.email }));
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* <SnackBar /> */}
      <CssBaseline />
      {/* Left side image */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 150, 127, 0.5), rgba(150, 175, 205, 0.5)), url(assets/images/bg-login.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: "500px",
            textAlign: "center",
          }}
        >
          <img
            src="/assets/images/CareSphere-logo.svg"
            alt="Logo"
            style={{ width: "100%", maxWidth: "350px" }}
          />
        </Box>
      </Grid>
      {/* Right side form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          background: " #FFFFFF",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: "500px",
            p: 4,
            borderRadius: 2,
            boxShadow: "none",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Sign In
            </Typography>
          </Box>
          {step === "sso" ? (
            <SingleSignOn
              signInWithFederatedProvider={signInWithFederatedProvider}
              setStep={setStep}
            />
          ) : (
            <Box component="form" noValidate onSubmit={handleSubmit}>
              {step === 4 && (
                <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                  <CircularProgress />
                </Box>
              )}
              {(step === 1 || step === 2) && (
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
              )}
              {step === 1 && (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    value={userData.password}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <HtmlTooltip
                                title="Hide password"
                                arrow
                                placement="bottom"
                              >
                                <VisibilityOffIcon />
                              </HtmlTooltip>
                            ) : (
                              <HtmlTooltip
                                title="Show password"
                                arrow
                                placement="bottom"
                              >
                                <VisibilityIcon />
                              </HtmlTooltip>
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={rememberMe}
                            onChange={() => setRememberMe((prev) => !prev)}
                          />
                        }
                        label="Remember me"
                      />
                    </FormGroup>
                  </Box>
                </>
              )}
              {step === 2 && (
                <>
                  <Typography variant="body2" sx={{ my: 2 }}>
                    It looks like you are logging in for the first time. Please
                    enter a new password to continue.
                  </Typography>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type="password"
                    id="newPassword"
                    autoComplete="new-password"
                    value={userData.newPassword}
                    onChange={handleChange}
                  />
                </>
              )}
              {step === 3 && (
                <>
                  <Typography variant="body2" sx={{ my: 2 }}>
                    Please enter the code sent to {destinationNumbr}
                  </Typography>
                  <OtpCodeInput otpcode={otpcode} setOTPCode={setOTPCode} />
                </>
              )}
              <Grid
                container
                sx={{
                  mt: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                {step !== 4 && (
                  <LoadingButton
                    // sx={{ minWidth: 200 }}
                    loading={loading}
                    variant="contained"
                    type="submit"
                    loadingPosition="center"
                  >
                    SIGN IN
                  </LoadingButton>
                )}

                {step === 3 && (
                  <LoadingButton
                    // sx={{ minWidth: 200 }}
                    disabled={otpTimer > 0}
                    loading={resentLoader}
                    variant="contained"
                    type="button"
                    onClick={resendConfirmationCode}
                    loadingPosition="center"
                  >
                    {otpTimer > 0 ? `Resend again ${otpTimer}s` : "Resend Code"}
                  </LoadingButton>
                )}

                {/* <LoadingButton
                  // sx={{ minWidth: 200 }}
                  loading={singleSignInLoading}
                  variant="contained"
                  type="button"
                  onClick={generateMagicLink}
                  loadingPosition="center"
                >
                  Generate Magic Link
                </LoadingButton> */}

                {/* {step === 1 && (
                  <LoadingButton
                    // sx={{ minWidth: 200 }}
                    loading={singleSignInLoading}
                    variant="contained"
                    type="button"
                    onClick={singleSignIn}
                    loadingPosition="center"
                  >
                    Use Single Sign On
                  </LoadingButton>
                )} */}
              </Grid>
              {step !== 3 && step !== 4 && (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();        // stop any native <a> or form behavior
                      navigate("/forgotPassword");
                    }}
                    variant="body2"
                    sx={{ cursor: "pointer" }}
                  >
                    Forgot password?
                  </Link>
                </Box>
              )}
            </Box>
          )}
          <Divider sx={{ my: 3 }} />
          <Box sx={{ textAlign: "center" }}>
            <Copyright />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
