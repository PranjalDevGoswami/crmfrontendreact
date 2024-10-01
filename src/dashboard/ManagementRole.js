// import React, { useEffect, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import { USERLIST } from "../../utils/urls";
// import { getWithAuth } from "../provider/helper/axios";

// const ManagementPanel = () => {
//   const [userList, setUserList] = useState([]);
//   const [department, setDepartment] = useState("Sales"); // Default department filter
//   const [hierarchy, setHierarchy] = useState({
//     directors: [],
//     hods: {},
//     managers: {},
//     tls: {},
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getWithAuth(USERLIST);
//         const users = response.data.users.map((user) => ({
//           id: user.id,
//           username: user?.username,
//           department: user?.user_department?.name, // Assuming department is part of the user data
//         }));
//         console.log("Fetched users:", users); // Debug: log fetched users
//         setUserList(users);
//       } catch (error) {
//         console.error("Error fetching user list:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const onDragEnd = (result) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     const sourceList = getList(source.droppableId);
//     const destList = getList(destination.droppableId);
//     const [movedItem] = sourceList.splice(source.index, 1);

//     if (source.droppableId === destination.droppableId) {
//       sourceList.splice(destination.index, 0, movedItem);
//       setList(source.droppableId, sourceList);
//     } else {
//       destList.splice(destination.index, 0, movedItem);
//       setList(source.droppableId, sourceList);
//       setList(destination.droppableId, destList);

//       if (destination.droppableId === "director-list") {
//         setHierarchy((prev) => ({
//           ...prev,
//           hods: { ...prev.hods, [`hod-${movedItem.id}`]: [] },
//         }));
//       } else if (destination.droppableId.startsWith("hod-")) {
//         setHierarchy((prev) => ({
//           ...prev,
//           managers: { ...prev.managers, [`manager-${movedItem.id}`]: [] },
//         }));
//       } else if (destination.droppableId.startsWith("manager-")) {
//         setHierarchy((prev) => ({
//           ...prev,
//           tls: { ...prev.tls, [`tl-${movedItem.id}`]: [] },
//         }));
//       }
//     }
//   };

//   const getList = (id) => {
//     switch (id) {
//       case "userList":
//         const filteredList = userList.filter(
//           (user) => user.department === department
//         );
//         console.log(
//           "Filtered list for department",
//           department,
//           ":",
//           filteredList
//         ); // Debug: log filtered list
//         return filteredList;
//       case "director-list":
//         return hierarchy.directors;
//       default:
//         if (id.startsWith("hod-")) return hierarchy.hods[id] || [];
//         if (id.startsWith("manager-")) return hierarchy.managers[id] || [];
//         if (id.startsWith("tl-")) return hierarchy.tls[id] || [];
//         return [];
//     }
//   };

//   const setList = (id, newList) => {
//     switch (id) {
//       case "userList":
//         setUserList(newList);
//         break;
//       case "director-list":
//         setHierarchy((prev) => ({ ...prev, directors: newList }));
//         break;
//       default:
//         if (id.startsWith("hod-")) {
//           setHierarchy((prev) => ({
//             ...prev,
//             hods: { ...prev.hods, [id]: newList },
//           }));
//         }
//         if (id.startsWith("manager-")) {
//           setHierarchy((prev) => ({
//             ...prev,
//             managers: { ...prev.managers, [id]: newList },
//           }));
//         }
//         if (id.startsWith("tl-")) {
//           setHierarchy((prev) => ({
//             ...prev,
//             tls: { ...prev.tls, [id]: newList },
//           }));
//         }
//         break;
//     }
//   };

//   const constructHierarchyArray = () => {
//     const hierarchyArray = [];

//     for (const director of hierarchy.directors) {
//       const directorNode = {
//         name: "Director",
//         children: [],
//       };

//       if (hierarchy.hods[`hod-${director.id}`]) {
//         for (const hod of hierarchy.hods[`hod-${director.id}`]) {
//           const hodNode = {
//             name: "Hod",
//             children: [],
//           };

//           if (hierarchy.managers[`manager-${hod.id}`]) {
//             for (const manager of hierarchy.managers[`manager-${hod.id}`]) {
//               const managerNode = {
//                 name: "Manager",
//                 children: [],
//               };

//               if (hierarchy.tls[`tl-${manager.id}`]) {
//                 for (const tl of hierarchy.tls[`tl-${manager.id}`]) {
//                   managerNode.children.push({
//                     name: "TL",
//                     children: [], // TLs do not have further children
//                   });
//                 }
//               }

//               hodNode.children.push(managerNode);
//             }
//           }

//           directorNode.children.push(hodNode);
//         }
//       }

//       hierarchyArray.push(directorNode);
//     }

//     return hierarchyArray;
//   };

