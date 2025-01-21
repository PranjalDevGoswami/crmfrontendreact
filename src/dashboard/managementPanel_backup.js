import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { USERLIST } from "../../utils/urls";
import { getWithAuth } from "../provider/helper/axios";
import SweetAlert from "../components/SweetAlert";
const ManagementPanel = () => {
  const [userList, setUserList] = useState([]);
  const [columns, setColumns] = useState({
    userList: [],
    director: [],
    hod: [],
    manager: [],
    tl: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWithAuth(USERLIST);
        setUserList(response.data.users.map((user) => user.username));
        setColumns((prev) => ({
          ...prev,
          userList: response.data.users.map((user) => user.username),
          manager: [], // Initialize manager column as empty array
          tl: [], // Initialize tl column as empty array
        }));
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchData();
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceItems = Array.from(columns[source.droppableId]);
    const destItems = Array.from(columns[destination.droppableId]);
    const [movedItem] = sourceItems.splice(source.index, 1);

    destItems.splice(destination.index, 0, movedItem);

    setColumns((prev) => ({
      ...prev,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destItems,
    }));
  };

  const handleUpdate = async () => {
    try {
      const roles = [];

      // Collect roles from columns except userList
      Object.keys(columns).forEach((role) => {
        if (role !== "userList") {
          columns[role].forEach((user) => {
            roles.push({ username: user, role });
          });
        }
      });

      // Use axios to update roles
      // Update roles based on the dragged items in the columns
      // Example: Update the manager of a TL based on the dragged items
      // Example: Update the HOD of a manager based on the dragged items

      await axios.post(
        "/updateRoles",
        { roles },
        { headers: { Authorization: "Bearer YOUR_TOKEN" } }
      );
      SweetAlert({
        title: "Roles updated successfully!",
        text: "",
        icon: "success",
      });
    } catch (error) {
      SweetAlert({
        title: "Error",
        text: "Error updating roles:",
        error,
        icon: "error",
      });
    }
  };

  const renderColumn = (columnId, items) => (
    <Droppable droppableId={columnId} key={columnId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            margin: "0 8px",
            border: "1px solid gray",
            padding: "8px",
            minWidth: "200px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <h2>{columnId.toUpperCase()}</h2>
          {items?.map((username, index) => (
            <Draggable key={username} draggableId={username} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    userSelect: "none",
                    padding: "16px",
                    margin: "0 0 8px 0",
                    minHeight: "50px",
                    backgroundColor: "#fff",
                    color: "#333",
                    ...provided.draggableProps.style,
                  }}
                >
                  {username}
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
    <div>
      <h1>User Roles</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", overflowX: "auto" }}>
          {Object.entries(columns).map(([columnId, items]) =>
            renderColumn(columnId, items)
          )}
        </div>
      </DragDropContext>
      <button
        onClick={handleUpdate}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Update Roles
      </button>
    </div>
  );
};

export default ManagementPanel;

/*

Perfect Working Code

import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { USERLIST } from "../../utils/urls";
import { getWithAuth } from "../provider/helper/axios";

const ManagementPanel = () => {
  const [userList, setUserList] = useState([]);
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

      // Update hierarchy when a user is moved to a new role
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
        return userList;
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

  const renderDraggableList = (id, items) => (
    <Droppable droppableId={id} key={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            margin: "8px",
            padding: "8px",
            border: "1px solid gray",
            minWidth: "200px",
            backgroundColor: "#f0f0f0",
          }}
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
                  style={{
                    userSelect: "none",
                    padding: "16px",
                    margin: "0 0 8px 0",
                    backgroundColor: "#fff",
                    color: "#333",
                    ...provided.draggableProps.style,
                  }}
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
    <div>
      <h1>User Roles</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>User List</h2>
          {renderDraggableList("userList", userList)}
          <h2>Directors</h2>
          {renderDraggableList("director-list", hierarchy.directors)}
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {hierarchy.directors.map((director) => (
              <div key={director.id} style={{ margin: "8px" }}>
                <h3>{director.username}</h3>
                <div>
                  <h4>HODs</h4>
                  {renderDraggableList(
                    `hod-${director.id}`,
                    hierarchy.hods[`hod-${director.id}`] || []
                  )}
                  {hierarchy.hods[`hod-${director.id}`]?.map((hod) => (
                    <div key={hod.id} style={{ marginLeft: "16px" }}>
                      <h4>{hod.username}</h4>
                      <h5>Managers</h5>
                      {renderDraggableList(
                        `manager-${hod.id}`,
                        hierarchy.managers[`manager-${hod.id}`] || []
                      )}
                      {hierarchy.managers[`manager-${hod.id}`]?.map(
                        (manager) => (
                          <div key={manager.id} style={{ marginLeft: "16px" }}>
                            <h5>{manager.username}</h5>
                            <h6>TLs</h6>
                            {renderDraggableList(
                              `tl-${manager.id}`,
                              hierarchy.tls[`tl-${manager.id}`] || []
                            )}
                          </div>
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default ManagementPanel;


// import React, { useEffect, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import { USERLIST } from "../../utils/urls";
// import { getWithAuth } from "../provider/helper/axios";

// const ManagementPanel = () => {
//   const [userList, setUserList] = useState([]);
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
//           username: user.username,
//         }));
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

//       // Update hierarchy when a user is moved to a new role
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
//         return userList;
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

//   const renderDraggableList = (id, items) => (
//     <Droppable droppableId={id} key={id}>
//       {(provided) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.droppableProps}
//           style={{
//             margin: "8px",
//             padding: "8px",
//             border: "1px solid gray",
//             minWidth: "200px",
//             backgroundColor: "#f0f0f0",
//           }}
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
//                   style={{
//                     userSelect: "none",
//                     padding: "16px",
//                     margin: "0 0 8px 0",
//                     backgroundColor: "#fff",
//                     color: "#333",
//                     ...provided.draggableProps.style,
//                   }}
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
//     <div>
//       <h1>User Roles</h1>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div style={{ display: "flex" }}>
//           <div style={{ flex: "1" }}>
//             <h2>User List</h2>
//             {renderDraggableList("userList", userList)}
//           </div>
//           <div style={{ flex: "2" }}>
//             <h2>Directors</h2>
//             {renderDraggableList("director-list", hierarchy.directors)}
//             <div style={{ display: "flex", flexWrap: "wrap" }}>
//               {hierarchy.directors.map((director) => (
//                 <div key={director.id} style={{ margin: "8px" }}>
//                   <h3>{director.username}</h3>
//                   <div>
//                     <h4>HODs</h4>
//                     {renderDraggableList(
//                       `hod-${director.id}`,
//                       hierarchy.hods[`hod-${director.id}`] || []
//                     )}
//                     {hierarchy.hods[`hod-${director.id}`]?.map((hod) => (
//                       <div key={hod.id} style={{ marginLeft: "16px" }}>
//                         <h4>{hod.username}</h4>
//                         <h5>Managers</h5>
//                         {renderDraggableList(
//                           `manager-${hod.id}`,
//                           hierarchy.managers[`manager-${hod.id}`] || []
//                         )}
//                         {hierarchy.managers[`manager-${hod.id}`]?.map(
//                           (manager) => (
//                             <div
//                               key={manager.id}
//                               style={{ marginLeft: "16px" }}
//                             >
//                               <h5>{manager.username}</h5>
//                               <h6>TLs</h6>
//                               {renderDraggableList(
//                                 `tl-${manager.id}`,
//                                 hierarchy.tls[`tl-${manager.id}`] || []
//                               )}
//                             </div>
//                           )
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </DragDropContext>
//     </div>
//   );
// };

// export default ManagementPanel;

// import React, { useEffect, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import { USERLIST } from "../../utils/urls";
// import { getWithAuth } from "../provider/helper/axios";

// const ManagementPanel = () => {
//   const [userList, setUserList] = useState([]);
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
//           username: user.username,
//         }));
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

//       // Update hierarchy when a user is moved to a new role
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
//         return userList;
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

//   const renderDraggableList = (id, items) => (
//     <Droppable droppableId={id} key={id}>
//       {(provided) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.droppableProps}
//           style={{
//             margin: "8px",
//             padding: "8px",
//             border: "1px solid gray",
//             minWidth: "200px",
//             backgroundColor: "#f0f0f0",
//           }}
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
//                   style={{
//                     userSelect: "none",
//                     padding: "16px",
//                     margin: "0 0 8px 0",
//                     backgroundColor: "#fff",
//                     color: "#333",
//                     ...provided.draggableProps.style,
//                   }}
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
//     <div>
//       <h1>User Roles</h1>
//       <DragDropContext onDragEnd={onDragEnd}>
//         <div style={{ display: "flex" }}>
//           <div style={{ flex: "1" }}>
//             <h2>User List</h2>
//             {renderDraggableList("userList", userList)}
//           </div>
//           <div style={{ flex: "2" }}>
//             <h2>Directors</h2>
//             {renderDraggableList("director-list", hierarchy.directors)}
//             <div style={{ display: "flex", flexWrap: "wrap" }}>
//               {hierarchy.directors.map((director) => (
//                 <div key={director.id} style={{ margin: "8px" }}>
//                   <h3>{director.username}</h3>
//                   <div
//                     style={{
//                       borderLeft: "2px solid gray",
//                       marginLeft: "16px",
//                       paddingLeft: "8px",
//                     }}
//                   >
//                     <h4>HODs</h4>
//                     {renderDraggableList(
//                       `hod-${director.id}`,
//                       hierarchy.hods[`hod-${director.id}`] || []
//                     )}
//                     {hierarchy.hods[`hod-${director.id}`]?.map((hod) => (
//                       <div
//                         key={hod.id}
//                         style={{
//                           borderLeft: "2px solid gray",
//                           marginLeft: "16px",
//                           paddingLeft: "8px",
//                         }}
//                       >
//                         <h4>{hod.username}</h4>
//                         <h5>Managers</h5>
//                         {renderDraggableList(
//                           `manager-${hod.id}`,
//                           hierarchy.managers[`manager-${hod.id}`] || []
//                         )}
//                         {hierarchy.managers[`manager-${hod.id}`]?.map(
//                           (manager) => (
//                             <div
//                               key={manager.id}
//                               style={{
//                                 borderLeft: "2px solid gray",
//                                 marginLeft: "16px",
//                                 paddingLeft: "8px",
//                               }}
//                             >
//                               <h5>{manager.username}</h5>
//                               <h6>TLs</h6>
//                               {renderDraggableList(
//                                 `tl-${manager.id}`,
//                                 hierarchy.tls[`tl-${manager.id}`] || []
//                               )}
//                             </div>
//                           )
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </DragDropContext>
//     </div>
//   );
// };

// export default ManagementPanel;

*/
