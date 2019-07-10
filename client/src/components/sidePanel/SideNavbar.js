import React from 'react';
// styles
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const AntTab = withStyles({
  root: {
    minWidth: 'auto',
    height: 70,
    flexGrow: 1,
  },
})(Tab);

const useStyles = makeStyles({
  root: {
    height: 70,
    flexShrink: 0,
    borderBottom: '1px solid #c4c4c4',
  },
});

const SideNavbar = ({ tab, onChange }) => {
    
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Tabs
        value={tab}
        onChange={onChange}
        indicatorColor='primary'
        textColor='primary'
      >
        <AntTab icon={<ChatOutlinedIcon />} disableRipple />
        <AntTab icon={<PersonOutlineIcon />} disableRipple />
      </Tabs>
    </div>
  );
}

export default SideNavbar;