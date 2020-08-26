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


  return (
    <main style={{ display: 'grid', justifyContent: 'center', paddingTop: 15, justifySelf: 'center' }} className={'main'}>
      <TextField style={{ justifySelf: 'center' }} id="searchInput" label="Search" variant="outlined" autoFocus
        onChange={e => searchFunc(e.target.value)}
      />
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

    </main>
  );
}

export default App;
