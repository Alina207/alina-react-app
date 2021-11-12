import React, { useState } from "react";
import "./App.css";
import {nanoid} from 'nanoid';
import data from "./mock-data.json";

const App = () => {
  
  const [contacts, setContacts] = useState(data);
// Store the form values as an object and state in a single state hook
// The properties below match the name attribute on the form inputs
  const [addFormData, setAddFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: ''  
  })
// Use an event handler to update the values
  const handleAddFormChange = (event) => {
    event.preventDefault();
// First get the name attribute of the input the user has changed
    const fieldName = event.target.getAttribute('name');
// Get the actual value the user entered in the input
    const fieldValue = event.target.value;
// Make a copy of the existing form data so we can change it without mutating the state
    // We're using the spread operator to copy the existing form data and assign the new data to that variable
    const newFormData = { ...addFormData};
// Update the object with the new value the user has typed
    // Remember newFormData is an object so we can use the [] to get a key
    newFormData[fieldName] = fieldValue;
// Set it into state and pass in
    setAddFormData(newFormData)
  }

// Add a function that gets called when the form is submitted
// Take the data the use has entered which we have stored as addFormData in our useState() hook
// and create a new object from it
  const handleAddFormSubmit = (event) => {
    event.preventDefault(); // prevent post request

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
