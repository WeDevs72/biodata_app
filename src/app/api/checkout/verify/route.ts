
import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      recordId 
    } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET || "placeholder_secret";

    // Create signature verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update the record in Supabase
      // NOTE: We use the service role key internally for updates to bypass RLS if needed, 
      // but here we use the standard client which is usually fine if policies are set.
      const { error } = await supabase
        .from('biodata_records')
        .update({ 
          is_downloaded: false, // Reset download flag if needed, or just set payment status
          // data: ... we can store payment info in JSON data or new columns
        })
        .eq('id', recordId);

      // Since we don't have a payment_status column yet, I'll store it in the JSON 'data' field
      // but a dedicated column is better. I'll assume for now we use the 'data' field
      // to store payment info to avoid DB schema errors.
      
      const { data: record } = await supabase
        .from('biodata_records')
        .select('data')
        .eq('id', recordId)
        .single();

      const updatedData = {
        ...(record?.data || {}),
        payment: {
          status: 'paid',
          order_id: razorpay_order_id,
          payment_id: razorpay_payment_id,
          paid_at: new Date().toISOString()
        }
      };

      await supabase
        .from('biodata_records')
        .update({ data: updatedData })
        .eq('id', recordId);

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: "Signature verification failed" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
