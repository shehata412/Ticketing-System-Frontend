import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';


const token = Cookies.get('token');
if(!token) window.location.href = '/';

const fetchTickets = async (setTickets) => {
    try{
        const response = await axios.get('http://localhost:8000/tickets', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setTickets(response.data);
        console.log(response);
    } catch (err) {
        console.log(err);
    }
}

 const Tickets = ()=>{
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetchTickets(setTickets);   
    }, []);
    

  return (
    <div className="container mx-auto px-4 py-6">
     <img src="/mts.png" alt="Logo" class="mx-auto h-24 w-24" />   
    <div className="flex items-center justify-between mb-6">
    <h1 className="text-2xl font-semibold">Tickets</h1>
    <Link to="/createticket">
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-500 text-white">
            Create New Ticket
        </button>
    </Link>
</div>
  <div className="border rounded-lg w-full">
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&amp;_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
              Date
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
              Title
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
              Description
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
              Priority
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
              Status
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="[&amp;_tr:last-child]:border-0">
            {tickets.reverse().map((ticket, index) =>{
                return(
                    <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{ticket.createdAt.split('T')[0]}</td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{ticket.title}</td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{ticket.description}</td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{ticket.priority}</td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{ticket.status}</td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mr-2">
                        Update
                    </button>
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-red-500">
                        Delete
                    </button>
                    </td>
                    </tr>
                    )})}
        </tbody>
      </table>
    </div>
  </div>
</div>
  )
}


export default Tickets;