import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageUsers = () => {
  const [selectedRole, setSelectedRole] = useState("all");
  const axiosSecure = useAxiosSecure();

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const filteredUsers = selectedRole === "all" ? users : users.filter(user => user.role === selectedRole);

  return (
    <div>
      <h2>Manage Users</h2>
      <div>
        <label htmlFor="roleFilter">Filter by role: </label>
        <select id="roleFilter" value={selectedRole} onChange={handleRoleChange}>
          <option value="all">All</option>
          <option value="user">User</option>
          <option value="pro-user">Pro User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <ul>
        {filteredUsers.map(user => (
          <li key={user._id}>
            <img src={user.photoURL} alt={user.name} width="50" height="50" />
            <span>{user.name} - {user.email} - {user.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
