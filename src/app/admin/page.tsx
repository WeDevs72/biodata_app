"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  CalendarDays,
  Download,
  Heart,
  Briefcase,
  Building2,
  Users,
  Activity,
  ArrowUpRight,
  MoreHorizontal,
  Eye,
  FileText,
  Clock,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";




const WEEKLY_DATA = [
  { day: "Mon", count: 98 },
  { day: "Tue", count: 134 },
  { day: "Wed", count: 112 },
  { day: "Thu", count: 178 },
  { day: "Fri", count: 201 },
  { day: "Sat", count: 165 },
  { day: "Sun", count: 148 },
];

const MAX_BAR = Math.max(...WEEKLY_DATA.map((d) => d.count));

const TYPE_COLORS: Record<string, string> = {
  Matrimonial: "#F43F5E",
  "Job Resume": "#0EA5E9",
  "Business Profile": "#F59E0B",
};

function AnimatedNumber({ target }: { target: number }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCurrent(target);
        clearInterval(interval);
      } else {
        setCurrent(start);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [target]);
  return <>{current.toLocaleString()}</>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<any[]>([
    { id: "total", label: "Total Biodatas Created", value: 0, change: "...", trend: "up", icon: FileText, color: "#F97316", glow: "rgba(249,115,22,0.2)", gradient: "linear-gradient(135deg, #F97316, #EF4444)", description: "Loading..." },
    { id: "today", label: "Today's Biodatas", value: 0, change: "...", trend: "up", icon: CalendarDays, color: "#10B981", glow: "rgba(16,185,129,0.2)", gradient: "linear-gradient(135deg, #10B981, #059669)", description: "Loading..." },
    { id: "downloads", label: "PDF Downloads", value: 0, change: "...", trend: "up", icon: Download, color: "#6366F1", glow: "rgba(99,102,241,0.2)", gradient: "linear-gradient(135deg, #6366F1, #8B5CF6)", description: "Loading..." },
  ]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {
        // 1. Fetch total stats
        const { data: allData, error: allErr } = await supabase
          .from('biodata_records')
          .select('category, is_downloaded, created_at');

        console.log("Dashboard - Stats Response:", { data: allData, error: allErr });

        if (allErr) throw allErr;

        const total = allData.length;
        const today = allData.filter(r => new Date(r.created_at).toDateString() === new Date().toDateString()).length;
        const downloads = allData.filter(r => r.is_downloaded).length;

        const catCounts: Record<string, number> = {
          Matrimonial: allData.filter(r => r.category === 'Matrimonial').length,
          'Job Resume': allData.filter(r => r.category === 'Job Resume').length,
          Business: allData.filter(r => r.category === 'Business').length
        };

        const getPct = (count: number) => total > 0 ? (count / total * 100).toFixed(1) : "0.0";

        const newStats = [
          { id: "total", label: "Total Biodatas Created", value: total, change: "+0%", trend: "up", icon: FileText, color: "#F97316", glow: "rgba(249,115,22,0.2)", gradient: "linear-gradient(135deg, #F97316, #EF4444)", description: "All-time biodatas generated" },
          { id: "today", label: "Today's Biodatas", value: today, change: "+0%", trend: "up", icon: CalendarDays, color: "#10B981", glow: "rgba(16,185,129,0.2)", gradient: "linear-gradient(135deg, #10B981, #059669)", description: "Biodatas created today" },
          { id: "downloads", label: "PDF Downloads", value: downloads, change: "+0%", trend: "up", icon: Download, color: "#6366F1", glow: "rgba(99,102,241,0.2)", gradient: "linear-gradient(135deg, #6366F1, #8B5CF6)", description: "Total PDF downloads" },
          { id: "matrimonial", label: "Matrimonial", value: `${getPct(catCounts.Matrimonial)}%`, change: "+0%", trend: "up", icon: Heart, color: "#F43F5E", glow: "rgba(244,63,94,0.2)", gradient: "linear-gradient(135deg, #F43F5E, #EC4899)", description: "Share of total biodatas", isPercent: true, raw: parseFloat(getPct(catCounts.Matrimonial)) },
          { id: "job", label: "Job Resume", value: `${getPct(catCounts['Job Resume'])}%`, change: "+0%", trend: "up", icon: Briefcase, color: "#0EA5E9", glow: "rgba(14,165,233,0.2)", gradient: "linear-gradient(135deg, #0EA5E9, #6366F1)", description: "Share of total biodatas", isPercent: true, raw: parseFloat(getPct(catCounts['Job Resume'])) },
          { id: "business", label: "Business Profile", value: `${getPct(catCounts.Business)}%`, change: "+0%", trend: "up", icon: Building2, color: "#F59E0B", glow: "rgba(245,158,11,0.2)", gradient: "linear-gradient(135deg, #F59E0B, #F97316)", description: "Share of total biodatas", isPercent: true, raw: parseFloat(getPct(catCounts.Business)) },
        ];
        setStats(newStats);

        // 2. Fetch Recent Activity
        const { data: recent, error: recentErr } = await supabase
          .from('biodata_records')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(7);

        if (recentErr) throw recentErr;

        const mappedActivity = recent.map(r => ({
          id: r.id,
          user: r.name,
          type: r.category === "Business" ? "Business Profile" : r.category,
          template: r.template_used,
          time: formatRelativeTime(r.created_at),
          action: r.is_downloaded ? "downloaded" : "created"
        }));
        setRecentActivity(mappedActivity);

        // 3. Simple weekly chart (count by last 7 days)
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (6 - i));
          return d;
        });

        const weekly = last7Days.map(date => {
          const count = allData.filter(r => new Date(r.created_at).toDateString() === date.toDateString()).length;
          return { day: days[date.getDay()], count };
        });
        setWeeklyData(weekly);

      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  function formatRelativeTime(dateStr: string) {
    const now = new Date();
    const past = new Date(dateStr);
    const diffMs = now.getTime() - past.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffMin < 1) return "just now";
    if (diffMin < 60) return `${diffMin} min ago`;
    if (diffHrs < 24) return `${diffHrs} hr ago`;
    return `${diffDays} d ago`;
  }

  const maxBar = Math.max(...weeklyData.map((d) => d.count), 1);

  if (loading && recentActivity.length === 0) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", flexDirection: "column", gap: 15 }}>
        <Loader2 className="animate-spin" size={40} style={{ color: "#F97316" }} />
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Fetching dashboard data...</p>
      </div>
    );
  }
  return (
    <>
      <style>{`
        /* ── Dashboard Styles ── */
        .dash-page-title {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .dash-page-sub {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 28px;
        }
        .dash-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 28px;
        }
        @media (max-width: 1100px) {
          .dash-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .dash-stats-grid { grid-template-columns: 1fr; }
        }
        .stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 22px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          backdrop-filter: blur(12px);
          cursor: default;
        }
        .stat-card:hover {
          border-color: var(--card-color, var(--accent));
          box-shadow: 0 8px 32px var(--card-glow, var(--accent-glow));
          transform: translateY(-3px);
        }
        .stat-card-bg {
          position: absolute;
          top: -40px;
          right: -40px;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          opacity: 0.07;
          filter: blur(20px);
        }
        .stat-icon-wrap {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          flex-shrink: 0;
        }
        .stat-label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-secondary);
          margin-bottom: 6px;
        }
        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 34px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 10px;
        }
        .stat-footer {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .stat-change {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 12px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .stat-change.up { color: #10B981; background: rgba(16,185,129,0.1); }
        .stat-change.down { color: #EF4444; background: rgba(239,68,68,0.1); }
        .stat-desc {
          font-size: 11px;
          color: var(--text-secondary);
        }
        /* Progress bar for percent cards */
        .stat-progress {
          margin-top: 12px;
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          overflow: hidden;
        }
        .stat-progress-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 1s ease;
        }
        /* ── Bottom Grid ── */
        .dash-bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }
        @media (max-width: 900px) {
          .dash-bottom-grid { grid-template-columns: 1fr; }
        }
        /* ── Panel Card ── */
        .panel-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          backdrop-filter: blur(12px);
        }
        .panel-header {
          padding: 18px 22px 14px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .panel-title {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          flex: 1;
        }
        .panel-more {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 0.2s;
        }
        .panel-more:hover { color: var(--text-primary); border-color: var(--accent); }
        /* ── Bar Chart ── */
        .bar-chart {
          padding: 20px 22px;
          display: flex;
          align-items: flex-end;
          gap: 8px;
          height: 180px;
        }
        .bar-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          height: 100%;
          justify-content: flex-end;
        }
        .bar-fill {
          width: 100%;
          border-radius: 6px 6px 2px 2px;
          transition: height 1s cubic-bezier(.4,0,.2,1);
          background: linear-gradient(180deg, #F97316, rgba(249,115,22,0.4));
          min-height: 4px;
          cursor: pointer;
          position: relative;
        }
        .bar-fill:hover { background: linear-gradient(180deg, #FB923C, #F97316); }
        .bar-label {
          font-size: 11px;
          color: var(--text-secondary);
          font-weight: 500;
        }
        /* ── Activity List ── */
        .activity-list { padding: 4px 0; }
        .activity-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 22px;
          transition: background 0.2s;
          cursor: default;
        }
        .activity-item:hover { background: var(--bg-card); }
        .activity-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .activity-user {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 110px;
        }
        .activity-type-badge {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 6px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .activity-action {
          font-size: 11px;
          color: var(--text-secondary);
          flex: 1;
        }
        .activity-time {
          font-size: 11px;
          color: var(--text-secondary);
          white-space: nowrap;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 3px;
        }
      `}</style>

      {/* Page Header */}
      <div>
        <h1 className="dash-page-title">Dashboard</h1>
        <p className="dash-page-sub">Welcome back, Admin! Here's what's happening on BioDataEarth today.</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="dash-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="stat-card"
              style={
                {
                  "--card-color": stat.color,
                  "--card-glow": stat.glow,
                } as React.CSSProperties
              }
            >
              {/* BG Glow Blob */}
              <div
                className="stat-card-bg"
                style={{ background: stat.color }}
              />

              {/* Icon */}
              <div
                className="stat-icon-wrap"
                style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}30` }}
              >
                <Icon size={20} style={{ color: stat.color }} />
              </div>

              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">
                {typeof stat.value === "number" ? (
                  <AnimatedNumber target={stat.value} />
                ) : (
                  stat.value
                )}
              </div>

              <div className="stat-footer">
                <span className={`stat-change ${stat.trend}`}>
                  <ArrowUpRight size={11} style={{ transform: stat.trend === "down" ? "rotate(90deg)" : undefined }} />
                  {stat.change}
                </span>
                <span className="stat-desc">vs last week</span>
              </div>

              {/* Progress bar for percent stats */}
              {stat.isPercent && (
                <div className="stat-progress">
                  <div
                    className="stat-progress-fill"
                    style={{
                      width: `${stat.raw}%`,
                      background: stat.gradient,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Bottom Grid ── */}
      <div className="dash-bottom-grid">

        {/* Weekly Bar Chart */}
        <div className="panel-card">
          <div className="panel-header">
            <Activity size={16} style={{ color: "#F97316" }} />
            <div className="panel-title">Weekly Biodata Activity</div>
            <button className="panel-more"><MoreHorizontal size={14} /></button>
          </div>
          <div className="bar-chart">
            {weeklyData.map((d) => {
              const heightPct = (d.count / maxBar) * 130;
              return (
                <div className="bar-col" key={d.day}>
                  <div
                    className="bar-fill"
                    style={{ height: `${heightPct}px` }}
                    title={`${d.day}: ${d.count} biodatas`}
                  />
                  <div className="bar-label">{d.day}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="panel-card">
          <div className="panel-header">
            <Eye size={16} style={{ color: "#F97316" }} />
            <div className="panel-title">Recent Activity</div>
            <button className="panel-more"><MoreHorizontal size={14} /></button>
          </div>
          <div className="activity-list">
            {recentActivity.map((item) => {
              const color = TYPE_COLORS[item.type] ?? "#F97316";
              return (
                <div className="activity-item" key={item.id}>
                  <div className="activity-dot" style={{ background: color }} />
                  <div className="activity-user">{item.user}</div>
                  <span
                    className="activity-type-badge"
                    style={{ background: `${color}18`, color }}
                  >
                    {item.type === "Matrimonial" ? "💍" : item.type === "Job Resume" ? "💼" : "🏢"} {item.type}
                  </span>
                  <span className="activity-action">{item.action}</span>
                  <span className="activity-time">
                    <Clock size={10} />
                    {item.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Bottom spacing */}
      <div style={{ height: 32 }} />
    </>
  );
}
