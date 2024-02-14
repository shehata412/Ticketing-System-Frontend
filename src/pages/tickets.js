import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import ReactPaginate from 'react-paginate';


const fetchTickets = async (setTickets, navigate) => {
    try{
        const token = Cookies.get('token');
        const response = await axios.get(process.env.REACT_APP_API_URL+'tickets', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setTickets(response.data);
    }catch (err) {
      if (err.response && err.response.status === 401) { // 401 Unauthorized
        navigate('/');
      } else {
        console.error(err);
      }
    }
  }

 const Tickets = ()=>{
    const navigate =  useNavigate();
    const [tickets, setTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const PER_PAGE = 10;
    const offset = currentPage * PER_PAGE;

    const handleCreateTicket = () => {
      navigate('/createticket');
    };

    const handleUpdateTicket = (id) => {
      navigate(`/ticket/${id}`);
    };

    const handleDeleteTicket = async (id) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this ticket?');
      if(confirmDelete){
        const token = Cookies.get('token');
        try{
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}ticket/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert(response.data.msg);
        fetchTickets(setTickets, navigate);
      }catch (err) {
        if (err.response && err.response.status === 401) { // 401 Unauthorized
          navigate('/');
        } else {
          console.error(err);
        }
      }
      }
      else{
        return;
      }
    };

    useEffect(() => {
        fetchTickets(setTickets, navigate);   
    }, [currentPage, navigate]);

    const sortedTickets = [...tickets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const currentPageData = sortedTickets.slice(offset, offset + PER_PAGE).reverse();
  return (
    <div className="container mx-auto px-4 py-6">
     <img src="/mts.png" alt="Logo" className="mx-auto h-24 w-24" />   
    <div className="flex items-center justify-between mb-6">
    <h1 className="text-2xl font-semibold">All Tickets</h1>
    <Link to="/createticket">
        <button onClick={handleCreateTicket} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-500 text-white">
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
            {currentPageData.reverse().map((ticket, index) =>{
                return(
                    <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{ticket.createdAt.split('T')[0]}</td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{ticket.title}</td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{ticket.description}</td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{ticket.priority}</td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{ticket.status}</td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                    <button onClick = {() => handleUpdateTicket(ticket.id)} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mr-2">
                        Update
                    </button>
                    <button onClick = {()=>handleDeleteTicket(ticket.id)} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-red-500">
                        Delete
                    </button>
                    </td>
                    </tr>
                    )})}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={Math.ceil(tickets.length / PER_PAGE)}
        onPageChange={({ selected: selectedPage }) => setCurrentPage(selectedPage)}
        containerClassName={"flex justify-end my-4"}
        pageLinkClassName={"border px-3 py-2 mx-1 text-black no-underline"}
        previousLinkClassName={"border px-3 py-2 mx-1 text-black no-underline"}
        nextLinkClassName={"border px-3 py-2 mx-1 text-black no-underline"}
        disabledClassName={"opacity-50"}
        activeClassName={" font-bold text-white px-1 "}
      />
    </div>
  </div>
</div>
  )
}


export default Tickets;