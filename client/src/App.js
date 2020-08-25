import React, { useEffect, useState } from 'react';
import Ticket from './components/Ticket';
import axios from 'axios';
import './App.css';
import { Button, TextField } from '@material-ui/core';





function App() {

  const [tickets, setTickets] = useState()

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


  // // which tickets to show
  // const isShown = () => {
  //   const cloneTickets = tickets.slice();
  //   cloneTickets.forEach((ticket) => {
  //     if (ticket.showTicket = true) {
  //       return true;
  //     } else return false;
  //   })
  //   setTickets(cloneTickets)
  //   return cloneTickets.showTicket;
  // }

  return (
    <main style={{ display: 'grid', justifyContent: 'center', paddingTop: 10, justifySelf: 'center' }}>
      <TextField style={{ justifySelf: 'center' }} id="searchInput" label="Search" variant="outlined" autoFocus
        onChange={e => searchFunc(e.target.value)}
      />
      {tickets ?
        <>
          <span>
            <h4 style={{ color: 'gray' }}>Showing {tickets.length} results </h4>
          </span>
          {tickets.map((item) =>
            <Ticket item={item} />
          )}
        </>
        : null}

    </main>
  );
}

export default App;
