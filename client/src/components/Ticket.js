import React, { useState, useEffect } from 'react';
import {
  ListItem, List, ListItemText, Tooltip, Zoom, ListSubheader, Divider, Button, Checkbox,
} from '@material-ui/core';
import ReadMoreAndLess from 'react-read-more-less';
import axios from 'axios';
import Label from './Label';

function Ticket(props) {
  const [show, setShow] = useState(true);
  const [checked, setChecked] = useState(false);

  const { item } = props;

  // when done on server, load ticket as done
  useEffect(() => {
    if (item.done){
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);

  // show ticket when hide counter resets
  useEffect(() => {
    if (props.hideCounter === 0) {
      setShow(true);
    }
  }, [props.hideCounter]);

  // udpate server when ticket is checked or unchecked
  const handleChange = async (e) => {
    item.done = e.target.checked;
    setChecked(e.target.checked);
    if (e.target.checked) {
      await axios.post(`/api/tickets/${item.id}/done`);
    } else {
      await axios.post(`/api/tickets/${item.id}/undone`);
    }
  };

  return (
    <div className="ticketContainer">
      <div
        className={show ? 'ticket' : 'hideTicket'}
        style={checked ? { backgroundColor: 'rgb(8, 133, 50)', color: 'white' } : { backgroundColor: 'rgb(255, 216, 169)' }}
      >
        <List className='ticketData' >
          <Tooltip key={item.id} title={`${new Date(item.creationTime)}`} arrow TransitionComponent={Zoom}>
            <ListItem key={item.id}>
              <ListItemText
                style={{ maxWidth: 'inherit' }}
                primary={item.title}
                secondary={(
                  <ReadMoreAndLess
                    className="read-more-content"
                    charLimit={50}
                    readMoreText="Read more"
                    readLessText="Read less"
                  >
                    {item.content}
                  </ReadMoreAndLess>
                )}
              />
            </ListItem>
          </Tooltip>
          <ListSubheader disableGutters disableSticky component="div">
            <ListItemText secondary={item.userEmail} />
            {item.labels
              ? <Label labels={item.labels} />
              : null}
          </ListSubheader>
          <Divider variant="inset" component="li" />
        </List>
              <Button
                onClick={() => {
                  setShow(false);
                  props.setHideCounter(props.hideCounter + 1);
                }}
                style={{ textTransform: 'none' }}
                className="hideTicketButton"
                variant="text"
              >
                Hide
              </Button>
              <Checkbox checked={checked} onChange={handleChange} className='checkBox' />
      </div>
    </div>
  );
}

export default Ticket;
