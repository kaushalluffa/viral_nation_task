import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Box} from "@mui/material";
import { MoreVert } from "@mui/icons-material";

const DropdownMenu = ({ onEdit, onDelete,  }) => {
 
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
