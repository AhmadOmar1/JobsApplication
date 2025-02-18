import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { JobRouter } from "./routes";
import { ThemeProvider } from "@emotion/react";

import { AuthProvider } from "./providers/AuthProvider";
import { JobProvider } from "./providers/JobProvider";
import { ApplicationProvider } from "./providers/ApplicationProvider";

import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <JobProvider>
          <ApplicationProvider>
            <BrowserRouter>
              <ScrollToTopButton />
              <JobRouter />
            </BrowserRouter>
          </ApplicationProvider>
        </JobProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
