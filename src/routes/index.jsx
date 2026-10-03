```jsx
import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";

import Dashboard from "../pages/dashboard/Dashboard.jsx";
import MyFarms from "../pages/farms/MyFarms.jsx";
import AIChat from "../pages/chat/AIChat.jsx";
import DiseaseDetection from "../pages/disease/DiseaseDetection.jsx";

import CropRecommendation from "../pages/recommendation/CropRecommendation.jsx";
import FertilizerRecommendation from "../pages/recommendation/FertilizerRecommendation.jsx";

import Weather from "../pages/weather/Weather.jsx";
import RAGSearch from "../pages/rag/RAGSearch.jsx";
import VectorSearch from "../pages/vector/VectorSearch.jsx";

import Analytics from "../pages/analytics/Analytics.jsx";
import Notifications from "../pages/notifications/Notifications.jsx";
import Settings from "../pages/settings/Settings.jsx";

import PrivateRoute from "./PrivateRoute.jsx";
import DashboardLayout from "../components/layouts/DashboardLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "farms",
        element: <MyFarms />,
      },

      {
        path: "chat",
        element: <AIChat />,
      },

      {
        path: "disease",
        element: <DiseaseDetection />,
      },

      {
        path: "crop-recommend",
        element: <CropRecommendation />,
      },

      {
        path: "fertilizer",
        element: <FertilizerRecommendation />,
      },

      {
        path: "weather",
        element: <Weather />,
      },

      {
        path: "rag",
        element: <RAGSearch />,
      },

      {
        path: "vector",
        element: <VectorSearch />,
      },

      {
        path: "analytics",
        element: <Analytics />,
      },

      {
        path: "notifications",
        element: <Notifications />,
      },

      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
```
