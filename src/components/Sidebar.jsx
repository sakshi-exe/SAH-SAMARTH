import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        🌾
        <span>SAH-<br />SAMARTH</span>
      </div>

      <div className="sidebar-menu">
        <Link to="/">🏠 Home</Link>
        <Link to="/chat">💬 AI Assistant</Link>
        <Link to="/schemes">📚 Schemes</Link>
        <Link to="/grievance">📋 Grievance</Link>
      </div>

      <div className="sidebar-bottom">
        <p>Need help?</p>

        <Link to="/chat" className="sidebar-help">
          Ask SAH-SAMARTH →
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;