import React, { useState } from "react";
import "./App.css";
import {nanoid} from 'nanoid';
import data from "./mock-data.json";

const App = () => {
  
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: ''  
  })

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData};
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData)
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault(); 

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };
// Create a new contacts array to avoid mutating the state
// Copy the current contacts with the spread operator and ass the newContact we just created to the end to the new array
    const newContacts = [...contacts, newContact];
    setContacts(newContacts); 
  };
  

  return <div className="app-container">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Phone Number</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>
        {contacts.map((contact) => (
          <tr>
            <td>{contact.fullName}</td>
            <td>{contact.address}</td>
            <td>{contact.phoneNumber}</td>
            <td>{contact.email}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h2>Add a Contact</h2>
    <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="address"
          required="required"
          placeholder="Enter an addres..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
  </div>;
};

export default App;
