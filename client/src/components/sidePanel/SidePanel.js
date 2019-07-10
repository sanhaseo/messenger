import React, { useState } from 'react';
// components
import SideNavbar from './SideNavbar';
import ConversationBanner from './conversationPanel/ConversationBanner'
import ConversationList from './conversationPanel/ConversationList';
import ContactBanner from './contactPanel/ContactBanner'
import ContactList from './contactPanel/ContactList';
// styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '30%',
    borderRight: '1px solid #c4c4c4',
    display: 'flex',
    flexDirection: 'column',
  },
});

const SidePanel = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };
  
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SideNavbar tab={tab} onChange={handleChange} />
      {tab === 0 && (
        <div>
          <ConversationBanner />
          <ConversationList />
        </div>
      )}
      {tab === 1 && (
        <div>
          <ContactBanner />
          <ContactList />
        </div>
      )}
    </div>
  );
};

export default SidePanel;