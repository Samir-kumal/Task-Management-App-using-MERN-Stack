import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./routes/Dashboard";
import Boards from "./routes/Boards";
import Tasks from "./routes/Tasks";
import Calendar from "./routes/Calendar";
import Notifications from "./routes/Notifications";
import UserProfile from "./routes/UserProfile";
import ErrorPage from "./error-page";
import Login from "./routes/Login";
import Register from "./routes/Register";
import VerifyEmail from "./routes/VerifyEmail";
import Loading from "./routes/Loading";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

const App = () => {
  const location = useLocation();
  const excludeRoutes = ["/profile", "/login", "/register", "/verify-email/", "/"];
  const shouldShowNavbarAndSidebar = !excludeRoutes.includes(location.pathname);

  return (
    <div>
      { shouldShowNavbarAndSidebar && <NavBar />}
      <div className="flex flex-row">
        {shouldShowNavbarAndSidebar  && <SideBar />}
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/boards" element={<Boards />} />
          <Route path="/dashboard/boards/:boardID" element={<Tasks />} />
          <Route path="/dashboard/calendar" element={<Calendar />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email/" element={<VerifyEmail />} />
        </Routes>
        <Routes></Routes>
      </div>
    </div>
  );
};

export default App;
