import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material";
import { useState } from "react";
import { DELETE_PROFILE } from "../../utils/queries/deleteProfile";
import { useMutation } from "@apollo/client";
const DeleteModal = ({ openModal, handleModalClose, id }) => {
  const [buttonText, setButtonText] = useState("Delete");
  const [
    deleteProfile,
    { data: deleteResponseData, loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_PROFILE);
  function deleteProfileHandler(id) {
    deleteProfile({ variables: { deleteProfileId: id } });
  }
  const theme = useTheme();

  return (
    <div>
      <Dialog
        open={openModal || false}
        onClose={handleModalClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiPaper-root": {
            maxWidth: "400px",
          },
        }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h7">Remove Profile</Typography>
          <IconButton onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            {/* <Typography variant="body2"> */}
            Removed profile will be deleted permanently and won't be available
            anymore.
            {/* </Typography> */}
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Button
            autoFocus
            onClick={handleModalClose}
            variant="outlined"
            fullWidth
            disableElevation
            sx={{
              bgcolor:
                theme.palette.mode === "light"
                  ? theme.palette.grey[300]
                  : theme.palette.grey[900],
              color:
                theme.palette.mode === "light"
                  ? theme.palette.grey[900]
                  : theme.palette.common.white,
              border: "none",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "light"
                    ? theme.palette.grey[300]
                    : theme.palette.grey[900],
              },
              "&:active": {
                backgroundColor:
                  theme.palette.mode === "light"
                    ? theme.palette.grey[300]
                    : theme.palette.grey[900],
              },
            }}
          >
            Cancel
          </Button>
          <Button
            disableElevation
            onClick={() => {
              // deleteUserHandler();
              deleteProfileHandler(id);
              if (deleteLoading) setButtonText("Deleting");
              if (deleteError) setButtonText("Try again");
              handleModalClose();
            }}
            autoFocus
            color="error"
            variant="contained"
            fullWidth
          >
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
