import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/dashbaord/Dashboard";
import SettingLayout from "@/layouts/SettingLayout";
import AuthLayout from "@/layouts/AuthLayout";
import CreateAccount from "./pages/auth/CreateAccount";
import Forgot from "./pages/auth/Forgot";
import Plans from "./pages/plans";
import LandingPage from "./pages/landingpage/LandingPage";
import { DashboardTwo } from "./pages/dashbaord/DashbaordTwo";
import { ChatLayout } from "./components/chats/ChatLayout";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Navigate replace to={"/dashboard"} />,
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "create-account",
        element: <CreateAccount />,
      },
      {
        path: "forgot",
        element: <Forgot />,
      },
    ],
  },
  {
    path: "/dashbaord",
    element: <DashboardTwo />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "chat",
        element: <ChatLayout />,
      },
      {
        path: "chat/:receiver/:sender",
        element: <ChatLayout />,
      },
      {
        path: "settings",
        element: <SettingLayout />,
      },
      {
        path: "plans",
        element: <Plans />,
      },
    ],
  },
]);

export default router;
