import { useState } from "react";
import {
  Button,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  Dialog,
  Alert,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  InputLabel,
  Paper,
  Snackbar,
  Stack,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@apollo/client";
import { CREATE_PROFILE } from "../../utils/queries/createProfile";
import { UPDATE_PROFILE } from "../../utils/queries/updateProfile";
import { GET_ALL_PROFILES } from "../../utils/queries/getAllProfiles";
import { validation } from "../../utils/handlers/validation";

const CreateEditProfile = ({
  openModal,
  handleCloseModal,
  type,
  currentData,
}) => {
  const theme = useTheme();
  const [formValues, setFormValues] = useState(
    currentData || {
      image_url: "",
      first_name: "",
      last_name: "",
      is_verified: true,
      email: "",
      description: "",
      id: "",
    }
  );
  const [error, setError] = useState({});
  const [createProfileFunc, { loading: createLoading, error: createError }] =
    useMutation(CREATE_PROFILE, {
      refetchQueries: [{ query: GET_ALL_PROFILES }, "GetAllProfiles"],
    });
  const [editProfileFunc, { loading: editLoading, error: editError }] =
    useMutation(UPDATE_PROFILE);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
    setError({});
  };

  const handleSubmit = (event, typeOfOperation) => {
    event.preventDefault();
    const {
      first_name,
      last_name,
      email,
      id,
      image_url,
      description,
      is_verified,
    } = formValues;

    const variables = {
      firstName: first_name,
      lastName: last_name,
      description: description,
      email: email,
      isVerified: is_verified,
      id: id,
      imageUrl: image_url,
    };
    if (typeOfOperation.toLowerCase() === "create") {
      createProfileFunc({
        variables: variables,
      });
    }
    if (typeOfOperation.toLowerCase() === "edit") {
      editProfileFunc({
        variables: { ...variables, updateProfileId: variables.id },
      });
    }
  };

  return (
    <div>
      {(createLoading || editLoading) && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {(createError || editError) && (
        <Snackbar open={!createError || editError} autoHideDuration={4000}>
          <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
            There is error completing your request please refresh and try again
          </Alert>
        </Snackbar>
      )}
      <Dialog
        open={openModal || false}
        onClose={handleCloseModal}
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
            {`${type} Profile`}
          </Typography>
          <IconButton onClick={handleCloseModal}>
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
                name="image_url"
                id="image-link"
                value={formValues.image_url}
                onChange={handleInputChange}
                fullWidth
                size="small"
                required
              />
            </Box>
            <Stack sx={{ mb: 3 }} direction="row" spacing={3}>
              <Box width="100%">
                <InputLabel htmlFor="first-name">
                  <Typography sx={{ mb: 0.5 }}>First Name</Typography>
                </InputLabel>
                <TextField
                  name="first_name"
                  id="first-name"
                  value={formValues.first_name}
                  onChange={handleInputChange}
                  fullWidth
                  size="small"
                  error={error.first_name && true}
                  helperText={error.first_name && `${error.first_name}`}
                />
              </Box>
              <Box width="100%">
                <InputLabel htmlFor="last-name">
                  <Typography sx={{ mb: 0.5 }}>Last Name</Typography>
                </InputLabel>
                <TextField
                  name="last_name"
                  id="last-name"
                  value={formValues.last_name}
                  onChange={handleInputChange}
                  fullWidth
                  size="small"
                  error={error.last_name && true}
                  helperText={error.last_name && `${error.last_name}`}
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
                error={error.email && true}
                helperText={error.email && `${error.email}`}
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
                  bgcolor:
                    theme.palette.mode === "light"
                      ? theme.palette.grey[300]
                      : theme.palette.grey[900],
                }}
                square
                elevation={0}
              >
                <Typography variant="body1">Talent is verified</Typography>

                <Switch
                  checked={formValues.is_verified}
                  onChange={(e) => {
                    setFormValues((prevFormValues) => ({
                      ...prevFormValues,
                      is_verified: e.target.checked,
                    }));
                  }}
                  name="checked"
                  color="primary"
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
          <Button
            onClick={(e) => {
              const isValid = validation(formValues, setError);

              if (isValid && Object.keys(error).length <= 0) {
                handleSubmit(e, type);
                handleCloseModal();
              }
            }}
            variant="contained"
            color="primary"
            disableElevation
            sx={{
              color: theme.palette.common.white,
            }}
          >
            {`${type} Profile`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateEditProfile;
