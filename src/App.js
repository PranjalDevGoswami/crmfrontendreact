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
import { RoleProvider } from "./ContextApi/RoleContext.js";

function App() {
  return (
    <RoleProvider>
      <ThemeContextProvider>
        <AuthProvider>
          <CloseAddClientProvider>
            <DataTableContextProvider>
              <NotifiactionProvider>
                <SearchFilterContext>
                  <LogoutTimer />
                  {/* <FetchProjectProvider> */}
                  <ProjectTypeProvider>
                    <FormDataValueProvider>
                      <Routes />
                    </FormDataValueProvider>
                  </ProjectTypeProvider>
                  {/* </FetchProjectProvider> */}
                </SearchFilterContext>
              </NotifiactionProvider>
            </DataTableContextProvider>
          </CloseAddClientProvider>
        </AuthProvider>
      </ThemeContextProvider>
    </RoleProvider>
  );
}

export default App;
