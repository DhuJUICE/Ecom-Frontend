import React, { useEffect, useState } from 'react';
import { preloadUserData } from '../../preLoadMenuData/preloadUsers';
import { deleteBusinessOwner, updateBusinessOwnerDetails } from '../../apiComponents/api-user';
import EditUserPopup from './business-owner-edit';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await preloadUserData();
      setUsers(data || []);
      setLoading(false);
    };
    loadUsers();
  }, []);

  const handleEditClick = (user) => setEditingUser(user);
  const handleClosePopup = () => setEditingUser(null);

  const handleSave = async (updateData) => {
    try {
      const result = await updateBusinessOwnerDetails(editingUser.id, updateData);
      if (result.success) {
        setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...updateData } : u));
        setEditingUser(null);
        alert('User updated successfully!');
      } else {
        alert(result.message || 'Failed to update user.');
      }
    } catch (err) {
      alert(`Error updating user: ${err.message}`);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const result = await deleteBusinessOwner(userId);
      if (result.success) {
        setUsers(prev => prev.filter(u => u.id !== userId));
        alert('User deleted successfully!');
      } else {
        alert(result.message || 'Failed to delete user.');
      }
    } catch (error) {
      alert(`Error deleting user: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Business Owners</h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="text-center text-gray-500">No business owners found.</div>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Username</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Full Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Is Staff</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">{user.id}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{user.username}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{user.first_name} {user.last_name}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{user.is_staff ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-2 text-sm">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="px-3 py-1 mr-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {editingUser && (
          <EditUserPopup
            user={editingUser}
            onClose={handleClosePopup}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
