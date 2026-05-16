
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { supabase } from "@/lib/supabase";

const KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder";
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "placeholder_secret";

console.log("[order] RAZORPAY_KEY_ID loaded:", KEY_ID ? `YES — ${KEY_ID.slice(0, 12)}...` : "NO");
console.log("[order] RAZORPAY_KEY_SECRET loaded:", KEY_SECRET && KEY_SECRET !== "placeholder_secret" ? `YES (length=${KEY_SECRET.length})` : "NO — placeholder is being used!");

const razorpay = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});

export async function POST(req: Request) {
  try {
    const { recordId, category } = await req.json();

    if (!recordId) {
      return NextResponse.json({ error: "Record ID is required" }, { status: 400 });
    }

    // Fetch the record to get the template used
    const { data: record, error: recordError } = await supabase
      .from('biodata_records')
      .select('template_used')
      .eq('id', recordId)
      .single();

    if (recordError || !record) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    const templateName = record.template_used;

    // Fetch the dynamic price for the template
    const { data: template, error: templateError } = await supabase
      .from('templates')
      .select('price, discount_price')
      .ilike('name', templateName)   // case-insensitive: slug "classic" matches "Classic"
      .eq('category', category)
      .eq('is_active', true)
      .single();

    let finalPrice = 99; // Default fallback
    if (!templateError && template) {
      finalPrice = template.discount_price !== null ? template.discount_price : template.price;
    }

    // Receipt must be ≤ 40 characters (Razorpay limit).
    // Truncate the recordId to fit: "rcpt_" (5) + 35 chars max.
    const receiptSuffix = String(recordId).slice(0, 35);
    const receipt = `rcpt_${receiptSuffix}`;

    // Amount should be in paise (₹1 = 100 paise)
    const options = {
      amount: finalPrice * 100,
      currency: "INR",
      receipt,
      notes: {
        recordId,
        category,
        template: templateName
      }
    };

    console.log("[order] Creating order:", { amount: options.amount, receipt, template: templateName });
    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error: any) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

