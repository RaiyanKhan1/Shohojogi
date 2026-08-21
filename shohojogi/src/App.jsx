import { useState } from 'react'
import Navbar from "./Components/ui/Navbar.jsx"
import './App.css'
import Homepage from './Pages/Homepage/Homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Collections from "./pages/Collections/Collections.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/collections" element={<Collections />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
