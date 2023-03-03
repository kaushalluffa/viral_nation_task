import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Box, useTheme } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { DELETE_PROFILE } from "../../utils/queries/deleteProfile";

const DropdownMenu = ({ onEdit, onDelete, data: { id } }) => {
  // console.log(onEdit)
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <IconButton onClick={handleMenuOpen}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={onEdit}>Edit profile</MenuItem>
          <MenuItem onClick={onDelete}>Delete profile</MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default DropdownMenu;
