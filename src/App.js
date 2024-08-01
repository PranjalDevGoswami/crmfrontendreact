import React from "react";
import AuthProvider from "./provider/authProvider";
import Routes from "./routes";
import LogoutTimer from "./user/LogoutTimer.js";
import { ThemeContextProvider } from "./ContextApi/ThemeContext.js";
import { SearchFilterContext } from "./ContextApi/FilterContext.js";
import { DataTableContextProvider } from "./ContextApi/DataTableContext.js";
import { NotifiactionProvider } from "./ContextApi/NotificationContext.js";
// import { FetchProjectProvider } from "./ContextApi/FetchProjectContext.js";
import { CloseAddClientProvider } from "./ContextApi/CloseAddClientContext.js";
import { ProjectTypeProvider } from "./ContextApi/ProjectTypeContext.js";
import { FormDataValueProvider } from "./ContextApi/FormDataContext.js";

function App() {
  return (
    <ThemeContextProvider>
      <CloseAddClientProvider>
        <DataTableContextProvider>
          <NotifiactionProvider>
            <SearchFilterContext>
              <AuthProvider>
                <LogoutTimer />
                {/* <FetchProjectProvider> */}
                <ProjectTypeProvider>
                  <FormDataValueProvider>
                    <Routes />
                  </FormDataValueProvider>
                </ProjectTypeProvider>
                {/* </FetchProjectProvider> */}
              </AuthProvider>
            </SearchFilterContext>
          </NotifiactionProvider>
        </DataTableContextProvider>
      </CloseAddClientProvider>
    </ThemeContextProvider>
  );
}

export default App;
