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

interface Props {
  data: any;
  changeMFAStatus: any;
}

const ChangeUserMFAModal = ({ data, changeMFAStatus }: Props) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.modalReducer);
  const { t } = useTranslation();
  return (
    <div>
      <DialogTitle
        sx={{ mb: 0 }}
        style={{
          fontWeight: "bold", color: "#232323", display: 'flex',
          justifyContent: 'space-between'
        }}
        id="draggable-dialog-title"
      >
        {t("tenant.mfa.title", { action: data.enable_mfa === "ON" ? "Disabled" : "Enable" })}
        <span style={{ cursor: 'pointer' }} onClick={() => dispatch(hideModal())}>
          <CloseIcon />
        </span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <DialogContentText>
            <Typography>
              {t("tenant.mfa.toggleMFAUserMessage", { name: data.name, action: data.enable_mfa === "ON" ? "Disabled" : "Enable" })}

            </Typography>
            <Typography></Typography>
          </DialogContentText>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(hideModal())}>
          {t("tenant.mfa.cancelButtonLabel")}
        </Button>
        <LoadingButton
          loading={isLoading}
          color={"error"}
          variant="contained"
          onClick={() =>
            changeMFAStatus(data.enable_mfa === "ON" ? false : true, data)
          }
        >
          {t("tenant.mfa.confirmButtonLabel", { action: data.enable_mfa === "ON" ? "Disabled" : "Enable" })}
        </LoadingButton>
      </DialogActions>
    </div>
  );
};

export default ChangeUserMFAModal;
