import React from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';
import TicketForm from '../components/TicketForm';

const CreateTicket = () => {


  const navigate = useNavigate();

  const handleSubmit = async (data) => {

      const token = cookie.get('token');
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      await axios.post(process.env.REACT_APP_API_URL+'ticket', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
      }
      })
      .then((response) => {
        console.log(response);
        navigate('/tickets');
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  
    return (
      <TicketForm onSubmit={handleSubmit}  />
    )
}

export default CreateTicket;
