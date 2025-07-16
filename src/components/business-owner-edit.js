import React, { useState } from 'react';
import '../styles/business-owner-edit.css'; // Create styling here for modal

const EditUserPopup = ({ user, onClose, onSave }) => {
  const [username, setUsername] = useState(user.username || '');
  const [email, setEmail] = useState(user.email || '');
  const [firstName, setFirstName] = useState(user.first_name || '');
  const [lastName, setLastName] = useState(user.last_name || '');

  const handleSave = () => {
    const updateData = {};
    if (username !== user.username) updateData.username = username;
    if (email !== user.email) updateData.email = email;
    if (firstName !== user.first_name) updateData.first_name = firstName;
    if (lastName !== user.last_name) updateData.last_name = lastName;

    if (Object.keys(updateData).length === 0) {
      alert('No changes made.');
      return;
    }

    onSave(updateData);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Edit User</h2>

        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoFocus
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />

        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />

        <button className="save-btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default EditUserPopup;
