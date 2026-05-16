
import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

// Use service-role client on the server so RLS never blocks payment writes
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function POST(req: Request) {
  try {
    const body_raw = await req.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      recordId 
    } = body_raw;

    // ── Diagnostic logging ───────────────────────────────────────────────────
    const secretFromEnv = process.env.RAZORPAY_KEY_SECRET;
    console.log("[verify] Received payload:", {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature: razorpay_signature?.slice(0, 10) + "...", // partial for safety
      recordId,
    });
    console.log("[verify] RAZORPAY_KEY_SECRET loaded:", secretFromEnv ? `YES (length=${secretFromEnv.length})` : "NO — using placeholder!");
    console.log("[verify] RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID ?? "NOT SET");
    // ────────────────────────────────────────────────────────────────────────

    const secret = secretFromEnv || "placeholder_secret";

    // Create signature verification
    const signatureBody = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(signatureBody)
      .digest("hex");

    console.log("[verify] expectedSignature:", expectedSignature?.slice(0, 10) + "...");
    console.log("[verify] receivedSignature:", razorpay_signature?.slice(0, 10) + "...");
    console.log("[verify] isAuthentic:", expectedSignature === razorpay_signature);

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Fetch the existing record data (service-role bypasses RLS on live)
      const { data: record, error: fetchError } = await supabaseAdmin
        .from('biodata_records')
        .select('data')
        .eq('id', recordId)
        .single();

      if (fetchError) {
        console.error("[verify] Error fetching record for payment update:", fetchError);
        // Don't block — still return success so PDF can download
      }

      const updatedData = {
        ...(record?.data || {}),
        payment: {
          status: 'paid',
          order_id: razorpay_order_id,
          payment_id: razorpay_payment_id,
          paid_at: new Date().toISOString()
        }
      };

      const { error: updateError } = await supabaseAdmin
        .from('biodata_records')
        .update({ data: updatedData })
        .eq('id', recordId);

      if (updateError) {
        console.error("[verify] Error saving payment status:", updateError);
        // Still return success — payment was verified, PDF should still download
      }

      console.log("[verify] ✅ Payment verified and DB updated for recordId:", recordId);
      return NextResponse.json({ success: true });
    } else {
      console.error("[verify] ❌ Signature mismatch — returning failure");
      return NextResponse.json({ success: false, message: "Signature verification failed" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("[verify] Uncaught error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

