import Auth from "./pages/Auth/Auth";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/Home";
import Test from "./components/Test/Test";
import Public from "./pages/public/Public";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/*" element={<Public />} />
        <Route path="/test" element={<Test />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
