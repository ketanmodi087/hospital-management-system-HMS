import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "../../store/store";
// import SnackBar from "../layout/snackBar";
import { useNavigate } from "react-router-dom";
import { putNotification } from "../../store/thunk/notificationThunk";
import { Auth } from "aws-amplify";
import LoadingButton from "@mui/lab/LoadingButton";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import version from "../../../package.json";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { HtmlTooltip } from "../../constants";
import ForgotPasswordScreen from "./forgotPasswordScreen";
import TempSentPasswordScreen from "./tempSentPasswordScreen";
import { notificationSuccess } from "store/slice/notificationSlice";

export default function SignInSide() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const [sendTempPassword, setSendTempPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setuserData] = useState({
    email: "",
    code: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    if (step === 1) {
      Auth.forgotPassword(userData.email)
        .then((data) => {
          setLoading(false);
          setStep(2);
        })
        .catch((err) => {
          setLoading(false);
          switch (err.code) {
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
            case "NotAuthorizedException":
              // dispatch(
              //   putNotification({
              //     status: false,
              //     msg: "Please Change Temporary Password",
              //   })
              // );
              setLoading(true)
              setSendTempPassword(false)
              break;
            case "LimitExceededException":
              dispatch(
                putNotification({
                  status: false,
                  msg: "Attempt limit exceeded, Please try after some time",
                })
              );
              break;
            default:
              dispatch(
                putNotification({
                  status: false,
                  msg: err.message
                    ? "Please Enter User Email"
                    : "Something went wrong!",
                })
              );
              break;
          }
        });
    } else {
      Auth.forgotPasswordSubmit(
        userData.email,
        userData.code,
        userData.password
      )
        .then((data) => {
          dispatch(notificationSuccess("Password changed successfully!"));
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
          }, 2500);
        })
        .catch((err) => {
          setLoading(false);
          switch (err.code) {
            case "InvalidPasswordException":
              dispatch(
                putNotification({
                  status: false,
                  msg: "Passwords must has at least 14 character that include at least 1 lowercase, 1 uppercase,1 number and 1 special character.",
                })
              );
              break;
            case "CodeMismatchException":
              dispatch(
                putNotification({
                  status: false,
                  msg: "Invalid verification code provided, Please try again",
                })
              );
              break;
            case "NotAuthorizedException":
              dispatch(
                putNotification({
                  status: false,
                  msg: "Please Change Temporary Password",
                })
              );
              break;
            case "LimitExceededException":
              dispatch(
                putNotification({
                  status: false,
                  msg: "Attempt limit exceeded, Please try after some time",
                })
              );
              break;
            default:
              dispatch(
                putNotification({
                  status: false,
                  msg: err.message ? err.message : "Something went wrong!",
                })
              );
              break;
          }
        });
    }
  };

  const handleChange = (event: any) => {
    // debugger
    setuserData({
      ...userData,
      [event.target.name]: event.target.value.trimLeft(),
    });
  };

  const handleCodeChange = (event: any) => {
    const value = event.target.value.trimLeft();
    if (/^\d{0,6}$/.test(value)) {
      setuserData({
        ...userData,
        [event.target.name]: event.target.value.trimLeft(),
      });
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* <SnackBar /> */}
      <CssBaseline />
      <Grid
        item
        xs={12}
        md={7}
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
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          backgroundImage: "url(assets/images/bg2.png)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {sendTempPassword && <TempSentPasswordScreen navigate={navigate} />}
        {!sendTempPassword && <ForgotPasswordScreen
          handleSubmit={handleSubmit}
          step={step}
          userData={userData}
          handleChange={handleChange}
          handleCodeChange={handleCodeChange}
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
          handleMouseDownPassword={handleMouseDownPassword}
          loading={loading}
          navigate={navigate}
        />
        }
      </Grid>
    </Grid >
  );
}
