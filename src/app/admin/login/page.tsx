"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";


export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    setLoading(true);
    setError("");

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      if (data.user) {
        router.push("/admin");
      }
    } catch (err: any) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setLoading(false);
      
      if (newAttempts >= 3) {
        setIsLocked(true);
        setError("Too many attempts. Try again in 5 minutes.");
      } else {
        setError(err.message || "Invalid email or password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <style>{`
        .login-container {
          min-height: 100vh; background: #080B14; color: #fff;
          display: flex; align-items: center; justify-content: center; padding: 20px;
          font-family: 'DM Sans', sans-serif; position: relative; overflow: hidden;
        }

        /* Animated Background Particles */
        .bg-mesh {
          position: absolute; inset: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(249, 115, 22, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.03) 0%, transparent 60%);
          z-index: 1;
        }
        .particle {
          position: absolute; width: 2px; height: 2px; background: rgba(255,255,255,0.1);
          border-radius: 50%; animation: float 10s infinite linear;
        }
        @keyframes float {
          0% { transform: translateY(100vh) scale(1); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
        }

        /* Login Card */
        .login-card {
          width: 100%; max-width: 440px; background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 32px; padding: 48px; z-index: 10; position: relative;
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
        }
        
        .logo-wrap { text-align: center; margin-bottom: 32px; }
        .logo-text { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; color: #fff; }
        .logo-text span { color: #F97316; }
        .admin-badge {
          display: inline-block; padding: 4px 12px; background: rgba(249, 115, 22, 0.15);
          color: #F97316; border-radius: 20px; font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em; margin-top: 8px;
        }

        .form-group { margin-bottom: 20px; position: relative; }
        .input-icon { position: absolute; left: 16px; top: 13px; color: rgba(255,255,255,0.3); }
        .login-input {
          width: 100%; padding: 13px 44px; background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 14px;
          color: #fff; font-size: 14px; outline: none; transition: 0.3s;
        }
        .login-input:focus { border-color: #F97316; background: rgba(255, 255, 255, 0.08); }
        
        .pass-toggle {
          position: absolute; right: 16px; top: 13px; cursor: pointer;
          color: rgba(255,255,255,0.3); transition: 0.2s;
        }
        .pass-toggle:hover { color: #fff; }

        .form-options { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
        .remember-me { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,0.6); cursor: pointer; }
        .forgot-link { font-size: 13px; color: #F97316; text-decoration: none; font-weight: 600; }
        .forgot-link:hover { text-decoration: underline; }

        .login-btn {
          width: 100%; padding: 14px; border-radius: 14px; border: none;
          background: linear-gradient(135deg, #F97316, #EF4444); color: #fff;
          font-size: 15px; font-weight: 700; cursor: pointer; transition: 0.3s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 8px 24px rgba(249, 115, 22, 0.3);
        }
        .login-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(249, 115, 22, 0.4); }
        .login-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        /* Error Message */
        .error-box {
          background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2);
          color: #EF4444; padding: 12px 16px; border-radius: 12px; font-size: 13px;
          margin-bottom: 20px; display: flex; align-items: center; gap: 10px;
          animation: shake 0.4s ease;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        /* CAPTCHA Placeholder */
        .captcha-box {
          margin-top: 24px; padding: 12px; background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05); border-radius: 10px;
          display: flex; align-items: center; gap: 12px;
        }
        .captcha-check { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.2); border-radius: 4px; }
        .captcha-text { font-size: 12px; color: rgba(255,255,255,0.4); }

      `}</style>

      {/* Background Effects */}
      <div className="bg-mesh" />
      {Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i} 
          className="particle" 
          style={{ 
            left: `${Math.random() * 100}%`, 
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }} 
        />
      ))}


      {/* Login Card */}
      <div className="login-card">
        <div className="logo-wrap">
          <div className="logo-text">BioData<span>Earth</span></div>
          <div className="admin-badge">Admin Panel</div>
        </div>

        <form onSubmit={handleLogin}>
          {error && (
            <div className="error-box">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="form-group">
            <Mail className="input-icon" size={18} />
            <input 
              type="email" 
              className="login-input" 
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <Lock className="input-icon" size={18} />
            <input 
              type={showPass ? "text" : "password"} 
              className="login-input" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="pass-toggle" onClick={() => setShowPass(!showPass)}>
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" style={{ accentColor: '#F97316' }} />
              Remember me
            </label>
            <Link href="#" className="forgot-link">Forgot Password?</Link>
          </div>

          <button className="login-btn" type="submit" disabled={loading || isLocked}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Login to Dashboard"}
            {!loading && <ArrowRight size={18} />}
          </button>

          <div className="captcha-box">
            <div className="captcha-check" />
            <div className="captcha-text">Verify that you are human (Security Check)</div>
          </div>
        </form>

        <div style={{ marginTop: 32, textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
          &copy; 2026 BioDataEarth. Secured with 256-bit SSL encryption.
        </div>
      </div>
    </div>
  );
}
