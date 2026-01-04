import Auth from "./pages/Auth/Auth";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/Home";
import Test from "./components/Test/Test";
import Public from "./pages/public/Public";
import ResultPage from "./components/ResultTest/ResultTest";
import Example from "./pages/example/Example";
import NotFound from "./components/NotFound/NotFound";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/" element={<Public />} />
          <Route path="/test/:type" element={<Test />} />
          <Route path="/test/topic/:slug" element={<Test />} />
          <Route path="/test/ticket/:number" element={<Test />} />

          <Route
            path="/home/*"
            element={
              <div className="">
                <Home />
              </div>
            }
          />
          <Route path="/result/:sessionId" element={<ResultPage />} />
          <Route path="/example" element={<Example />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
