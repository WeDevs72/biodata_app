"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  List,
  Grid2x2,
  BarChart2,
  Edit3,
  Settings,
  Mail,
  Menu,
  X,
  LogOut,
  Sun,
  Moon,
  Globe,
  ChevronRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase";


const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Biodata Records", href: "/admin/records", icon: List },
  { label: "Templates", href: "/admin/templates", icon: Grid2x2 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Apply dark/light class to html element
  useEffect(() => {
    document.documentElement.classList.toggle("admin-light", !darkMode);
  }, [darkMode]);

  const currentPage = NAV_ITEMS.find((n) => n.href === pathname)?.label ?? "Admin";

  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/logout";

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session && !isAuthPage) {
        router.push("/admin/login");
      }
    };
    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && !isAuthPage) {
        router.push("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [isAuthPage, router]);

  if (isAuthPage) {
    return (
      <div className="admin-auth-wrapper" style={{ background: "#080B14", minHeight: "100vh" }}>
        {children}
      </div>
    );
  }

  return (
    <div
      className="admin-shell"
      style={{
        "--bg-primary": darkMode ? "#080B14" : "#F0F4FF",
        "--bg-secondary": darkMode ? "#0D1120" : "#FFFFFF",
        "--bg-card": darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
        "--border": darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
        "--text-primary": darkMode ? "#F0F4FF" : "#080B14",
        "--text-secondary": darkMode ? "#8896AC" : "#64748B",
        "--accent": "#F97316",
        "--accent-glow": "rgba(249,115,22,0.25)",
        "--sidebar-w": "260px",
      } as React.CSSProperties}
    >
      <style>{`
        .admin-shell {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background: var(--bg-primary);
          font-family: 'DM Sans', sans-serif;
        }
        /* ── Sidebar ── */
        .admin-sidebar {
          width: var(--sidebar-w);
          flex-shrink: 0;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(.4,0,.2,1);
          z-index: 50;
        }
        @media (max-width: 768px) {
          .admin-sidebar {
            position: fixed;
            top: 0; left: 0; bottom: 0;
            transform: translateX(-100%);
          }
          .admin-sidebar.open {
            transform: translateX(0);
            box-shadow: 0 0 60px rgba(0,0,0,0.6);
          }
          .admin-main {
            margin-left: 0 !important;
          }
        }
        .sidebar-logo {
          padding: 24px 20px 20px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sidebar-logo-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #F97316, #EF4444);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 16px rgba(249,115,22,0.4);
        }
        .sidebar-logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 17px;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .sidebar-logo-sub {
          font-size: 10px;
          color: var(--text-secondary);
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .sidebar-nav {
          flex: 1;
          padding: 16px 12px;
          overflow-y: auto;
          scrollbar-width: none;
        }
        .sidebar-nav::-webkit-scrollbar { display: none; }
        .nav-section-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-secondary);
          padding: 8px 8px 4px;
          margin-bottom: 4px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          text-decoration: none;
          margin-bottom: 2px;
        }
        .nav-item:hover {
          background: var(--bg-card);
          color: var(--text-primary);
        }
        .nav-item.active {
          background: linear-gradient(135deg, rgba(249,115,22,0.15), rgba(239,68,68,0.08));
          color: #F97316;
          border: 1px solid rgba(249,115,22,0.2);
        }
        .nav-item.active .nav-icon {
          color: #F97316;
          filter: drop-shadow(0 0 6px rgba(249,115,22,0.5));
        }
        .nav-item-badge {
          margin-left: auto;
          background: #F97316;
          color: white;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 20px;
        }
        .sidebar-footer {
          padding: 16px 12px;
          border-top: 1px solid var(--border);
        }
        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .sidebar-user:hover { background: var(--bg-card); }
        .sidebar-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #F97316, #8B5CF6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          color: white;
          flex-shrink: 0;
        }
        .sidebar-user-info { flex: 1; min-width: 0; }
        .sidebar-user-name { font-size: 13px; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .sidebar-user-role { font-size: 11px; color: var(--text-secondary); }
        /* ── Main ── */
        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        /* ── Top Header ── */
        .admin-header {
          height: 64px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          padding: 0 24px;
          gap: 16px;
          flex-shrink: 0;
        }
        .admin-header-title {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          flex: 1;
        }
        .admin-header-title span {
          color: #F97316;
        }
        .header-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .header-btn:hover { color: var(--text-primary); border-color: var(--accent); background: rgba(249,115,22,0.1); }
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 10px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          color: #EF4444;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .logout-btn:hover { background: rgba(239,68,68,0.2); border-color: rgba(239,68,68,0.4); }
        /* ── Content ── */
        .admin-content {
          flex: 1;
          overflow-y: auto;
          padding: 28px;
          scrollbar-width: thin;
          scrollbar-color: var(--border) transparent;
        }
        .admin-content::-webkit-scrollbar { width: 5px; }
        .admin-content::-webkit-scrollbar-track { background: transparent; }
        .admin-content::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
        /* ── Overlay ── */
        .sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 49;
          backdrop-filter: blur(2px);
        }
        @media (max-width: 768px) {
          .sidebar-overlay.open { display: block; }
        }
        /* ── Hamburger ── */
        .hamburger { display: none; }
        @media (max-width: 768px) { .hamburger { display: flex; } }
      `}</style>

      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');`}</style>

      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── Sidebar ── */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Globe size={18} color="white" />
          </div>
          <div>
            <div className="sidebar-logo-text">BioDataEarth</div>
            <div className="sidebar-logo-sub">Admin Panel</div>
          </div>
          {/* Close on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", display: "none" }}
            className="hamburger"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">Menu</div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={17} className="nav-icon" />
                {item.label}
                {/* {item.badge && <span className="nav-item-badge">{item.badge}</span>} */}
                {isActive && (
                  <ChevronRight
                    size={14}
                    style={{ marginLeft: "auto", color: "#F97316", opacity: 0.7 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">A</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">Admin</div>
              <div className="sidebar-user-role">Super Admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          {/* Hamburger */}
          <button className="header-btn hamburger" onClick={() => setSidebarOpen(true)}>
            <Menu size={18} />
          </button>

          <div className="admin-header-title">
            <span>BioDataEarth</span> — {currentPage}
          </div>

          {/* Dark/Light toggle */}
          <button className="header-btn" onClick={() => setDarkMode(!darkMode)} title="Toggle theme">
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Admin avatar */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #F97316, #8B5CF6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
                color: "white",
                cursor: "pointer",
                border: "2px solid rgba(249,115,22,0.4)",
                flexShrink: 0,
              }}
            >
              A
            </div>
          </div>

          {/* Logout */}
          <button className="logout-btn" onClick={() => router.push("/admin/logout")}>
            <LogOut size={14} />
            <span style={{ display: "none" }} className="logout-label">Logout</span>
          </button>
        </header>

        {/* Page Content */}
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
