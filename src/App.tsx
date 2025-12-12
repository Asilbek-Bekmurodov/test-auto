import Auth from "./pages/Auth/Auth"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        {/* boshqa route’lar */}
      </Routes>
    </BrowserRouter>
  )
}
export default App