//   const handleUpdateHierarchy = () => {
//     const hierarchyArray = constructHierarchyArray();
//     console.log("Updated hierarchy:", hierarchyArray);
//   };

//   const renderDraggableList = (id, items) => (
//     <Droppable droppableId={id} key={id}>
//       {(provided) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.droppableProps}
//           className="droppable-list"
//         >
//           {items.map((item, index) => (
//             <Draggable
//               key={item.id}
//               draggableId={item.id.toString()}
//               index={index}
//             >
//               {(provided) => (
//                 <div
//                   ref={provided.innerRef}
//                   {...provided.draggableProps}
//                   {...provided.dragHandleProps}
//                   className="draggable-item"
//                 >
//                   {item.username}
//                 </div>
//               )}
//             </Draggable>
//           ))}
//           {provided.placeholder}
//         </div>
//       )}
//     </Droppable>
//   );

//   return (
//     <div className="management-panel">
//       <h1>User Roles</h1>
//       <div>
//         <label htmlFor="department-select">Select Department: </label>
//         <select
//           id="department-select"
//           value={department}
//           onChange={(e) => setDepartment(e.target.value)}
//         >
//           <option value="Sales">Sales</option>
//           <option value="Operations">Operation</option>
//           <option value="Finance">Finance</option>
//         </select>
//       </div>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div className="panel-content">
//           <div className="user-list-section">
//             <h2>User List</h2>
//             {renderDraggableList("userList", getList("userList"))}
//           </div>
//           <div className="hierarchy-section">
//             <h2>Directors</h2>
//             {renderDraggableList("director-list", hierarchy.directors)}
//             <div className="hierarchy-tree">
//               {hierarchy.directors.map((director) => (
//                 <div key={director.id} className="tree-node">
//                   <div className="tree-node-content">
//                     <h3>{director.username}</h3>
//                     <div className="branch">
//                       <h4>HODs</h4>
//                       {renderDraggableList(
//                         `hod-${director.id}`,
//                         hierarchy.hods[`hod-${director.id}`] || []
//                       )}
//                       {hierarchy.hods[`hod-${director.id}`]?.map((hod) => (
//                         <div key={hod.id} className="tree-node">
//                           <div className="tree-node-content">
//                             <h4>{hod.username}</h4>
//                             <div className="branch">
//                               <h5>Managers</h5>
//                               {renderDraggableList(
//                                 `manager-${hod.id}`,
//                                 hierarchy.managers[`manager-${hod.id}`] || []
//                               )}
//                               {hierarchy.managers[`manager-${hod.id}`]?.map(
//                                 (manager) => (
//                                   <div key={manager.id} className="tree-node">
//                                     <div className="tree-node-content">
//                                       <h5>{manager.username}</h5>
//                                       <div className="branch">
//                                         <h6>TLs</h6>
//                                         {renderDraggableList(
//                                           `tl-${manager.id}`,
//                                           hierarchy.tls[`tl-${manager.id}`] ||
//                                             []
//                                         )}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 )
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </DragDropContext>
//       <button onClick={handleUpdateHierarchy}>Update and Log Hierarchy</button>
//     </div>
//   );
// };

// export default ManagementPanel;

import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getWithAuth } from "../provider/helper/axios";
import { USERLIST } from "../../utils/constants/urls";

