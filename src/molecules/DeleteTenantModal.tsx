import {
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { hideModal } from "store/slice/modalSlice";
import { RootState, useAppDispatch } from "store/store";
import { t } from "i18next";

interface Props {
  modal: "Delete" | "Recover";
  data: any;
  disabled?: boolean;
  deleteTenant?: any;
  recoverTenant?: any;
}

const DeleteTenantModal = ({
  modal = "Delete",
  data,
  disabled = false,
  deleteTenant,
  recoverTenant,
}: Props) => {
  const dispatch = useAppDispatch();

  const { isLoading } = useSelector((state: RootState) => state.modalReducer);

  return (
    <div>
      <DialogTitle
        sx={{ mb: 0 }}
        style={{ cursor: "move" }}
        id="draggable-dialog-title"
      >
        {modal === "Delete" ? t("tenant.delete") : t("tenant.recover")} Tenant
        <DialogContentText>
          <Typography sx={{ mt: 2 }}>{data.tenant_name}</Typography>
        </DialogContentText>
      </DialogTitle>
      <DialogContent>
        {disabled ? (
          <DialogContentText>
            {t("tenant.cannotDeleteTenant")}
          </DialogContentText>
        ) : (
          <DialogContentText>
            {modal === "Delete"
              ? t("tenant.deleteTenantMsg")
              : t("tenant.recoverTenant")}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(hideModal())}>
          {t("tenant.cancel")}
        </Button>
        <LoadingButton
          disabled={disabled}
          loading={isLoading}
          color={"error"}
          variant="contained"
          onClick={() => {
            modal === "Delete" ? deleteTenant(data.id) : recoverTenant(data);
          }}
        >
          {modal === "Delete" ? t("tenant.delete") : t("tenant.recover")}
        </LoadingButton>
      </DialogActions>
    </div>
  );
};

export default DeleteTenantModal;
