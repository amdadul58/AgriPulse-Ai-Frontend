import { useEffect, useState } from "react";
import api from "../../api/axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  // =========================
  // Fetch Notifications
  // =========================
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/v1/notifications");

      setNotifications(response.data?.notifications || []);
      setUnreadCount(response.data?.unread || 0);
    } catch (err) {
      console.error("Notification fetch error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          "Failed to load notifications."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Fetch Unread Count
  // =========================
  const fetchUnreadCount = async () => {
    try {
      const response = await api.get(
        "/api/v1/notifications/unread-count"
      );

      setUnreadCount(response.data?.unread || 0);
    } catch (err) {
      console.error("Unread count error:", err);
    }
  };

  // =========================
  // Initial Load
  // =========================
  useEffect(() => {
    fetchNotifications();
  }, []);

  // =========================
  // Mark One As Read
  // =========================
  const handleMarkAsRead = async (notificationId) => {
    try {
      setActionLoading(`read-${notificationId}`);
      setError("");

      await api.patch(
        `/api/v1/notifications/${notificationId}/read`
      );

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? {
                ...notification,
                is_read: true,
                read: true,
              }
            : notification
        )
      );

      await fetchUnreadCount();
    } catch (err) {
      console.error("Mark as read error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          "Failed to mark notification as read."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // =========================
  // Mark All As Read
  // =========================
  const handleMarkAllAsRead = async () => {
    try {
      setActionLoading("read-all");
      setError("");

      await api.patch("/api/v1/notifications/read-all");

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          is_read: true,
          read: true,
        }))
      );

      setUnreadCount(0);
    } catch (err) {
      console.error("Mark all as read error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          "Failed to mark all notifications as read."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // =========================
  // Delete Notification
  // =========================
  const handleDelete = async (notificationId) => {
    try {
      setActionLoading(`delete-${notificationId}`);
      setError("");

      await api.delete(
        `/api/v1/notifications/${notificationId}`
      );

      setNotifications((prev) =>
        prev.filter(
          (notification) =>
            notification.id !== notificationId
        )
      );

      await fetchUnreadCount();
    } catch (err) {
      console.error("Delete notification error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.detail ||
          "Failed to delete notification."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // =========================
  // Refresh
  // =========================
  const handleRefresh = async () => {
    await fetchNotifications();
  };

  // =========================
  // Notification Helpers
  // =========================
  const getNotificationTitle = (notification) => {
    return (
      notification.title ||
      notification.subject ||
      notification.type ||
      "Agriculture Notification"
    );
  };

  const getNotificationMessage = (notification) => {
    return (
      notification.message ||
      notification.description ||
      notification.content ||
      "You have a new notification."
    );
  };

  const getNotificationDate = (notification) => {
    const date =
      notification.created_at ||
      notification.timestamp ||
      notification.date;

    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleString();
  };

  const isNotificationRead = (notification) => {
    return (
      notification.is_read === true ||
      notification.read === true
    );
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#0b132b] text-slate-100 p-4 md:p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                🔔 Notifications
              </h1>

              {unreadCount > 0 && (
                <span className="rounded-full bg-emerald-950/60 border border-emerald-900/50 px-3 py-1 text-sm font-semibold text-emerald-400">
                  {unreadCount} unread
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-slate-400">
              Stay updated with your agricultural activities and alerts.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg shadow-emerald-950/20"
          >
            {loading ? "Refreshing..." : "🔄 Refresh"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-red-900/50 bg-red-950/40 p-4 text-red-300">
            <span>⚠️ {error}</span>

            <button
              onClick={() => setError("")}
              className="ml-4 font-bold text-red-400 hover:text-red-200"
            >
              ✕
            </button>
          </div>
        )}

        {/* Main Card */}
        <div className="rounded-2xl bg-[#111c38] border border-slate-800 shadow-lg overflow-hidden">

          {/* Card Header */}
          <div className="flex flex-col gap-4 border-b border-slate-800 p-6 sm:flex-row sm:items-center sm:justify-between bg-[#0b132b]/50">

            <div>
              <h2 className="text-lg font-bold text-white">
                Notifications Center
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                {notifications.length} notification
                {notifications.length !== 1 ? "s" : ""} available
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                disabled={actionLoading === "read-all"}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 shadow-md shadow-emerald-950/20"
              >
                {actionLoading === "read-all"
                  ? "Marking..."
                  : "✓ Mark All as Read"}
              </button>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="p-10 text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-emerald-950 border-t-emerald-500"></div>

              <p className="text-slate-400">
                Loading notifications...
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && notifications.length === 0 && !error && (
            <div className="p-12 text-center">

              <div className="inline-flex items-center justify-center w-20 h-20 mx-auto rounded-3xl bg-emerald-950/40 border border-emerald-900/40 text-4xl mb-4">
                🔔
              </div>

              <h3 className="text-xl font-bold text-white">
                No notifications yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
                You don't have any notifications right now.
                New agricultural alerts and updates will appear here.
              </p>

            </div>
          )}

          {/* Notifications */}
          {!loading && notifications.length > 0 && (
            <div className="divide-y divide-slate-800">

              {notifications.map((notification, index) => {
                const notificationId =
                  notification.id ||
                  notification.notification_id;

                const isRead =
                  isNotificationRead(notification);

                return (
                  <div
                    key={notificationId || index}
                    className={`p-6 transition hover:bg-[#0b132b]/40 ${
                      !isRead
                        ? "bg-emerald-950/20"
                        : "bg-[#111c38]"
                    }`}
                  >

                    <div className="flex gap-4">

                      {/* Icon */}
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl border ${
                          isRead
                            ? "bg-slate-900/60 border-slate-800 text-slate-400"
                            : "bg-emerald-950/60 border-emerald-900/50 text-emerald-400"
                        }`}
                      >
                        {notification.type === "disease"
                          ? "🩺"
                          : notification.type === "weather"
                          ? "🌦️"
                          : notification.type === "farm"
                          ? "🌾"
                          : notification.type === "warning"
                          ? "⚠️"
                          : "🔔"}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                          <div>
                            <div className="flex items-center gap-2">

                              <h3
                                className={`text-base ${
                                  isRead
                                    ? "font-medium text-slate-300"
                                    : "font-bold text-white"
                                }`}
                              >
                                {getNotificationTitle(
                                  notification
                                )}
                              </h3>

                              {!isRead && (
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                              )}

                            </div>

                            <p className="mt-2 whitespace-pre-wrap leading-6 text-slate-400 text-sm">
                              {getNotificationMessage(
                                notification
                              )}
                            </p>

                            {getNotificationDate(
                              notification
                            ) && (
                              <p className="mt-3 text-xs text-slate-500">
                                🕒{" "}
                                {getNotificationDate(
                                  notification
                                )}
                              </p>
                            )}
                          </div>

                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex flex-wrap gap-2">

                          {!isRead && notificationId && (
                            <button
                              onClick={() =>
                                handleMarkAsRead(
                                  notificationId
                                )
                              }
                              disabled={
                                actionLoading ===
                                `read-${notificationId}`
                              }
                              className="rounded-xl bg-emerald-950/40 border border-emerald-900/40 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-900/50 disabled:opacity-60"
                            >
                              {actionLoading ===
                              `read-${notificationId}`
                                ? "Marking..."
                                : "✓ Mark as Read"}
                            </button>
                          )}

                          {notificationId && (
                            <button
                              onClick={() =>
                                handleDelete(
                                  notificationId
                                )
                              }
                              disabled={
                                actionLoading ===
                                `delete-${notificationId}`
                              }
                              className="rounded-xl bg-red-950/30 border border-red-950/40 px-3.5 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-900/40 disabled:opacity-60"
                            >
                              {actionLoading ===
                              `delete-${notificationId}`
                                ? "Deleting..."
                                : "🗑️ Delete"}
                            </button>
                          )}

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

        {/* Summary */}
        {!loading && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div className="rounded-2xl bg-[#111c38] border border-slate-800 p-5 shadow-lg">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                Total Notifications
              </p>

              <p className="mt-2 text-2xl font-bold text-white">
                {notifications.length}
              </p>
            </div>

            <div className="rounded-2xl bg-[#111c38] border border-slate-800 p-5 shadow-lg">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                Unread
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-400">
                {unreadCount}
              </p>
            </div>

            <div className="rounded-2xl bg-[#111c38] border border-slate-800 p-5 shadow-lg">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                Status
              </p>

              <p className="mt-2 text-base font-semibold text-slate-200">
                {unreadCount > 0
                  ? "You have unread alerts"
                  : "All notifications read"}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Notifications;