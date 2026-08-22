import { useState } from 'react'
import Navbar from "./Components/ui/Navbar.jsx"
import './App.css'
import Homepage from './Pages/Homepage/Homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Collections from "./pages/Collections/Collections.jsx";
import Join from "./Pages/Join/Join.jsx";
import ProductPage from './Pages/Product/ProductPage.jsx'
import WhyShohojogi from './Pages/Why Shohojogi/WhyShohojogi.jsx';

function App() {
  const [count, setCount] = useState(0)

   return (
   <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/join" element={<Join />} />
        <Route path="/why_shohojogi" element={<WhyShohojogi />}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
