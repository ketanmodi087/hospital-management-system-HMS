import { LoadingButton } from "@mui/lab";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { hideModal, modalLoading } from "store/slice/modalSlice";
import { RootState, useAppDispatch } from "store/store";

interface DeleteTenantUserModal {
  modal?: "Delete" | "Recover";
  data: any;
  deleteUser?: any;
  recoverUser?: any;
}

const DeleteTenantUserModal = ({
  modal = "Delete",
  data,
  deleteUser,
  recoverUser,
}: DeleteTenantUserModal) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector((state: RootState) => state.modalReducer);
  const { t } = useTranslation();
  return (
    <div>
      <DialogTitle
        sx={{ mb: 0 }}
        style={{ cursor: "move" }}
        id="draggable-dialog-title"
      >
        {t(`tenant.${modal === "Delete" ? "deleteModal" : "recoverModal"}.${data.length > 0 ? "title1" : "title2"}`)}
        <DialogContentText>
          <Typography sx={{ mt: 2 }}>{data.name}</Typography>
        </DialogContentText>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t(`tenant.${modal === "Delete" ? "deleteModal" : "recoverModal"}.${data.length > 0 ? "message1" : "message2"}`)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(hideModal())}>
          {t(`tenant.${modal === "Delete" ? "deleteModal" : "recoverModal"}.cancelButtonLabel`)}
        </Button>
        <LoadingButton
          loading={isLoading}
          color={"error"}
          variant="contained"
          onClick={() => {
            modal === "Delete" ? deleteUser(data) : recoverUser(data);
          }}
        >
          {t(`tenant.${modal === "Delete" ? "deleteModal" : "recoverModal"}.confirmButtonLabel`)}
        </LoadingButton>
      </DialogActions>
    </div>
  );
};

export default DeleteTenantUserModal;
