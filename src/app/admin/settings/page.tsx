"use client";

import { useState, useEffect } from "react";
import {
  Settings as SettingsIcon, Globe, Shield, Search, Image, Share2,
  FileText, Lock, Smartphone, Laptop, Clock, Save, Upload,
  CheckCircle, AlertCircle, Trash2, Check, RefreshCw
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type TabType = "General" | "Maintenance" | "SEO" | "PDF" | "Social" | "Security" | "Pricing";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("General");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    siteName: "BioDataEarth",
    siteTagline: "World's Best Biodata Maker",
    adminEmail: "admin@biodataearth.com",
    maintenanceMode: false,
    maintenanceMessage: "We are upgrading our systems to serve you better.",
    expectedBack: "2nd May, 6:00 PM IST",
    metaTitle: "BioDataEarth —  Online Biodata Maker",
    metaDesc: "BioDataEarth is the world's most trusted biodata maker for marriage, job, and business profiles.",
    keywords: "biodata, marriage, resume, pdf maker",
    googleAnalyticsId: "",
    whatsapp: "",
    instagram: "",
    facebook: "",
    twitter: "",
    youtube: "",
    watermarkEnabled: true,
    watermarkText: "BioDataEarth.com",
    watermarkPosition: "Center",
    watermarkOpacity: 25,
    priceMatrimonialINR: 50,
    priceMatrimonialUSD: 1.00,
    priceJobINR: 79,
    priceJobUSD: 1.50,
    priceBusinessINR: 89,
    priceBusinessUSD: 2.00,
  });

  // Security State
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setSettings(prev => ({ ...prev, ...data }));
        }
      } catch (e) {
        console.error("Failed to load settings from DB, trying localStorage", e);
        const saved = localStorage.getItem("admin_settings");
        if (saved) {
          try {
            setSettings(prev => ({ ...prev, ...JSON.parse(saved) }));
          } catch (err) {
            console.error("Failed to parse local settings", err);
          }
        }
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        localStorage.setItem("admin_settings", JSON.stringify(settings));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        const errData = await res.json();
        alert("Error saving settings: " + (errData.error || "Unknown error"));
      }
    } catch (err: any) {
      alert("Error saving settings: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }
    if (passwords.new.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: passwords.new });
    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Password updated successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
    }
  };

  const tabs: { id: TabType, label: string, icon: any }[] = [
    { id: "General", label: "General", icon: Globe },
    { id: "Maintenance", label: "Maintenance", icon: AlertCircle },
    { id: "SEO", label: "SEO Settings", icon: Search },
    { id: "PDF", label: "PDF Watermark", icon: FileText },
    { id: "Social", label: "Social Media", icon: Share2 },
    { id: "Pricing", label: "Pricing Settings", icon: SettingsIcon },
    { id: "Security", label: "Security", icon: Lock },
  ];

  const updateSetting = (key: keyof typeof settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <style>{`
        .st-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
        .st-sub { font-size: 14px; color: var(--text-secondary); margin-bottom: 24px; }
        
        /* Red Banner for Maintenance Mode */
        .maintenance-banner {
          background: #EF4444; color: white; padding: 10px 24px; border-radius: 12px;
          display: flex; align-items: center; gap: 10px; margin-bottom: 24px;
          font-weight: 700; font-size: 14px; box-shadow: 0 4px 16px rgba(239, 68, 68, 0.2);
          animation: slideDown 0.3s ease;
        }
        @keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        /* Tabs Navigation */
        .tabs-nav {
          display: flex; gap: 4px; background: var(--bg-card); padding: 6px; 
          border-radius: 16px; margin-bottom: 24px; border: 1px solid var(--border);
          overflow-x: auto; scrollbar-width: none;
        }
        .tabs-nav::-webkit-scrollbar { display: none; }
        .tab-btn {
          display: flex; align-items: center; gap: 8px; padding: 10px 20px;
          border-radius: 12px; font-size: 13px; font-weight: 600; color: var(--text-secondary);
          border: none; background: transparent; cursor: pointer; transition: all 0.2s;
          white-space: nowrap;
        }
        .tab-btn:hover { color: var(--text-primary); background: rgba(255,255,255,0.02); }
        .tab-btn.active { background: var(--bg-primary); color: #F97316; box-shadow: 0 2px 8px rgba(0,0,0,0.2); }

        /* Content Area */
        .settings-content { 
          background: var(--bg-card); border: 1px solid var(--border); 
          border-radius: 24px; padding: 32px; backdrop-filter: blur(12px);
          min-height: 400px; animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .section-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 900px) { .section-grid { grid-template-columns: 1fr; } }

        .form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
        .form-label { font-size: 13px; font-weight: 600; color: var(--text-secondary); display: flex; align-items: center; justify-content: space-between; }
        .form-input {
          padding: 12px 16px; border-radius: 12px; background: var(--bg-primary); border: 1px solid var(--border);
          color: var(--text-primary); font-size: 14px; outline: none; transition: border 0.2s;
        }
        .form-input:focus { border-color: var(--accent); }
        .form-textarea {
          padding: 12px 16px; border-radius: 12px; background: var(--bg-primary); border: 1px solid var(--border);
          color: var(--text-primary); font-size: 14px; outline: none; resize: vertical; min-height: 100px;
        }
        .form-textarea:focus { border-color: var(--accent); }
        .form-select {
          padding: 12px 16px; border-radius: 12px; background: var(--bg-primary); border: 1px solid var(--border);
          color: var(--text-primary); font-size: 14px; outline: none; cursor: pointer;
        }

        /* Toggle Switches */
        .toggle-switch {
          width: 52px; height: 26px; border-radius: 13px; position: relative;
          cursor: pointer; transition: 0.3s;
        }
        .toggle-switch.on { background: #F97316; }
        .toggle-switch.off { background: var(--border); }
        .toggle-knob {
          width: 20px; height: 20px; border-radius: 50%; background: white;
          position: absolute; top: 3px; transition: 0.2s;
        }
        .toggle-switch.on .toggle-knob { left: 29px; }
        .toggle-switch.off .toggle-knob { left: 3px; }

        /* Upload Buttons */
        .upload-row { display: flex; align-items: center; gap: 16px; }
        .preview-box {
          width: 60px; height: 60px; border-radius: 12px; background: var(--bg-primary);
          border: 1px dashed var(--border); display: flex; align-items: center; justify-content: center;
          color: var(--text-secondary); flex-shrink: 0; overflow: hidden;
        }
        .upload-btn {
          display: flex; align-items: center; gap: 8px; padding: 10px 18px;
          border-radius: 10px; border: 1px solid var(--border); background: var(--bg-primary);
          color: var(--text-primary); font-size: 13px; font-weight: 600; cursor: pointer;
          transition: 0.2s;
        }
        .upload-btn:hover { border-color: var(--accent); }

        /* Success Toast */
        .toast {
          position: fixed; bottom: 32px; right: 32px; background: #10B981; color: white;
          padding: 14px 24px; border-radius: 12px; font-weight: 700; font-size: 14px;
          display: flex; align-items: center; gap: 10px; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
          z-index: 2000; animation: toastIn 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
        @keyframes toastIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

        .save-footer { margin-top: 32px; display: flex; justify-content: flex-end; }
        .main-save-btn {
          display: flex; align-items: center; gap: 8px; padding: 14px 32px;
          background: linear-gradient(135deg, #F97316, #EF4444); color: white;
          border: none; border-radius: 14px; font-size: 15px; font-weight: 700;
          cursor: pointer; box-shadow: 0 4px 20px rgba(249, 115, 22, 0.3); transition: 0.3s;
        }
        .main-save-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4); }
        .main-save-btn:disabled { opacity: 0.7; transform: none; cursor: not-allowed; }
      `}</style>

      {settings.maintenanceMode && (
        <div className="maintenance-banner">
          <AlertCircle size={18} />
          Site is currently in Maintenance Mode. Public access is restricted.
        </div>
      )}

      <h1 className="st-title">Settings</h1>
      <p className="st-sub">Global configuration for BioDataEarth platform.</p>

      {/* Tabs Navigation */}
      <div className="tabs-nav">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Settings Content Area */}
      <div className="settings-content">

        {/* TAB 1: GENERAL */}
        {activeTab === "General" && (
          <div className="section-grid">
            <div className="form-group">
              <label className="form-label">Site Name</label>
              <input type="text" className="form-input" value={settings.siteName} onChange={(e) => updateSetting("siteName", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Site Tagline</label>
              <input type="text" className="form-input" value={settings.siteTagline} onChange={(e) => updateSetting("siteTagline", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Admin Email</label>
              <input type="email" className="form-input" value={settings.adminEmail} onChange={(e) => updateSetting("adminEmail", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Main Logo</label>
              <div className="upload-row">
                <div className="preview-box"><Globe size={24} /></div>
                <button className="upload-btn" onClick={() => alert("Upload functionality requires a Supabase storage bucket.")}><Upload size={14} /> Upload Logo</button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MAINTENANCE */}
        {activeTab === "Maintenance" && (
          <div style={{ maxWidth: 600 }}>
            <div className="form-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>Maintenance Mode</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Restrict access to the site while updates are in progress.</div>
                </div>
                <div className={`toggle-switch ${settings.maintenanceMode ? 'on' : 'off'}`} onClick={() => updateSetting("maintenanceMode", !settings.maintenanceMode)}>
                  <div className="toggle-knob" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Maintenance Message</label>
              <textarea className="form-textarea" value={settings.maintenanceMessage} onChange={(e) => updateSetting("maintenanceMessage", e.target.value)} placeholder="e.g. We are upgrading our systems to serve you better." />
            </div>
            <div className="form-group">
              <label className="form-label">Expected Back Time</label>
              <input type="text" className="form-input" value={settings.expectedBack} onChange={(e) => updateSetting("expectedBack", e.target.value)} placeholder="e.g. 2nd May, 6:00 PM IST" />
            </div>
          </div>
        )}

        {/* TAB 3: SEO */}
        {activeTab === "SEO" && (
          <div className="section-grid">
            <div className="form-group">
              <label className="form-label">Meta Title</label>
              <input type="text" className="form-input" value={settings.metaTitle} onChange={(e) => updateSetting("metaTitle", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">
                Meta Description
                <span style={{ fontSize: 10, color: settings.metaDesc.length > 160 ? '#EF4444' : 'var(--text-secondary)' }}>{settings.metaDesc.length}/160</span>
              </label>
              <textarea
                className="form-textarea"
                value={settings.metaDesc}
                onChange={(e) => updateSetting("metaDesc", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Keywords (Comma Separated)</label>
              <input type="text" className="form-input" value={settings.keywords} onChange={(e) => updateSetting("keywords", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Google Analytics ID</label>
              <input type="text" className="form-input" value={settings.googleAnalyticsId} onChange={(e) => updateSetting("googleAnalyticsId", e.target.value)} placeholder="G-XXXXXXXXXX" />
            </div>
          </div>
        )}

        {/* TAB 4: PDF WATERMARK */}
        {activeTab === "PDF" && (
          <div style={{ maxWidth: 600 }}>
            <div className="form-group">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Enable Watermark</div>
                <div className={`toggle-switch ${settings.watermarkEnabled ? 'on' : 'off'}`} onClick={() => updateSetting("watermarkEnabled", !settings.watermarkEnabled)}>
                  <div className="toggle-knob" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Watermark Text</label>
              <input type="text" className="form-input" value={settings.watermarkText} onChange={(e) => updateSetting("watermarkText", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Position</label>
              <select className="form-select" value={settings.watermarkPosition} onChange={(e) => updateSetting("watermarkPosition", e.target.value)}>
                <option>Center</option>
                <option>Bottom Right</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Opacity ({settings.watermarkOpacity}%)</label>
              <input type="range" min="10" max="50" value={settings.watermarkOpacity} onChange={(e) => updateSetting("watermarkOpacity", parseInt(e.target.value))} style={{ accentColor: '#F97316', cursor: 'pointer' }} />
            </div>
          </div>
        )}

        {/* TAB 5: SOCIAL */}
        {activeTab === "Social" && (
          <div className="section-grid">
            <div className="form-group">
              <label className="form-label">WhatsApp Number</label>
              <input type="text" className="form-input" value={settings.whatsapp} onChange={(e) => updateSetting("whatsapp", e.target.value)} placeholder="+91 9876543210" />
            </div>
            <div className="form-group">
              <label className="form-label">Instagram URL</label>
              <input type="text" className="form-input" value={settings.instagram} onChange={(e) => updateSetting("instagram", e.target.value)} placeholder="https://instagram.com/..." />
            </div>
            <div className="form-group">
              <label className="form-label">Facebook URL</label>
              <input type="text" className="form-input" value={settings.facebook} onChange={(e) => updateSetting("facebook", e.target.value)} placeholder="https://facebook.com/..." />
            </div>
            <div className="form-group">
              <label className="form-label">Twitter/X URL</label>
              <input type="text" className="form-input" value={settings.twitter} onChange={(e) => updateSetting("twitter", e.target.value)} placeholder="https://x.com/..." />
            </div>
            <div className="form-group">
              <label className="form-label">YouTube URL</label>
              <input type="text" className="form-input" value={settings.youtube} onChange={(e) => updateSetting("youtube", e.target.value)} placeholder="https://youtube.com/..." />
            </div>
          </div>
        )}

        {/* TAB 7: PRICING */}
        {activeTab === "Pricing" && (
          <div className="section-grid">
            <div style={{ gridColumn: "span 2" }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>Dynamic Pricing by Country</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Configure prices for users in India (INR) vs. international users (USD).</div>
            </div>

            <div className="form-group">
              <label className="form-label">Matrimonial Price (India - INR)</label>
              <input type="number" className="form-input" value={settings.priceMatrimonialINR !== undefined ? settings.priceMatrimonialINR : 50} onChange={(e) => updateSetting("priceMatrimonialINR", Number(e.target.value))} />
            </div>
            <div className="form-group">
              <label className="form-label">Matrimonial Price (International - USD)</label>
              <input type="number" step="0.01" className="form-input" value={settings.priceMatrimonialUSD !== undefined ? settings.priceMatrimonialUSD : 1} onChange={(e) => updateSetting("priceMatrimonialUSD", Number(e.target.value))} />
            </div>

            <div className="form-group">
              <label className="form-label">Job Resume Price (India - INR)</label>
              <input type="number" className="form-input" value={settings.priceJobINR !== undefined ? settings.priceJobINR : 79} onChange={(e) => updateSetting("priceJobINR", Number(e.target.value))} />
            </div>
            <div className="form-group">
              <label className="form-label">Job Resume Price (International - USD)</label>
              <input type="number" step="0.01" className="form-input" value={settings.priceJobUSD !== undefined ? settings.priceJobUSD : 1.5} onChange={(e) => updateSetting("priceJobUSD", Number(e.target.value))} />
            </div>

            <div className="form-group">
              <label className="form-label">Business Price (India - INR)</label>
              <input type="number" className="form-input" value={settings.priceBusinessINR !== undefined ? settings.priceBusinessINR : 89} onChange={(e) => updateSetting("priceBusinessINR", Number(e.target.value))} />
            </div>
            <div className="form-group">
              <label className="form-label">Business Price (International - USD)</label>
              <input type="number" step="0.01" className="form-input" value={settings.priceBusinessUSD !== undefined ? settings.priceBusinessUSD : 2} onChange={(e) => updateSetting("priceBusinessUSD", Number(e.target.value))} />
            </div>
          </div>
        )}

        {/* TAB 6: SECURITY */}
        {activeTab === "Security" && (
          <div style={{ maxWidth: 500 }}>
            <form onSubmit={handlePasswordChange} style={{ background: 'rgba(255,255,255,0.02)', padding: 24, borderRadius: 20, border: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Lock size={16} style={{ color: '#F97316' }} /> Change Admin Password
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={passwords.new}
                  onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                  required
                />
              </div>
              <button
                type="submit"
                className="upload-btn"
                style={{ width: '100%', justifyContent: 'center', marginTop: 8, background: 'var(--accent)', color: 'white', border: 'none' }}
                disabled={loading}
              >
                {loading ? <RefreshCw className="animate-spin" size={14} /> : <Check size={14} />}
                Update Password
              </button>
            </form>

            <div style={{ marginTop: 24, padding: 16, borderRadius: 16, border: '1px dashed var(--border)', fontSize: 12, color: 'var(--text-secondary)' }}>
              <p><strong>Note:</strong> Password updates are handled by Supabase Auth. You will be logged out of other devices after changing your password.</p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {activeTab !== "Security" && (
          <div className="save-footer">
            <button className="main-save-btn" onClick={handleSave} disabled={loading}>
              {loading ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="toast">
          <CheckCircle size={18} />
          Settings updated successfully!
        </div>
      )}

      <div style={{ height: 40 }} />
    </>
  );
}
