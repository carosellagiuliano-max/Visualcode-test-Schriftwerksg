import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
  <Route path="/buchen" element={<Booking />} />
  <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
