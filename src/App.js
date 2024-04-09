import AuthProvider from "./provider/authProvider";
import RoutesForProtected from "./routes/protected/index.js";
import RoutesForPublic from "./routes/public/index.js";
import Routes from "./routes";

function App() {
  let token = localStorage.getItem("token");
  return (
    <AuthProvider>
      {/* {token ? <RoutesForProtected /> : <RoutesForPublic />} */}
      <Routes />
    </AuthProvider>
  );
}

export default App;
