import React, { useState } from 'react';
// styles
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

const ContactItemMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle menu button click.
  const handleMenuClick = event => {
    setAnchorEl(event.target);
  };

  // Handle menu close.
  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem dense disabled>
          <Typography variant="body2">Conversation</Typography>
        </MenuItem>
        <MenuItem dense disabled>
          <Typography variant="body2">Profile</Typography>
        </MenuItem>
        <MenuItem dense disabled>
          <Typography variant="body2">Delete</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ContactItemMenu