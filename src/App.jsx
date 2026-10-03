import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";

import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

import Dashboard from "./pages/dashboard/Dashboard.jsx";
import MyFarms from "./pages/farms/MyFarms.jsx";
import AIChat from "./pages/chat/AIChat.jsx";
import DiseaseDetection from "./pages/disease/DiseaseDetection.jsx";
import VisionDiseaseDetection from "./pages/vision/VisionDiseaseDetection.jsx";
import CropRecommendation from "./pages/recommendation/CropRecommendation.jsx";
import FertilizerRecommendation from "./pages/recommendation/FertilizerRecommendation.jsx";
import Weather from "./pages/weather/Weather.jsx";
import RAGSearch from "./pages/rag/RAGSearch.jsx";
import VectorSearch from "./pages/vector/VectorSearch.jsx";
import Analytics from "./pages/analytics/Analytics.jsx";
import Notifications from "./pages/notifications/Notifications.jsx";
import Settings from "./pages/settings/Settings.jsx";

import PrivateRoute from "./components/PrivateRoute.jsx";
import DashboardLayout from "./components/layouts/DashboardLayout.jsx";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Authentication */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>


          {/* Dashboard */}

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >

            <Route
              index
              element={<Dashboard />}
            />

            <Route
              path="farms"
              element={<MyFarms />}
            />

            <Route
              path="chat"
              element={<AIChat />}
            />

            <Route
              path="disease"
              element={<DiseaseDetection />}
            />

            <Route
              path="vision-disease"
              element={<VisionDiseaseDetection />}
            />

            <Route
              path="crop-recommend"
              element={<CropRecommendation />}
            />

            <Route
              path="fertilizer"
              element={<FertilizerRecommendation />}
            />

            <Route
              path="weather"
              element={<Weather />}
            />

            <Route
              path="rag"
              element={<RAGSearch />}
            />

            <Route
              path="vector"
              element={<VectorSearch />}
            />

            <Route
              path="analytics"
              element={<Analytics />}
            />

            <Route
              path="notifications"
              element={<Notifications />}
            />

            <Route
              path="settings"
              element={<Settings />}
            />

          </Route>


          {/* Root */}

          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />


          {/* Unknown Route */}

          <Route
            path="*"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;

