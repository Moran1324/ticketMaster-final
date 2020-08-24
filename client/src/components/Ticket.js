import React from 'react'
import { ListItem, List, ListItemText, Tooltip, Zoom } from '@material-ui/core'


function Ticket(props) {
    return (
        <div>
            <h1>tickets</h1>
            <List>
                {props.tickets.map((item) =>
                    <Tooltip key={item.id} title={item.userEmail} arrow TransitionComponent={Zoom}>
                        <ListItem key={item.id} style={{ textAlign: 'center' }}>
                            <ListItemText primary={item.content} secondary={item.title} />
                        </ListItem>
                    </Tooltip>
                )}
            </List>
        </div>
    )
}

export default Ticket
