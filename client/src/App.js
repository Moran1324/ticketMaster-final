import React, { useEffect, useState } from 'react';
import Ticket from './components/Ticket';
import axios from 'axios';
import './App.css';
import { Button, TextField } from '@material-ui/core';





function App() {

  const [tickets, setTickets] = useState()

  useEffect(() => {
    const getTickets = async () => {
      let { data } = await axios.get('/api/tickets');
      setTickets(data);
    }
    getTickets();
  }, [])


  // onChange={filterTickets}
  return (
    <main style={{ display: 'grid', justifyContent: 'center', paddingTop: 10, justifySelf: 'center' }}>
      <TextField style={{ justifySelf: 'center' }} id="outlined-basic" label="Outlined" variant="outlined" autoFocus />
      {tickets ?
        <Ticket tickets={tickets} />
        : null}
    </main>
  );
}

export default App;
