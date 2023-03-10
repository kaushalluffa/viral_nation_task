import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import MoreVert from "@mui/icons-material/MoreVert";
import { useTheme } from "@mui/material";

const DropdownMenu = ({ onEdit, onDelete }) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box >
        <IconButton onClick={handleMenuOpen}>
          <MoreVert sx={{
            color: theme.palette.grey[500]
          }} />
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
