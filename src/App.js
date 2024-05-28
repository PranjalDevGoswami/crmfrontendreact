import AuthProvider from "./provider/authProvider";
import RoutesForProtected from "./routes/protected/index.js";
import RoutesForPublic from "./routes/public/index.js";
import Routes from "./routes";
import LogoutTimer from "./user/LogoutTimer.js";

function App() {
  return (
    <AuthProvider>
      <LogoutTimer />
      <Routes />
    </AuthProvider>
  );
}

export default App;
