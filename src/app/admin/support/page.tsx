"use client";

import { Mail, Search, CheckCircle, Clock, AlertCircle, ChevronRight, Star, Tag } from "lucide-react";

const TICKETS = [
  { id: "TKT-001", from: "Priya Sharma", email: "priya@gmail.com", subject: "PDF not downloading correctly", category: "Bug Report", status: "open", priority: "high", time: "5 min ago", read: false },
  { id: "TKT-002", from: "Rahul Verma", email: "rahul@outlook.com", subject: "Can I add custom sections to job resume?", category: "Feature Request", status: "pending", priority: "medium", time: "42 min ago", read: false },
  { id: "TKT-003", from: "Vikram Patel", email: "vikram@gmail.com", subject: "How to change font in business profile?", category: "Question", status: "resolved", priority: "low", time: "2 hr ago", read: true },
  { id: "TKT-004", from: "Sneha Gupta", email: "sneha@yahoo.com", subject: "Matrimonial template not saving photo", category: "Bug Report", status: "open", priority: "high", time: "3 hr ago", read: false },
  { id: "TKT-005", from: "Arjun Singh", email: "arjun@gmail.com", subject: "Would love more marriage templates!", category: "Feature Request", status: "pending", priority: "low", time: "Yesterday", read: true },
  { id: "TKT-006", from: "Kavita Joshi", email: "kavita@gmail.com", subject: "Downloaded PDF looks blurry on print", category: "Bug Report", status: "open", priority: "medium", time: "Yesterday", read: true },
  { id: "TKT-007", from: "Rohit Mehta", email: "rohit@gmail.com", subject: "Business profile looks great! But missing QR?", category: "Feature Request", status: "resolved", priority: "low", time: "2 days ago", read: true },
];

const STATUS_STYLE: Record<string, { bg: string; color: string; icon: React.ReactNode }> = {
  open: { bg: "rgba(239,68,68,0.12)", color: "#EF4444", icon: <AlertCircle size={11} /> },
  pending: { bg: "rgba(245,158,11,0.12)", color: "#F59E0B", icon: <Clock size={11} /> },
  resolved: { bg: "rgba(16,185,129,0.12)", color: "#10B981", icon: <CheckCircle size={11} /> },
};
const PRIORITY_COLOR: Record<string, string> = { high: "#EF4444", medium: "#F59E0B", low: "#10B981" };
const CAT_COLOR: Record<string, string> = {
  "Bug Report": "rgba(239,68,68,0.12)",
  "Feature Request": "rgba(99,102,241,0.12)",
  "Question": "rgba(14,165,233,0.12)",
};
const CAT_TEXT: Record<string, string> = {
  "Bug Report": "#EF4444",
  "Feature Request": "#6366F1",
  "Question": "#0EA5E9",
};

export default function SupportPage() {
  return (
    <>
      <style>{`
        .sp-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
        .sp-title { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: var(--text-primary); flex: 1; }
        .search-bar { display: flex; align-items: center; gap: 8px; padding: 9px 14px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px; color: var(--text-secondary); min-width: 220px; }
        .search-bar input { background: none; border: none; outline: none; font-size: 13px; color: var(--text-primary); width: 100%; }
        /* Stats Row */
        .sp-stats { display: flex; gap: 14px; margin-bottom: 20px; flex-wrap: wrap; }
        .sp-stat { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 14px 20px; flex: 1; min-width: 120px; backdrop-filter: blur(12px); }
        .sp-stat-val { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; color: var(--text-primary); }
        .sp-stat-label { font-size: 11px; color: var(--text-secondary); font-weight: 500; margin-top: 2px; }
        /* Table */
        .panel-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 18px; overflow: hidden; backdrop-filter: blur(12px); }
        .panel-header { padding: 18px 22px 14px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
        .panel-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: var(--text-primary); flex: 1; }
        table { width: 100%; border-collapse: collapse; }
        thead { background: rgba(255,255,255,0.02); border-bottom: 1px solid var(--border); }
        th { padding: 11px 18px; text-align: left; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-secondary); white-space: nowrap; }
        td { padding: 13px 18px; font-size: 13px; color: var(--text-primary); border-bottom: 1px solid var(--border); vertical-align: middle; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: rgba(255,255,255,0.02); cursor: pointer; }
        .unread td:first-child { border-left: 3px solid #F97316; }
        .ticket-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 6px; }
        .priority-dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
        .subject-wrap { max-width: 260px; }
        .subject-text { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .subject-id { font-size: 10px; color: #F97316; font-family: monospace; font-weight: 600; }
        .action-btn { display: flex; align-items: center; gap: 5px; padding: 6px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-card); font-size: 12px; font-weight: 500; cursor: pointer; color: var(--text-secondary); transition: all 0.2s; }
        .action-btn:hover { color: var(--accent); border-color: var(--accent); }
      `}</style>

      <div className="sp-header">
        <h1 className="sp-title"><Mail size={22} style={{ display: "inline", verticalAlign: "middle", marginRight: 8, color: "#F97316" }} />Support Inbox</h1>
        <div className="search-bar"><Search size={14} /><input type="text" placeholder="Search tickets..." /></div>
      </div>

      {/* Quick stats */}
      <div className="sp-stats">
        {[
          { label: "Open Tickets", val: 3, color: "#EF4444" },
          { label: "Pending", val: 2, color: "#F59E0B" },
          { label: "Resolved", val: 2, color: "#10B981" },
          { label: "Total This Week", val: 7, color: "#F97316" },
        ].map((s) => (
          <div className="sp-stat" key={s.label}>
            <div className="sp-stat-val" style={{ color: s.color }}>{s.val}</div>
            <div className="sp-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="panel-card">
        <div className="panel-header">
          <Mail size={16} style={{ color: "#F97316" }} />
          <div className="panel-title">All Tickets</div>
          <span style={{ fontSize: 12, color: "#F97316", fontWeight: 600, background: "rgba(249,115,22,0.12)", padding: "3px 10px", borderRadius: 6 }}>3 unread</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Ticket</th>
              <th>From</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {TICKETS.map((t) => {
              const ss = STATUS_STYLE[t.status];
              return (
                <tr key={t.id} className={!t.read ? "unread" : ""}>
                  <td>
                    <div className="subject-wrap">
                      <div className="subject-id">{t.id}</div>
                      <div className="subject-text" style={{ fontWeight: t.read ? 500 : 700 }}>{t.subject}</div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{t.from}</div>
                    <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{t.email}</div>
                  </td>
                  <td>
                    <span className="ticket-badge" style={{ background: CAT_COLOR[t.category], color: CAT_TEXT[t.category] }}>
                      <Tag size={10} /> {t.category}
                    </span>
                  </td>
                  <td>
                    <span className="ticket-badge" style={{ background: ss.bg, color: ss.color }}>
                      {ss.icon} {t.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div className="priority-dot" style={{ background: PRIORITY_COLOR[t.priority] }} />
                      <span style={{ fontSize: 12, textTransform: "capitalize" }}>{t.priority}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: "var(--text-secondary)" }}>{t.time}</td>
                  <td>
                    <button className="action-btn">Reply <ChevronRight size={12} /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ height: 32 }} />
    </>
  );
}
