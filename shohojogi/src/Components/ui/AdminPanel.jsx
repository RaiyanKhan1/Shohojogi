import React from "react";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  X as CloseIcon,
} from "lucide-react";

function AdminPanel({
  activeSection,
  setActiveSection,
  sidebarOpen,
  setSidebarOpen,
  pendingCount,
}) {
  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[252px] flex-col overflow-hidden border-r border-gray-200 bg-white shadow-[4px_0_24px_rgba(22,163,74,0.08)] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* glow */}
        <div
          className="pointer-events-none absolute -right-24 top-[38%] h-56 w-56 rounded-full bg-green-500/10 blur-[75px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-green-400/15 blur-[80px]"
          aria-hidden="true"
        />

        {/* Logo */}
        <div className="relative z-10 flex h-[78px] shrink-0 items-center justify-center border-b border-gray-100">
          <img
            src="/src/assets/icons/banner.svg"
            alt="Shohojogi"
            className="h-9 w-auto"
          />

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="absolute right-4 flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-50 hover:text-gray-700 lg:hidden"
          >
            <CloseIcon size={19} />
          </button>
        </div>

        {/* Admin Profile */}
        <div className="relative z-10 px-5 pt-6">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/70 p-3">
            <div className="relative shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-lg font-bold text-white shadow-[0_0_16px_rgba(21,128,61,0.18)]">
                A
              </div>

              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900">Admin</p>

              <p className="truncate text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 mt-7 px-4">
          <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
            Workspace
          </p>

          {/* Dashboard */}
          <button
            type="button"
            onClick={() => {
              setActiveSection("dashboard");
              setSidebarOpen(false);
            }}
            className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold cursor-pointer transition ${
              activeSection === "dashboard"
                ? "bg-green-700 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <span className="flex items-center gap-3">
              <LayoutDashboard size={18} />
              Dashboard
            </span>

            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                activeSection === "dashboard"
                  ? "bg-white/15 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {pendingCount}
            </span>
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={() => {
              setActiveSection("settings");
              setSidebarOpen(false);
            }}
            className={`mt-1.5 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold cursor-pointer transition ${
              activeSection === "settings"
                ? "bg-green-700 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Settings size={18} />
            Settings
          </button>
        </nav>

        {/* Bottom Logout */}
        <div className="relative z-10 mt-auto border-t border-gray-100 p-4">
          <button
            type="button"
            onClick={() => console.log("Logout")}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold cursor-pointer text-gray-500 transition hover:bg-rose-700 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminPanel;
