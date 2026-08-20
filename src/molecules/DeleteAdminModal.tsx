import { LoadingButton } from "@mui/lab";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { hideModal, modalLoading } from "store/slice/modalSlice";
import { RootState, useAppDispatch } from "store/store";

interface DeleteAdminModalProps {
  modal?: "Delete" | "Recover";
  data: any;
  deleteAdmin?: any;
  recoverAdmin?: any;
}

const DeleteAdminModal = ({
  modal = "Delete",
  data,
  deleteAdmin,
  recoverAdmin
}: DeleteAdminModalProps) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector((state: RootState) => state.modalReducer);

  return (
    <div>
      <DialogTitle
        sx={{ mb: 0 }}
        style={{ cursor: "move" }}
        id="draggable-dialog-title"
      >
        {modal === "Delete" ? "Delete" : "Recover"} User
        <DialogContentText>
          <Typography sx={{ mt: 2 }}>{data.name}</Typography>
        </DialogContentText>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to {modal === "Delete" ? "delete" : "recover"}{" "}
          this User?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => dispatch(hideModal())}>
          Cancel
        </Button>
        <LoadingButton
          loading={isLoading}
          color={"error"}
          variant="contained"
          onClick={() => {
            modal === "Delete" ? deleteAdmin(data) : recoverAdmin(data);
          }}
        >
          {modal === "Delete" ? "Delete" : "Recover"}
        </LoadingButton>
      </DialogActions>
    </div>
  );
};

export default DeleteAdminModal;
