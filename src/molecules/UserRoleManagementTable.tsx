import { Delete, Edit, LockReset } from "@mui/icons-material";
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
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fixedAgentPermission, fixedTenantAgentPermission, HtmlTooltip, MENU_ID } from "../constants";
import { useEffect, useRef, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "store/store";
import {
  addNewUserRole,
  changeRolePermission,
  deleteUserRole,
  getAllRoles,
  recoverUserRole,
  updateUserRole,
} from "store/thunk/rolePermissionThunk";
import { AddEditRoleModal } from "molecules";
import { setTenantId } from "store/thunk/commonThunk";
import { hideModal, modalLoading, showModal } from "store/slice/modalSlice";
import DeleteRoleModal from "./DeleteRoleModal";
import { roleList as setroleList } from "store/slice/rolePermissionSlice";
import { t } from "i18next";


const PermissionBasics: any = Object.keys(MENU_ID).map((item, i) => {
  return {
    child: null,
    label: MENU_ID[item].label,
    menuId: MENU_ID[item].menuId,
    userRoles: [],
    showInRole: MENU_ID[item].showInRole,
  };
});

const UserRoleManagementTable = () => {
  const dispatch = useAppDispatch();
  const firstRender = useRef(true);

  const { userData } = useAppSelector((state) => state.authReducer);
  const [checkBoxList, setCheckBoxList] = useState(PermissionBasics);
  const { roleList, loading } = useAppSelector(
    (state) => state.rolePermissionSlice
  );
  const defaultTenant = {
    tenantCode: "default",
    tenantId: "0000",
    tenant_name: "Default",
  };

  const [rows, setRows] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [show, setShow] = useState(false);
  const [tenant, setTenant] = useState<any>(null);
  const { tenantDropDownList } = useAppSelector((state) => state.tenantSlice);
  const items = JSON.parse(localStorage.getItem("tenantId") || "{}");
  const [mappedMenuData, setMappedMenuData] = useState<any>({});

  const IconButtonStyle = {
    width: 40,
    height: 40,
    borderRadius: "25px",
  };

  const IconStyle = {
    width: "20px",
    height: "20px",
    color: "gray",
  };

  const QuickSearchToolbar = () => {
    return (
      <Box
        sx={{
          p: 2,
          px: 1,
          pb: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            marginLeft: "auto",
          }}
        >
          <>
            <HtmlTooltip
              title={
                <Typography color="inherit">{t("tenant.showDeletedUsers")}</Typography>
              }
            >
              <span>
                <FormGroup sx={{ display: "inline" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isDeleted}
                        disabled={tenant ? false : true}
                        onChange={() => setIsDeleted(!isDeleted)}
                      />
                    }
                    label={t("tenant.showDeletedUsers")}
                  />
                </FormGroup>
              </span>
            </HtmlTooltip>

            {show && (
              <FormControl margin="normal" sx={{ width: "240px" }}>
                <Autocomplete
                  {...{
                    options: tenantDropDownList.getTenants
                      ? [
                        ...tenantDropDownList?.getTenants.tenants,
                        defaultTenant,
                      ]
                      : [],
                    getOptionLabel: (option: any) => option.tenant_name || "",
                  }}
                  id="demo-simple-select"
                  onChange={handleChange}
                  PaperComponent={({ children }: any) => (
                    <Paper
                      style={{
                        boxShadow:
                          "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
                      }}
                    >
                      {children}
                    </Paper>
                  )}
                  renderTags={() => null}
                  value={tenant ? tenant : null}
                  isOptionEqualToValue={(option, value) =>
                    option.tenantId === value.tenantId
                  }
                  renderOption={(props, item) => (
                    <li {...props} key={item.tenantId}>
                      <ListItemText>{item.tenant_name}</ListItemText>
                    </li>
                  )}
                  size="small"
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
            <FormControl
              margin="normal"
              sx={{ width: "auto", display: "inline-flex" }}
            >
              <HtmlTooltip
                title={<Typography color="inherit">{t("tenant.addNewRole")}</Typography>}
              >
                <span style={{ display: "inline-block", width: "auto" }}>
                  <Button
                    disabled={tenant ? false : true}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch(
                        showModal(
                          <AddEditRoleModal
                            modalData={{}}
                            updateRole={updateRole}
                          />
                        )
                      );
                    }}
                  >
                    {t("tenant.addNewRole")}
                  </Button>
                </span>
              </HtmlTooltip>
            </FormControl>
          </>
        </div>
      </Box>
    );
  };

  const columns = [
    {
      field: "role_name",
      headerName: t("tenant.roles"),
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <div>
            <Typography variant="h6" sx={{ color: "#232323", mb: 1 }}>
              {params.row.role_name}
            </Typography>
            <div
              style={{
                display: "flex",
                gap: 5,
                alignItems: "center",
                height: "100%",
              }}
            >
              {show && !isDeleted && (
                <>
                  <HtmlTooltip
                    title={<Typography color="inherit">{t("tenant.editRole")}</Typography>}
                  >
                    <IconButton
                      aria-label="delete"
                      style={IconButtonStyle}
                      onClick={() => {
                        dispatch(
                          showModal(
                            <AddEditRoleModal
                              modalData={params.row}
                              updateRole={updateRole}
                            />
                          )
                        );
                      }}
                    >
                      <Edit style={IconStyle} />
                    </IconButton>
                  </HtmlTooltip>

                  <HtmlTooltip
                    title={<Typography color="inherit">{t("tenant.deleteRole")}</Typography>}
                  >
                    <IconButton
                      aria-label="delete"
                      style={IconButtonStyle}
                      onClick={() => {
                        dispatch(
                          showModal(
                            <DeleteRoleModal
                              data={params.row}
                              deleteRole={deleteRole}
                            />
                          )
                        );
                      }}
                    >
                      <Delete style={IconStyle} />
                    </IconButton>
                  </HtmlTooltip>
                </>
              )}

              {show && isDeleted && (
                <HtmlTooltip
                  title={<Typography color="inherit">{t("tenant.deleteRole")}</Typography>}
                >
                  <IconButton
                    aria-label="recover"
                    style={IconButtonStyle}
                    onClick={() => {
                      dispatch(
                        showModal(
                          <DeleteRoleModal
                            modal="Recover"
                            data={params.row}
                            recoverRole={recoverRole}
                          />
                        )
                      );
                    }}
                  >
                    <LockReset style={IconStyle} />
                  </IconButton>
                </HtmlTooltip>
              )}
            </div>
          </div>
        );
      },
      renderHeader: () => (
        <Typography variant="subtitle1" fontWeight="bold">
          {t("tenant.roles")}
        </Typography>
      )
    },
    {
      field: "pagePermission",
      headerName: t("tenant.pagePermissions"),
      minWidth: 170,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: any) => {
        const role = params.row.role_code;

        return (
          <div
            style={{
              alignItems: "center",
              height: "100%",
            }}
          >
            <FormGroup
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                columnGap: 3,
              }}
            >
              {checkBoxList
                .filter((row: any) => row.showInRole)
                .map((row: any, index: number) => {
                  let disabledPermission = false;
                  if ((role == 'tenantAdmin' && fixedTenantAgentPermission.includes(parseInt(`${row.menuId}`))) || (role == 'agent' && fixedAgentPermission?.includes(parseInt(`${row.menuId}`)))) {
                    disabledPermission = true;
                  }

                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          disabled={disabledPermission}
                          onClick={(e: any) =>
                            handleCheckBox(e, params.row, row.menuId)
                          }
                          checked={
                            params.row.permission_pages != null &&
                            JSON.parse(params.row.permission_pages).includes(
                              row.menuId.toString()
                            )
                          }
                        />
                      }
                      label={t(row.label)}
                    />
                  );
                })}

            </FormGroup>
          </div>
        );
      },
      renderHeader: () => (
        <Typography variant="subtitle1" fontWeight="bold">
          {t("tenant.pagePermissions")}
        </Typography>
      )
    },
  ];

  const handleChange = (event: any, value: any) => {
    if (value !== null) {
      dispatch(setTenantId(value));
      setTenant(value);
    } else {
      setTenant(value);
      setRows([]);
      dispatch(setTenantId(value));
      dispatch(setroleList([]));
    }
  };

  const updateRole = (data: any) => {
    if (data.pk) {
      let request = {
        request: {
          id: data.pk,
          name: data.role_name.trim(),
          // ux_index: data.ux_index.trim(),
          // attach_with_org:data.attach_with_org,
          tenantCode:
            items && items.tenantId ? items.tenantCode : userData.tenantCode,
        },
        callback: () => {
          dispatch(hideModal());
          dispatch(
            getAllRoles({
              is_deleted: isDeleted,
              tenantCode: tenant.tenantCode,
            })
          );
        },
      };
      dispatch(updateUserRole(request));
    } else {
      let request = {
        request: {
          name: data.role_name.trim(),
          // ux_index: data.ux_index.trim(),
          tenantCode: tenant.tenantCode,
          // attach_with_org : data.attach_with_org
        },
        callback: () => {
          dispatch(hideModal());
          dispatch(
            getAllRoles({
              is_deleted: isDeleted,
              tenantCode: tenant.tenantCode,
            })
          );
        },
      };
      dispatch(addNewUserRole(request));
    }
  };

  const deleteRole = (data: any) => {
    dispatch(modalLoading(true));
    let request = {
      request: {
        id: data.pk,
        tenantCode:
          items && items.tenantId ? items.tenantCode : userData.tenantCode,
      },
      callback: () => {
        dispatch(hideModal());
        dispatch(
          getAllRoles({
            is_deleted: isDeleted,
            tenantCode: tenant.tenantCode,
          })
        );
      },
    };
    dispatch(deleteUserRole(request));
  };

  const recoverRole = (data: any) => {
    dispatch(modalLoading(true));
    dispatch(
      recoverUserRole({
        request: {
          id: data.pk,
          tenantCode:
            items && items.tenantId ? items.tenantCode : userData.tenantCode,
        },
        callback: () => {
          dispatch(hideModal());
          dispatch(
            getAllRoles({
              is_deleted: isDeleted,
              tenantCode: tenant.tenantCode,
            })
          );
        },
      })
    );
  };

  const handleCheckBox = (e: any, group: any, menuId: string) => {
    let menuIds: any = [];
    const findedMenu: any = {
      permissions: mappedMenuData?.[group.pk]?.permissions,
    };
    if (group.permission_pages != null) {
      menuIds = findedMenu.permissions;
    }
    if (e.target.checked) {
      menuIds.push(menuId);
      findedMenu.permissions.push(menuId);
    } else {
      menuIds = menuIds.filter((row: any) => menuId != row);
      findedMenu.permissions = findedMenu.permissions.filter(
        (row: any) => menuId != row
      );
    }

    const setArray = [...new Set(findedMenu.permissions)];
    let permission = {
      pk: group.pk,
      sk: group.sk,
      permission_pages: setArray,
    };
    setMappedMenuData({
      ...mappedMenuData,
      [group.pk]: { permissions: findedMenu.permissions },
    });
    dispatch(
      changeRolePermission({
        request: permission,
        callback: () => {
          dispatch(
            getAllRoles({
              is_deleted: isDeleted,
              tenantCode: tenant.tenantCode,
            })
          );
        },
      })
    );
  };

  useEffect(() => {
    if (userData.group == "admin" || userData.group == 'tenantAdmin') {
      setShow(true);
      return;
    } else {
      const tenant = {
        tenantCode: userData.tenantCode,
        tenantId: userData.tenantId,
        tenant_name: userData.tenantCode,
      };
      dispatch(setTenantId(tenant));
      setTenant(tenant);
    }
  }, [userData]);

  useEffect(() => {
    if (items && items.tenantCode) {
      setTenant(items);
    }
  }, []);

  useEffect(() => {
    if (roleList && roleList?.getAllRoles) {
      const roles = roleList.getAllRoles.map((role: any, index: number) => {
        return {
          id: index,
          role_name: role.role_name,
          created_at: role.created_at,
          updated_at: role.updated_at,
          is_deleted: role.is_deleted,
          permission_pages: role.permission_pages,
          pk: role.pk,
          role_code: role.role_code,
          sk: role.sk,
        };
      });

      setRows(roles);

      const mainData: any = {};
      Promise.all(
        roleList?.getAllRoles?.map((obj: any) => {
          mainData[obj?.pk] = {
            permissions:
              obj?.permission_pages != null
                ? JSON.parse(obj?.permission_pages)
                : [],
          };
          return true;
        })
      );
      setMappedMenuData(mainData);
    }
  }, [roleList]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (tenant && tenant.tenantId) {
      dispatch(
        getAllRoles({ is_deleted: isDeleted, tenantCode: tenant.tenantCode })
      );
    }
  }, [tenant, isDeleted]);

  return (
    <Box
      sx={{
        padding: 1,
        width: "100%",
        minHeight: "200px",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        disableVirtualization
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        loading={loading}
        getRowHeight={() => 'auto'}
        hideFooter
        slots={{
          toolbar: QuickSearchToolbar,
          noRowsOverlay: () => (
            <Box sx={{
              alignItems: 'center', display: 'flex',
              justifyContent: 'center', height: "100%"
            }}>
              {!tenant?.tenantCode ? t("tenant.tenantSelectionRequired") : t("tenant.noRecordExists")}
            </Box>
          ),
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        sx={{
          minHeight: "80vh",
          ".MuiDataGrid-cell": {
            paddingBlock: "20px",
          },
        }}
      />
    </Box>
  );
};

export default UserRoleManagementTable;
