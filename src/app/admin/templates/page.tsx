"use client";

import { useState, useMemo, useEffect } from "react";
import { Grid2x2, Plus, Edit, Trash2, Star, X, Upload, Layout, CheckCircle2, AlertCircle } from "lucide-react";

type Category = "Matrimonial" | "Job Resume" | "Business";

interface Template {
  id: number | string;
  name: string;
  category: Category;
  uses: number;
  status: "active" | "inactive";
  isFeatured: boolean;
  color: string;
  price?: number;
  discount_price?: number;
}

import { supabase } from "@/lib/supabase";

const CAT_COLORS: Record<Category, string> = {
  "Matrimonial": "#F43F5E",
  "Job Resume": "#6366F1",
  "Business": "#F97316",
};

export default function TemplateManagement() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [activeTab, setActiveTab] = useState<"All" | Category>("All");
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [formData, setFormData] = useState<Partial<Template>>({
    name: "",
    category: "Matrimonial",
    price: 99,
    status: "active"
  });

  // Fetch templates from database
  const fetchTemplates = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      const mapped: Template[] = data.map((t: any) => ({
        id: t.id,
        name: t.name,
        category: t.category as Category,
        uses: 0, 
        status: t.is_active ? "active" : "inactive",
        isFeatured: false, 
        color: CAT_COLORS[t.category as Category] || "#8B5CF6",
        price: t.price,
        discount_price: t.discount_price,
      }));
      setTemplates(mapped);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // Stats
  const totalUsage = useMemo(() => templates.reduce((acc, t) => acc + t.uses, 0), [templates]);

  const filteredTemplates = useMemo(() => {
    if (activeTab === "All") return templates;
    return templates.filter((t) => t.category === activeTab);
  }, [templates, activeTab]);

  const toggleStatus = async (id: number | string) => {
    const template = templates.find((t) => t.id === id);
    if (!template) return;
    const newStatus = template.status === "active" ? false : true;
    
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, status: newStatus ? "active" : "inactive" } : t));
    await supabase.from("templates").update({ is_active: newStatus }).eq("id", id);
  };

  const toggleFeatured = (id: number | string) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, isFeatured: !t.isFeatured } : t));
  };

  const deleteTemplate = async (id: number | string) => {
    if (confirm("Are you sure you want to delete this template?")) {
      setTemplates(prev => prev.filter(t => t.id !== id));
      await supabase.from("templates").delete().eq("id", id);
    }
  };

  const handleOpenAdd = () => {
    setModalMode("add");
    setFormData({ name: "", category: "Matrimonial", price: 99, status: "active" });
    setShowModal(true);
  };

  const handleOpenEdit = (t: Template) => {
    setModalMode("edit");
    setFormData({
      id: t.id,
      name: t.name,
      category: t.category,
      price: t.price,
      discount_price: t.discount_price,
      status: t.status
    });
    setShowModal(true);
  };

  const handleSaveTemplate = async () => {
    if (!formData.name) return alert("Name is required");
    if (formData.price === undefined) return alert("Price is required");

    const payload = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      discount_price: formData.discount_price ? Number(formData.discount_price) : null,
      is_active: formData.status === "active"
    };

    if (modalMode === "add") {
      const { data, error } = await supabase.from("templates").insert([payload]).select();
      if (error) {
        alert("Error creating template: " + error.message);
      } else {
        fetchTemplates();
        setShowModal(false);
      }
    } else {
      const { error } = await supabase.from("templates").update(payload).eq("id", formData.id);
      if (error) {
        alert("Error updating template: " + error.message);
      } else {
        fetchTemplates();
        setShowModal(false);
      }
    }
  };

  return (
    <>
      <style>{`
        .tmpl-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 16px; }
        .tmpl-title-section { display: flex; flex-direction: column; gap: 4px; }
        .tmpl-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: var(--text-primary); }
        .tmpl-count { font-size: 14px; color: var(--text-secondary); }
        .add-btn {
          display: flex; align-items: center; gap: 8px; padding: 12px 24px;
          background: linear-gradient(135deg, #F97316, #EF4444); color: white;
          border: none; border-radius: 12px; font-size: 14px; font-weight: 700;
          cursor: pointer; box-shadow: 0 4px 20px rgba(249,115,22,0.3); transition: all 0.3s;
        }
        .add-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(249,115,22,0.4); }

        /* Tabs */
        .tabs-container { display: flex; gap: 8px; margin-bottom: 24px; background: var(--bg-card); padding: 6px; border-radius: 14px; width: fit-content; border: 1px solid var(--border); }
        .tab-btn {
          padding: 8px 18px; border-radius: 10px; font-size: 13px; font-weight: 600;
          color: var(--text-secondary); border: none; background: transparent; cursor: pointer; transition: all 0.2s;
        }
        .tab-btn.active { background: var(--bg-primary); color: #F97316; box-shadow: 0 2px 8px rgba(0,0,0,0.2); }

        /* Grid */
        .tmpl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 1100px) { .tmpl-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .tmpl-grid { grid-template-columns: 1fr; } }

        /* Card */
        .tmpl-card {
          background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px;
          overflow: hidden; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); backdrop-filter: blur(12px);
          position: relative;
        }
        .tmpl-card:hover { transform: translateY(-6px); border-color: var(--card-accent); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }

        .tmpl-preview {
          height: 180px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center;
          background: var(--bg-primary);
        }
        .tmpl-preview-gradient { position: absolute; inset: 0; opacity: 0.15; filter: blur(40px); }
        .tmpl-featured-badge {
          position: absolute; top: 12px; left: 12px; background: #F59E0B; color: white;
          padding: 4px 10px; border-radius: 8px; font-size: 10px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 4px;
          box-shadow: 0 4px 12px rgba(245,158,11,0.3);
        }

        .tmpl-body { padding: 20px; }
        .tmpl-name { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; }
        .tmpl-cat-badge {
          display: inline-block; padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 700;
          margin-bottom: 12px;
        }

        .tmpl-stats-bar { margin-bottom: 16px; }
        .tmpl-uses-text { font-size: 12px; color: var(--text-secondary); margin-bottom: 6px; display: flex; justify-content: space-between; }
        .progress-track { height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 2px; transition: width 1s ease; }

        .tmpl-footer { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); padding-top: 16px; margin-top: 4px; }
        .status-toggle {
          display: flex; align-items: center; gap: 8px; cursor: pointer;
        }
        .toggle-pill {
          width: 36px; height: 18px; border-radius: 10px; position: relative; transition: background 0.3s;
        }
        .toggle-pill.active { background: #10B981; }
        .toggle-pill.inactive { background: #EF4444; }
        .toggle-circle {
          width: 14px; height: 14px; background: white; border-radius: 50%; position: absolute; top: 2px;
          transition: left 0.2s;
        }
        .toggle-pill.active .toggle-circle { left: 20px; }
        .toggle-pill.inactive .toggle-circle { left: 2px; }
        .status-label { font-size: 11px; font-weight: 700; text-transform: uppercase; }

        .tmpl-actions { display: flex; gap: 6px; }
        .action-icon {
          width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center; color: var(--text-secondary);
          transition: all 0.2s; cursor: pointer; background: transparent;
        }
        .action-icon:hover { color: var(--accent); border-color: var(--accent); background: rgba(249,115,22,0.05); }
        .action-icon.featured.active { color: #F59E0B; border-color: #F59E0B; background: rgba(245,158,11,0.05); }
        .action-icon.delete:hover { color: #EF4444; border-color: #EF4444; background: rgba(239,68,68,0.05); }

        /* Modal */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px;
        }
        .modal-content {
          background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 24px;
          width: 100%; max-width: 500px; overflow: hidden; animation: scaleUp 0.3s ease;
        }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .modal-header { padding: 20px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .modal-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: var(--text-primary); }
        .modal-close { background: transparent; border: none; color: var(--text-secondary); cursor: pointer; }

        .modal-body { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-row { display: flex; gap: 16px; }
        .form-row > * { flex: 1; }
        .form-label { font-size: 13px; font-weight: 600; color: var(--text-secondary); }
        .form-input {
          padding: 12px 16px; border-radius: 12px; background: var(--bg-primary); border: 1px solid var(--border);
          color: var(--text-primary); font-size: 14px; outline: none; transition: border 0.2s;
        }
        .form-input:focus { border-color: var(--accent); }
        .form-select {
          padding: 12px 16px; border-radius: 12px; background: var(--bg-primary); border: 1px solid var(--border);
          color: var(--text-primary); font-size: 14px; outline: none; cursor: pointer;
        }

        .modal-footer { padding: 20px 24px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 12px; }
        .cancel-btn { padding: 12px 24px; border-radius: 12px; border: 1px solid var(--border); background: transparent; color: var(--text-secondary); font-size: 14px; font-weight: 600; cursor: pointer; }
        .save-btn { padding: 12px 32px; border-radius: 12px; border: none; background: #F97316; color: white; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(249,115,22,0.3); }
      `}</style>

      <div className="tmpl-header">
        <div className="tmpl-title-section">
          <h1 className="tmpl-title">Template Management</h1>
          <span className="tmpl-count">{templates.length} Templates Total</span>
        </div>
        <button className="add-btn" onClick={handleOpenAdd}>
          <Plus size={18} /> Add New Template
        </button>
      </div>

      <div className="tabs-container">
        {(["All", "Matrimonial", "Job Resume", "Business"] as const).map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>Loading templates...</div>
      ) : (
        <div className="tmpl-grid">
          {filteredTemplates.map((t) => {
            const usagePercent = totalUsage ? (t.uses / totalUsage) * 100 : 0;
            return (
              <div key={t.id} className="tmpl-card" style={{ "--card-accent": t.color } as any}>
                <div className="tmpl-preview">
                  <div className="tmpl-preview-gradient" style={{ background: t.color }} />
                  {t.isFeatured && (
                    <div className="tmpl-featured-badge">
                      <Star size={10} fill="white" /> Featured
                    </div>
                  )}
                  <Layout size={48} style={{ color: t.color, opacity: 0.5 }} />
                </div>

                <div className="tmpl-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div className="tmpl-name">{t.name}</div>
                    <div style={{ textAlign: 'right' }}>
                      {t.discount_price ? (
                        <>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#10B981' }}>₹{t.discount_price}</div>
                          <div style={{ fontSize: '10px', textDecoration: 'line-through', color: 'var(--text-secondary)' }}>₹{t.price}</div>
                        </>
                      ) : (
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>₹{t.price}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="tmpl-cat-badge" style={{ background: `${CAT_COLORS[t.category]}15`, color: CAT_COLORS[t.category] }}>
                    {t.category}
                  </div>

                  <div className="tmpl-stats-bar">
                    <div className="tmpl-uses-text">
                      <span>Used {t.uses.toLocaleString()} times</span>
                      <span>{usagePercent.toFixed(1)}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${usagePercent}%`, background: t.color }} />
                    </div>
                  </div>

                  <div className="tmpl-footer">
                    <div className="status-toggle" onClick={() => toggleStatus(t.id)}>
                      <div className={`toggle-pill ${t.status}`}>
                        <div className="toggle-circle" />
                      </div>
                      <span className="status-label" style={{ color: t.status === "active" ? "#10B981" : "#EF4444" }}>
                        {t.status}
                      </span>
                    </div>

                    <div className="tmpl-actions">
                      <button className="action-icon" title="Edit" onClick={() => handleOpenEdit(t)}>
                        <Edit size={14} />
                      </button>
                      <button
                        className={`action-icon featured ${t.isFeatured ? "active" : ""}`}
                        title="Set Featured"
                        onClick={() => toggleFeatured(t.id)}
                      >
                        <Star size={14} fill={t.isFeatured ? "#F59E0B" : "none"} />
                      </button>
                      <button className="action-icon delete" title="Delete" onClick={() => deleteTemplate(t.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Template Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{modalMode === "add" ? "Add New Template" : "Edit Template"}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Template Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Modern Professional"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select 
                  className="form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                  disabled={modalMode === "edit"} // Prevent changing category for existing
                >
                  <option value="Matrimonial">Matrimonial</option>
                  <option value="Job Resume">Job Resume</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Base Price (₹)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="e.g. 99"
                    value={formData.price || ""}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Discount Price (₹)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="Optional"
                    value={formData.discount_price || ""}
                    onChange={(e) => setFormData({ ...formData, discount_price: e.target.value ? Number(e.target.value) : undefined })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                    <input 
                      type="radio" 
                      name="status" 
                      checked={formData.status === "active"}
                      onChange={() => setFormData({ ...formData, status: "active" })}
                    /> Active
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                    <input 
                      type="radio" 
                      name="status" 
                      checked={formData.status === "inactive"}
                      onChange={() => setFormData({ ...formData, status: "inactive" })}
                    /> Inactive
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleSaveTemplate}>
                {modalMode === "add" ? "Create Template" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ height: 40 }} />
    </>
  );
}
