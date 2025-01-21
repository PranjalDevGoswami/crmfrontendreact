// import React, { useEffect, useState } from "react";

// const OfflineStatus = () => {
//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   useEffect(() => {
//     const handleOnline = () => {
//       setIsOnline(true);
//     };

//     const handleOffline = () => {
//       setIsOnline(false);
//     };

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []);

//   return (
//     <div>
//       {isOnline ? (
//         <div className="bg-green-500 text-white p-4">You are online</div>
//       ) : (
//         <div className="bg-red-500 text-white p-4">You are offline</div>
//       )}
//     </div>
//   );
// };

// export default OfflineStatus;
