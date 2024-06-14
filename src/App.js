import React from "react";
import AuthProvider from "./provider/authProvider";
import RoutesForProtected from "./routes/protected/index.js";
import RoutesForPublic from "./routes/public/index.js";
import Routes from "./routes";
import LogoutTimer from "./user/LogoutTimer.js";
import { ThemeContextProvider } from "./ContextApi/ThemeContext.js";
import { SearchFilterContext } from "./ContextApi/FilterContext.js";
import { DataTableContextProvider } from "./ContextApi/DataTableContext.js";
import { NotifiactionProvider } from "./ContextApi/NotificationContext.js";

function App() {
  return (
    <ThemeContextProvider>
      <NotifiactionProvider>
        <DataTableContextProvider>
          <SearchFilterContext>
            <AuthProvider>
              <LogoutTimer />
              <Routes />
            </AuthProvider>
          </SearchFilterContext>
        </DataTableContextProvider>
      </NotifiactionProvider>
    </ThemeContextProvider>
  );
}

export default App;
