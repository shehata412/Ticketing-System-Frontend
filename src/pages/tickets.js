import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Changelang } from "../components/Changelang";
import  StandardButton from "../components/StandardButton";
import TicketActionButton from "../components/TicketActionButton";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const fetchTickets = async (
  setTickets,
  navigate,
  setIsAdmin,
  filteredStatus
) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "tickets",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (filteredStatus !== "All") {
      const filteredTickets = response.data.tickets.filter(
        (ticket) => ticket.status === filteredStatus
      );
      setTickets(filteredTickets);
      return;
    }
    setTickets(response.data.tickets);
    if (response.data.isAdmin) {
      setIsAdmin(true);
    }
  } catch (err) {
    if (err.response && err.response.status === 401) {
      // 401 Unauthorized
      navigate("/");
    } else {
      console.error(err);
    }
  }
};

const Tickets = () => {
  const { t } = useTranslation();
  const lng = i18n.language;
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState("All");

  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;

  const handleCreateTicket = () => {
    navigate("/createticket");
  };

  const handleUpdateTicket = (id) => {
    navigate(`/ticket/${id}`);
  };

  const handleDeleteTicket = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );
    if (confirmDelete) {
      const token = Cookies.get("token");
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}ticket/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert(response.data.msg);
        fetchTickets(setTickets, navigate, setIsAdmin, filteredStatus);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // 401 Unauthorized
          navigate("/");
        } else {
          console.error(err);
        }
      }
    } else {
      return;
    }
  };

  const handleClosedTicket = async (id) => {
    const token = Cookies.get("token");
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}ticket/status/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTickets(setTickets, navigate, setIsAdmin, filteredStatus);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // 401 Unauthorized
        navigate("/");
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchTickets(setTickets, navigate, setIsAdmin, filteredStatus);
  }, [currentPage, navigate, filteredStatus]);

  const sortedTickets = [...tickets].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const currentPageData = sortedTickets
    .slice(offset, offset + PER_PAGE)
    .reverse();
  return (
    <div className="container mx-auto px-4 py-6">
      <img src="/mts.png" alt="Logo" className="mx-auto h-24 w-24" />
      <Changelang color="black" />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">{t("tickets")}</h1>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <p className="inline-block mr-2">{t("status")}: </p>
          <select
            value={filteredStatus}
            onChange={(e) => setFilteredStatus(e.target.value)}
            className="border border-gray-300 rounded-md text-gray-600 h-10 pl-2  bg-white hover:border-gray-400 focus:outline-none mr-4"
          >
            <option value="All">{t("all")}</option>
            <option value="Resolved">{t("resolved")}</option>
            <option value="Reported">{t("reported")}</option>
          </select>
          <Link to="/createticket">
            <StandardButton onClick={handleCreateTicket} label={t("createnewticket")}/>
          </Link>
        </div>
      </div>
      <div className="border rounded-lg w-full">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th
                  style={{ textAlign: lng === "ar" ? "right" : "left" }}
                  className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                >
                  {t("date")}
                </th>
                {isAdmin && (
                  <th
                    style={{ textAlign: lng === "ar" ? "right" : "left" }}
                    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                  >
                    {t("User")}
                  </th>
                )}
                <th
                  style={{ textAlign: lng === "ar" ? "right" : "left" }}
                  className="h-12 px-4 text-left align-middle font-medium text-muted-foreground "
                >
                  {t("title")}
                </th>
                <th
                  style={{ textAlign: lng === "ar" ? "right" : "left" }}
                  className="h-12 px-4 text-left align-middle font-medium text-muted-foreground "
                >
                  {t("description")}
                </th>
                <th
                  style={{ textAlign: lng === "ar" ? "right" : "left" }}
                  className="h-12 px-4 text-left align-middle font-medium text-muted-foreground "
                >
                  {t("priority")}
                </th>
                <th
                  style={{ textAlign: lng === "ar" ? "right" : "left" }}
                  className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                >
                  {t("status")}
                </th>
                <th
                  style={{ textAlign: lng === "ar" ? "right" : "left" }}
                  className="h-12 px-4 text-left align-middle font-medium text-muted-foreground "
                >
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              {currentPageData.reverse().map((ticket, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                      {ticket.createdAt.split("T")[0]}
                    </td>
                    {
                      isAdmin && <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                      {ticket.User.username || "Anonymous"}
                    </td>
                    }
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                      {ticket.title}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                      {ticket.description}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                      {t(ticket.priority.toLowerCase())}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                      {t(ticket.status.toLowerCase())}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                      <div className="flex">
                        <TicketActionButton onClick={() => handleUpdateTicket(ticket.id)} label={t("update")} color="text-black"/>
                        <TicketActionButton onClick={() => handleDeleteTicket(ticket.id)} label={t("delete")} color="text-red-500"/>
                        {isAdmin && (
                            <TicketActionButton onClick={() => handleClosedTicket(ticket.id)} label={t("closed")} color="text-green-500"/>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={t("previous")}
            nextLabel={t("next")}
            pageCount={Math.ceil(tickets.length / PER_PAGE)}
            onPageChange={({ selected: selectedPage }) =>
              setCurrentPage(selectedPage)
            }
            containerClassName={"flex justify-end my-4"}
            pageLinkClassName={"border px-3 py-2 mx-1 text-black no-underline"}
            previousLinkClassName={
              "border px-3 py-2 mx-1 text-black no-underline"
            }
            nextLinkClassName={"border px-3 py-2 mx-1 text-black no-underline"}
            disabledClassName={"opacity-50"}
            activeClassName={" font-bold text-white px-1 "}
          />
        </div>
      </div>
    </div>
  );
};

export default Tickets;
