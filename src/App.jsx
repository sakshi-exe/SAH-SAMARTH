import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Schemes from "./pages/Schemes";
import Grievance from "./pages/Grievance";

const navItems = [
  { label: "Dashboard", icon: "⌂", path: "/" },
  { label: "Report an Issue", icon: "⚠", path: "/grievance" },
  { label: "My Issues", icon: "▣", path: "/grievance" },
  { label: "Track Status", icon: "◔", path: "/grievance" },
  { label: "Schemes", icon: "▤", path: "/schemes" },
  { label: "AI Assistant", icon: "✦", path: "/chat" },
];

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app-shell">

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>

        <div className="brand">
          <div className="brand-logo">
            <span>✓</span>
          </div>

          {sidebarOpen && (
            <div>
              <h2>SAH-<b>SAMARTH</b></h2>
              <small>Together for a Better Tomorrow</small>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">

          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              <span className="nav-icon">{item.icon}</span>

              {sidebarOpen && <span>{item.label}</span>}

              {item.label === "AI Assistant" && sidebarOpen && (
                <span className="new-badge">NEW</span>
              )}
            </button>
          ))}

        </nav>

        <div className="sidebar-bottom">

          <div className="india-card">
            <strong>Building a Better India 🇮🇳</strong>
            <span>Together, one issue at a time.</span>
          </div>

          <button className="emergency-btn">
            <span>☎</span>
            {sidebarOpen && (
              <div>
                <strong>Emergency</strong>
                <small>Dial 112</small>
              </div>
            )}
          </button>

        </div>
      </aside>

      {/* MAIN */}
      <main className="main-area">

        {/* TOPBAR */}
        <header className="topbar">

          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <div className="search-box">
            <span>⌕</span>
            <input
              placeholder="Search issues, schemes, departments..."
            />
          </div>

          <div className="top-actions">

            <button className="language-btn">
              🌐 English ▾
            </button>

            <button className="notification-btn">
              ♧
              <span>3</span>
            </button>

            <div className="profile">
              <div className="avatar">S</div>
              <div>
                <strong>Sakshi R.</strong>
                <small>Citizen</small>
              </div>
              <span>⌄</span>
            </div>

          </div>
        </header>

        <section className="page-content">
          {children}
        </section>

      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/grievance" element={<Grievance />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}