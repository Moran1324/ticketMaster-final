const express = require('express');
const fs = require('fs').promises;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get all tickets or by search value
app.get('/api/tickets', async (req, res) => {
    let allTickets = await fs.readFile('./data.json', { encoding: 'utf-8' });
    allTickets = JSON.parse(allTickets);
    const searchVal = req.query.searchText;
    if (searchVal) {
        const filteredTickets = allTickets.filter(ticket =>
            ticket.title.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1)
        res.send(filteredTickets);
    } else {
        res.send(allTickets);
    }
})

app.post('/api/tickets/:ticketId/done', async (req, res) => {
    let allTickets = await fs.readFile('./data.json', { encoding: 'utf-8' });
    allTickets = JSON.parse(allTickets);
    for (let ticket of allTickets) {
        if (ticket.id === req.params.ticketId) {
            ticket.done = true;
            res.send(`${ticket.title}` + ' is Done');
        }
    }
    fs.writeFile('./data.json', JSON.stringify(allTickets));


})

app.post('/api/tickets/:ticketId/undone', async (req, res) => {
    let allTickets = await fs.readFile('./data.json', { encoding: 'utf-8' });
    allTickets = JSON.parse(allTickets);
    for (let ticket of allTickets) {
        if (ticket.id === req.params.ticketId) {
            ticket.done = false;
            res.send(`${ticket.title}` + ' is unDone');
        }
    }
    fs.writeFile('./data.json', JSON.stringify(allTickets));


})

module.exports = app;
