import React, { useState } from 'react';
import axios from 'axios';
import './ContactManager.css';

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const getContacts = async () => {
    console.log('Fetching contacts...');
    try {
      const response = await axios.get('https://func-gateway-94do8959.uc.gateway.dev/read');
      console.log('Contacts fetched:', response.data);
      setContacts(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      console.error('Error fetching contacts:', error);
    }
  };

  const addContact = async () => {
    console.log('Adding contact...');
    try {
      const newContact = { Name: name, Number: number };
      await axios.post('https://func-gateway-94do8959.uc.gateway.dev/Add', newContact, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
      console.log('Contact added:', newContact);
      setName('');
      setNumber('');
      getContacts(); // Refresh the contact list
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      console.error('Error adding contact:', error);
    }
  };

  return (
    <div className="contact-manager">
      <h1>Contact Manager</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button onClick={addContact}>Add Contact</button>
      </div>
      <button onClick={getContacts}>Get Contacts</button>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id.$oid}>
            {contact.Name} - {contact.Number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactManager;