import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/home/index";
import FormDrawer from "../pages/formManagement/formDrawer";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/App/:title/:key" element={<FormDrawer />} />
    </Routes>
  );
}
