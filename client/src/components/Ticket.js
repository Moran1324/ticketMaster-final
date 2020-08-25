import React, { useState } from 'react'
import './Ticket.css';
import { ListItem, List, ListItemText, Tooltip, Zoom, ListSubheader, Divider, withWidth, Button } from '@material-ui/core'
import Label from './Label';

function Ticket(props) {

    const [show, setShow] = useState(true);

    const { item } = props;

    return (
        <div id="container">
            <div className={show ? 'ticket' : 'hideTicket'}>
                <List>
                    <Tooltip key={item.id} title={`${new Date(item.creationTime)}`} arrow TransitionComponent={Zoom}>
                        <ListItem key={item.id} >
                            <ListItemText primary={item.title} secondary={item.content} />
                            <Button
                                onClick={() => {
                                    setShow(false)
                                }}
                                style={{ textTransform: 'none' }} id='hideTicketButton' variant='text'
                            >Hide</Button>
                        </ListItem>
                    </Tooltip>
                    <ListSubheader disableGutters={true} disableSticky={true} component="div">
                        <ListItemText secondary={item.userEmail} />
                        {item.labels ?
                            <Label labels={item.labels} /> :
                            null
                        }
                    </ListSubheader>
                    <Divider variant="inset" component="li" />
                </List>
            </div>
        </div>
    )
}

export default Ticket
