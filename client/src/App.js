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
    <main>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      {tickets ?
        <Ticket tickets={tickets} />
        : null}
      {/* <Button onClick={getTickets}>get tickets</Button> */}
    </main>
  );
}

export default App;
