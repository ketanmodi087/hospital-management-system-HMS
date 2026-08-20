import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  ListItemText,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import {
  DataGrid,
  GridRowSelectionModel,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import {
  Delete,
  Edit,
  LockReset,
  SecurityUpdateGood,
  Call
} from "@mui/icons-material";

import { HtmlTooltip } from "../constants";
import { useAppDispatch, useAppSelector } from "store/store";
import { useNavigate } from "react-router-dom";

import { hideModal, modalLoading, showModal } from "store/slice/modalSlice";
import { tenantUserList as tenantUserListData } from "store/slice/tenantUserSlice";

import { getAllRoles } from "store/thunk/rolePermissionThunk";
import { setTenantId } from "store/thunk/commonThunk";
import {
  getTenantUserList,
  createUserCallProfile,
  updateUserCallProfile,
  deleteUserProfile,
  recoverUserProfile
} from "store/thunk/tenantUserThunk";
import { enableMFAThunk, getTenantList } from "store/thunk/tenantThunk";
import useTimezone from "helper/useTimezone";
import {
  AddEditTenantUserModal,
  ChangeUserMFAModal,
  DeleteTenantUserModal,
  ResetPasswordModal,
} from "molecules";
import { resetPasswordThunk } from "store/thunk/adminThunk";
import CustomNoRowsOverlay from "../components/CustomNoRowsOverlay";
import { useTranslation } from "react-i18next";
// import { changeAgentStatus } from "store/thunk/tenantAgentsThunk";

const TenantUsersTable = () => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const firstRender = useRef(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = JSON.parse(localStorage.getItem("tenantId") || "{}");

  const [isDeleted, setIsDeleted] = useState(false);
  const [tenant, setTenant] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<any>([]);
  const [userName, setUserName] = useState<any>("");
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [simpleUser, setSimpleUser] = useState(true);
  const [selectionModel, setSelectionModel] =
    React.useState<GridRowSelectionModel>([]);

  const { tenantDropDownList } = useAppSelector((state) => state.tenantSlice);
  const { tenantUserList, loading } = useAppSelector(
    (state) => state.tenantUserSlice
  );
  const { userData } = useAppSelector((state) => state.authReducer);
  useEffect(() => {
    dispatch(getTenantList({
      search: "",
      limit: 99999999,
      pageNo: 0,
      is_deleted: false,
    }));
  }, []);

  useTimezone();


  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    setSelectionModel(newSelection);
  };

  const handleChange = (event: any, value: any) => {
    if (value !== null) {
      let req = {
        tenantId: value.tenantCode,
      };

      dispatch(setTenantId(value));
      // getOrgStructureSubUnit(value.tenantCode);
      setTenant(value);
    } else {
      setTenant(value)
      dispatch(setTenantId(value));
      dispatch(tenantUserListData([]));
    }
  };

  const signupNewUser = (data: any, iscreate: boolean) => {

    let request: any = {
      email: data.email,
      group: data.group || 'agent',
      name: data.name,
      middle_name: data.middle_name,
      phone: data?.phone === null || data?.phone?.length <= 5 ? "" : data.phone,
      tenantId: tenant.tenantId,
      userName: data.userName,
      tenantCode: tenant.tenantCode,
      password: data.password || "",
      is_create: iscreate,
      userFacility: data.userFacility,
      email_message: data.email_message,
      message: data.message,
      notification: data.notification,
      set_custom_password: !!data?.set_custom_password,
      agentId: data.agentId,
      parent: data?.levelSelection?.filter((item: any) => item !== null) || [],
    };
    console.log("requestrequest", request);
    
    if (iscreate) {
      dispatch(
        createUserCallProfile({
          request: request,
          callback: () => {
            dispatch(hideModal());
          },
        })
      );
    } else {
      dispatch(
        updateUserCallProfile({
          request: { ...request, pk: data.pk, sk: data.sk, oldGroup: data.oldGroup },
          callback: () => {
            dispatch(hideModal());
          },
        })
      );
    }

  };

  const changeStatus = (checked: boolean, value: any) => {
    let request = {
      status: checked === true ? "Inactive" : "Active",
      pk: value.pk,
      sk: value.sk,
      tenantCode: tenant.tenantCode,
    };
    const requestTenant = {
      tenantId: tenant.tenantId,
      isDeleted: isDeleted,
      userLocation: userLocation,
      userName: userName
    };
    // dispatch(changeAgentStatus({
    //   request: request,
    //   callback: () => {
    //     dispatch(getTenantUserList(requestTenant));
    //   },
    // }));
  };

  const resetPassword = (data: any) => {
    dispatch(modalLoading(true));
    dispatch(
      resetPasswordThunk({
        request: data,
        callback: () => {
          dispatch(hideModal());
        },
      })
    );
  };

  const changeMFAStatus = (status: boolean, data: any) => {
    dispatch(modalLoading(true));
    const request = {
      username: data.userName,
      enableMFA: status,
      type: "user",
    };
    dispatch(enableMFAThunk(request)).then(() => {
      dispatch(hideModal());
      const request = {
        tenantId: tenant.tenantId,
        isDeleted: isDeleted,
        userLocation: userLocation,
        userName: userName
      };
      dispatch(getTenantUserList(request));
    });
  };

  const deleteUser = (data: any) => {
    dispatch(modalLoading(true));
    let tenantRequest = {
      isDeleted: isDeleted,
      tenantId: tenant.tenantId,
      userLocation: userLocation,
      userName: userName
    };
    dispatch(
      deleteUserProfile({
        request: [{
          pk: data.pk,
          sk: data.sk,
        }],
        callback: () => {
          dispatch(getTenantUserList(tenantRequest));
          dispatch(hideModal());
        },
      })
    );
  };

  const recoverUser = (data: any) => {
    dispatch(modalLoading(true));
    let tenantRequest = {
      isDeleted: isDeleted,
      tenantId: tenant.tenantId,
      userLocation: userLocation,
      userName: userName
    };
    dispatch(
      recoverUserProfile({
        request: [{
          pk: data.pk,
          sk: data.sk,
        }],
        callback: () => {
          dispatch(getTenantUserList(tenantRequest));
          dispatch(hideModal());
        },
      })
    );
  };

  const getSkAndPKforSelectedUser = (id: any): { sk: string, pk: string } => {
    // Find the user by userName
    const user: any = list.find((user: any) => user.userName === id);
    console.log("getSkAndPKforSelectedUser ::", id, user, list);

    // If user not found, return empty strings for sk and pk
    if (!user) {
      console.error(`User with id ${id} not found.`);
      return { sk: "", pk: "" };  // Ensure empty strings are returned if user not found
    }

    // Return the user object with sk and pk, fallback to empty strings if not present
    return {
      sk: user?.sk,  // Use an empty string as fallback for sk
      pk: user?.pk  // Use an empty string as fallback for pk
    };
  };



  const deleteMultipleUsers = (data: any) => {
    console.log("deleteMultipleUsers ::", data);

    // dispatch(modalLoading(true));
    let request = data.map((id: any) => getSkAndPKforSelectedUser(id));
    let tenantRequest = {
      isDeleted: isDeleted,
      tenantId: tenant.tenantId,
      userLocation: userLocation,
      userName: userName
    };
    console.log("Request array:", request);
    dispatch(
      deleteUserProfile({
        request: request,
        callback: () => {
          dispatch(getTenantUserList(tenantRequest));
          dispatch(hideModal());
        },
      })
    );
  };

  const QuickSearchToolbar = () => {
    return (
      <Box
        sx={{
          p: 2,
          pb: 0,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <div style={{ marginLeft: "auto" }}>
          {selectionModel.length > 0 && !isDeleted ? (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              {`${selectionModel.length} rows selected`}
              <Button
                onClick={() => {
                  dispatch(
                    showModal(
                      <DeleteTenantUserModal
                        modal="Delete"
                        data={selectionModel}
                        deleteUser={deleteMultipleUsers}
                      />
                    )
                  );
                }}
                variant="contained"
                disabled={tenant ? false : true}
              >
                {t("tenant.deleteSelected")}
              </Button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <GridToolbarQuickFilter
                quickFilterParser={(searchInput: string) => {
                  return searchInput
                    .split(",")
                    .map((value) => value.trim())
                    .filter((value) => value !== "");
                }}
              />
              {(userData?.group == "admin" || userData?.group === "tenantAdmin") && (
                <HtmlTooltip
                  title={
                    <Typography color="inherit">{t("tenant.showDeletedUsers")}</Typography>
                  }
                  placement="bottom"
                >
                  <FormGroup sx={{ display: "inline" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          // disabled={(tenant || !loading) ? false : true}
                          disabled={(!tenant || loading)}
                          checked={isDeleted}
                          onChange={() => {
                            setList([]);
                            setIsDeleted((prev) => !prev)
                          }}
                        />
                      }
                      label={t("tenant.showDeletedUsers")}
                    />
                  </FormGroup>
                </HtmlTooltip>
              )}
              {show && (
                <FormControl sx={{ width: "240px" }}>
                  <Autocomplete
                    {...{
                      options: tenantDropDownList.getTenants
                        ? [
                          ...tenantDropDownList?.getTenants.tenants,
                        ]
                        : [],
                      getOptionLabel: (option: any) => option.tenant_name || "",
                    }}
                    id="demo-simple-select"
                    onChange={handleChange}
                    renderTags={() => null}
                    value={tenant ? tenant : null}
                    isOptionEqualToValue={(option, value) =>
                      option.tenantId === value.tenantId
                    }
                    size="small"
                    renderOption={(props, item) => (
                      <li {...props} key={item.tenantId}>
                        <ListItemText>{item.tenant_name}</ListItemText>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("tenant.selectTenant")}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                </FormControl>
              )}
              {(userData?.group == "admin" || userData?.group === "tenantAdmin") && <Button
                onClick={() => {
                  dispatch(
                    showModal(
                      <AddEditTenantUserModal
                        signupNewUser={(data) => signupNewUser(data, true)}
                        tenant={tenant}
                      />
                    )
                  );
                }}
                variant="contained"
                disabled={tenant ? false : true}
              >
                {t("tenant.createNewUser")}
              </Button>}
            </div>
          )}
        </div>
      </Box>
    );
  };

  const columns = [
    {
      field: "name",
      headerName: t("tenant.firstName"),
      minWidth: 150,
      flex: 1,
    },
    { field: "middle_name", headerName: t("tenant.lastName"), minWidth: 150, flex: 1 },
    { field: "email", headerName: t("tenant.email"), minWidth: 150, flex: 1 },
    { field: "group", headerName: t("tenant.roleLabel"), minWidth: 80, flex: 1 },
    { field: "phone", headerName: t("tenant.phone"), minWidth: 100, flex: 1 },
    { field: "enable_mfa", headerName: t("tenant.mfaStatus"), minWidth: 80, flex: 1 },
    {
      field: "lastLogin",
      disableColumnMenu: true,
      headerName: t("tenant.lastLogin"),
      minWidth: 100,
      flex: 1,
      renderCell: (params: any) => {
        return (
          <p style={{ margin: 0 }}>
            {params.row.lastLogin
              ? moment(params.row.lastLogin).format("MMM D, YYYY h:mm A")
              : "-"}
          </p>
        );
      },
    },
    {
      field: "created_at",
      headerName: t("tenant.createdAt"),
      disableColumnMenu: true,
      minWidth: 100,
      flex: 1,
      renderCell: (params: any) => {
        return (
          <p style={{ margin: 0 }}>
            {moment(params.row.created_at).format("MMM D, YYYY h:mm A")}
          </p>
        );
      },
    },
    {
      field: "modified_at",
      headerName: t("tenant.updatedAt"),
      disableColumnMenu: true,
      minWidth: 100,
      flex: 1,
      renderCell: (params: any) => {
        return (
          <p style={{ margin: 0 }}>
            {moment(params.row.updated_at).format("MMM D, YYYY h:mm A")}
          </p>
        );
      },
    },
    {
      field: "disable_user",
      headerName: t("tenant.disableUser"),
      sortable: false,
      disableColumnMenu: true,
      minWidth: 100,
      flex: 1,
      renderCell: (params: any) => {
        return (
          <Switch
            checked={params.row.enabled !== "true"}
            onChange={(e, checked) => changeStatus(checked, params.row)}
            inputProps={{ "aria-label": "controlled" }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: t("tenant.actions"),
      disableColumnMenu: true,
      minWidth: (userData?.group === "admin" || userData?.group === "tenantAdmin") ? 190 : 100,
      sortable: false,
      flex: 1,
      cellClassName: "MuiDataGrid-cell--stickyAction",
      headerClassName: "MuiDataGrid-header--stickyAction",
      renderCell: (params: any) => {
        return isDeleted ? (
          <Button
            aria-label="Recover"
            onClick={() => {
              dispatch(
                showModal(
                  <DeleteTenantUserModal
                    modal="Recover"
                    recoverUser={recoverUser}
                    data={params.row}
                  />
                )
              );
            }}
          >
            {t("tenant.recover")}
          </Button>
        ) : (
          <div
            style={{
              display: "flex",
              gap: 5,
              alignItems: "center",
              height: "100%",
            }}
          >

            {(userData?.group === "admin" || userData?.group === "tenantAdmin") && <div>
              <HtmlTooltip
                title={<Typography color="inherit">{t("tenant.editUser")}</Typography>}
                placement="bottom"
              >
                <IconButton
                  disabled={selectionModel?.length ? true : false}
                  aria-label="delete"
                  onClick={() =>
                    dispatch(
                      showModal(
                        <AddEditTenantUserModal
                          signupNewUser={(data) => signupNewUser(data, false)}
                          tenant={tenant}
                          data={params.row}
                          actionType={"edit"}
                        />
                      )
                    )
                  }
                >
                  <Edit
                    style={{
                      width: "15px",
                      height: "15px",
                      color: "#5555ff",
                    }}
                  />
                </IconButton>
              </HtmlTooltip>
              <HtmlTooltip
                title={<Typography color="inherit">{t("tenant.resetPassword")}</Typography>}
                placement="bottom"
              >
                <IconButton
                  disabled={selectionModel?.length ? true : false}
                  aria-label="reset password"
                  onClick={() =>
                    dispatch(
                      showModal(
                        <ResetPasswordModal
                          data={params.row}
                          resetPassword={resetPassword}
                        />
                      )
                    )
                  }
                >
                  <LockReset
                    style={{
                      width: "15px",
                      height: "15px",
                      color: "#56a1e2",
                    }}
                  />
                </IconButton>
              </HtmlTooltip>
              <HtmlTooltip
                title={<Typography color="inherit">{t("tenant.changeMfaStatus")}</Typography>}
                placement="bottom"
              >
                <IconButton
                  disabled={selectionModel?.length ? true : false}
                  aria-label="delete"
                  onClick={() =>
                    dispatch(
                      showModal(
                        <ChangeUserMFAModal
                          changeMFAStatus={changeMFAStatus}
                          data={params.row}
                        />
                      )
                    )
                  }
                >
                  <SecurityUpdateGood
                    style={{
                      width: "15px",
                      height: "15px",
                      color: params.row.enable_mfa === "OFF" ? "red" : "blue",
                    }}
                  />
                </IconButton>
              </HtmlTooltip>
              <HtmlTooltip
                title={<Typography color="inherit">{t("tenant.deleteUser")}</Typography>}
                placement="bottom"
              >
                <IconButton
                  disabled={selectionModel?.length ? true : false}
                  aria-label="delete"
                  onClick={() =>
                    dispatch(
                      showModal(
                        <DeleteTenantUserModal
                          modal="Delete"
                          data={params.row}
                          deleteUser={deleteUser}
                        />
                      )
                    )
                  }
                >
                  <Delete
                    style={{
                      width: "15px",
                      height: "15px",
                      color: "red",
                    }}
                  />
                </IconButton>
              </HtmlTooltip>
            </div>}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (userData?.tenantCode) {
      const tenant = {
        tenantCode: userData.tenantCode,
        tenantId: userData.tenantId,
        tenant_name: userData.tenantCode,
      };
      setTenant(tenant);
      dispatch(setTenantId(tenant));
      // getOrgStructureSubUnit(userData.tenantCode);
    }
    setUserName(userData?.username)
    setUserLocation(userData?.userLocation)
  }, [userData]);

  useEffect(() => {
    if (items && items.tenantCode) {
      setTenant(items);
      // getOrgStructureSubUnit(items.tenantCode);
    }
  }, []);

  // Fetch Tenant User's List
  useEffect(() => {
    let tenent_users: any = [];
    if (tenantUserList?.getTenantUsers) {
      tenantUserList?.getTenantUsers
        .filter(
          (row: any) =>
            row.group != "tenantAdmin"
        )
        .map((row: any) => {
          tenent_users.push({
            id: row.userName,
            name: row.name,
            pk: row.pk,
            sk: row.sk,
            agentId: row.agentId,
            parent: row.parent,
            middle_name: row.middle_name,
            email: row.email,
            group: row.group,
            phone: row.phone,
            enable_mfa: row.enable_mfa ? "ON" : "OFF",
            enabled: row.enabled,
            lastLogin: row.lastLogin,
            created_at: row.created_at,
            modified_at: row.modified_at,
            email_message: row.email_message,
            notification: row.notification,
            message: row.message,
            userName: row.userName,
            userFacility: row.userFacility,
            sub_units: row.sub_units,
          });

          return row;
        });
    }
    console.log("tenent_users ", tenent_users);
    setList(tenent_users);
  }, [tenantUserList]);

  useEffect(() => {
    const tenant = {
      tenantCode: userData.tenantCode,
      tenantId: userData.tenantId,
      tenant_name: userData.tenantCode,
    };

    switch (userData.group) {
      case "admin":
        setShow(true);
        break;
      case "tenantManager":
        setSimpleUser(false);
        dispatch(setTenantId(tenant));
        setTenant(tenant);
        break;
      case "tenantCreator":
        setSimpleUser(false);
        dispatch(setTenantId(tenant));
        setTenant(tenant);
        break;
      default:
        dispatch(setTenantId(tenant));
        setTenant(tenant);
        break;
    }
  }, [userData]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (tenant && tenant.tenantId && userName) {
      let request = {
        tenantId: tenant.tenantId,
        isDeleted: isDeleted,
        userLocation: userLocation,
        userName: userName
      };
      dispatch(getTenantUserList(request));
      dispatch(
        getAllRoles({ is_deleted: false, tenantCode: tenant.tenantCode })
      );
    }
  }, [tenant, isDeleted, userName, userLocation]);

  return (
    <Box
      sx={{
        height: 400,
        minHeight: "80vh",
        width: "100%",
        "& .MuiDataGrid-cell--stickyAction": {
          position: "sticky !important",
          right: 0,
          backgroundColor: "white",
          zIndex: 2,
        },
        "& .MuiDataGrid-header--stickyAction": {
          position: "sticky !important",
          right: 0,
          backgroundColor: "white",
          zIndex: 3,
        },
      }}
    >
      <DataGrid
        rows={!!list?.length ? list : users}
        columns={columns}
        disableVirtualization
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableRowSelectionOnClick
        loading={loading}
        checkboxSelection={userData?.group === "admin" || userData?.group === "tenantAdmin"}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20, 50, 100]}
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={handleSelectionChange}
        slots={{
          toolbar: QuickSearchToolbar,
          noRowsOverlay: CustomNoRowsOverlay, // Add the custom overlay here
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        sx={{ minHeight: "80vh" }}
      />
    </Box>
  );
};

export default TenantUsersTable;

const users = [
  {
    id: 1,
    name: "Linh",
    middle_name: "Nguyễn",
    email: "linh.nguyen@grandline.vn",
    group: "tenantAdmin",
    phone: "+84 912 345 678",
    enable_mfa: "ON",
    lastLogin: "2025-04-15T14:35:00Z",
    created_at: "2024-11-01T09:00:00Z",
    modified_at: "2025-02-20T10:20:00Z",
    enabled: "true"
  },
  {
    id: 2,
    name: "Huy",
    middle_name: "Trần",
    email: "huy.tran@wano.vn",
    group: "admin",
    phone: "+84 911 111 222",
    enable_mfa: "OFF",
    lastLogin: "2025-04-10T08:45:00Z",
    created_at: "2024-10-25T08:30:00Z",
    modified_at: "2025-01-10T12:00:00Z",
    enabled: "false"
  },
  {
    id: 3,
    name: "Thảo",
    middle_name: "Phạm",
    email: "thao.pham@skypiea.vn",
    group: "user",
    phone: "+84 913 987 654",
    enable_mfa: "ON",
    lastLogin: null,
    created_at: "2025-01-01T00:00:00Z",
    modified_at: "2025-04-01T13:00:00Z",
    enabled: "true"
  },
  {
    id: 4,
    name: "Minh",
    middle_name: "Lê",
    email: "minh.le@eastblue.vn",
    group: "user",
    phone: "+84 915 456 789",
    enable_mfa: "OFF",
    lastLogin: "2025-03-30T22:15:00Z",
    created_at: "2024-12-05T10:10:00Z",
    modified_at: "2025-03-01T10:00:00Z",
    enabled: "false"
  },
  {
    id: 5,
    name: "Mai",
    middle_name: "Vũ",
    email: "mai.vu@loguetown.vn",
    group: "tenantAdmin",
    phone: "+84 910 000 111",
    enable_mfa: "ON",
    lastLogin: "2025-04-16T17:45:00Z",
    created_at: "2025-02-02T11:11:00Z",
    modified_at: "2025-04-05T18:18:00Z",
    enabled: "true"
  }
];
