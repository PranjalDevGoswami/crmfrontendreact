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
import { FetchProjectProvider } from "./ContextApi/FetchProjectContext.js";
import { CloseAddClientProvider } from "./ContextApi/CloseAddClientContext.js";

function App() {
  return (
    <ThemeContextProvider>
      <CloseAddClientProvider>
        <NotifiactionProvider>
          <DataTableContextProvider>
            <SearchFilterContext>
              <AuthProvider>
                <LogoutTimer />
                <FetchProjectProvider>
                  <Routes />
                </FetchProjectProvider>
              </AuthProvider>
            </SearchFilterContext>
          </DataTableContextProvider>
        </NotifiactionProvider>
      </CloseAddClientProvider>
    </ThemeContextProvider>
  );
}

export default App;
