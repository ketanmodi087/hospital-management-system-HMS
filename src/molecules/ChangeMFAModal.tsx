import {
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { hideModal } from "store/slice/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";
import { t } from "i18next";

interface Props {
  data: any;
  changeMFAStatus: any;
  modal?: "TenantUser" | "Tenant";
}

const ChangeMFAModal = ({ data, changeMFAStatus, modal = "Tenant" }: Props) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.modalReducer);

  return (
    <div>
      <DialogTitle
        sx={{ mb: 0 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between', fontWeight: "bold", color: "#232323"
        }}
        id="draggable-dialog-title"
      >
        {data.enable_mfa === "ON" ? "Disabled MFA" : t("tenant.enableMfa")}
        <span style={{ cursor: 'pointer' }} onClick={() => dispatch(hideModal())}>
          <CloseIcon />
        </span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <DialogContentText>
            <Typography>
              {modal === "TenantUser" &&
                t("tenant.toggleMFAUser", {
                  action: data.enable_mfa === "ON" ? "disable" : "enable",
                  name: data.name
                })}

              {modal === "Tenant" &&
                t("tenant.toggleMFATenant", {
                  action: data.enable_mfa === "ON" ? "disable" : "enable",
                  tenant: data.tenant_name,
                  result: data.enable_mfa === "ON" ? "disabled" : "enabled"
                })}
            </Typography>
          </DialogContentText>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(hideModal())}>
          {t("tenant.cancel")}
        </Button>
        <LoadingButton
          loading={isLoading}
          color={"error"}
          variant="contained"
          onClick={() =>
            changeMFAStatus(data.enable_mfa === "ON" ? false : true, data)
          }
        >
          {data.enable_mfa === "ON" ? t("tenant.disableMFA") : t("tenant.enableMfa")}
        </LoadingButton>
      </DialogActions>
    </div>
  );
};

export default ChangeMFAModal;
