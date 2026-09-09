import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      {/* HERO */}
      <section className="hero-card">

        <div className="hero-content">

          <div className="hero-tag">
            🇮🇳 SAH-SAMARTH CIVIC ASSISTANT
          </div>

          <h1>
            Welcome back, Sakshi! <span>👋</span>
          </h1>

          <p>
            Let's make our community better, together.
          </p>

          <div className="hero-stats">

            <div className="hero-stat">
              <div className="stat-icon orange">⚠</div>
              <div>
                <strong>12</strong>
                <span>Issues Raised</span>
              </div>
            </div>

            <div className="hero-stat">
              <div className="stat-icon blue">◔</div>
              <div>
                <strong>8</strong>
                <span>In Progress</span>
              </div>
            </div>

            <div className="hero-stat">
              <div className="stat-icon green">✓</div>
              <div>
                <strong>4</strong>
                <span>Resolved</span>
              </div>
            </div>

          </div>
        </div>

        <div className="hero-visual">
          <div className="chakra">☼</div>

          <div className="phone">
            <div className="phone-screen">
              <div className="phone-logo">✓</div>
              <strong>SAH-<br />SAMARTH</strong>
            </div>
          </div>

        </div>

        <div className="tricolor-wave orange-wave"></div>
        <div className="tricolor-wave green-wave"></div>

      </section>


      {/* QUICK ACTIONS */}
      <section className="quick-actions">

        <QuickAction
          icon="⚠"
          title="Report an Issue"
          text="Raise a new complaint"
          type="orange"
          onClick={() => navigate("/grievance")}
        />

        <QuickAction
          icon="◔"
          title="Track Status"
          text="Check your issue status"
          type="blue"
          onClick={() => navigate("/grievance")}
        />

        <QuickAction
          icon="✦"
          title="AI Assistant"
          text="Get instant help"
          type="green"
          onClick={() => navigate("/chat")}
        />

        <QuickAction
          icon="▤"
          title="Government Schemes"
          text="Find schemes & benefits"
          type="purple"
          onClick={() => navigate("/schemes")}
        />

      </section>


      {/* GRID */}
      <section className="dashboard-grid">

        {/* OVERVIEW */}
        <div className="panel overview-panel">

          <div className="panel-header">
            <div>
              <span className="eyebrow">YOUR ACTIVITY</span>
              <h2>Overview</h2>
            </div>

            <button className="view-btn">
              This Month ▾
            </button>
          </div>

          <div className="overview-cards">

            <OverviewCard
              icon="⚠"
              number="12"
              label="Issues Raised"
              change="+20%"
              type="orange"
            />

            <OverviewCard
              icon="◔"
              number="8"
              label="In Progress"
              change="+15%"
              type="blue"
            />

            <OverviewCard
              icon="✓"
              number="4"
              label="Resolved"
              change="+30%"
              type="green"
            />

            <OverviewCard
              icon="★"
              number="4.5"
              label="Satisfaction"
              change="★★★★★"
              type="purple"
            />

          </div>


          {/* RECENT ISSUES */}
          <div className="recent-section">

            <div className="recent-header">
              <h3>Recent Issues</h3>
              <button onClick={() => navigate("/grievance")}>
                View All →
              </button>
            </div>

            <Issue
              image="🛣️"
              title="Pothole on MG Road"
              category="Roads & Infrastructure"
              status="In Progress"
              statusType="progress"
              id="#SAH-2026-1256"
              time="2 days ago"
            />

            <Issue
              image="💡"
              title="Street Light Not Working"
              category="Electricity"
              status="Open"
              statusType="open"
              id="#SAH-2026-1255"
              time="4 days ago"
            />

            <Issue
              image="🗑️"
              title="Garbage Not Collected"
              category="Sanitation"
              status="Resolved"
              statusType="resolved"
              id="#SAH-2026-1254"
              time="1 week ago"
            />

          </div>

        </div>


        {/* AI ASSISTANT */}
        <div className="assistant-card">

          <div className="assistant-header">

            <div className="assistant-avatar">
              ✦
            </div>

            <div>
              <h3>SAH-SAMARTH AI Assistant</h3>
              <span>
                <i></i> Online
              </span>
            </div>

          </div>

          <div className="bot-message">
            <strong>Hello! 👋</strong>
            <p>
              I'm your SAH-SAMARTH Assistant.
              <br />
              How can I help you today?
            </p>
          </div>

          <div className="suggestions">

            <button onClick={() => navigate("/grievance")}>
              ⚠️ Report an issue
            </button>

            <button onClick={() => navigate("/grievance")}>
              🔎 Track my complaint
            </button>

            <button onClick={() => navigate("/grievance")}>
              ⭐ Check complaint status
            </button>

            <button onClick={() => navigate("/schemes")}>
              🏛️ Find government schemes
            </button>

          </div>

          <div className="chat-input">
            <input placeholder="Type your message..." />
            <button>➤</button>
          </div>

          <div className="assistant-wave"></div>

          <small className="powered">
            Powered by AI • For a Better Tomorrow 🇮🇳
          </small>

        </div>

      </section>

    </div>
  );
}


function QuickAction({ icon, title, text, type, onClick }) {
  return (
    <button className="quick-card" onClick={onClick}>

      <div className={`quick-icon ${type}`}>
        {icon}
      </div>

      <div className="quick-text">
        <strong>{title}</strong>
        <span>{text}</span>
      </div>

      <div className="arrow">→</div>

    </button>
  );
}


function OverviewCard({
  icon,
  number,
  label,
  change,
  type
}) {
  return (
    <div className={`overview-card ${type}`}>

      <div className="overview-icon">
        {icon}
      </div>

      <strong>{number}</strong>

      <span>{label}</span>

      <small>{change} from last month</small>

    </div>
  );
}


function Issue({
  image,
  title,
  category,
  status,
  statusType,
  id,
  time
}) {
  return (
    <div className="issue-row">

      <div className="issue-image">
        {image}
      </div>

      <div className="issue-info">
        <strong>{title}</strong>
        <span>{category}</span>
      </div>

      <div className={`issue-status ${statusType}`}>
        {status}
      </div>

      <div className="issue-meta">
        <strong>{id}</strong>
        <span>{time}</span>
      </div>

    </div>
  );
}