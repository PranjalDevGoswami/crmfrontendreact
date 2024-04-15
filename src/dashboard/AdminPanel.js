import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { USERLIST } from "../../utils/urls.js";

const AdminPanel = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "User 1",
      roles: {
        Director: false,
        Hod_Finance: false,
        Hod_Operation: false,
        Hod_Sales: false,
        Finance_Manager: false,
        Operation_Manager: false,
        Sales_Manager: false,
        Finance_TeamLead: false,
        Operation_TeamLead: false,
        Sales_TeamLead: false,
      },
      permissions: {
        admin: false,
        manager: false,
        editor: false,
        viewer: false,
      },
    },
    {
      id: 2,
      name: "User 2",
      roles: {
        Director: false,
        Hod_Finance: false,
        Hod_Operation: false,
        Hod_Sales: false,
        Finance_Manager: false,
        Operation_Manager: false,
        Sales_Manager: false,
        Finance_TeamLead: false,
        Operation_TeamLead: false,
        Sales_TeamLead: false,
      },
      permissions: {
        admin: false,
        manager: false,
        editor: false,
        viewer: false,
      },
    },
    {
      id: 3,
      name: "User 3",
      roles: {
        Director: false,
        Hod_Finance: false,
        Hod_Operation: false,
        Hod_Sales: false,
        Finance_Manager: false,
        Operation_Manager: false,
        Sales_Manager: false,
        Finance_TeamLead: false,
        Operation_TeamLead: false,
        Sales_TeamLead: false,
      },
      permissions: {
        admin: false,
        manager: false,
        editor: false,
        viewer: false,
      },
    },
  ]);
  //   useEffect(() => {
  //     userList();
  //   }, []);
  //   const userList = async () => {
  //     try {
  //       const userList = await fetch(USERLIST);
  //       const userListJson = await userList.json();
  //       setUsers(userListJson.users.map((user) => user.username));
  //     } catch (error) {
  //       console.error("Error redirecting user:", error);
  //     }
  //   };

  const handleCheckboxChange = (userId, category, item) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          if (category === "permissions") {
            return {
              ...user,
              permissions: {
                ...user.permissions,
                [item]: !user.permissions[item],
              },
            };
          } else if (category === "roles") {
            return {
              ...user,
              roles: {
                ...user.roles,
                [item]: !user.roles[item],
              },
            };
          }
        }
        return user;
      })
    );
  };

  const updatePermissions = () => {
    console.log("Updated users:", users);
  };

  const columns = [
    {
      field: "name",
      headerName: "User List",
      width: 300,
    },
    {
      field: "roles",
      headerName: "Roles",
      width: 900,
      renderCell: (params) => (
        <div className="flex">
          {Object.keys(params.row.roles).map((role) => (
            <div key={role} className="ml-4 ">
              <label>
                <input
                  type="checkbox"
                  checked={params.row.roles[role]}
                  onChange={() =>
                    handleCheckboxChange(params.row.id, "roles", role)
                  }
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            </div>
          ))}
        </div>
      ),
    },
    {
      field: "permissions",
      headerName: "Permissions",
      width: 200,
      renderCell: (params) => (
        <div className="h-auto">
          {Object.keys(params.row.permissions).map((permission) => (
            <div key={permission} className="ml-4">
              <label>
                <input
                  type="checkbox"
                  checked={params.row.permissions[permission]}
                  onChange={() =>
                    handleCheckboxChange(
                      params.row.id,
                      "permissions",
                      permission
                    )
                  }
                />
                {permission.charAt(0).toUpperCase() + permission.slice(1)}
              </label>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="mt-16">
      <h1 className="text-3xl">Admin Panel</h1>
      <DataGrid rows={users} columns={columns} pageSize={5} checkboxSelection />
      <button onClick={updatePermissions} className="bg-green-400">
        Save Permissions
      </button>
    </div>
  );
};

export default AdminPanel;
