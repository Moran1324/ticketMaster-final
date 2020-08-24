import React from 'react'
import { ListItem, List, ListItemText, Tooltip, Zoom, ListSubheader, Divider, withWidth, Button } from '@material-ui/core'


function Ticket(props) {
    return (
        <div>
            <h1>tickets</h1>
            <List>
                {props.tickets.map((item) =>
                    <>
                        <Tooltip key={item.id} title={`${new Date(item.creationTime)}`} arrow TransitionComponent={Zoom}>
                            <ListItem key={item.id} >
                                <ListItemText primary={item.title} secondary={item.content} />
                            </ListItem>
                        </Tooltip>
                        <ListSubheader disableGutters={true} disableSticky={true} component="div">
                            <ListItemText secondary={item.userEmail} />
                        </ListSubheader>
                        <Divider variant="inset" component="li" />
                    </>
                )}
            </List>
        </div>
    )
}

export default Ticket
