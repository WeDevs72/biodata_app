"use client";

import { Edit3, Plus, Pencil, Trash2, Eye, FileText, Globe, Image } from "lucide-react";

const PAGES = [
  { id: 1, title: "Home Page Hero Section", slug: "/", status: "published", lastEdit: "02 May 2026", author: "Admin" },
  { id: 2, title: "About BioDataEarth", slug: "/about", status: "published", lastEdit: "29 Apr 2026", author: "Admin" },
  { id: 3, title: "FAQ Page", slug: "/faq", status: "published", lastEdit: "25 Apr 2026", author: "Admin" },
  { id: 4, title: "Privacy Policy", slug: "/privacy", status: "published", lastEdit: "20 Apr 2026", author: "Admin" },
  { id: 5, title: "Terms & Conditions", slug: "/terms", status: "published", lastEdit: "20 Apr 2026", author: "Admin" },
  { id: 6, title: "Blog — Top 10 Matrimonial Tips", slug: "/blog/tips", status: "draft", lastEdit: "01 May 2026", author: "Admin" },
];

const MEDIA = [
  { name: "hero-bg.jpg", size: "2.3 MB", type: "Image", date: "01 May 2026" },
  { name: "og-banner.png", size: "480 KB", type: "Image", date: "29 Apr 2026" },
  { name: "sample-biodata.pdf", size: "1.1 MB", type: "PDF", date: "25 Apr 2026" },
  { name: "favicon.ico", size: "28 KB", type: "Icon", date: "20 Apr 2026" },
];

export default function ContentPage() {
  return (
    <>
      <style>{`
        .cn-title { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
        .cn-sub { font-size: 14px; color: var(--text-secondary); margin-bottom: 24px; }
        .cn-grid { display: grid; grid-template-columns: 3fr 2fr; gap: 18px; }
        @media(max-width:900px){.cn-grid{grid-template-columns:1fr;}}
        .panel-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 18px; overflow: hidden; backdrop-filter: blur(12px); }
        .panel-header { padding: 18px 22px 14px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
        .panel-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: var(--text-primary); flex: 1; }
        .add-btn {
          display: flex; align-items: center; gap: 6px; padding: 7px 14px;
          background: linear-gradient(135deg, #F97316, #EF4444); color: white;
          border: none; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer;
        }
        .page-row { display: flex; align-items: center; gap: 12px; padding: 13px 22px; border-bottom: 1px solid var(--border); transition: background 0.2s; }
        .page-row:last-child { border-bottom: none; }
        .page-row:hover { background: rgba(255,255,255,0.02); }
        .page-icon-wrap { width: 36px; height: 36px; border-radius: 9px; background: rgba(249,115,22,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .page-title { font-size: 13px; font-weight: 600; color: var(--text-primary); }
        .page-slug { font-size: 11px; color: var(--text-secondary); font-family: monospace; }
        .page-meta { margin-left: auto; text-align: right; }
        .page-date { font-size: 11px; color: var(--text-secondary); }
        .page-status { display: inline-block; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; text-transform: uppercase; }
        .pub { background: rgba(16,185,129,0.12); color: #10B981; }
        .draft { background: rgba(245,158,11,0.12); color: #F59E0B; }
        .action-btn { padding: 5px; border-radius: 6px; border: none; background: transparent; cursor: pointer; color: var(--text-secondary); transition: all 0.2s; }
        .action-btn:hover { color: var(--accent); }
        /* Media */
        .media-row { display: flex; align-items: center; gap: 12px; padding: 11px 22px; border-bottom: 1px solid var(--border); }
        .media-row:last-child { border-bottom: none; }
        .media-icon { width: 32px; height: 32px; border-radius: 8px; background: rgba(99,102,241,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .media-name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
        .media-meta { font-size: 11px; color: var(--text-secondary); }
        .media-size { margin-left: auto; font-size: 11px; color: var(--text-secondary); }
      `}</style>

      <h1 className="cn-title"><Edit3 size={22} style={{ display: "inline", verticalAlign: "middle", marginRight: 8, color: "#F97316" }} />Content Management</h1>
      <p className="cn-sub">Manage pages, blog posts, and media assets.</p>

      <div className="cn-grid">
        {/* Pages */}
        <div className="panel-card">
          <div className="panel-header">
            <Globe size={16} style={{ color: "#F97316" }} />
            <div className="panel-title">Pages & Posts</div>
            <button className="add-btn"><Plus size={13} /> New Page</button>
          </div>
          {PAGES.map((p) => (
            <div className="page-row" key={p.id}>
              <div className="page-icon-wrap"><FileText size={16} style={{ color: "#F97316" }} /></div>
              <div>
                <div className="page-title">{p.title}</div>
                <div className="page-slug">{p.slug}</div>
              </div>
              <div className="page-meta">
                <div style={{ marginBottom: 3 }}>
                  <span className={`page-status ${p.status === "published" ? "pub" : "draft"}`}>{p.status}</span>
                </div>
                <div className="page-date">{p.lastEdit}</div>
              </div>
              <button className="action-btn"><Eye size={14} /></button>
              <button className="action-btn"><Pencil size={14} /></button>
              <button className="action-btn" style={{ color: "var(--text-secondary)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>

        {/* Media */}
        <div className="panel-card">
          <div className="panel-header">
            <Image size={16} style={{ color: "#F97316" }} />
            <div className="panel-title">Media Library</div>
            <button className="add-btn"><Plus size={13} /> Upload</button>
          </div>
          {MEDIA.map((m) => (
            <div className="media-row" key={m.name}>
              <div className="media-icon"><FileText size={15} style={{ color: "#6366F1" }} /></div>
              <div>
                <div className="media-name">{m.name}</div>
                <div className="media-meta">{m.type} • {m.date}</div>
              </div>
              <div className="media-size">{m.size}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 32 }} />
    </>
  );
}
