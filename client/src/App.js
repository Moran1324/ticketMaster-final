import React, { useEffect, useState } from 'react';
import Ticket from './components/Ticket';
import NewTicketModal from './components/NewTicketModal';
import axios from 'axios';
import './App.css';
import { Button, TextField } from '@material-ui/core';

function App() {

  const [tickets, setTickets] = useState();
  const [hideCounter, setHideCounter] = useState(0);
  const [sort, setSort] = useState(true)
  const [newTicket, setNewTicket] = useState(false);

  // load all tickets as component mounts
  useEffect(() => {
    const getTickets = async () => {
      let { data } = await axios.get('/api/tickets');
      data.forEach((ticket) => ticket.done = false)
      setTickets(data);
    }
    getTickets();
  }, [])

  // get filtered tickets from server by search value
  const searchFunc = async (searchValue) => {
    if (searchValue) {
      let { data } = await axios.get(`/api/tickets?searchText=${searchValue}`);
      setTickets(data);
    }
  }

  // restore hidden and reset counter
  const restoreHidden = () => {
    setHideCounter(0);
  }

  // sort tickets by date first -> last
  const sortTicketsByDate = () => {
    const ticketsClone = tickets.slice();
    ticketsClone.sort((a, b) => sort ? a.creationTime - b.creationTime : b.creationTime - a.creationTime);
    setTickets(ticketsClone);
    setSort(!sort);
  }

  // handle adding new ticket
  const handleNewTicket = () => {
    setNewTicket(true);
  }

  return (
    <main style={{ display: 'grid', justifyContent: 'center', paddingTop: 15, justifySelf: 'center' }} className={'main'}>
      <TextField style={{ justifySelf: 'center' }} id="searchInput" label="Search" variant="outlined" autoFocus
        onChange={e => searchFunc(e.target.value)}
      />
      <Button onClick={handleNewTicket} style={{ textTransform: 'none' }} className={'newTicketButton'}>Add New Ticket</Button>
      <Button onClick={sortTicketsByDate} style={{ textTransform: 'none' }} className={'sortButton'}>Sort by Date</Button>
      {tickets ?
        <>
          <span>
            <h4 style={{ color: 'gray' }}>Showing {tickets.length} results</h4>
            {hideCounter > 0 ?
              <h4 style={{ color: 'gray' }}>
                ( <span id="hideTicketsCounter">{hideCounter}</span> Hidden )
                 <Button style={{ textTransform: 'none' }} id='restoreHideTickets' variant='text'
                  onClick={restoreHidden}>Restore Hidden</Button>
              </h4>
              : null}
          </span>
          {tickets.map((item) =>
            <Ticket hideCounter={hideCounter} setHideCounter={setHideCounter} item={item} />
          )}
        </>
        : null}
      {newTicket ?
        <NewTicketModal setNewTicket={setNewTicket} setTickets={setTickets} />
        : null}
    </main>
  );
}

export default App;
