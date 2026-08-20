import { PhoneCallback, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Card,
  Autocomplete
} from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { scrollToErrorByClass } from "helper/service";
import { FormEvent, useEffect, useState, useCallback } from "react";
import PhoneInput from "react-phone-input-2";
import { useSelector } from "react-redux";
import { hideModal } from "store/slice/modalSlice";
import { RootState, useAppDispatch, useAppSelector } from "store/store";
import { LoadingButton } from "@mui/lab";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { setLoader, setCreateTenantUserLoader } from "store/slice/tenantUserSlice";
import CloseIcon from '@mui/icons-material/Close';
import { t } from "i18next";

interface Props {
  data?: any;
  signupNewUser: (data: any) => void;
  tenant: any;
  actionType?: any;
}

interface SubUnit {
  groupId: string;
  name: string;
}
interface OrgStructureState {
  orgStructure: OrgUnit[];
  subUnits: SubUnit[];
}

interface OrgUnit {
  name: string;
  parent: string;
  pk: string;
  sk: string;
  created_at: string;
  updated_at: string;
  index: string;
}

interface OrgGroup {
  name: string;
  parent: string;
  pk: string;
  sk: string;
  created_at: string;
  updated_at: string;
  index: string;
  subUnits: SubUnit[];
}

export const defaultCapitalRoles = [
  "scoringSupervisor",
  "tenantAdmin",
  "scoringAgent",
  "scoringsupervisor",
  "tenantadmin",
  "scoringagent",
];

