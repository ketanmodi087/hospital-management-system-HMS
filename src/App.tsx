import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  Tenants,
  Roles,
  UsageReports,
  TenantUsers,
  Signup,
  FederatedSignIn,
  SessionExpired,
  Profile,
  Appointment,
  TeleHealth,
  PatientList,
  StaffSchedule,
  Billings,
  AppSetting,
  Staff,
  Inventory,
  Rewards,
  Marketing,
  SolomonAi,
  Review,
  MyTasks,
  MarketingDashboard,
  Facilities
} from "pages";
import ForgetPassword from "pages/forgetPassword";
import Login from "pages/auth";
import {
  DrawerLayout,
  ErrorBoundaryComponent,
  GlobalModal,
  Permission,
} from "components";
import version from "../package.json";

import "./App.css";
import { Amplify, Auth, Hub } from "aws-amplify";
import { apiSetting } from "aws-export";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "store/store";
import { userAuthDetails } from "store/thunk/authThunk";
import { useSelector } from "react-redux";
import { updateUserHistoryData } from "store/thunk/tenantReport";
import { manageTheme } from "store/slice/themeSlice";
import { setSSOisEnable } from "store/slice/commonSlice";
import { setInitialLogin } from "store/slice/authSlice";
import { MENU_ID } from "./constants";
import { putNotification } from "store/thunk/notificationThunk";
import Loader from "components/Loader";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Import the theme
import Dashboard from "features/dashboard/Dashboard";
import VerifyLoginLinkComponent from "features/auth/verifyLoginLink";
import PatientRegistation from "features/auth/Registration";

Amplify.configure(apiSetting);

