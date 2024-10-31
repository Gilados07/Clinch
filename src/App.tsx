import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/custom/MainPage";
import ProfilePage from "./components/custom/ProfilePage";
import DiscoverPage from "./components/custom/Discover";
import BasketballDiscoverPage from "./components/custom/DiscoverPages/Basketball-discover";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route
            path="/discover/basketball"
            element={<BasketballDiscoverPage />}
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
