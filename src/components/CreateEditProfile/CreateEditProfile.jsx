import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  InputLabel,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useThemeUpdate } from "../../context/themeContext";
const CreateEditProfile = () => {
  // const [open, setOpen] = useState(false);
  const { open, handleClose, editData } = useThemeUpdate();
  const [formValues, setFormValues] = useState({
    imageLink: editData ? editData.imageLink : "",
    firstName: editData ? editData.name : "",
    lastName: "",
    is_verified: editData ? editData.is_verified : false,
    email: editData ? editData.email : "",
    description: editData ? editData.description : "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues); // Replace with your own logic for submitting the form data
  };
  useEffect(() => {
    setFormValues({
      imageLink: editData ? editData.imageLink : "",
      firstName: editData ? editData.name : "",
      is_verified: editData ? editData.is_verified : false,
      email: editData ? editData.email : "",
      description: editData ? editData.description : "",
      lastName: editData ? editData.lastName : "",
    });
  }, [editData]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        sx={{
          "& .MuiPaper-root": {
            maxWidth: "768px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="p">
            {editData ? "Edit Profile" : "Create Profile"}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <InputLabel htmlFor="image-link">
                <Typography sx={{ mb: 0.5 }}>Image Link</Typography>
              </InputLabel>
              <TextField
                name="imageLink"
                id="image-link"
                value={formValues.imageLink}
                onChange={handleInputChange}
                fullWidth
                size="small"
              />
            </Box>
            <Stack sx={{ mb: 3 }} direction="row" spacing={3}>
              <Box width="100%">
                <InputLabel htmlFor="first-name">
                  <Typography sx={{ mb: 0.5 }}>First Name</Typography>
                </InputLabel>
                <TextField
                  name="firstName"
                  id="first-name"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  fullWidth
                  size="small"
                />
              </Box>
              <Box width="100%">
                <InputLabel htmlFor="last-name">
                  <Typography sx={{ mb: 0.5 }}>Last Name</Typography>
                </InputLabel>
                <TextField
                  name="lastName"
                  id="last-name"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  fullWidth
                  size="small"
                />
              </Box>
            </Stack>

            <Box sx={{ mb: 3 }}>
              <InputLabel htmlFor="email">
                <Typography sx={{ mb: 0.5 }}>Email</Typography>
              </InputLabel>
              <TextField
                name="email"
                id="email"
                value={formValues.email}
                onChange={handleInputChange}
                fullWidth
                size="small"
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <InputLabel htmlFor="description">
                <Typography sx={{ mb: 0.5 }}>Description</Typography>
              </InputLabel>
              <TextField
                name="description"
                id="description"
                value={formValues.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                placeholder="Write a description for the talent"
              />
            </Box>
            <Box>
              <InputLabel>
                <Typography sx={{ mb: 0.5 }}>Verification</Typography>
              </InputLabel>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 2,
                }}
                square
                elevation={0}
              >
                <Typography variant="body1">Talent is verified</Typography>
                <Switch
                  checked={formValues?.is_verified}
                  onChange={(e) => {
                    formValues((prevState) => ({
                      ...prevState,
                      is_verified: e.target.checked,
                    }));
                  }}
                />
              </Paper>
            </Box>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions
          sx={{
            paddingRight: 6,
            paddingBottom: 4,
            paddingTop: 4,
          }}
        >
          <Button onClick={handleClose} variant="contained" color="error">
            Create Profile
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateEditProfile;
