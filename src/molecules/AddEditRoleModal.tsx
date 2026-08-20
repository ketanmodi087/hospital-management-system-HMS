import { LoadingButton } from "@mui/lab";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from "@mui/material";
import { t } from "i18next";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { hideModal, modalLoading } from "store/slice/modalSlice";
import { RootState, useAppDispatch } from "store/store";

interface AddEditRoleModalProps {
  modalData: any;
  updateRole: (data: any) => void;
}

interface ErrorFields {
  role_name: string;
}

const AddEditRoleModal = ({ modalData, updateRole }: AddEditRoleModalProps) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector((state: RootState) => state.modalReducer);

  const [roleData, setRoleData] = useState<any>(
    modalData || { role_name: "" }
  );
  const [errors, setErrors] = useState({
    role_name: ""
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    // Check if the name exists in errors and clear the error if present
    if (errors[name as keyof ErrorFields]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name as keyof ErrorFields]: "", // Clear the error for the specific field
      }));
    }

    setRoleData({
      ...roleData,
      [name]: value,
    });
  };

  const isValidate = (data: { role_name: string }) => {
    let errorStatus = false;
    let error: { role_name: string } = {
      role_name: "",
    };

    // Trim values before validation
    const trimmedRoleName = data.role_name?.trim();

    if (!trimmedRoleName) {
      errorStatus = true;
      error.role_name = "Role name is required"; // Provide a meaningful error message
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...error }));
    return errorStatus;
  };


  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    const status = isValidate(roleData);
    if (status === false) {
      dispatch(modalLoading(true));
      updateRole(roleData);
    }
  };

  return (
    <form onSubmit={handleUpdate} noValidate>
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {modalData.pk
          ? t("tenant.editRoleName") // e.g., "Edit Role Name"
          : t("tenant.createNewRoleName")}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="role_name"
              label={t("tenant.roleName")}
              name="role_name"
              autoComplete="role_name"
              autoFocus
              value={roleData.role_name}
              onChange={handleChange}
              error={errors.role_name !== "" ? true : false}
              helperText={errors.role_name !== "" ? "Please Enter Name" : ""}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(hideModal())}>
          {t("tenant.cancel")}
        </Button>
        <LoadingButton
          loading={isLoading}
          color={"primary"}
          variant="contained"
          type="submit"
        >
          {modalData.pk ? t("tenant.update") : t("tenant.create")}
        </LoadingButton>
      </DialogActions>
    </form>
  );
};

export default AddEditRoleModal;
