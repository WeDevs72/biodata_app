"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { 
  BarChart2, TrendingUp, Users, Download, Globe, ArrowUpRight, 
  MapPin, Clock, Smartphone, Monitor, Tablet, ChevronDown, 
  PieChart as PieIcon, List, X
} from "lucide-react";

// --- Dummy Data ---

const STATS = [
  { label: "Avg Biodatas Per Day", value: "47", icon: ActivityIcon, color: "#F97316" },
  { label: "Most Popular City", value: "Mumbai", icon: MapPin, color: "#8B5CF6" },
  { label: "Peak Creation Hour", value: "8 PM - 10 PM", icon: Clock, color: "#10B981" },
  { label: "PDF Download Rate", value: "78%", icon: Download, color: "#0EA5E9" },
];

function ActivityIcon({ size, style }: { size?: number, style?: any }) {
  return <TrendingUp size={size} style={style} />;
}

const TOP_CITIES = [
  { city: "Mumbai", state: "Maharashtra", count: 1240, pct: 28 },
  { city: "Delhi", state: "Delhi", count: 980, pct: 22 },
  { city: "Jaipur", state: "Rajasthan", count: 750, pct: 17 },
  { city: "Bangalore", state: "Karnataka", count: 620, pct: 14 },
  { city: "Hyderabad", state: "Telangana", count: 480, pct: 11 },
  { city: "Pune", state: "Maharashtra", count: 320, pct: 7 },
  { city: "Ahmedabad", state: "Gujarat", count: 210, pct: 5 },
  { city: "Surat", state: "Gujarat", count: 180, pct: 4 },
  { city: "Kolkata", state: "West Bengal", count: 150, pct: 3 },
  { city: "Chennai", state: "Tamil Nadu", count: 120, pct: 2 },
];

const DEVICE_DATA = [
  { label: "Mobile", value: 72, icon: Smartphone, color: "#F97316" },
  { label: "Desktop", value: 24, icon: Monitor, color: "#8B5CF6" },
  { label: "Tablet", value: 4, icon: Tablet, color: "#10B981" },
];

