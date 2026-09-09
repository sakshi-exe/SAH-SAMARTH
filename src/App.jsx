import { useMemo, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Schemes from "./pages/Schemes";
import Grievance from "./pages/Grievance";

const navItems = [
  { label: "Dashboard", icon: "⌂", path: "/" },
  { label: "Report an Issue", icon: "⚠", path: "/grievance" },
  { label: "My Issues", icon: "▣", path: "/issues" },
  { label: "Track Status", icon: "◔", path: "/track" },
  { label: "Schemes", icon: "▤", path: "/schemes" },
  { label: "AI Assistant", icon: "✦", path: "/chat" },
];

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [language, setLanguage] = useState("English");

  const searchResults = useMemo(() => {
    const searchableItems = [
      { label: "Dashboard", detail: "Your activity overview", path: "/" },
      { label: "Report an Issue", detail: "Submit a grievance", path: "/grievance" },
      { label: "My Issues", detail: "View submitted grievances", path: "/issues" },
      { label: "Track Status", detail: "Find a grievance by ID", path: "/track" },
      { label: "Government Schemes", detail: "Browse cooperative support", path: "/schemes" },
      { label: "AI Assistant", detail: "Ask a question", path: "/chat" },
    ];
    const query = search.trim().toLowerCase();
    return query ? searchableItems.filter((item) => `${item.label} ${item.detail}`.toLowerCase().includes(query)) : [];
  }, [search]);

  const goToSearchResult = (path) => {
    setSearch("");
    navigate(path);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="brand">
          <div className="brand-logo"><span>✓</span></div>
          {sidebarOpen && <div><h2>SAH-<b>SAMARTH</b></h2><small>Together for a Better Tomorrow</small></div>}
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button key={item.label} className={`nav-item ${location.pathname === item.path ? "active" : ""}`} onClick={() => navigate(item.path)} type="button">
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
              {item.label === "AI Assistant" && sidebarOpen && <span className="new-badge">NEW</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="india-card"><strong>Building a Better India 🇮🇳</strong><span>Together, one issue at a time.</span></div>
          <button className="emergency-btn" type="button" onClick={() => { window.location.href = "tel:112"; }} aria-label="Call emergency services at 112">
            <span>☎</span>
            {sidebarOpen && <div><strong>Emergency</strong><small>Dial 112</small></div>}
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)} type="button" aria-label={sidebarOpen ? "Collapse navigation" : "Expand navigation"}>☰</button>
          <div className="search-box">
            <span aria-hidden="true">⌕</span>
            <input placeholder="Search issues, schemes, departments..." value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search the application" />
            {searchResults.length > 0 && <div className="search-results">{searchResults.map((result) => <button type="button" key={result.path} onClick={() => goToSearchResult(result.path)}><strong>{result.label}</strong><span>{result.detail}</span></button>)}</div>}
            {search.trim() && searchResults.length === 0 && <div className="search-results search-empty">No matching destination found.</div>}
          </div>
          <div className="top-actions">
            <button className="language-btn" type="button" onClick={() => setOpenMenu(openMenu === "language" ? null : "language")} aria-expanded={openMenu === "language"}>🌐 {language} ▾</button>
            {openMenu === "language" && <div className="topbar-menu language-menu">{[["English", "English"], ["हिन्दी", "Hindi"], ["मराठी", "Marathi"]].map(([value, label]) => <button type="button" key={value} className={language === value ? "selected" : ""} onClick={() => { setLanguage(value); setOpenMenu(null); }}>{label}</button>)}</div>}
            <button className="notification-btn" type="button" onClick={() => setOpenMenu(openMenu === "notifications" ? null : "notifications")} aria-label="View notifications" aria-expanded={openMenu === "notifications"}>♧ <span>3</span></button>
            {openMenu === "notifications" && <div className="topbar-menu notification-menu"><strong>Notifications</strong><p>Your grievance updates will appear here.</p><button type="button" onClick={() => setOpenMenu(null)}>Mark as read</button></div>}
            <button className="profile" type="button" onClick={() => setOpenMenu(openMenu === "profile" ? null : "profile")} aria-expanded={openMenu === "profile"}><div className="avatar">S</div><div><strong>Sakshi R.</strong><small>Citizen</small></div><span>⌄</span></button>
            {openMenu === "profile" && <div className="topbar-menu profile-menu"><strong>Sakshi R.</strong><span>Citizen account</span><button type="button" onClick={() => navigate("/issues")}>View my issues</button></div>}
          </div>
        </header>
        <section className="page-content">{children}</section>
      </main>
    </div>
  );
}

function NotFound() {
  const navigate = useNavigate();
  return <main className="empty-state panel-surface page-animated"><div className="empty-icon">🧭</div><h3>Page not found</h3><p>That destination is not available in this prototype.</p><button type="button" className="primary-btn small-btn" onClick={() => navigate("/")}>Return Home</button></main>;
}

export default function App() {
  return <Routes><Route path="*" element={<Layout><Routes><Route path="/" element={<Home />} /><Route path="/chat" element={<Chat />} /><Route path="/schemes" element={<Schemes />} /><Route path="/grievance" element={<Grievance mode="report" />} /><Route path="/issues" element={<Grievance mode="issues" />} /><Route path="/track" element={<Grievance mode="track" />} /><Route path="*" element={<NotFound />} /></Routes></Layout>} /></Routes>;
}