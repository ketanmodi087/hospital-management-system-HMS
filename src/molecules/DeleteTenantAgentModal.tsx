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
import { hideModal } from "store/slice/modalSlice";
import { RootState, useAppDispatch } from "store/store";

interface DeleteTenantAgentModal {
  modal?: "Delete" | "Recover";
  data: any;
  deleteAgent?: any;
  recoverAgent?: any;
  multiple?: boolean
}

const DeleteTenantAgentModal = ({
  modal = "Delete",
  data,
  deleteAgent,
  recoverAgent,
  multiple = true
}: DeleteTenantAgentModal) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector((state: RootState) => state.modalReducer);

  return (
    <div>
      <DialogTitle
        sx={{ mb: 0 }}
        style={{ cursor: "move" }}
        id="draggable-dialog-title"
      >
        {modal === "Delete" ? "Delete" : "Recover"}{" "}
        {data.length > 0 ? "Agents" : "Agent"}
        <DialogContentText>
          <Typography sx={{ mt: 2 }}>{data.name}</Typography>
        </DialogContentText>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to {modal === "Delete" ? "delete" : "recover"}{" "}
          this {data.length > 0 ? "Agents" : "Agent"}
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
            modal === "Delete" ? deleteAgent(data) : recoverAgent(multiple ? data : [data.agentId]);
          }}
        >
          {modal === "Delete" ? "Delete" : "Recover"}
        </LoadingButton>
      </DialogActions>
    </div>
  );
};

export default DeleteTenantAgentModal;
