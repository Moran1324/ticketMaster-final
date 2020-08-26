import React, { useState, useEffect } from 'react'
import { ListItem, List, ListItemText, Tooltip, Zoom, ListSubheader, Divider, withWidth, Button } from '@material-ui/core'
import Label from './Label';
import ReadMoreAndLess from 'react-read-more-less';

function Ticket(props) {

    const [show, setShow] = useState(true);

    const { item } = props;

    useEffect(() => {
        if (props.hideCounter === 0) {
            setShow(true);
        }
    }, [props.hideCounter])

    return (
        <div id="container">
            <div className={show ? 'ticket' : 'hideTicket'}>
                <List>
                    <Tooltip key={item.id} title={`${new Date(item.creationTime)}`} arrow TransitionComponent={Zoom}>
                        <ListItem key={item.id} >
                            <ListItemText style={{ maxWidth: 'inherit' }} primary={item.title} secondary={
                                <ReadMoreAndLess
                                    className="read-more-content"
                                    charLimit={300}
                                    readMoreText="Read more"
                                    readLessText="Read less"
                                >
                                    {item.content}
                                </ReadMoreAndLess>
                            }
                            />
                            <Button
                                onClick={() => {
                                    setShow(false)
                                    props.setHideCounter(props.hideCounter + 1)
                                }}
                                style={{ textTransform: 'none' }} className={'hideTicketButton'} variant='text'
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
