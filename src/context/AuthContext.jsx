import {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

import axios from "../api/axios";


const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // Global Language
  // =========================
  const [language, setLanguageState] = useState("English");


  // =========================
  // Initial Load
  // =========================
  useEffect(() => {

    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token) {

      try {

        setUser({
          token,
          ...(savedUser ? JSON.parse(savedUser) : {}),
        });

      } catch (error) {

        console.error(
          "Failed to parse saved user:",
          error
        );

      }

    }


    // Load saved language
    try {

      const savedPreferences =
        localStorage.getItem(
          "notification_preferences"
        );

      if (savedPreferences) {

        const preferences =
          JSON.parse(savedPreferences);

        if (
          preferences.language === "Bangla" ||
          preferences.language === "বাংলা" ||
          preferences.language === "bn"
        ) {

          setLanguageState("Bangla");

        } else {

          setLanguageState("English");

        }

      }

    } catch (error) {

      console.error(
        "Failed to load language preference:",
        error
      );

    }


    setLoading(false);

  }, []);


  // =========================
  // Change Language
  // =========================
  const setLanguage = (newLanguage) => {

    const normalizedLanguage =
      newLanguage === "Bangla" ||
      newLanguage === "বাংলা" ||
      newLanguage === "bn"
        ? "Bangla"
        : "English";


    setLanguageState(normalizedLanguage);


    // Save globally
    try {

      const existingPreferences =
        localStorage.getItem(
          "notification_preferences"
        );

      const preferences =
        existingPreferences
          ? JSON.parse(existingPreferences)
          : {
              diseaseAlerts: true,
              weatherAlerts: true,
              farmAlerts: true,
            };


      preferences.language =
        normalizedLanguage;


      localStorage.setItem(
        "notification_preferences",
        JSON.stringify(preferences)
      );

    } catch (error) {

      console.error(
        "Failed to save language:",
        error
      );

    }

  };


  // =========================
  // Login
  // =========================
  const login = async (
    email,
    password
  ) => {

    try {

      const response = await axios.post(
        "/api/v1/auth/login",
        {
          email,
          password,
        }
      );


      if (response.data.access_token) {

        const token =
          response.data.access_token;


        const userData = {
          email,
        };


        localStorage.setItem(
          "token",
          token
        );


        localStorage.setItem(
          "user",
          JSON.stringify(userData)
        );


        setUser({
          token,
          ...userData,
        });


        return {
          success: true,
        };

      }


      return {
        success: false,
        message: "Login failed",
      };


    } catch (error) {

      return {
        success: false,
        message:
          error.response?.data?.detail ||
          "Login error",
      };

    }

  };


  // =========================
  // Register
  // =========================
  const register = async (
    email,
    full_name,
    password
  ) => {

    const response = await axios.post(
      "/api/v1/auth/register",
      {
        email,
        full_name,
        password,
      }
    );


    return response.data;

  };


  // =========================
  // Logout
  // =========================
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

  };


  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,

        // Language
        language,
        setLanguage,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};


export function useAuth() {

  return useContext(AuthContext);

}