const App: React.FC = () => {
  const provider: any = localStorage.getItem("provider");
  const { autherise, ssoenabled } = useAppSelector(
    (state) => state.commonSlice
  );
  const { userData, loading } = useAppSelector((state) => state.authReducer);
  const { themeMode } = useSelector((state: RootState) => state.themeSlice);
  const { totalTime, pageTimes } = useAppSelector(
    (state: RootState) => state.timeTrackerSlice
  );

  const dispatch = useAppDispatch();
  const [auth, setAuth] = useState(null);
  const [isReady, setReady] = useState(false);
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);
  const [isSSO, setIsSSO] = useState(false);

  useEffect(() => {
    if (window?.location?.pathname === "/eventMap") {
      setLoader(false);
    } else {
      setLoader(loading);
    }
  }, [loading]);

  useEffect(() => {
    if (userData?.group !== "admin" && totalTime > 0) {
      const request = {
        tenant_id: userData?.tenantId,
        // tenant_code: userData?.tenantCode,
        username: userData?.username,
        event_type: "web_summary",
        spend_time: totalTime,
      };
      dispatch(updateUserHistoryData(request));
    }
  }, [totalTime, userData]);

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: false })
      .then(async (user: any) => {
        setAuth(user?.attributes);
        dispatch(userAuthDetails({ user: user }));
        setReady(true);
      })
      .catch((err) => {
        setReady(true);
      });
  }, [autherise]);

  useEffect(() => {
    if (autherise === true && userData && count < 1) {
      dispatch(
        putNotification({
          status: true,
          msg: "Login Successfull",
        })
      );
      setCount(count + 1);
      if (userData?.group !== "admin") {
        const request = {
          tenant_id: userData?.tenantId,
          username: userData?.username,
          event_type: "login_click",
          mobile: {
            os: "web",
            version: version.version,
          },
        };

        dispatch(updateUserHistoryData(request));
      }
    }
  }, [autherise, userData, count]);

  useEffect(() => {
    let redirectSlug = "";
    if (userData && userData.permission && window.location.pathname === "/") {
      let ids = JSON.parse(
        userData.permission !== null ? userData.permission : "[]"
      );
      ids.sort();
      const firstPermissionId = ids.length ? ids[0] : "";

      if (firstPermissionId) {
        if (firstPermissionId === "1") {
          redirectSlug = "/tenantList";
        } else if (firstPermissionId === "2") {
          redirectSlug = "/userList";
        } else if (firstPermissionId === "3") {
          redirectSlug = "/roleManagement";
        } else if (firstPermissionId === "4") {
          redirectSlug = "/devices";
        } else if (firstPermissionId === "5") {
          redirectSlug = "/deviceConfig";
        } else if (firstPermissionId === "6") {
          redirectSlug = "/location";
        } else if (firstPermissionId === "7") {
          redirectSlug = "/detection";
        } else if (firstPermissionId === "8") {
          redirectSlug = "/groupsSubstance";
        } else {
          redirectSlug = "/";
        }
      }

      if (userData.group === "admin") {
        window.location.pathname = "/ops-dashboard";
      }
    }
  }, [userData]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (themeMode === "dark") {
      body?.classList.add("dark-mode");
      body?.classList.remove("light-mode");
    } else {
      body?.classList.remove("dark-mode");
      body?.classList.add("light-mode");
    }
  }, [themeMode]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    dispatch(manageTheme(theme));
    async function checkTenantSSO() {
      try {
        setIsSSO(true);
        if (userData && userData.public_sso === null) {
          dispatch(setSSOisEnable(false));
          return;
        } else if (
          userData &&
          userData.public_sso &&
          userData.public_sso !== "true"
        ) {
          dispatch(setSSOisEnable(false));
          return;
        }
      } catch (err) {}
    }
    (async () => {
      try {
        if (
          ["Google", "SignInWithApple", "Facebook"].includes(provider) &&
          userData.group !== "admin"
        ) {
          checkTenantSSO();
        } else {
          setIsSSO(true);
        }
      } catch (err) {}
    })();

    // Subscribe to authentication events
    Hub.listen("auth", ({ payload: { event, data, message } }) => {
      if (event === "signIn") {
        dispatch(setInitialLogin(true));
      }
    });
  }, [userData]);

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundaryComponent>
        {isReady ? (
          <Router>
            {auth ? (
              <DrawerLayout>
                <Routes>
                  <Route path="/login" element={<Navigate to="/" />} />
                  <Route
                    path={MENU_ID.TENANTS.route}
                    element={
                      <Permission>
                        <Tenants />
                      </Permission>
                    }
                  />
                  <Route
                    path={MENU_ID.TENANT_USERS.route}
                    element={
                      <Permission>
                        <TenantUsers />
                      </Permission>
                    }
                  />
                  <Route
                    path={MENU_ID.ROLES.route}
                    element={
                      <Permission>
                        <Roles />
                      </Permission>
                    }
                  />
                  <Route
                    path={MENU_ID.USAGE_REPORT.route}
                    element={
                      <Permission>
                        <UsageReports />
                      </Permission>
                    }
                  />
                  <Route path="/profile" element={<Profile />} />
                  <Route
                    path={MENU_ID.APPOINTMENT.route}
                    element={
                      <Permission>
                        <Appointment />
                      </Permission>
                    }
                  />
                  <Route
                    path={MENU_ID.TELEHEALTH.route}
                    element={
                      <Permission>
                        <TeleHealth />
                      </Permission>
                    }
                  />
                  <Route
                    path={MENU_ID.PATIENTLIST.route}
                    element={
                      <Permission>
                        <PatientList />
                      </Permission>
                    }
                  />
                  <Route
                    path={MENU_ID.STAFFSCHEDULE.route}
                    element={
                      <Permission>
                        <StaffSchedule />
                      </Permission>
                    }
                  />
                  <Route
                    path={MENU_ID.BILLING.route}
                    element={
                      <Permission>
                        <Billings />
                      </Permission>
                    }
                  />
                  <Route
                    path={MENU_ID.APPSETTING.route}
                    element={
                      <Permission>
                        <AppSetting />
                      </Permission>
                    }
                  />
                  <Route
                    path={MENU_ID.STAFF.route}
                    element={
                      <Permission>
                        <Staff />
                      </Permission>
                    }
                  />

                  <Route
                    path={MENU_ID.INVENTORY.route}
                    element={
                      <Permission>
                        <Inventory />
                      </Permission>
                    }
                  />

                  <Route
                    path={MENU_ID.REWARDS.route}
                    element={
                      <Permission>
                        <Rewards />
                      </Permission>
                    }
                  />

                  <Route
                    path={MENU_ID.MARKETING.route}
                    element={
                      <Permission>
                        <Marketing />
                      </Permission>
                    }
                  />
                  <Route
                    path={MENU_ID.MARKETING_DASHBAORD.route}
                    element={
                      <Permission>
                        <MarketingDashboard />
                      </Permission>
                    }
                  />

                  <Route
                    path={MENU_ID.FACILITIES.route}
                    element={
                      <Permission>
                        <Facilities />
                      </Permission>
                    }
                  />

                  <Route
                    path={MENU_ID.SOLOMON.route}
                    element={
                      <Permission>
                        <SolomonAi />
                      </Permission>
                    }
                  />

                  <Route
                    path={MENU_ID.REVIEW.route}
                    element={
                      <Permission>
                        <Review />
                      </Permission>
                    }
                  />

                  <Route
                    path={MENU_ID.MYTASK.route}
                    element={
                      <Permission>
                        <MyTasks />
                      </Permission>
                    }
                  />
                  <Route
                    path={MENU_ID.WORKFLOW.route}
                    element={
                      <Permission>
                        <PatientRegistation />
                      </Permission>
                    }
                  />

                  <Route path="/" element={<Dashboard />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </DrawerLayout>
            ) : (
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/verify"
                  element={<VerifyLoginLinkComponent isLogin={true} />}
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgotPassword" element={<ForgetPassword />} />
                <Route path="/federatedSignIn" element={<FederatedSignIn />} />
                <Route path="/sessionExpired" element={<SessionExpired />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            )}
          </Router>
        ) : (
          <Loader />
        )}
        <GlobalModal />
      </ErrorBoundaryComponent>
    </ThemeProvider>
  );
};

export default App;
