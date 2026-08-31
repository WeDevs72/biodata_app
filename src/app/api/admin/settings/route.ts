import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase-service-client";

const DEFAULT_SETTINGS = {
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
};

export async function GET() {
  try {
    const { data, error } = await supabaseService
      .from("biodata_records")
      .select("data")
      .eq("name", "__SYSTEM_SETTINGS__")
      .maybeSingle();

    if (error) {
      console.error("Error fetching system settings:", error);
      return NextResponse.json(DEFAULT_SETTINGS);
    }

    if (!data || !data.data) {
      return NextResponse.json(DEFAULT_SETTINGS);
    }

    return NextResponse.json({
      ...DEFAULT_SETTINGS,
      ...data.data,
    });
  } catch (err) {
    console.error("GET settings route error:", err);
    return NextResponse.json(DEFAULT_SETTINGS);
  }
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Check if settings record exists
    const { data: existing, error: checkError } = await supabaseService
      .from("biodata_records")
      .select("id")
      .eq("name", "__SYSTEM_SETTINGS__")
      .maybeSingle();

    if (checkError) {
      return NextResponse.json({ error: checkError.message }, { status: 500 });
    }

    if (existing) {
      const { error: updateError } = await supabaseService
        .from("biodata_records")
        .update({ data: payload })
        .eq("name", "__SYSTEM_SETTINGS__");

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }
    } else {
      const { error: insertError } = await supabaseService
        .from("biodata_records")
        .insert([
          {
            name: "__SYSTEM_SETTINGS__",
            category: "Matrimonial",
            template_used: "classic",
            city: "System",
            is_downloaded: false,
            is_flagged: false,
            data: payload,
            created_at: new Date().toISOString(),
          },
        ]);

      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("POST settings route error:", err);
    return NextResponse.json({ error: err.message || "Failed to save settings" }, { status: 500 });
  }
}
