import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/pages/auth/Login";
import DashbaordLayout from "@/layouts/DashbaordLayout";
import Dashboard from "@/pages/dashbaord/Dashboard";
import SettingLayout from "@/layouts/SettingLayout";
import ProductLayout from "@/layouts/ProductLayout";
import Glasses from "@/pages/products/Glasses";
import AuthLayout from "@/layouts/AuthLayout";
import Pos from "@/pages/pos/Pos";
import Category from "@/pages/products/Category";
import General from "@/pages/products/General";
import Glass from "@/pages/products/Glass";
import Accessories from "@/pages/products/Accessories";
import Lense from "@/pages/products/Lense";
import Kit from "@/pages/products/Kit";
import Purchase from "@/pages/purchase/Purchase";
import Customers from "@/pages/participants/Customers";
import Vendor from "./pages/participants/Vendor";
import ParticipantLayout from "./layouts/ParticipantLayout";
import { FrameTypes } from "./enum/enum";
import Publish from "./pages/publish/Publish";
import CreateAccount from "./pages/auth/CreateAccount";
import Forgot from "./pages/auth/Forgot";
import Plans from "./pages/plans";
import CreatePost from "./pages/publish/CreatePost";
import Analyze from "./pages/analyze/Analyze";
import Engagement from "./pages/engagement/Engagement";
import Board from "./pages/board/Board";
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
    path: "/point-of-sale",
    element: <Pos />,
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