export default function AnalyticsPage() {
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const pieChartRef = useRef<HTMLCanvasElement>(null);
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const [range, setRange] = useState("30");
  const [showExportModal, setShowExportModal] = useState(false);
  const [includeCharts, setIncludeCharts] = useState(true);
  const [scheduleEnabled, setScheduleEnabled] = useState(true);

  const initCharts = () => {
    const Chart = (window as any).Chart;
    if (!Chart) return;

    // Line Chart: Creations Over Time
    if (lineChartRef.current) {
      const ctx = lineChartRef.current.getContext('2d');
      if (ctx) {
        // Destroy existing chart if it exists
        const existingChart = Chart.getChart(lineChartRef.current);
        if (existingChart) existingChart.destroy();

        new Chart(lineChartRef.current, {
          type: 'line',
          data: {
            labels: Array.from({ length: 30 }, (_, i) => `${i + 1} May`),
            datasets: [
              {
                label: 'Matrimonial',
                data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 30),
                borderColor: '#F97316',
                backgroundColor: 'rgba(249, 115, 22, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                borderWidth: 2,
              },
              {
                label: 'Job Resume',
                data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 30) + 15),
                borderColor: '#8B5CF6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                borderWidth: 2,
              },
              {
                label: 'Business',
                data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 15) + 5),
                borderColor: '#14B8A6',
                backgroundColor: 'rgba(20, 184, 166, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                borderWidth: 2,
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: true, position: 'top', labels: { color: '#8896AC', usePointStyle: true, font: { size: 11, weight: '600' } } },
              tooltip: { mode: 'index', intersect: false }
            },
            scales: {
              y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#8896AC', font: { size: 10 } } },
              x: { grid: { display: false }, ticks: { color: '#8896AC', font: { size: 10 }, maxRotation: 0 } }
            }
          }
        });
      }
    }

    // Pie Chart: Category Breakdown
    if (pieChartRef.current) {
      const ctx = pieChartRef.current.getContext('2d');
      if (ctx) {
        const existingChart = Chart.getChart(pieChartRef.current);
        if (existingChart) existingChart.destroy();

        new Chart(pieChartRef.current, {
          type: 'doughnut',
          data: {
            labels: ['Matrimonial', 'Job Resume', 'Business'],
            datasets: [{
              data: [55, 30, 15],
              backgroundColor: ['#F97316', '#8B5CF6', '#14B8A6'],
              borderWidth: 0,
              hoverOffset: 10
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
              legend: { position: 'bottom', labels: { color: '#8896AC', padding: 20, usePointStyle: true, font: { size: 12 } } }
            }
          }
        });
      }
    }

    // Bar Chart: Top 5 Templates
    if (barChartRef.current) {
      const ctx = barChartRef.current.getContext('2d');
      if (ctx) {
        const existingChart = Chart.getChart(barChartRef.current);
        if (existingChart) existingChart.destroy();

        new Chart(barChartRef.current, {
          type: 'bar',
          data: {
            labels: ['Royal Purple', 'Professional CV', 'Modern Floral', 'Classic Gold', 'Modern Resume'],
            datasets: [{
              label: 'Usage Count',
              data: [3240, 2890, 2170, 1890, 1670],
              backgroundColor: '#F97316',
              borderRadius: 6,
              barThickness: 18
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }
            },
            scales: {
              x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#8896AC', font: { size: 10 } } },
              y: { grid: { display: false }, ticks: { color: '#8896AC', font: { size: 11, weight: '600' } } }
            }
          }
        });
      }
    }
  };

  useEffect(() => {
    initCharts();
  }, [range]);

  return (
    <>
      <Script 
        src="https://cdn.jsdelivr.net/npm/chart.js" 
        onLoad={initCharts} 
      />

      <style>{`
        .an-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
        .an-sub { font-size: 14px; color: var(--text-secondary); margin-bottom: 28px; }
        
        .an-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
        
        .last-exported { font-size: 11px; color: var(--text-secondary); margin-bottom: 4px; }

        .range-picker {
          display: flex; align-items: center; gap: 8px; padding: 8px 16px;
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px;
          font-size: 13px; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 0.2s;
        }
        .range-picker:hover { border-color: var(--accent); color: var(--text-primary); }

        .panel-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; backdrop-filter: blur(12px); display: flex; flex-direction: column; }
        .panel-header { padding: 20px 24px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
        .panel-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: var(--text-primary); flex: 1; }
        .panel-body { padding: 24px; flex: 1; position: relative; }

        /* Form Elements for Modal & Schedule */
        .form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .form-label { font-size: 13px; font-weight: 600; color: var(--text-secondary); }
        .form-input {
          padding: 10px 14px; border-radius: 10px; background: var(--bg-primary); border: 1px solid var(--border);
          color: var(--text-primary); font-size: 14px; outline: none; transition: border 0.2s;
        }
        .form-input:focus { border-color: var(--accent); }
        .form-select {
          padding: 10px 14px; border-radius: 10px; background: var(--bg-primary); border: 1px solid var(--border);
          color: var(--text-primary); font-size: 14px; outline: none; cursor: pointer;
        }
        .save-btn { 
          padding: 12px 24px; border-radius: 10px; border: none; background: #F97316; color: white; 
          font-size: 14px; font-weight: 700; cursor: pointer; transition: 0.2s;
          box-shadow: 0 4px 12px rgba(249,115,22,0.2);
        }
        .save-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(249,115,22,0.3); }
        .cancel-btn { padding: 12px 24px; border-radius: 10px; border: 1px solid var(--border); background: transparent; color: var(--text-secondary); font-size: 14px; font-weight: 600; cursor: pointer; }

        /* Modal Overlay */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px;
        }
        .modal-content {
          background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 24px;
          width: 100%; max-width: 480px; overflow: hidden; animation: scaleUp 0.3s ease;
        }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .modal-header { padding: 20px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .modal-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; color: var(--text-primary); }
        .modal-close { background: transparent; border: none; color: var(--text-secondary); cursor: pointer; }
        .modal-body { padding: 24px; }
        .modal-footer { padding: 20px 24px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 12px; }

        /* Stats Row */
        .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 28px; }
        @media (max-width: 1024px) { .stats-row { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .stats-row { grid-template-columns: 1fr; } }
        
        .stat-mini {
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px;
          padding: 20px; display: flex; align-items: center; gap: 16px; backdrop-filter: blur(8px);
        }
        .stat-mini-icon {
          width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .stat-mini-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary); margin-bottom: 2px; }
        .stat-mini-val { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: var(--text-primary); }

        /* Middle Charts */
        .mid-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 24px; margin-bottom: 28px; }
        @media (max-width: 900px) { .mid-grid { grid-template-columns: 1fr; } }

        /* Table & Device Row */
        .bottom-grid { display: grid; grid-template-columns: 1.8fr 1fr; gap: 24px; }
        @media (max-width: 1024px) { .bottom-grid { grid-template-columns: 1fr; } }

        /* Table */
        .city-table { width: 100%; border-collapse: collapse; }
        .city-table th { text-align: left; padding: 12px 16px; font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--text-secondary); border-bottom: 1px solid var(--border); }
        .city-table td { padding: 14px 16px; font-size: 13px; color: var(--text-primary); border-bottom: 1px solid var(--border); }
        .city-table tr:last-child td { border-bottom: none; }
        
        .city-bar-wrap { height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; margin-top: 4px; }
        .city-bar-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, #F97316, #EF4444); }

        /* Device Breakdown */
        .device-item { margin-bottom: 20px; }
        .device-info { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .device-label { font-size: 13px; font-weight: 600; color: var(--text-primary); flex: 1; }
        .device-val { font-size: 13px; font-weight: 700; color: var(--text-primary); }
        .device-progress { height: 8px; background: var(--border); border-radius: 4px; overflow: hidden; }
        .device-fill { height: 100%; border-radius: 4px; transition: width 1s ease; }
      `}</style>

      <div className="an-header">
        <div>
          <h1 className="an-title">Analytics & Reports</h1>
          <p className="an-sub">Deep dive into BioDataEarth usage statistics and patterns.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '-2px' }}>Last exported: 3 days ago</div>
          </div>
          <div className="range-picker" onClick={() => setRange(range === "30" ? "90" : range === "90" ? "7" : "30")}>
            <Clock size={16} />
            Last {range} Days
            <ChevronDown size={14} />
          </div>
          <button 
            className="export-btn-main" 
            onClick={() => setShowExportModal(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
              background: 'linear-gradient(135deg, #F97316, #EF4444)', color: 'white',
              border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700',
              cursor: 'pointer', boxShadow: '0 4px 16px rgba(249,115,22,0.3)'
            }}
          >
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      {/* --- Section 3: Stats Row --- */}
      <div className="stats-row">
        {STATS.map((s, i) => (
          <div key={i} className="stat-mini">
            <div className="stat-mini-icon" style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
              <s.icon size={20} style={{ color: s.color }} />
            </div>
            <div>
              <div className="stat-mini-label">{s.label}</div>
              <div className="stat-mini-val">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Section 1: Line Chart --- */}
      <div className="panel-card" style={{ marginBottom: 28 }}>
        <div className="panel-header">
          <TrendingUp size={18} style={{ color: "#F97316" }} />
          <div className="panel-title">Biodata Creations Over Time</div>
        </div>
        <div className="panel-body" style={{ height: 320 }}>
          <canvas ref={lineChartRef}></canvas>
        </div>
      </div>

      {/* --- Section 2: Side-by-side Charts --- */}
      <div className="mid-grid">
        <div className="panel-card">
          <div className="panel-header">
            <PieIcon size={18} style={{ color: "#8B5CF6" }} />
            <div className="panel-title">Category Breakdown</div>
          </div>
          <div className="panel-body" style={{ height: 300 }}>
            <canvas ref={pieChartRef}></canvas>
          </div>
        </div>

        <div className="panel-card">
          <div className="panel-header">
            <BarChart2 size={18} style={{ color: "#F97316" }} />
            <div className="panel-title">Top 5 Templates Used</div>
          </div>
          <div className="panel-body" style={{ height: 300 }}>
            <canvas ref={barChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* --- Section 4 & 5: Table & Devices --- */}
      <div className="bottom-grid">
        {/* Top Cities Table */}
        <div className="panel-card">
          <div className="panel-header">
            <MapPin size={18} style={{ color: "#10B981" }} />
            <div className="panel-title">Top 10 Cities</div>
          </div>
          <div className="panel-body">
            <table className="city-table">
              <thead>
                <tr>
                  <th>City</th>
                  <th>State</th>
                  <th>Count</th>
                  <th>Popularity</th>
                </tr>
              </thead>
              <tbody>
                {TOP_CITIES.map((c, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{c.city}</div>
                    </td>
                    <td style={{ color: "var(--text-secondary)", fontSize: 12 }}>{c.state}</td>
                    <td style={{ fontWeight: 600 }}>{c.count.toLocaleString()}</td>
                    <td style={{ width: 140 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                        <span style={{ fontSize: 11, fontWeight: 700 }}>{c.pct}%</span>
                      </div>
                      <div className="city-bar-wrap">
                        <div className="city-bar-fill" style={{ width: `${c.pct * 3}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="panel-card">
          <div className="panel-header">
            <Smartphone size={18} style={{ color: "#0EA5E9" }} />
            <div className="panel-title">Device Breakdown</div>
          </div>
          <div className="panel-body">
            <div style={{ marginTop: 10 }}>
              {DEVICE_DATA.map((d, i) => (
                <div key={i} className="device-item">
                  <div className="device-info">
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${d.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <d.icon size={16} style={{ color: d.color }} />
                    </div>
                    <div className="device-label">{d.label}</div>
                    <div className="device-val">{d.value}%</div>
                  </div>
                  <div className="device-progress">
                    <div className="device-fill" style={{ width: `${d.value}%`, background: d.color }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, padding: 20, borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <AlertIcon size={16} style={{ color: '#F97316' }} />
                <span style={{ fontSize: 13, fontWeight: 700 }}>Quick Insights</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Mobile users account for <strong>72%</strong> of total traffic. Ensure all templates are perfectly mobile-responsive and the download process is seamless on iOS/Android.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Section 6: Schedule Reports --- */}
      <div className="panel-card" style={{ marginTop: 28 }}>
        <div className="panel-header">
          <Clock size={18} style={{ color: "#F97316" }} />
          <div className="panel-title">Schedule Automated Reports</div>
        </div>
        <div className="panel-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            <div className="form-group">
              <label className="form-label">Weekly Auto Report</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div 
                  onClick={() => setScheduleEnabled(!scheduleEnabled)}
                  style={{ 
                    width: 44, height: 24, borderRadius: 12, 
                    background: scheduleEnabled ? '#F97316' : 'var(--border)', 
                    position: 'relative', cursor: 'pointer', transition: '0.3s' 
                  }}
                >
                  <div style={{ 
                    width: 18, height: 18, borderRadius: '50%', background: 'white',
                    position: 'absolute', top: 3, left: scheduleEnabled ? 23 : 3, transition: '0.3s'
                  }} />
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{scheduleEnabled ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Delivery Day</label>
              <select className="form-select" style={{ width: '100%' }}>
                <option>Monday</option>
                <option>Friday</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Admin Email</label>
              <input type="email" className="form-input" placeholder="admin@biodataearth.com" style={{ width: '100%' }} />
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button className="save-btn" style={{ width: '100%', margin: 0 }}>Save Schedule</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Export Modal --- */}
      {showExportModal && (
        <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Export Analytics Report</h2>
              <button className="modal-close" onClick={() => setShowExportModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">From Date</label>
                  <input type="date" className="form-input" defaultValue="2026-04-01" />
                </div>
                <div className="form-group">
                  <label className="form-label">To Date</label>
                  <input type="date" className="form-input" defaultValue="2026-05-02" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Report Format</label>
                <select className="form-select">
                  <option>PDF Report (Styled)</option>
                  <option>CSV Data (Raw)</option>
                  <option>Excel Spreadsheet</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Filter Data</label>
                <select className="form-select">
                  <option>All Records</option>
                  <option>Matrimonial Only</option>
                  <option>Job Resume Only</option>
                  <option>Business Only</option>
                </select>
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label className="form-label" style={{ flex: 1 }}>Include Visualization Charts</label>
                  <div 
                    onClick={() => setIncludeCharts(!includeCharts)}
                    style={{ 
                      width: 40, height: 22, borderRadius: 11, 
                      background: includeCharts ? '#F97316' : 'var(--border)', 
                      position: 'relative', cursor: 'pointer', transition: '0.3s' 
                    }}
                  >
                    <div style={{ 
                      width: 16, height: 16, borderRadius: '50%', background: 'white',
                      position: 'absolute', top: 3, left: includeCharts ? 21 : 3, transition: '0.3s'
                    }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowExportModal(false)}>Cancel</button>
              <button className="save-btn" onClick={() => setShowExportModal(false)}>Generate Report</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ height: 40 }} />
    </>
  );
}

function AlertIcon({ size, style }: { size?: number, style?: any }) {
  return <ArrowUpRight size={size} style={style} />;
}