const AddEditTenantUserModal = ({
  data,
  signupNewUser,
  tenant,
  actionType
}: Props) => {

  const dispatch = useAppDispatch();
  let newEditTenant: any = data;

  const { usercreateloading } = useSelector((state: RootState) => state.tenantUserSlice);
  const { roleList } = useAppSelector((state) => state.rolePermissionSlice);
  const orgStructure: any = []
  const subUnits: any = []
  const tenantList = useAppSelector((state: any) => state?.tenantSlice?.tenantList?.getTenants?.tenants || []);
  const [currantTenantData, setCurrentTenantData] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [filteredRoles, setFilteredRoles] = useState<any>([]);
  const [validateError, setValidateError] = useState<any>([]);
  const [duplicatesLevelSelectionError, setDuplicatesLevelSelectionError] = useState<any>([]);

  const [groupData, setGroupData] = useState<OrgGroup[]>([]);
  const [modalData, setModalData] = useState<OrgGroup[][]>([]);
  const [roleSelections, setRoleSelections] = useState<{ [key: number]: string }>({});
  const [selectedValues, setSelectedValues] = useState<string[][]>(
    modalData.map(() => []) // Initializing with empty arrays for each group
  );

  const [levelSelection, setLevelSelection] = useState<string[]>([]);
  const [userData, setuserData] = useState(
    newEditTenant
      ? newEditTenant
      : {
        name: "", //FirstName
        middle_name: "", //LastName
        email: "",
        group: "",
        userName: "",
        phone: "",
        agentId: "",
        set_custom_password: false,
        password: "",
        userFacility: [],
        email_message: false,
        message: false,
        notification: false,
      }
  );

  useEffect(() => {
    setCurrentTenantData(() => {
      return tenantList?.find((value: any) => value?.tenantCode === tenant?.tenantCode);
    })
  }, [tenantList, tenant]);
  const containsNumbersOrSpecialChars = (str: string) => {
    const regex = /[0-9!@#$%^&*(),.?":{}|<>]/;
    return regex.test(str);
  };

  const validateErrorFunc = () => {
    let error: any = [];    
    // if (levelSelection?.length === 0) {
    //   error.push("levelSelection");
    // }

    if (!userData.name || containsNumbersOrSpecialChars(userData.name)) {
      error.push("name");
    }
    if (!userData.middle_name || containsNumbersOrSpecialChars(userData.middle_name)) {
      error.push("middle_name");
    }
    if ((userData.phone || "").replace(/\ /g, "").length > 5 && (userData.phone || "").replace(/\ /g, "").length < 12) {
      error.push("phone");
    }
    if (!userData.group) {
      error.push("group");
    }
    if (!userData.email) {
      error.push("email");
    } else {
      var re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!re.test(userData.email)) {
        error.push("email");
      }
    }

    if (userData?.set_custom_password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{14,}$/.test(userData?.password)) {
      error.push("password");
    }

    return error;
  };

  const handleRoleChange = (event: any) => {
    const { name, value } = event.target;
    setuserData((prevUserData: any) => ({
      ...prevUserData,
      [name]: value ? value.role_code : "",
    }));
    if (validateError.includes(name)) {
      const updatedValidateError = validateError.filter((error: any) => error !== name);
      setValidateError(updatedValidateError);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    if (validateError.includes(name)) {
      const updatedValidateError = validateError.filter((error: any) => error !== name);
      setValidateError(updatedValidateError); // Assuming setValidateError is your state setter function
    }
    setuserData({
      ...userData,
      [name]: value.trimLeft(),
    });
  };

  const handleChangePhone = (
    value: any,
    data: any,
    event: any,
    formattedValue: any
  ) => {        
    setuserData({
      ...userData,      
      phone: formattedValue.replace(/[^+0-9]/g, ""),
    });
    // if (validateError.includes(event?.target?.name)) {
    //   const updatedValidateError = validateError.filter((error: any) => error !== event?.target?.name);
    //   setValidateError(updatedValidateError); // Assuming setValidateError is your state setter function
    // }
  };

  const checkSameLevelSelectionError = () => {
    const valueCounts: { [key: string]: number } = {};
    const duplicates: string[] = [];

    // Count occurrences of each value
    levelSelection.forEach((value: string) => {
      valueCounts[value] = (valueCounts[value] || 0) + 1;
    });

    // Identify duplicates
    for (const value in valueCounts) {
      if (valueCounts[value] > 1) {
        duplicates.push(value);
      }
    }

    if (duplicates.length > 0) {
      return duplicates; // Return array of duplicate values
    } else {
      return []; // No duplicates
    }
  };


  const handleAddNewUser = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setCreateTenantUserLoader(true));
    const levelSelectionError = checkSameLevelSelectionError()
    setDuplicatesLevelSelectionError(levelSelectionError);

    const error = validateErrorFunc();        
    setValidateError(error);

    console.log("userDatauserData",error,userData, error.length, levelSelectionError.length);    
    
    if (error.length !== 0 || levelSelectionError.length !== 0) {
      dispatch(setCreateTenantUserLoader(false));
      return;
    }

    if (actionType) {
      signupNewUser({ ...userData, levelSelection, pk: newEditTenant?.pk, sk: newEditTenant?.sk, oldGroup: newEditTenant.group });
    } else {
      signupNewUser({ ...userData, levelSelection });
    }
  };


  const findPaths = (segments: any, subUnits: any, groupData: any): any => {
    const paths: any[] = [];
    setModalData([])
    // Loop through each segment path
    for (const segmentPath of segments) {
      const path: any[] = [];
      let currentSk = "";

      // Build cumulative sk path
      for (const segment of segmentPath) {


        currentSk = currentSk ? `${currentSk}|${segment}` : segment;

        // Find the matching record in subUnits with the current sk
        const record = subUnits.find((item: any) => item.sk === currentSk);
        if (record) {
          path.push(record);
        }
      }

      // Add the constructed path to paths if it's complete
      if (path.length === segmentPath.length) {
        paths.push(path);
        setModalData(prevData => [...prevData, groupData]);
      }
    }
    return paths;
  };

  useEffect(() => {
    if (orgStructure && subUnits) {

      const subUnitsMap: { [key: string]: SubUnit[] } = {}; // Adjust the type to store orgSubUnit objects

      // Create a dictionary for quick lookup
      for (const subUnit of subUnits) {
        if (!subUnitsMap[subUnit.groupId]) {
          subUnitsMap[subUnit.groupId] = [];
        }
        subUnitsMap[subUnit.groupId].push(subUnit); // Store the whole subUnit object
      }

      // Enhance orgStructure with subUnits
      const enhancedOrgStructure = orgStructure.map((org: any) => {
        const groupId = org.sk; // sk acts as groupId here
        return {
          ...org,
          subUnits: subUnitsMap[groupId] || [], // Assign the array of subUnit objects
        };
      });
      setGroupData(enhancedOrgStructure)
      setModalData([enhancedOrgStructure]);

      if (data?.parent?.length && actionType) {
        const segments = data.parent.filter(Boolean).map((group: string) => group.split("|"));

        if (segments.length > 0) {

          const result = findPaths(segments, subUnits, enhancedOrgStructure);
          setSelectedValues(result);
          setLevelSelection(data.parent.filter(Boolean));
        }
      }
    }
  }, [orgStructure, subUnits]);

  const handleAddGroup = () => {
    setModalData(prevData => [...prevData, groupData]);
  };

  const handleRemoveGroup = (groupIndex: number) => {
    // Update `modalData`
    setModalData(prevData => {
      const updatedData = prevData.filter((_, index) => index !== groupIndex);
      return updatedData.length > 0 ? updatedData : [groupData];
    });

    // Update `levelSelection`
    setLevelSelection(prevSelection => {
      return prevSelection.filter((_, index) => index !== groupIndex);
    });


    setRoleSelections(prevSelection => {
      const updatedSelection = { ...prevSelection };
      delete updatedSelection[groupIndex]; // Remove the key corresponding to groupIndex
      return updatedSelection;
    });

    // Update `selectedValues`
    setSelectedValues(prevValues => {
      const updatedValues = prevValues.filter((_, index) => index !== groupIndex);
      return updatedValues;
    });
  };

  const handleSelectChange = (groupIndex: number, itemIndex: number, value: any) => {
    // Create a deep copy of selectedValues for immutability
    let updatedValues = [...selectedValues];

    // Ensure the group array exists and create a copy of the inner array
    if (!updatedValues[groupIndex]) {
      updatedValues[groupIndex] = [];
    }
    updatedValues[groupIndex] = [...updatedValues[groupIndex]];

    // Update the specific item within the group with the new selection value
    updatedValues[groupIndex][itemIndex] = value;

    // Clear all selections in `updatedValues` after the current `groupIndex`
    // for (let i = itemIndex + 1; i < updatedValues[groupIndex].length; i++) {
    //   updatedValues[groupIndex][i] = {}; // Clear subsequent selections
    // }
    updatedValues[groupIndex].splice(itemIndex + 1);


    // Update the state with the updated selections
    setSelectedValues(updatedValues);

    // Update `levelSelection` to only update the current group (no resetting other groups)
    if (value && value.sk) {
      setLevelSelection((prev: string[]) => {
        // Create a copy of the previous selections
        const newLevels = [...prev];

        // Update the selection for the current group index
        newLevels[groupIndex] = value.sk;
        return newLevels;
      });
    }
  };

  useEffect(() => {
    if (selectedValues.length > 0 && levelSelection.length > 0) {
      const roleData: Record<number, string> = {};

      // Loop through `selectedValues` to assign roles based on `levelSelection` values
      selectedValues?.forEach((group: any[], groupIndex: number) => {
        group?.forEach((item: any, itemIndex: number) => {
          // Check if the group is the third one (groupIndex === 2)
          if (itemIndex === orgStructure.length - 1) {
            // If the item corresponds to a selected role in levelSelection, set role to "Agent"
            if (levelSelection.includes(item?.sk)) {
              roleData[groupIndex] = roleSelections[groupIndex] === "Supervisor" ? "Supervisor" : "Agent";
            } else {
              // Or set to a default role like "Supervisor" for other items
              roleData[groupIndex] = "Supervisor";
            }
          }
        });
      });
      // Update roleSelections based on updated roleData
      setRoleSelections(roleData);


    }
  }, [selectedValues, levelSelection]);


  const handleRoleAgentCheckboxSelection = (role: string, groupIndex: number) => {
    const value = levelSelection[groupIndex];
    setRoleSelections((prevState) => {
      // Clone the previous state to ensure immutability
      const newState = { ...prevState };

      // If the current role is selected, remove it, otherwise set it
      // if (newState[groupIndex] === role) {
      //   delete newState[groupIndex]; // Unselect the role if it's already selected
      // } else {
      newState[groupIndex] = role; // Select the new role
      // }

      return newState; // Return the updated state
    });

  };

  useEffect(() => {
    if (roleList?.getAllRoles && roleList.getAllRoles.length > 0) {
      // Filter roles to exclude 'tenantAdmin' and 'agent'
      const filtered = roleList.getAllRoles.filter(
        (val: any) =>
          val.role_code !== 'tenantAdmin'
      );

      setFilteredRoles(filtered);
    } else {
      // If no roles found or roleList is undefined, set to empty array
      setFilteredRoles([]);
    }
  }, [roleList]);

  useEffect(() => {
    if (validateError.length > 0) {
      const scrollToError = () => {
        const firstError = validateError[0];
        const errorElement = document.querySelector(`input[name="${firstError}"], .${firstError}`);
        
        if (errorElement) {
          errorElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      };

      // Add a small delay to ensure the DOM is updated
      setTimeout(scrollToError, 100);
      dispatch(setLoader(false));
    }
  }, [validateError]);

  if (newEditTenant && newEditTenant.middle_name === null) {
    newEditTenant = { ...newEditTenant, middle_name: "" };
  }
  const [disabledAddOrgButton, setDisabledAddOrgButton] = useState(false);
  useEffect(() => {
    const selectedValueWithoutNull = selectedValues?.filter((value: any) => !!value[0]);
    setDisabledAddOrgButton(() => selectedValueWithoutNull?.length !== modalData?.length);
  }, [selectedValues, modalData]);

  return (
    <Dialog
      open={true}
      fullWidth
      maxWidth="md" // Set to 'lg' for large width, or you can set 'xl' for extra-large
    >
      <form onSubmit={handleAddNewUser} noValidate>
        <DialogTitle
          style={{

            position: "sticky",
            top: 0,
            background: "white",
            zIndex: "9",
            borderBottom: "1px solid #e3d3d3",
            display: 'flex',
            justifyContent: 'space-between'
          }}
          id="draggable-dialog-title"
        >
          {data ? t("tenant.editUser") : t("tenant.createNewUser")}
          <span style={{ cursor: 'pointer' }} onClick={() => dispatch(hideModal())}>
            <CloseIcon />
          </span>
        </DialogTitle>
        <DialogContent sx={{ marginTop: 1.5 }}>
          <Grid container spacing={1}>
            {/* Left Column with form fields */}
            <Grid item xs={12}>
              <DialogContentText>
                {t("tenant.createUserDetails")}
              </DialogContentText>

              <Grid container sx={{ paddingBottom: "1rem", paddingRight: "10px" }}>

                <Grid item xs={6} sx={{ paddingRight: "1rem" }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label={t("tenant.firstName")}
                    name="name"
                    autoComplete="name"
                    value={userData.name}
                    onChange={handleChange}
                    error={validateError.includes("name")}
                    helperText={
                      validateError.includes("name") && "Please Enter Valid Value"
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="middle_name"
                    label={t("tenant.lastName")}
                    name="middle_name"
                    autoComplete="middle_name"
                    value={userData.middle_name}
                    onChange={handleChange}
                    error={validateError.includes("middle_name")}
                    helperText={
                      validateError.includes("middle_name") &&
                      "Please Enter Valid Value"
                    }
                  />
                </Grid>

                <Grid item xs={6} sx={{ paddingRight: "1rem" }}>
                  <TextField
                    disabled={data}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label={t("tenant.email")}
                    name="email"
                    autoComplete="email"
                    value={userData.email}
                    onChange={handleChange}
                    error={validateError.includes("email")}
                    helperText={
                      validateError.includes("email") && "Please Enter Valid Value"
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth margin="normal">
                    <PhoneInput
                      autoFormat={true}
                      isValid={!validateError.includes("phone")}
                      countryCodeEditable={false}
                      enableSearch={true}
                      defaultErrorMessage="Please Enter a valid Number"
                      enableTerritories={false}
                      inputProps={{
                        name: t("tenant.phone"),
                        required: true,
                        error: true,
                      }}
                      country={"us"}
                      value={userData?.phone}
                      onChange={(value, data, event, formattedValue,) =>
                        handleChangePhone(value, data, event, formattedValue)
                      }
                      dropdownStyle={{
                        position: "absolute",
                        top: "-400%",
                        left: "auto",
                        zIndex: 1600,
                      }}
                    />
                    <FormHelperText error={validateError.includes("phone")}>
                      {validateError.includes("phone") &&
                        "Please Enter a valid Number"}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={6} sx={{ paddingRight: "1rem" }}>
                  <FormControl fullWidth sx={{ minWidth: 120 }} margin="normal">
                    <InputLabel id="demo-simple-select-label">{t("tenant.roleLabel")}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      className="role-group-select"
                      value={userData.group ? filteredRoles.find((role:any) => role.role_code === userData.group) || '' : ''}
                      label={t("tenant.roleLabel")}
                      name="group"
                      onChange={handleRoleChange}
                      error={validateError.includes("group")}
                      renderValue={(selected) => {
                        if (!selected) return <span style={{ color: "#9e9e9e" }}>Role</span>;
                        return selected.role_name;
                      }}
                    >
                      {filteredRoles?.length > 0 ? (
                        filteredRoles?.map((val: any, index: number) => (
                          <MenuItem key={index} value={val}>
                            {val.role_name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">
                          Data Not Found
                        </MenuItem>
                      )}
                    </Select>
                    <FormHelperText error={validateError.includes("group")}>
                      {validateError.includes("group") && "Please Select Role"}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                {/* Right Column: Notification Configuration */}
                <Grid item xs={6}>
                  <Box sx={{ marginTop: 1 }}>
                    <DialogContentText>{t("tenant.notificationConfiguration")}</DialogContentText>
                    {/* Notification Checkboxes */}
                    <Box sx={{ display: "flex"}}>
                      <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                        <Checkbox
                          id="email_message"
                          onClick={(e: any) =>
                            setuserData({
                              ...userData,
                              email_message: e.target.checked,
                            })
                          }
                          checked={userData.email_message}
                        />
                        <label htmlFor="email_message">{t("tenant.email")}</label>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                        <Checkbox
                          id="message"
                          onClick={(e: any) =>
                            setuserData({
                              ...userData,
                              message: e.target.checked,
                            })
                          }
                          checked={userData.message}
                        />
                        <label htmlFor="message">{t("tenant.message")}</label>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                        <Checkbox
                          id="notification"
                          onClick={(e: any) =>
                            setuserData({
                              ...userData,
                              notification: e.target.checked,
                            })
                          }
                          checked={userData.notification}
                        />
                        <label htmlFor="notification">{t("tenant.pushNotification")}</label>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                {/* Left Column: Set Custom Password Checkbox and Password Field */}
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={userData?.set_custom_password}
                          onChange={() => {
                            setuserData({
                              ...userData,
                              set_custom_password: !userData.set_custom_password,
                              password: "",
                            });
                          }}
                        />
                      }
                      label={t("tenant.setCustomPassword")}
                    />
                  </FormGroup>

                  {/* Password Field, shown only if 'Set custom password' is selected */}
                  {userData?.set_custom_password && (
                    <>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={validateError.includes("password")}
                        name="password"
                        label={t("tenant.password")}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="off"
                        value={userData.password}
                        helperText={
                          validateError.includes("password") &&
                          "Passwords must have at least 14 characters, including 1 lowercase, 1 uppercase, 1 number, and 1 special character."
                        }
                        onChange={(e) => {
                          if (userData.set_custom_password) {
                            setuserData({
                              ...userData,
                              password: e.target.value,
                            });
                            if (validateError.includes("password")) {
                              setValidateError(
                                validateError.filter((error: any) => error !== "password")
                              );
                            }
                          }
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword((prev) => !prev)}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Typography variant="body2" align="left">
                        *If you set a custom password for the user, they will not
                        receive an invitation email. You will need to inform them
                        of the password manually.
                      </Typography>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          style={{
            position: "sticky",
            bottom: 0,
            width: "100%",
            zIndex: "9",
            background: "white",
            borderTop: "1px solid #e3d3d3",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(hideModal());
            }}
          >
            {t("tenant.cancel")}
          </Button>
          <LoadingButton
            loading={usercreateloading}
            className={data ? "ga-update-user" : "ga-create-user"}
            color={"primary"}
            variant="contained"
            type="submit"
          >
            {data ? t("tenant.update") : t("tenant.create")}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEditTenantUserModal;
