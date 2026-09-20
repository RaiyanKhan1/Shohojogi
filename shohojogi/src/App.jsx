import { useState } from "react";
import Navbar from "./Components/ui/Navbar.jsx";
import "./App.css";
import Homepage from "./Pages/Homepage/Homepage";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Collections from "./pages/Collections/Collections.jsx";
import FindWork from "./Pages/FindWork/FindWork.jsx";
import Join from "./Pages/Join/Join.jsx";
import ProductPage from "./Pages/Product/ProductPage.jsx";
import WhyShohojogi from "./Pages/Why Shohojogi/WhyShohojogi.jsx";
import TaskDetailsPage from "./Pages/TaskDetails/TaskDetailsPage.jsx";
import PostTask from "./Pages/PostTask/PostTask.jsx";
import PostService from "./Pages/PostTask/PostService.jsx";
import AdminPage from "./Pages/Admin/AdminPage.jsx";

function PublicOnly({ children }) {
  const stored = localStorage.getItem("user");

  if (stored) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppContent() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/admin";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/find-work" element={<FindWork />} />
        <Route path="/product" element={<ProductPage />} />
        <Route
          path="/join"
          element={
            <PublicOnly>
              {" "}
              <Join />{" "}
            </PublicOnly>
          }
        />
        <Route path="/why-shohojogi" element={<WhyShohojogi />} />
        <Route path="/task/:id" element={<TaskDetailsPage />} />
        <Route path="/task" element={<Navigate to="/find-work" replace />} />
        <Route path="/post-task" element={<PostTask />} />
        <Route path="/post-service" element={<PostService />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
