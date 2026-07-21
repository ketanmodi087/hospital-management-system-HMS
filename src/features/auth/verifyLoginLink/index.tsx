import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { checkAuth } from "../../store/thunk/commonThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setInitialLogin, setUserAlreadyLogged } from "../../store/slice/authSlice";
import { putNotification } from "../../store/thunk/notificationThunk";
import {
  Alert,
  Box,
  Button,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
// import SnackBar from "../layout/snackBar";
import Copyright from "../auth/copyright";
import { LoadingButton } from "@mui/lab";
import OtpCodeInput from "../auth/otpCodeInput";

function VerifyLoginLinkComponent({isLogin}:any) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const email: string = searchParams.get("email") || "";
  const token: string = searchParams.get("token") || "";
  const [step, setStep] = useState<string | number>(1);
  const [firstUser, setFirstUser] = useState<any>(null);
  const [isReady, setIsReady] = useState<any>(false);
  const { userData, userAlreadyLogged } = useAppSelector((state) => state.authReducer);
  const [destinationNumber, setDestinationNumber] = useState<string | null>(
    null
  );
  const [otpCode, setOtpCode] = useState<string>("");
  const [loader, setLoading] = useState<boolean>(false);

  useEffect(() => {
   Auth.currentAuthenticatedUser()
         .then(async (user: any) => {
          dispatch(setUserAlreadyLogged(true))
         })
         .catch((err) => {
          console.log("errerrerrerr",err)
          handleClick();
         });
         setTimeout(()=>{
          setIsReady(true)
        },1000)                 
  }, []);

  useEffect(()=>{
    setIsReady(false)
    setTimeout(()=>{
      setIsReady(true)
    },1000)     
  },[isLogin])

  const answerCustomChallenge = async (email: string, answer: string) => {
    try {      
      setLoading(true);
      let cognitoUser = await Auth.signIn(email);
      console.log("cognitoUser", cognitoUser);
      const user = await Auth.sendCustomChallengeAnswer(cognitoUser, answer);
      await checkLoginCriteria(user);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      dispatch(
        putNotification({
          status: false,
          msg: "Link is already used or expired, please try again.",
        })
      );
      
      localStorage.clear();        
      Auth.signOut()
      setTimeout(() => {        
        navigate("/");
          window.location.href = "/"
      }, 3000);
      console.error("Magic Link verification failed:", error);
    }
  };

  const verifyMFA = async (otp: string) => {
    try {
      setLoading(true);
      if (!firstUser) throw new Error("No active authentication session");
      const user = await Auth.sendCustomChallengeAnswer(firstUser, otp);
      await checkLoginCriteria(user);
      console.log(user.challengeName);
      if (user.challengeName && user.challengeName === "CUSTOM_CHALLENGE") {      
        dispatch(
          putNotification({ status: false, msg: "Please enter correct OTP." })
        );
      }
      setLoading(false);
    } catch (error: any) {
       dispatch(putNotification({ status: false, msg: "MFA verification failed" }));      
        console.error("MFA verification failed:", error);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      console.error("MFA verification failed:", error);
    }
  };

  const handleMFASubmit = () => {
    if (otpCode.length === 6) {
      verifyMFA(otpCode);
    } else {
      dispatch(
        putNotification({
          status: false,
          msg: "Please enter a valid 6-digit OTP",
        })
      );
    }
  };

  const handleClick = () => {
    answerCustomChallenge(email, token);
  };
  const handleLogout = () => {
    localStorage.clear();
    dispatch(setUserAlreadyLogged(true))
    Auth.signOut()
    answerCustomChallenge(email, token);
  };
  const handleDashboard = () => {
    dispatch(setUserAlreadyLogged(false))
    navigate("/");
  };

  const checkLoginCriteria = async (user: any) => {
    console.log("User authentication state:", user);    
    switch (user.challengeName) {
      case "NEW_PASSWORD_REQUIRED":
        setFirstUser(user);
        setStep(2);
        break;

      case "CUSTOM_CHALLENGE":
        console.log("user", user);
        if (
          user.challengeParam &&
          user.challengeParam.CODE_DELIVERY_DELIVERY_MEDIUM
        ) {
          setFirstUser(user);
          setDestinationNumber(user.challengeParam.CODE_DELIVERY_DESTINATION);
          setStep(3);
          break;
        }
        if (user.authenticationFlowType === "CUSTOM_AUTH") {
          try {
            const authenticatedUser = await Auth.currentAuthenticatedUser();
            console.log("Authenticated user:", authenticatedUser);
            // If we get here without a challenge, authentication is complete
            dispatch(checkAuth({}));
            dispatch(setInitialLogin(true));
          } catch (err: any) {
            setLoading(false);
            dispatch(putNotification({ status: false, msg: err.message }));
            console.error("Authentication error:", err);
          }
        }
        break;
      default:
        dispatch(checkAuth({}));
        dispatch(setInitialLogin(true));
        break;
    }
  };
  if(!isReady){
    return (<></>)
  }
  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        {/* <SnackBar /> */}
        <CssBaseline />
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: "background: linear-gradient(to right, #ADD8E6, #008080, #00CED1);",
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
              style={{ width: "100%", maxWidth: "400px" }}
            />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: "#FFFFFF",
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
            }}
          >
            <Box sx={{ textAlign: "center", mb: 4 }}>
            {/* {step === 1 && userAlreadyLogged &&  userData && userData?.username !== undefined && 
              <Alert variant="standard" color="info">
              {email !== userData.username ? "Another User Already Logged" : "User Already Logged"}
              </Alert>
            } */}
              <Typography variant="h4" component="h1" gutterBottom>
                {step === 3 ? "Enter MFA Code" : step === 1 && userAlreadyLogged ? "You are Already Logged" : "Sign In with Magic Link"}
              </Typography>
            </Box>
            {step === 1 && (
              <><Grid
                container
                sx={{
                  mt: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                { !userAlreadyLogged &&
                <LoadingButton
                  sx={{ width: "auto" }}
                  className="ga-login"
                  disabled={loader}
                  loading={loader}
                  variant="contained"
                  type="button"
                  onClick={handleClick}
                  loadingPosition="center"
                  fullWidth
                >
                  Verify
                </LoadingButton>
              }
              { userAlreadyLogged &&
                  <><LoadingButton
                  sx={{ width: "auto" }}
                  className="ga-login"
                  disabled={loader}
                  loading={loader}
                  variant="contained"
                  type="button"
                  onClick={handleDashboard}
                  loadingPosition="center"
                  fullWidth
                >
                Go to Dashboard
                </LoadingButton>
                <LoadingButton
                  sx={{ width: "auto" }}
                  className="ga-login"
                  disabled={loader}
                  loading={loader}
                  variant="contained"
                  type="button"
                  onClick={handleLogout}
                  loadingPosition="center"
                  fullWidth
                >
                 Logout and Proceed
                </LoadingButton></>
              }
              </Grid>
              </>
            )}

            {step === 3 && (
              <Box
                sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Typography>
                  Please enter the verification code sent to {destinationNumber}
                </Typography>
                <OtpCodeInput otpcode={otpCode} setOTPCode={setOtpCode} />
                {/* <input
                  type="text"
                  value={otpCode}
                  onChange={(e) =>
                    setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="Enter 6-digit code"
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    width: "200px",
                    textAlign: "center",
                  }}
                /> */}

                <LoadingButton
                  className="ga-login"
                  disabled={otpCode.length !== 6}
                  loading={loader}
                  variant="contained"
                  type="button"
                  onClick={handleMFASubmit}
                  loadingPosition="center"
                  fullWidth
                >
                  Confirm
                </LoadingButton>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />
            <Box sx={{ textAlign: "center" }}>
              <Copyright />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default VerifyLoginLinkComponent;
