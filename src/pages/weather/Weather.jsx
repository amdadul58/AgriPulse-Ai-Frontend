import { useEffect, useState } from "react";
import axios from "../../api/axios";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getWeather = () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Your browser does not support location access.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          console.log("User Location:", {
            latitude,
            longitude,
          });

          const token = localStorage.getItem("token");

          const response = await axios.get(
            `/api/v1/weather/?lat=${latitude}&lon=${longitude}`,
            {
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            }
          );

          console.log("Weather API Response:", response.data);

          if (response.data?.error) {
            setError(response.data.error);
            setWeather(null);
          } else {
            setWeather(response.data);
          }
        } catch (err) {
          console.error("Weather Error:", err);

          setError(
            err.response?.data?.detail ||
              err.response?.data?.message ||
              "Failed to load weather information."
          );

          setWeather(null);
        } finally {
          setLoading(false);
        }
      },
      (locationError) => {
        console.error("Location Error:", locationError);

        if (locationError.code === 1) {
          setError(
            "Location permission was denied. Please allow location access and try again."
          );
        } else if (locationError.code === 2) {
          setError("Your location could not be determined.");
        } else {
          setError("Unable to get your current location.");
        }

        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#0b132b] text-slate-100 p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1 text-white">
              🌤️ Weather
            </h1>
            <p className="text-slate-400">
              Current weather information for your agricultural area.
            </p>
          </div>

          <button
            onClick={getWeather}
            disabled={loading}
            className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl hover:bg-emerald-500 transition shadow-lg shadow-emerald-950/20 font-medium disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Loading..." : "🔄 Refresh"}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-[#111c38] border border-slate-800 rounded-2xl shadow-lg p-10 text-center">
            <div className="text-5xl mb-4 animate-pulse">🌤️</div>
            <p className="text-slate-400">
              Getting your current location and weather...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-[#111c38] border border-red-900/50 rounded-2xl shadow-lg p-8">
            <div className="flex items-start gap-4">
              <div className="text-4xl">⚠️</div>
              <div>
                <h2 className="text-xl font-bold text-red-400">
                  Weather Error
                </h2>
                <p className="text-slate-300 mt-2">
                  {error}
                </p>
                <button
                  onClick={getWeather}
                  className="mt-5 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl transition font-medium"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Weather */}
        {!loading && weather && !error && (
          <div>
            {/* Main Weather Card */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl shadow-lg p-8 mb-6 border border-emerald-500/20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">
                    Current Weather
                  </p>
                  <h2 className="text-3xl font-bold mt-1">
                    {weather.city}
                    {weather.country && `, ${weather.country}`}
                  </h2>
                  <p className="text-emerald-100 capitalize mt-2">
                    {weather.description}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {weather.icon ? (
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                      alt={weather.description}
                      className="w-20 h-20 filter drop-shadow"
                    />
                  ) : (
                    <div className="text-6xl">🌤️</div>
                  )}

                  <div>
                    <p className="text-5xl font-bold">
                      {Math.round(weather.temp)}°C
                    </p>
                    <p className="text-emerald-100 mt-1">
                      Feels like {Math.round(weather.feels_like)}°C
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Temperature */}
              <div className="bg-[#111c38] border border-slate-800 rounded-2xl shadow-lg p-6">
                <div className="text-3xl mb-3">🌡️</div>
                <p className="text-sm text-slate-400">Temperature</p>
                <p className="text-2xl font-bold text-slate-100 mt-1">
                  {Math.round(weather.temp)}°C
                </p>
              </div>

              {/* Humidity */}
              <div className="bg-[#111c38] border border-slate-800 rounded-2xl shadow-lg p-6">
                <div className="text-3xl mb-3">💧</div>
                <p className="text-sm text-slate-400">Humidity</p>
                <p className="text-2xl font-bold text-slate-100 mt-1">
                  {weather.humidity}%
                </p>
              </div>

              {/* Wind */}
              <div className="bg-[#111c38] border border-slate-800 rounded-2xl shadow-lg p-6">
                <div className="text-3xl mb-3">💨</div>
                <p className="text-sm text-slate-400">Wind Speed</p>
                <p className="text-2xl font-bold text-slate-100 mt-1">
                  {weather.wind_speed} m/s
                </p>
              </div>

              {/* Pressure */}
              <div className="bg-[#111c38] border border-slate-800 rounded-2xl shadow-lg p-6">
                <div className="text-3xl mb-3">📊</div>
                <p className="text-sm text-slate-400">Pressure</p>
                <p className="text-2xl font-bold text-slate-100 mt-1">
                  {weather.pressure} hPa
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Weather;