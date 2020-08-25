import React, { useEffect, useState } from 'react';
import Ticket from './components/Ticket';
import axios from 'axios';
import './App.css';
import { Button, TextField } from '@material-ui/core';





function App() {

  const [tickets, setTickets] = useState();
  const [hideCounter, setHideCounter] = useState(0);

  // load all tickets as component mounts
  useEffect(() => {
    const getTickets = async () => {
      let { data } = await axios.get('/api/tickets');
      data.forEach((ticket) => ticket.showTicket = true);
      setTickets(data);
    }
    getTickets();
  }, [])

  // get filtered tickets from server by search value
  const searchFunc = async (searchValue) => {
    if (searchValue) {
      let { data } = await axios.get(`/api/tickets?searchText=${searchValue}`);
      data.forEach((ticket) => ticket.showTicket = true);
      setTickets(data);
    }
  }


  return (
    <main style={{ display: 'grid', justifyContent: 'center', paddingTop: 10, justifySelf: 'center' }}>
      <TextField style={{ justifySelf: 'center' }} id="searchInput" label="Search" variant="outlined" autoFocus
        onChange={e => searchFunc(e.target.value)}
      />
      {tickets ?
        <>
          <span>
            <h4 style={{ color: 'gray' }}>Showing {tickets.length} results</h4>
            {hideCounter > 0 ?
              <h4 style={{ color: 'gray' }}> ( <span id="hideTicketsCounter">{hideCounter}</span> Hidden )</h4>
              : null}
          </span>
          {tickets.map((item) =>
            <Ticket hideCounter={hideCounter} setHideCounter={setHideCounter} item={item} />
          )}
        </>
        : null}

    </main>
  );
}

export default App;
