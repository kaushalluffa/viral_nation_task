import { Alert, Box } from '@mui/material';
import React from 'react'

const Error = ({message}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Alert variant="filled" severity="error">
        {message}
      </Alert>
    </Box>
  );
}

export default Error