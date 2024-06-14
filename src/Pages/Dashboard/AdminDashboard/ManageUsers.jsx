import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [selectedRole, setSelectedRole] = useState("all");
  const axiosSecure = useAxiosSecure();

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const filteredUsers =
    selectedRole === "all"
      ? users
      : users.filter((user) => user.role === selectedRole);

  const handleMakeUser = (id) => {
    axiosSecure.patch(`/users/${id}/make-user`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };
  const handleMakeProUser = (id) => {
    axiosSecure.patch(`/users/${id}/make-pro-user`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <div>
        <label htmlFor="roleFilter">Filter by role: </label>
        <select
          id="roleFilter"
          value={selectedRole}
          onChange={handleRoleChange}
        >
          <option value="all">All</option>
          <option value="user">User</option>
          <option value="pro-user">Pro User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <table className="table ho w-full">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>
                <div className="flex items-center">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={user.photoURL} />
                    </div>
                  </div>
                </div>
              </td>

              <td>
                <span>{user.name}</span>
              </td>

              <td>
                <span>{user.email}</span>
              </td>
              <td>
                <span>{user.role}</span>
              </td>

              <td>
                <button
                  disabled={user.role === "admin"}
                  onClick={() => handleMakeUser(user._id)}
                  className="btn btn-ghost text-red-500"
                >
                  Make User
                </button>
                <button
                  disabled={user.role === "admin"}
                  onClick={() => handleMakeProUser(user._id)}
                  className="btn btn-ghost text-green-500"
                >
                  Make Pro User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
