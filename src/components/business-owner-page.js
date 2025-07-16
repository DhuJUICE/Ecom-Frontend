import React, { useEffect, useState } from 'react';
import '../styles/business-owner-page.css';
import { preloadUserData } from './preLoadMenuData/preloadUsers';
import { deleteBusinessOwner, updateBusinessOwnerDetails } from './apiComponents/api-user';
import EditUserPopup from './business-owner-edit'; // Import the popup

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null); // Track user being edited

  useEffect(() => {
    const loadUsers = async () => {
      const data = await preloadUserData();
      setUsers(data || []);
      setLoading(false);
    };

    loadUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleClosePopup = () => {
    setEditingUser(null);
  };

  const handleSave = async (updateData) => {
    try {
      const result = await updateBusinessOwnerDetails(editingUser.id, updateData);
      if (result.success) {
        alert('User updated successfully.');
        setUsers(prev =>
          prev.map(u =>
            u.id === editingUser.id ? { ...u, ...updateData } : u
          )
        );
        setEditingUser(null);
      } else {
        alert(result.message || 'Failed to update user.');
      }
    } catch (err) {
      alert(`Error updating user: ${err.message}`);
    }
  };

  const handleDelete = async (userId) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    try {
      const result = await deleteBusinessOwner(userId);
      if (result.success) {
        alert('User deleted successfully.');
        setUsers(prev => prev.filter(user => user.id !== userId));
      } else {
        alert(result.message || 'Failed to delete user.');
      }
    } catch (error) {
      alert(`Error deleting user: ${error.message}`);
    }
  };

  return (
    <div className="user-list-container">
      <main>
        {loading ? (
          <div className="loading-container">
            <p>Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="loading-container">
            <p>No business owners found.</p>
          </div>
        ) : (
          <>
            <div className="user-list-header">
              <span>ID</span>
              <span>Username</span>
              <span>Email</span>
              <span>Full Name</span>
              <span>Is Staff</span>
              <span>Actions</span>
            </div>

            {users.map((user) => (
              <div key={user.id} className="user-list-row">
                <span>{user.id}</span>
                <span>{user.username}</span>
                <span>{user.email}</span>
                <span>{user.first_name} {user.last_name}</span>
                <span>{user.is_staff ? 'Yes' : 'No'}</span>
                <span className="button-group">
                  <button onClick={() => handleEditClick(user)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
                </span>
              </div>
            ))}

            {editingUser && (
              <EditUserPopup
                user={editingUser}
                onClose={handleClosePopup}
                onSave={handleSave}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default UserList;
