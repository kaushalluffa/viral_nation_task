import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Divider, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const DeleteModal = ({ openModal, handleModalClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openModal}
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
            onClick={handleModalClose}
            autoFocus
            color="error"
            variant="contained"
            fullWidth
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
