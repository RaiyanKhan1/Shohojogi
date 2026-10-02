import Navbar from "./Components/ui/Navbar.jsx";
import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Homepage from "./Pages/Homepage/Homepage";
import Collections from "./pages/Collections/Collections.jsx";
import FindWork from "./Pages/FindWork/FindWork.jsx";
import Join from "./Pages/Join/Join.jsx";
import ProductPage from "./Pages/Product/ProductPage.jsx";
import WhyShohojogi from "./Pages/Why Shohojogi/WhyShohojogi.jsx";
import TaskDetailsPage from "./Pages/TaskDetails/TaskDetailsPage.jsx";
import PostTask from "./Pages/PostTask/PostTask.jsx";
import PostService from "./Pages/PostTask/PostService.jsx";
import AdminPage from "./Pages/Admin/AdminPage.jsx";
import AdminLoginPage from "./Pages/Admin/AdminLoginPage.jsx";
import ClientApplicationsPage from "./Pages/Client/ClientApplicationsPage.jsx";
import WorkerVerificationPage from "./Pages/Worker/WorkerVerificationPage.jsx";
import PaymentResultPage from "./Pages/Payment/PaymentResultPage.jsx";

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

function PublicOnly({ children }) {
  if (getStoredUser()) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AdminEntry() {
  const user = getStoredUser();

  if (user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <AdminLoginPage />;
}

function AdminRoute({ children }) {
  const user = getStoredUser();

  if (user?.role !== "admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/admin");

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
              <Join />
            </PublicOnly>
          }
        />

        <Route path="/why-shohojogi" element={<WhyShohojogi />} />
        <Route path="/task/:id" element={<TaskDetailsPage />} />
        <Route path="/task" element={<Navigate to="/find-work" replace />} />
        <Route path="/post-task" element={<PostTask />} />
        <Route path="/post-service" element={<PostService />} />

        <Route
          path="/client/applications"
          element={<ClientApplicationsPage />}
        />
        <Route
          path="/worker/verification"
          element={<WorkerVerificationPage />}
        />
        <Route path="/payment/:result" element={<PaymentResultPage />} />

        <Route path="/admin" element={<AdminEntry />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