const ManagementPanel = () => {
  const [userList, setUserList] = useState([]);
  const [department, setDepartment] = useState("Sales");
  const [hierarchy, setHierarchy] = useState({
    directors: [],
    hods: {},
    managers: {},
    tls: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWithAuth(USERLIST);
        const users = response.data.users.map((user) => ({
          id: user.id,
          username: user.username,
          department: user.user_department?.name,
        }));
        setUserList(users);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchData();
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceList = getList(source.droppableId);
    const destList = getList(destination.droppableId);
    const [movedItem] = sourceList.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceList.splice(destination.index, 0, movedItem);
      setList(source.droppableId, sourceList);
    } else {
      destList.splice(destination.index, 0, movedItem);
      setList(source.droppableId, sourceList);
      setList(destination.droppableId, destList);

      if (destination.droppableId === "director-list") {
        setHierarchy((prev) => ({
          ...prev,
          hods: { ...prev.hods, [`hod-${movedItem.id}`]: [] },
        }));
      } else if (destination.droppableId.startsWith("hod-")) {
        setHierarchy((prev) => ({
          ...prev,
          managers: { ...prev.managers, [`manager-${movedItem.id}`]: [] },
        }));
      } else if (destination.droppableId.startsWith("manager-")) {
        setHierarchy((prev) => ({
          ...prev,
          tls: { ...prev.tls, [`tl-${movedItem.id}`]: [] },
        }));
      }
    }
  };

  const getList = (id) => {
    switch (id) {
      case "userList":
        return userList.filter((user) => user.department == department);
      case "director-list":
        return hierarchy.directors;
      default:
        if (id.startsWith("hod-")) return hierarchy.hods[id] || [];
        if (id.startsWith("manager-")) return hierarchy.managers[id] || [];
        if (id.startsWith("tl-")) return hierarchy.tls[id] || [];
        return [];
    }
  };

  const setList = (id, newList) => {
    switch (id) {
      case "userList":
        setUserList(newList);
        break;
      case "director-list":
        setHierarchy((prev) => ({ ...prev, directors: newList }));
        break;
      default:
        if (id.startsWith("hod-")) {
          setHierarchy((prev) => ({
            ...prev,
            hods: { ...prev.hods, [id]: newList },
          }));
        }
        if (id.startsWith("manager-")) {
          setHierarchy((prev) => ({
            ...prev,
            managers: { ...prev.managers, [id]: newList },
          }));
        }
        if (id.startsWith("tl-")) {
          setHierarchy((prev) => ({
            ...prev,
            tls: { ...prev.tls, [id]: newList },
          }));
        }
        break;
    }
  };

  const constructHierarchyArray = () => {
    const hierarchyArray = [];

    for (const director of hierarchy.directors) {
      const directorNode = {
        role: "Director",
        username: director.username,
        users: [],
      };

      const directorHods = hierarchy.hods[`hod-${director.id}`] || [];
      for (const hod of directorHods) {
        const hodNode = {
          role: "HOD",
          username: hod.username,
          users: [],
        };

        const hodManagers = hierarchy.managers[`manager-${hod.id}`] || [];
        for (const manager of hodManagers) {
          const managerNode = {
            role: "Manager",
            username: manager.username,
            users: [],
          };

          const managerTls = hierarchy.tls[`tl-${manager.id}`] || [];
          for (const tl of managerTls) {
            managerNode.users.push({ role: "TL", username: tl.username });
          }

          if (managerTls.length > 0) {
            hodNode.users.push(managerNode);
          } else {
            hodNode.users.push({ role: "Manager", username: manager.username });
          }
        }

        if (hodManagers.length > 0) {
          directorNode.users.push(hodNode);
        } else {
          directorNode.users.push({ role: "HOD", username: hod.username });
        }
      }

      if (directorHods.length > 0) {
        hierarchyArray.push(directorNode);
      } else {
        hierarchyArray.push({ role: "Director", username: director.username });
      }
    }

    return hierarchyArray;
  };

  const handleUpdateHierarchy = () => {
    const hierarchyArray = constructHierarchyArray();
    console.log("Updated hierarchy:", hierarchyArray);
  };

  const renderDraggableList = (id, items) => (
    <Droppable droppableId={id} key={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="droppable-list"
        >
          {items.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={item.id.toString()}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="draggable-item"
                >
                  {item.username}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <div className="management-panel">
      <h1>User Roles</h1>
      <div>
        <label htmlFor="department-select">Select Department: </label>
        <select
          id="department-select"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="Sales">Sales</option>
          <option value="Operations">Operations</option>
          <option value="Finance">Finance</option>
        </select>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="panel-content">
          <div className="user-list-section">
            <h2>User List</h2>
            {renderDraggableList("userList", getList("userList"))}
          </div>
          <div className="hierarchy-section">
            <h2>Directors</h2>
            {renderDraggableList("director-list", hierarchy.directors)}
            <div className="hierarchy-tree">
              {hierarchy.directors.map((director) => (
                <div key={director.id} className="tree-node">
                  <div className="tree-node-content">
                    <h3>{director.username}</h3>
                    <div className="branch">
                      <h4>HODs</h4>
                      {renderDraggableList(
                        `hod-${director.id}`,
                        hierarchy.hods[`hod-${director.id}`] || []
                      )}
                      {hierarchy.hods[`hod-${director.id}`]?.map((hod) => (
                        <div key={hod.id} className="tree-node">
                          <div className="tree-node-content">
                            <h4>{hod.username}</h4>
                            <div className="branch">
                              <h5>Managers</h5>
                              {renderDraggableList(
                                `manager-${hod.id}`,
                                hierarchy.managers[`manager-${hod.id}`] || []
                              )}
                              {hierarchy.managers[`manager-${hod.id}`]?.map(
                                (manager) => (
                                  <div key={manager.id} className="tree-node">
                                    <div className="tree-node-content">
                                      <h5>{manager.username}</h5>
                                      <div className="branch">
                                        <h6>TLs</h6>
                                        {renderDraggableList(
                                          `tl-${manager.id}`,
                                          hierarchy.tls[`tl-${manager.id}`] ||
                                            []
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DragDropContext>
      <button onClick={handleUpdateHierarchy}>Update and Log Hierarchy</button>
    </div>
  );
};

export default ManagementPanel;
