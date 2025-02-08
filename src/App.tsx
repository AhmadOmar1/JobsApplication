import { JobRouter } from "./routes/JobRouter"; 
import { AuthProvider } from "./providers/AuthProvider";
import { JobProvider } from "./providers/JobProvider";
import { ApplicationProvider } from "./providers/ApplicationProvider";

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <ApplicationProvider>
          <JobRouter /> 
        </ApplicationProvider>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;
