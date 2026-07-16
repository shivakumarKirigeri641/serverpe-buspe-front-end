import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SupportPage from "./pages/SupportPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/support" element={<SupportPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<Navigate to="/search" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
