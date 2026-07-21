import React, { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Tab,
} from "@mui/material";
import { Auth } from "aws-amplify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

import AWS from "aws-sdk";
import { Amplify } from "aws-amplify";
import { apiSetting } from "aws-export";

import { useDispatch } from "react-redux";
import { AppDispatch } from "store/store";
import {
  checkAuth,
  addLogToAws,
  setLoginwithtype,
} from "store/thunk/commonThunk";
import { putNotification } from "store/thunk/notificationThunk";

import { setInitialLogin } from "store/slice/authSlice";
import { Copyright } from "molecules";
import theme from "theme";
import { HtmlTooltip } from "../../constants";
import { AuthLayout, Input } from "components";
import { updateUserHistoryData } from "store/thunk/tenantReport";
import { Lock, Logo, Mail } from "Icons";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { notificationSuccess } from "store/slice/notificationSlice";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [tab, setTab] = React.useState("1");
  const [loginwith, setLoginwith] = useState("dev");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [firstUser, setFirstUser] = useState(null);
  const [destinationNumbr, setDestinationNumbr] = useState(null);
  const [otpcode, setOTPCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setuserData] = useState({
    email: "",
    newPassword: "",
    password: " ",
  });
  const [wrongOtpCount, setWrongOtpCount] = useState<any>(0);

  useEffect(() => {
    Amplify.configure(apiSetting);
    dispatch(setLoginwithtype(loginwith));
    localStorage.removeItem("provider");
    setTimeout(() => {
      setuserData({
        email: "",
        newPassword: "",
        password: "",
      });
    }, 50);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setuserData({
      ...userData,
      [name]: value.trimStart(),
    });
  };

  const validateUsercreditial = () => {
    if (userData.email == "") {
      dispatch(
        putNotification({ status: false, msg: "Please Enter User Email" })
      );
      return false;
    } else if (userData.password == "") {
      dispatch(
        putNotification({ status: false, msg: "Please Enter Password" })
      );
      return false;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      dispatch(
        putNotification({ status: false, msg: "Please Enter Valid Email" })
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { email, password, newPassword } = userData;
    const error = validateUsercreditial();

    if (error) {
      setLoading(true);
      alert(email+password)
      Auth.signIn(email, password)
      .then((user: any) => {
        setLoading(false);
        checkLoginCriteria(user);
      })
      .catch((err: any) => {
        setLoading(false);
        sendErroMessage(err);
        dispatch(setInitialLogin(false));
      });
      return;
      if (step === 1) {
       
      }
    }
    if (step === 2) {
      Auth.completeNewPassword(firstUser, newPassword)
        .then((user: any) => {
          setLoading(false);
          checkLoginCriteria(user);
        })
        .catch((err: any) => {
          setLoading(false);
          sendErroMessage(err);
          dispatch(setInitialLogin(false));
        });
    }

    // if (step === 3) {
    //   Auth.confirmSignIn(firstUser, otpcode, "SMS_MFA")
    //     .then((user: any) => {
    //       setLoading(false);
    //       // setStep(4);
    //       checkLoginCriteria(user);
    //     })
    //     .catch((error: any) => {
    //       setLoading(false);
    //       sendErroMessage(error);
    //       dispatch(setInitialLogin(false));
    //     });
    // }
    if (step === 3) {
      try {
        if (otpcode?.trim()?.length) {
          const challengeResult = await Auth.sendCustomChallengeAnswer(
            firstUser,
            otpcode
          );
          if (challengeResult.challengeName) {
            if (wrongOtpCount < 3) {
              setLoading(false);
              setWrongOtpCount(wrongOtpCount + 1);
              if (wrongOtpCount === 2) {
                setLoading(false);
                setWrongOtpCount(0);
                setOTPCode("");
                setStep(1);
                dispatch(
                  putNotification({
                    status: false,
                    msg: "The OTP has expired. Please request a new one",
                  })
                );
                dispatch(setInitialLogin(false));
              } else {
                setLoading(false);
                dispatch(
                  putNotification({
                    status: false,
                    msg: "OTP you entered is incorrect",
                  })
                );
              }
            } else {
              setOTPCode("");
              setLoading(false);
              setWrongOtpCount(0);
              setStep(1);
              dispatch(
                putNotification({
                  status: false,
                  msg: "The OTP has expired. Please request a new one",
                })
              );
              dispatch(setInitialLogin(false));
            }
          } else {
            setLoading(false);
            checkLoginCriteria(challengeResult);
          }
        } else {
          setLoading(false);
          dispatch(
            putNotification({
              status: false,
              msg: "Please enter the OTP sent to your registered email",
            })
          );
        }
      } catch (error) {
        setWrongOtpCount(0);
        setStep(1);
        setOTPCode("");
        setLoading(false);
        dispatch(
          putNotification({
            status: false,
            msg: "The OTP has expired. Please request a new one",
          })
        );
        dispatch(setInitialLogin(false));
      }
    }
  };

  const matchUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const matchUpXl = useMediaQuery(theme.breakpoints.up("xl"));
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const checkLoginCriteria = (user: any, email?: any) => {
    if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
      setFirstUser(user);
      setStep(2);
    } else if (user.challengeName === "CUSTOM_CHALLENGE" && step !== 3) {
      setFirstUser(user);
      setDestinationNumbr(user.challengeParam.CODE_DELIVERY_DESTINATION);
      setStep(3);
    }
    // else if (user.challengeName === "SMS_MFA" && step !== 3) {
    //   setFirstUser(user);
    //   setDestinationNumbr(user.challengeParam.CODE_DELIVERY_DESTINATION);
    //   setStep(3);
    // }
    else {
      let logData = {
        userData: JSON.stringify([
          { userName: user.username, attributes: user.attributes },
        ]),
        apiName: "AuthsignIn",
        request: email,
        response: JSON.stringify([
          { userName: user.username, attributes: user.attributes },
        ]),
        type: "frontend",
      };
      dispatch(addLogToAws(logData));
      dispatch(checkAuth({}));
      dispatch(setInitialLogin(true));
      dispatch(notificationSuccess("Login Successfully!"));
    }
  };

  const sendErroMessage = (error: any, email?: any) => {
    let logData = {
      userData: "",
      apiName: "AuthsignIn",
      request: email,
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
          putNotification({ status: false, msg: "User Does not Exists" })
        );
        break;
      case "UserAlreadyAuthenticatedException":
        dispatch(
          putNotification({ status: false, msg: "User Already Authenticated." })
        );
        break;
      case "NotAuthorizedException":
        dispatch(putNotification({ status: false, msg: error.message }));
        break;
      case "LimitExceededException":
        dispatch(putNotification({ status: false, msg: error.message }));
        break;
      case "InvalidPasswordException":
        dispatch(
          putNotification({
            status: false,
            msg: "Passwords must has at least 14 character that include at least 1 lowercase, 1 uppercase,1 number and 1 special character.",
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
          maxWidth: {
            xs: "500px",
            xl: "600px",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }} mb={2}>
          <Logo width={matchUpXl ? 33 : 23} />
          <Typography
            sx={{
              fontSize: {
                xs: 18,
                xl: 26,
              },
              fontWeight: 600,
              color: "#0D062DB2",
            }}
          >
            CII Systems
          </Typography>
        </Box>
        <Box
          sx={{ width: "100%" }}
          mb={{
            md: 2,
            xl: 5,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
              fontWeight: "bold",
              fontSize: {
                md: "17px",
                xl: "25px",
              },
              color: "#232323",
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
              mt: 1,
              fontSize: {
                xs: 12,
                xl: 21,
              },
              lineHeight: {
                xl: "25px",
              },
              letterSpacing: "-0.5px",
            }}
          >
            We suggest using the email address that you use at work.
          </Typography>
        </Box>

        <Box sx={{ width: "80%", marginInline: "auto" }}>
          <TabContext value={tab}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
              sx={{
                background: "#dedede",
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
                paddingInline: "5px",
                width: "100%",
                "& .MuiTabs-indicator": {
                  backgroundColor: "#fff",
                  height: "calc(100% - 10px)",
                  bottom: 5,
                  borderRadius: "10px",
                  zIndex: 0,
                },
                "& .MuiTab-root": {
                  color: "#090E29",
                  fontWeight: 500,
                  minWidth: "200px",
                  width: "50%",
                  paddingBlock: 2,
                  textTransform: "capitalize",
                  position: "relative",
                  zIndex: 1,
                  fontSize: {
                    xs: "15px",
                    xl: "20px",
                  },
                  "&.Mui-selected": {
                    color: "inherit",
                  },
                },
              }}
            >
              <Tab label="Sign In" value="1" sx={{}} />
              <Tab label="Sign in with SSO" value="2" />
            </TabList>
            <TabPanel
              value="1"
              sx={{ padding: 0, minHeight: "330px", width: "100%" }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ pt: 2, width: "100%" }}
              >
                {step === 4 && <CircularProgress />}
                {(step === 2 || step === 1) && (
                  <Box mb={2}>
                    <Input
                      label="Enter Email Address"
                      required
                      fullWidth
                      id="email"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      disabled={step === 2}
                      value={userData.email}
                      onChange={handleChange}
                      icon={Mail}
                    />
                  </Box>
                )}

                {step === 1 && (
                  <Input
                    required
                    fullWidth
                    name="password"
                    label="Enter Your Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    value={userData.password}
                    onChange={handleChange}
                    icon={Lock}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <HtmlTooltip
                                title={"Hide password"}
                                arrow
                                placement="bottom"
                              >
                                <VisibilityOff />
                              </HtmlTooltip>
                            ) : (
                              <HtmlTooltip
                                title={"Show password"}
                                arrow
                                placement="bottom"
                              >
                                <Visibility />
                              </HtmlTooltip>
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}

                {step === 2 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="left"
                    sx={{
                      my: 2,
                      fontSize: {
                        xs: 12,
                        xl: 21,
                      },
                    }}
                  >
                    It looks like you are trying login first time, Please enter
                    new password to login.
                  </Typography>
                )}
                {step === 2 && (
                  <Input
                    margin="normal"
                    required
                    fullWidth
                    name="newPassword"
                    label="Enter New Password"
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    autoComplete="current-password"
                    value={userData.newPassword}
                    onChange={handleChange}
                    icon={Lock}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <HtmlTooltip
                                title={"Hide password"}
                                arrow
                                placement="bottom"
                              >
                                <VisibilityOff />
                              </HtmlTooltip>
                            ) : (
                              <HtmlTooltip
                                title={"Show password"}
                                arrow
                                placement="bottom"
                              >
                                <Visibility />
                              </HtmlTooltip>
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                {step === 3 && (
                  <>
                    <p>
                      Please enter the OTP sent to your registered email
                      {destinationNumbr}{" "}
                    </p>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="otpcode"
                      label="OTP"
                      name="otpcode"
                      autoComplete="otpcode"
                      autoFocus
                      value={otpcode}
                      onChange={(e) => setOTPCode(e.target.value)}
                    />
                  </>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "16px",
                  }}
                >
                  {step !== 4 && (
                    <LoadingButton
                      className="ga-login"
                      loading={loading}
                      variant="contained"
                      type="submit"
                      // onClick={(e) => handleSubmit(e)}
                      loadingPosition="center"
                      loadingIndicator={
                        <CircularProgress
                          sx={{ color: "white", width: "10px" }}
                          size={20}
                        />
                      }
                      fullWidth
                      sx={{
                        background:
                          "linear-gradient(90deg, #3A89FF 0%, #28BFFF 100%)",
                        minWidth: 150,
                        boxShadow: "none",
                        textTransform: "capitalize",
                        height: "50px",
                        fontSize: {
                          xs: 18,
                          xl: 21,
                        },
                        lineHeight: {
                          xl: "25px",
                        },
                        letterSpacing: "-0.5px",
                        borderRadius: "10px",
                        color: "white",
                      }}
                    >
                      Continue
                    </LoadingButton>
                  )}
                </div>
                <Divider variant="fullWidth" sx={{ mt: 3, color: "grey" }}>
                  having trouble Login in ?
                </Divider>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    marginTop: "15px",
                    width: "100%",
                    gap: "20px",
                  }}
                >
                  {step !== 4 && (
                    <Box sx={{ flex: 1 }}>
                      <div
                        style={{
                          width: "100%",
                          cursor: "pointer",
                          height: 50,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "transparent",
                          borderRadius: "10px",
                          border: "1px solid #D9D9D9",
                        }}
                        onClick={() => navigate("/forgotPassword")}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: {
                              xs: 18,
                              xl: 21,
                            },
                            lineHeight: {
                              xl: "25px",
                            },
                            letterSpacing: "-0.5px",
                            color: "#090E29",
                            opacity: ".5",
                          }}
                        >
                          Forgot Password
                        </Typography>
                      </div>
                    </Box>
                  )}
                </div>
              </Box>
            </TabPanel>
            <TabPanel
              value="2"
              sx={{ padding: 0, minHeight: "330px", width: "100%" }}
            >
              {step !== 4 && (
                <Box sx={{ flex: 1, mt: 2 }}>
                  <div
                    style={{
                      width: "100%",
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      background: "var(--cta-button-bg)",
                      color: "white",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src="/assets/images/sso.svg"
                      width={30}
                      height={30}
                      alt="sso"
                    />
                    <Typography variant="h6">Enterprise SSO</Typography>
                  </div>
                </Box>
              )}
              {/* <Box component="form" noValidate sx={{ pt: 2, width: "100%" }}>
                {step === 4 && <CircularProgress />}
                {(step === 2 || step === 1) && (
                  <Box mb={2}>
                    <Input
                      label="Enter enterprise email address"
                      required
                      fullWidth
                      id="email"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      disabled={step === 2}
                      value={userData.email}
                      onChange={handleChange}
                      icon={Mail}
                    />
                  </Box>
                )}

                {step === 1 && (
                  <Input
                    required
                    fullWidth
                    name="password"
                    label="Enter Your Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    value={userData.password}
                    onChange={handleChange}
                    icon={Lock}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <HtmlTooltip
                                title={"Hide password"}
                                arrow
                                placement="bottom"
                              >
                                <VisibilityOff />
                              </HtmlTooltip>
                            ) : (
                              <HtmlTooltip
                                title={"Show password"}
                                arrow
                                placement="bottom"
                              >
                                <Visibility />
                              </HtmlTooltip>
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}

                {step === 2 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="left"
                    sx={{ my: 2 }}
                  >
                    It looks like you are trying login first time, Please enter
                    new password to login.
                  </Typography>
                )}
                {step === 2 && (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="newPassword"
                    label="Enter New Password"
                    type="newPassword"
                    id="newPassword"
                    autoComplete="current-password"
                    value={userData.newPassword}
                    onChange={handleChange}
                  />
                )}
                {step === 3 && (
                  <>
                    <p>Please enter the code send to {destinationNumbr} </p>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="otpcode"
                      label="OTP"
                      name="otpcode"
                      autoComplete="otpcode"
                      autoFocus
                      value={otpcode}
                      onChange={(e) => setOTPCode(e.target.value)}
                    />
                  </>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "16px",
                  }}
                >
                  {step !== 4 && (
                    <LoadingButton
                      className="ga-login"
                      loading={loading}
                      variant="contained"
                      type="submit"
                      onClick={(e) => handleSubmit(e)}
                      loadingPosition="center"
                      fullWidth
                      sx={{
                        background:
                          "linear-gradient(90deg, #3A89FF 0%, #28BFFF 100%)",
                        minWidth: 150,
                        boxShadow: "none",
                        textTransform: "capitalize",
                        height: "50px",
                        fontSize: {
                          xs: 18,
                          xl: 21,
                        },
                        lineHeight: {
                          xl: "25px",
                        },
                        letterSpacing: "-0.5px",
                        borderRadius: "10px",
                      }}
                    >
                      Continue
                    </LoadingButton>
                  )}
                </div>
                <Divider variant="fullWidth" sx={{ mt: 3, color: "grey" }}>
                  having trouble Login in ?
                </Divider>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    marginTop: "15px",
                    width: "100%",
                    gap: "20px",
                  }}
                >
                  {step !== 4 && (
                    <Box sx={{ flex: 1 }}>
                      <div
                        style={{
                          width: "100%",
                          cursor: "pointer",
                          height: 50,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "transparent",
                          borderRadius: "10px",
                          border: "1px solid #D9D9D9",
                        }}
                        onClick={() => navigate("/forgotPassword")}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: {
                              xs: 18,
                              xl: 21,
                            },
                            lineHeight: {
                              xl: "25px",
                            },
                            letterSpacing: "-0.5px",
                            color: "#090E29",
                            opacity: ".5",
                          }}
                        >
                          Forgot Password
                        </Typography>
                      </div>
                    </Box>
                  )}
                </div>
              </Box> */}
            </TabPanel>
          </TabContext>
        </Box>
        <Box>
          <Typography
            align="center"
            mt={{ xl: 11, xs: 2 }}
            mb={2}
            sx={{
              fontSize: {
                xs: "12px",
                xl: "15px",
              },
              color: "rgba(0,0,0,.3)",
            }}
          >
            By Sign in, you confirm that you agree to the processing of your
            personal data by CII Systems as described in the Privacy Statement.
          </Typography>
        </Box>
        <Box>
          <Copyright sx={{ my: 2 }} />
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Login;
