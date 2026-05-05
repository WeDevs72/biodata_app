"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";


export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      await supabase.auth.signOut();
      router.push("/admin/login");
    };

    const timer = setTimeout(performLogout, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080B14",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "20px",
      color: "#fff",
      fontFamily: "'Syne', sans-serif"
    }}>
      <div style={{
        width: "60px",
        height: "60px",
        borderRadius: "15px",
        background: "rgba(239, 68, 68, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#EF4444",
        border: "1px solid rgba(239, 68, 68, 0.2)"
      }}>
        <LogOut size={30} />
      </div>
      
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "8px" }}>Logging Out...</h1>
        <p style={{ color: "#8896AC", fontSize: "14px", fontFamily: "'DM Sans', sans-serif" }}>
          Clearing your secure session and returning to login.
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
        <Loader2 className="animate-spin" size={18} style={{ color: "#F97316" }} />
        <span style={{ fontSize: "12px", color: "#F97316", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Please wait
        </span>
      </div>
    </div>
  );
}
