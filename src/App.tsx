import { BrowserRouter } from "react-router-dom";
import { JobRouter } from "./routes";
import { AuthProvider } from "./providers/AuthProvider";
import { JobProvider } from "./providers/JobProvider";
import { ApplicationProvider } from "./providers/ApplicationProvider";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";

function App() {
  return (
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
  );
}

export default App;
