import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";
import TicketForm from "../components/TicketForm";

const UpdateTicket = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [attachment, setAttachment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTicket = async () => {
      const token = cookie.get("token");
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}ticket/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle(response.data.title);
      setDescription(response.data.description);
      setPriority(response.data.priority);
      setAttachment(response.data.attachment);
      setIsLoading(false); 
    };
    fetchTicket();
  }, [id]);

  const handleSubmit = async (data) => {
    const token = cookie.get("token");
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    await axios
      .patch(`${process.env.REACT_APP_API_URL}ticket/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/tickets");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <TicketForm
      onSubmit={handleSubmit}
      initialValues={{ title, description, priority, attachment }}
      isUpdate={true}
    />
  );
};

export default UpdateTicket;
