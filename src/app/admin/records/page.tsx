"use client";
import { useEffect, useState, useMemo } from "react";
import { Search, Download, Eye, Trash2, Flag, ChevronLeft, ChevronRight, X, FileText, MapPin, Calendar, Layers, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Category = "Matrimonial" | "Job Resume" | "Business";
interface AdminRecord {
  id: string | number; name: string; category: Category; template: string;
  date: string; city: string; downloaded: boolean; flagged?: boolean;
  data?: any;
}



const CAT_STYLE: Record<Category, { bg: string; color: string; dot: string }> = {
  Matrimonial: { bg: "rgba(249,115,22,0.12)", color: "#F97316", dot: "#F97316" },
  "Job Resume": { bg: "rgba(139,92,246,0.12)", color: "#8B5CF6", dot: "#8B5CF6" },
  Business:    { bg: "rgba(20,184,166,0.12)",  color: "#14B8A6", dot: "#14B8A6" },
};

const PER_PAGE = 10;

export default function RecordsPage() {
  const [search, setSearch]           = useState("");
  const [catFilter, setCatFilter]     = useState("All");
  const [timeFilter, setTimeFilter]   = useState("All Time");
  const [page, setPage]               = useState(1);
  const [records, setRecords]         = useState<AdminRecord[]>([]);
  const [loading, setLoading]         = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<AdminRecord | null>(null);
  const [previewTarget, setPreviewTarget] = useState<AdminRecord | null>(null);
  const [flagged, setFlagged]         = useState<Set<string | number>>(new Set());

  useEffect(() => {
    async function fetchRecords() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('biodata_records')
          .select('*')
          .order('created_at', { ascending: false });

        console.log("Records Page - Supabase Response:", { data, error });

        if (error || !data || data.length === 0) {
          console.log("No records found in Supabase.");
          setRecords([]);
        } else {
          // Map Supabase fields to local Record interface
          const mapped: AdminRecord[] = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            category: item.category as Category,
            template: item.template_used,
            date: new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            city: item.city,
            downloaded: item.is_downloaded,
            flagged: item.is_flagged,
            data: item.data
          }));
          setRecords(mapped);
          
          // Set initial flagged state
          const flaggedSet = new Set<string | number>();
          mapped.forEach(r => { if (r.flagged) flaggedSet.add(r.id); });
          setFlagged(flaggedSet);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setRecords([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRecords();
  }, []);

  const filtered = useMemo(() => {
    return records.filter(r => {
      const q = search.toLowerCase();
      const matchQ = !q || r.name.toLowerCase().includes(q) || r.city.toLowerCase().includes(q);
      const matchCat = catFilter === "All" || r.category === catFilter;
      return matchQ && matchCat;
    });
  }, [records, search, catFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageRows   = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    // Optimistic UI update
    setRecords(prev => prev.filter(r => r.id !== deleteTarget.id));
    
    // Supabase delete if id is UUID (real data)
    if (typeof deleteTarget.id === 'string' && deleteTarget.id.length > 5) {
      await supabase.from('biodata_records').delete().eq('id', deleteTarget.id);
    }
    
    setDeleteTarget(null);
  };

  const toggleFlag = async (id: string | number) => {
    setFlagged(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

    // Supabase update if real data
    if (typeof id === 'string' && id.length > 5) {
      const isCurrentlyFlagged = flagged.has(id);
      await supabase.from('biodata_records').update({ is_flagged: !isCurrentlyFlagged }).eq('id', id);
    }
  };

  const exportCSV = () => {
    const header = "#,Name,Category,Template,Date,City,Downloaded";
    const rows = filtered.map(r =>
      `${r.id},"${r.name}",${r.category},"${r.template}",${r.date},${r.city},${r.downloaded ? "Yes" : "No"}`
    ).join("\n");
    const blob = new Blob([header + "\n" + rows], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "biodata-records.csv"; a.click();
  };

  return (
    <>
      <style>{`
        /* ── Page shell ── */
        .rp-title { font-family:'Syne',sans-serif; font-size:26px; font-weight:800; color:var(--text-primary); margin-bottom:4px; }
        .rp-sub   { font-size:13px; color:var(--text-secondary); margin-bottom:22px; }

        /* ── Toolbar ── */
        .rp-toolbar { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:18px; }
        .rp-search {
          display:flex; align-items:center; gap:8px; padding:9px 14px;
          background:var(--bg-card); border:1px solid var(--border); border-radius:10px;
          flex:1; min-width:200px;
        }
        .rp-search input { background:none; border:none; outline:none; font-size:13px; color:var(--text-primary); width:100%; }
        .rp-select {
          padding:9px 14px; background:var(--bg-card); border:1px solid var(--border);
          border-radius:10px; font-size:13px; color:var(--text-secondary);
          cursor:pointer; outline:none; transition:border 0.2s;
        }
        .rp-select:focus { border-color:var(--accent); }
        .rp-export {
          display:flex; align-items:center; gap:7px; padding:9px 18px;
          background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.3);
          color:#10B981; border-radius:10px; font-size:13px; font-weight:600;
          cursor:pointer; transition:all 0.2s; white-space:nowrap;
        }
        .rp-export:hover { background:rgba(16,185,129,0.25); }
        .rp-count { font-size:13px; color:var(--text-secondary); white-space:nowrap; }
        .rp-count strong { color:var(--text-primary); }

        /* ── Table card ── */
        .rp-card { background:var(--bg-card); border:1px solid var(--border); border-radius:18px; overflow:hidden; backdrop-filter:blur(14px); }
        .rp-table { width:100%; border-collapse:collapse; }
        .rp-table thead { background:rgba(255,255,255,0.025); border-bottom:1px solid var(--border); }
        .rp-table th {
          padding:11px 16px; text-align:left; font-size:11px; font-weight:600;
          letter-spacing:0.08em; text-transform:uppercase; color:var(--text-secondary);
          white-space:nowrap;
        }
        .rp-table td { padding:13px 16px; font-size:13px; color:var(--text-primary); border-bottom:1px solid var(--border); vertical-align:middle; }
        .rp-table tbody tr:last-child td { border-bottom:none; }
        .rp-table tbody tr { transition:background 0.15s; cursor:default; }
        .rp-table tbody tr:hover td { background:rgba(249,115,22,0.04); }

        /* ── Badges ── */
        .cat-badge { display:inline-flex; align-items:center; gap:5px; font-size:11px; font-weight:600; padding:3px 10px; border-radius:6px; }
        .dl-yes { background:rgba(16,185,129,0.12); color:#10B981; font-size:11px; font-weight:700; padding:3px 10px; border-radius:6px; }
        .dl-no  { background:rgba(239,68,68,0.10);  color:#EF4444;  font-size:11px; font-weight:700; padding:3px 10px; border-radius:6px; }

        /* ── Action buttons ── */
        .act-btn {
          width:30px; height:30px; border-radius:8px; border:1px solid var(--border);
          background:transparent; cursor:pointer; display:inline-flex; align-items:center;
          justify-content:center; color:var(--text-secondary); transition:all 0.2s;
        }
        .act-btn:hover       { border-color:var(--accent); color:var(--accent); background:rgba(249,115,22,0.08); }
        .act-btn.del:hover   { border-color:#EF4444;        color:#EF4444;        background:rgba(239,68,68,0.08); }
        .act-btn.flag-on     { border-color:#F59E0B; color:#F59E0B; background:rgba(245,158,11,0.1); }

        /* ── Footer / Pagination ── */
        .rp-footer { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; border-top:1px solid var(--border); flex-wrap:wrap; gap:10px; }
        .pg-wrap   { display:flex; align-items:center; gap:6px; }
        .pg-btn {
          min-width:32px; height:32px; padding:0 6px; border-radius:8px;
          border:1px solid var(--border); background:var(--bg-card); cursor:pointer;
          display:inline-flex; align-items:center; justify-content:center;
          color:var(--text-secondary); font-size:13px; font-weight:600; transition:all 0.2s;
        }
        .pg-btn:hover, .pg-btn.cur { background:var(--accent); border-color:var(--accent); color:#fff; }
        .pg-btn:disabled { opacity:0.35; cursor:not-allowed; }

        /* ── Modals ── */
        .modal-backdrop {
          position:fixed; inset:0; background:rgba(0,0,0,0.65); backdrop-filter:blur(4px);
          z-index:200; display:flex; align-items:center; justify-content:center; padding:20px;
        }
        .modal-box {
          background:var(--bg-secondary,#0D1120); border:1px solid var(--border);
          border-radius:20px; width:100%; max-width:440px;
          box-shadow:0 24px 60px rgba(0,0,0,0.5); overflow:hidden;
          animation:modalIn 0.2s ease;
        }
        @keyframes modalIn { from{opacity:0;transform:scale(0.93)} to{opacity:1;transform:scale(1)} }
        .modal-head {
          display:flex; align-items:center; gap:10px; padding:20px 22px 16px;
          border-bottom:1px solid var(--border);
        }
        .modal-title { font-family:'Syne',sans-serif; font-size:17px; font-weight:700; color:var(--text-primary); flex:1; }
        .modal-close {
          width:30px; height:30px; border-radius:8px; border:1px solid var(--border);
          background:transparent; cursor:pointer; display:flex; align-items:center; justify-content:center;
          color:var(--text-secondary); transition:all 0.2s;
        }
        .modal-close:hover { color:#EF4444; border-color:#EF4444; }
        .modal-body  { padding:22px; }
        .modal-foot  { padding:14px 22px; border-top:1px solid var(--border); display:flex; justify-content:flex-end; gap:10px; }
        .modal-btn-cancel {
          padding:9px 20px; border-radius:10px; border:1px solid var(--border);
          background:var(--bg-card); color:var(--text-secondary); font-size:13px; font-weight:600;
          cursor:pointer; transition:all 0.2s;
        }
        .modal-btn-cancel:hover { color:var(--text-primary); }
        .modal-btn-del {
          padding:9px 20px; border-radius:10px; border:none;
          background:linear-gradient(135deg,#EF4444,#DC2626); color:#fff;
          font-size:13px; font-weight:700; cursor:pointer; transition:all 0.2s;
          box-shadow:0 4px 14px rgba(239,68,68,0.3);
        }
        .modal-btn-del:hover { transform:translateY(-1px); box-shadow:0 6px 18px rgba(239,68,68,0.4); }

        /* Preview detail rows */
        .prev-row { display:flex; align-items:flex-start; gap:10px; padding:9px 0; border-bottom:1px solid var(--border); }
        .prev-row:last-child { border-bottom:none; }
        .prev-icon { width:28px; height:28px; border-radius:7px; background:rgba(249,115,22,0.1); display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px; }
        .prev-label { font-size:11px; color:var(--text-secondary); font-weight:500; margin-bottom:2px; }
        .prev-val   { font-size:13px; color:var(--text-primary); font-weight:600; }
      `}</style>

      {/* ── Page Header ── */}
      <h1 className="rp-title">Biodata Records</h1>
      <p className="rp-sub">Manage, search and export all biodata submissions across every category.</p>

      {/* ── Toolbar ── */}
      <div className="rp-toolbar">
        <div className="rp-search">
          <Search size={14} style={{ color: "var(--text-secondary)", flexShrink: 0 }} />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name or city…"
          />
        </div>

        <select className="rp-select" value={catFilter}
          onChange={e => { setCatFilter(e.target.value); setPage(1); }}>
          <option>All</option>
          <option>Matrimonial</option>
          <option>Job Resume</option>
          <option>Business</option>
        </select>

        <select className="rp-select" value={timeFilter}
          onChange={e => setTimeFilter(e.target.value)}>
          <option>All Time</option>
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>

        <button className="rp-export" onClick={exportCSV}>
          <Download size={14} /> Export CSV
        </button>

        <span className="rp-count">Showing <strong>{filtered.length}</strong> records</span>
      </div>

      {/* ── Table ── */}
      <div className="rp-card">
        <div style={{ overflowX: "auto" }}>
          <table className="rp-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Template Used</th>
                <th>Date Created</th>
                <th>City</th>
                <th>PDF Downloaded</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
                    No records match your search.
                  </td>
                </tr>
              )}
              {pageRows.map((r, idx) => {
                const cs = CAT_STYLE[r.category];
                const isFlagged = flagged.has(r.id);
                return (
                  <tr key={r.id}>
                    <td style={{ color: "var(--text-secondary)", fontSize: 12 }}>
                      {(page - 1) * PER_PAGE + idx + 1}
                    </td>
                    <td style={{ fontWeight: 600 }}>{r.name}</td>
                    <td>
                      <span className="cat-badge" style={{ background: cs.bg, color: cs.color }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: cs.dot, display: "inline-block" }} />
                        {r.category}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-secondary)" }}>{r.template}</td>
                    <td style={{ color: "var(--text-secondary)", fontSize: 12 }}>{r.date}</td>
                    <td style={{ fontSize: 12 }}>{r.city}</td>
                    <td>
                      {r.downloaded
                        ? <span className="dl-yes">✓ Yes</span>
                        : <span className="dl-no">✗ No</span>}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 5 }}>
                        <button className="act-btn" title="Preview"
                          onClick={() => setPreviewTarget(r)}>
                          <Eye size={13} />
                        </button>
                        <button className={`act-btn${isFlagged ? " flag-on" : ""}`} title="Flag"
                          onClick={() => toggleFlag(r.id)}>
                          <Flag size={13} />
                        </button>
                        <button className="act-btn del" title="Delete"
                          onClick={() => setDeleteTarget(r)}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className="rp-footer">
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
            Page {page} of {Math.max(totalPages, 1)}
          </span>
          <div className="pg-wrap">
            <button className="pg-btn" disabled={page === 1}
              onClick={() => setPage(p => p - 1)}>
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: Math.max(totalPages, 1) }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce<(number | "…")[]>((acc, p, i, arr) => {
                if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("…");
                acc.push(p); return acc;
              }, [])
              .map((p, i) =>
                p === "…"
                  ? <span key={`e${i}`} style={{ color: "var(--text-secondary)", fontSize: 12, padding: "0 4px" }}>…</span>
                  : <button key={p} className={`pg-btn${page === p ? " cur" : ""}`}
                      onClick={() => setPage(p as number)}>{p}</button>
              )}
            <button className="pg-btn" disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(p => p + 1)}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Delete Modal ── */}
      {deleteTarget && (
        <div className="modal-backdrop" onClick={() => setDeleteTarget(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Trash2 size={15} style={{ color: "#EF4444" }} />
              </div>
              <div className="modal-title">Delete Record</div>
              <button className="modal-close" onClick={() => setDeleteTarget(null)}><X size={14} /></button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Are you sure you want to permanently delete the biodata record for{" "}
                <strong style={{ color: "var(--text-primary)" }}>{deleteTarget.name}</strong>?
                This action <span style={{ color: "#EF4444" }}>cannot be undone</span>.
              </p>
              <div style={{ marginTop: 14, padding: "12px 14px", borderRadius: 10, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", fontSize: 12, color: "#EF4444" }}>
                ⚠ The {deleteTarget.category} biodata &ldquo;{deleteTarget.template}&rdquo; will be removed from all records.
              </div>
            </div>
            <div className="modal-foot">
              <button className="modal-btn-cancel" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="modal-btn-del" onClick={handleDelete}>Delete Record</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Preview Modal ── */}
      {previewTarget && (
        <div className="modal-backdrop" onClick={() => setPreviewTarget(null)}>
          <div className="modal-box" style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(249,115,22,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Eye size={15} style={{ color: "#F97316" }} />
              </div>
              <div className="modal-title">Biodata Preview</div>
              <button className="modal-close" onClick={() => setPreviewTarget(null)}><X size={14} /></button>
            </div>
            <div className="modal-body">
              {/* Avatar + name hero */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, padding: "14px", borderRadius: 12, background: `${CAT_STYLE[previewTarget.category].bg}` }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg, ${CAT_STYLE[previewTarget.category].color}, #8B5CF6)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "white", flexShrink: 0 }}>
                  {previewTarget.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "var(--text-primary)" }}>{previewTarget.name}</div>
                  <span className="cat-badge" style={{ background: CAT_STYLE[previewTarget.category].bg, color: CAT_STYLE[previewTarget.category].color, marginTop: 4 }}>
                    {previewTarget.category}
                  </span>
                </div>
              </div>

              {[
                { icon: <Layers size={13} style={{ color: "#F97316" }} />, label: "Template", val: previewTarget.template },
                { icon: <Calendar size={13} style={{ color: "#6366F1" }} />, label: "Date Created", val: previewTarget.date },
                { icon: <MapPin size={13} style={{ color: "#10B981" }} />, label: "City", val: previewTarget.city },
                { icon: <FileText size={13} style={{ color: "#0EA5E9" }} />, label: "Record ID", val: `BD-${String(previewTarget.id).padStart(4, "0")}` },
                {
                  icon: <Download size={13} style={{ color: previewTarget.downloaded ? "#10B981" : "#EF4444" }} />,
                  label: "PDF Downloaded",
                  val: previewTarget.downloaded ? "Yes — downloaded" : "Not yet downloaded",
                },
              ].map(row => (
                <div className="prev-row" key={row.label}>
                  <div className="prev-icon">{row.icon}</div>
                  <div>
                    <div className="prev-label">{row.label}</div>
                    <div className="prev-val">{row.val}</div>
                  </div>
                </div>
              ))}

              {previewTarget.data && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                    <FileText size={12} /> FULL DATA PREVIEW
                  </div>
                  <div style={{ 
                    background: "rgba(0,0,0,0.2)", 
                    padding: 12, 
                    borderRadius: 10, 
                    maxHeight: 200, 
                    overflowY: "auto",
                    fontSize: 12,
                    fontFamily: "monospace",
                    color: "rgba(255,255,255,0.7)",
                    border: "1px solid var(--border)"
                  }}>
                    <pre>{JSON.stringify(previewTarget.data, null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-foot">
              <button className="modal-btn-cancel" onClick={() => setPreviewTarget(null)}>Close</button>
              <button style={{ padding: "9px 20px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#F97316,#EF4444)", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ height: 32 }} />
    </>
  );
}
