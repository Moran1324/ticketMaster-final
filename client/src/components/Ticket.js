import React from 'react'
import './Ticket.css';
import { ListItem, List, ListItemText, Tooltip, Zoom, ListSubheader, Divider, withWidth, Button } from '@material-ui/core'
import Label from './Label';


function Ticket(props) {

    return (
        <div id="container">
            <h1>tickets</h1>
            <List>
                {props.tickets.map((item) =>
                    <>
                        <Tooltip key={item.id} title={`${new Date(item.creationTime)}`} arrow TransitionComponent={Zoom}>
                            <ListItem key={item.id} >
                                <ListItemText primary={item.title} secondary={item.content} />
                                <Button>Hide</Button>
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
                    </>
                )}
            </List>
        </div>
    )
}

export default Ticket
