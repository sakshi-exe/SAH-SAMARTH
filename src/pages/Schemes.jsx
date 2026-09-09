import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const schemes = [
  {
    icon: "🌾",
    title: "Cooperative Development Scheme",
    category: "COOPERATIVE",
    description: "Support for strengthening and modernising cooperative societies.",
    status: "Available",
    highlight: "Improves infrastructure, governance, and member support for cooperative bodies.",
    eligibility: "Registered cooperative societies and member-led groups in eligible districts.",
  },
  {
    icon: "💰",
    title: "Cooperative Credit Support",
    category: "FINANCE",
    description: "Financial assistance and credit support for eligible cooperative members.",
    status: "Available",
    highlight: "Offers concessional credit for working capital and seasonal agriculture needs.",
    eligibility: "Cooperative members with active accounts and valid membership records.",
  },
  {
    icon: "🏭",
    title: "Cooperative Infrastructure",
    category: "INFRASTRUCTURE",
    description: "Assistance for developing infrastructure and improving cooperative operations.",
    status: "Available",
    highlight: "Supports digital and physical infrastructure upgrades for local cooperatives.",
    eligibility: "Regional cooperatives meeting minimum operational and governance criteria.",
  },
  {
    icon: "👩‍🌾",
    title: "Women Cooperative Support",
    category: "EMPOWERMENT",
    description: "Special support initiatives for women-led cooperative activities.",
    status: "Available",
    highlight: "Empowers women entrepreneurs, SHGs, and self-help cooperative networks.",
    eligibility: "Women-led cooperatives or groups registered under relevant local bodies.",
  },
  {
    icon: "🚜",
    title: "Agriculture Cooperative Support",
    category: "AGRICULTURE",
    description: "Programs supporting agricultural cooperatives and their members.",
    status: "Available",
    highlight: "Helps farmers access subsidies, input support, and market-linking opportunities.",
    eligibility: "Member farmer groups and agriculture cooperatives in participating regions.",
  },
  {
    icon: "📈",
    title: "Cooperative Business Growth",
    category: "BUSINESS",
    description: "Support for expansion, digitalisation and sustainable cooperative growth.",
    status: "Available",
    highlight: "Focuses on business expansion, risk mitigation, and digitalisation for cooperatives.",
    eligibility: "Existing cooperatives with a demonstrated growth or digital readiness plan.",
  },
];

const Schemes = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");

  const categories = ["ALL", "COOPERATIVE", "FINANCE", "AGRICULTURE", "EMPOWERMENT", "INFRASTRUCTURE", "BUSINESS"];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedScheme(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      const matchesSearch =
        scheme.title.toLowerCase().includes(search.toLowerCase()) ||
        scheme.description.toLowerCase().includes(search.toLowerCase()) ||
        scheme.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "ALL" || scheme.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <main className="schemes-page page-animated">
      <div className="page-heading">
        <div>
          <span className="eyebrow">GOVERNMENT SUPPORT</span>
          <h1>Government Schemes</h1>
          <p>Discover schemes and financial support available for cooperative societies.</p>
        </div>

        <div className="scheme-count">
          <strong>{filteredSchemes.length}</strong>
          <span>Schemes</span>
        </div>
      </div>

      <div className="featured-scheme panel-surface">
        <div className="featured-header">
          <span className="eyebrow">FEATURED</span>
          <button type="button" className="mini-link" onClick={() => setSelectedScheme(schemes[0])}>
            View details
          </button>
        </div>

        <div className="featured-body">
          <div className="featured-icon">🌾</div>
          <div>
            <h3>{schemes[0].title}</h3>
            <p>{schemes[0].highlight}</p>
          </div>
        </div>
      </div>

      <div className="scheme-toolbar panel-surface">
        <div className="search-box compact-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="text"
            aria-label="Search schemes"
            placeholder="Search schemes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button type="button" className="clear-search" onClick={() => setSearch("")} aria-label="Clear scheme search">×</button>
          )}
        </div>
      </div>

      <div className="category-tabs" aria-label="Scheme categories">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="scheme-skeleton-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="scheme-skeleton panel-surface" key={index}>
              <div className="skeleton-line w-30"></div>
              <div className="skeleton-line w-70"></div>
              <div className="skeleton-line w-100"></div>
              <div className="skeleton-line w-80"></div>
            </div>
          ))}
        </div>
      ) : filteredSchemes.length === 0 ? (
        <div className="empty-state panel-surface">
          <div className="empty-icon">🔎</div>
          <h3>No schemes found</h3>
          <p>Try another keyword or switch filters to discover more support options.</p>
        </div>
      ) : (
        <div className="schemes-grid">
          {filteredSchemes.map((scheme, index) => (
            <article className="scheme-card" key={index}>
              <div className="scheme-top">
                <div className="scheme-icon">{scheme.icon}</div>
                <span className="status-chip">● {scheme.status}</span>
              </div>

              <span className="scheme-category">{scheme.category}</span>
              <h3>{scheme.title}</h3>
              <p>{scheme.description}</p>

              <button type="button" className="learn-btn" onClick={() => setSelectedScheme(scheme)}>
                View Details
                <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </div>
      )}

      {selectedScheme && (
        <div className="scheme-modal-backdrop" onClick={() => setSelectedScheme(null)}>
          <div className="scheme-modal panel-surface" onClick={(e) => e.stopPropagation()}>
            <div className="scheme-modal-header">
              <div className="scheme-modal-icon">{selectedScheme.icon}</div>
              <div>
                <span className="scheme-category">{selectedScheme.category}</span>
                <h3>{selectedScheme.title}</h3>
              </div>
              <button type="button" className="close-btn" onClick={() => setSelectedScheme(null)} aria-label="Close details">
                ×
              </button>
            </div>

            <p>{selectedScheme.highlight}</p>

            <div className="detail-list">
              <div>
                <strong>Eligibility</strong>
                <span>{selectedScheme.eligibility}</span>
              </div>
              <div>
                <strong>Status</strong>
                <span>{selectedScheme.status}</span>
              </div>
            </div>

            <div className="scheme-modal-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => {
                  setActionMessage("Opening a demo conversation with SAH-SAMARTH.");
                  navigate("/chat", { state: { initialMessage: `Tell me more about ${selectedScheme.title}` } });
                }}
              >
                Ask Assistant
              </button>
              <button type="button" className="primary-btn small-btn" onClick={() => setSelectedScheme(null)}>
                Close
              </button>
            </div>
            {actionMessage && <p className="scheme-action-message" role="status">{actionMessage}</p>}
          </div>
        </div>
      )}
    </main>
  );
};

export default Schemes;