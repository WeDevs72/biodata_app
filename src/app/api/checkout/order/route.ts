
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
    const { recordId, category, currency } = await req.json();

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

    // Fetch template price configuration from database
    const { data: templateRow } = await supabase
      .from('templates')
      .select('price, discount_price')
      .eq('name', templateName)
      .eq('category', category)
      .maybeSingle();

    // Fetch system settings for pricing
    const { data: settingsRecord } = await supabase
      .from("biodata_records")
      .select("data")
      .eq("name", "__SYSTEM_SETTINGS__")
      .maybeSingle();

    const settings = settingsRecord?.data || {};

    const currencyUpper = (currency || "INR").toUpperCase();
    let finalPrice = 99; // Default fallback

    if (currencyUpper === "USD") {
      const key = `${templateName}_${category}`;
      const usdPricing = settings.templatePricesUSD?.[key] || {};
      let usdPrice = usdPricing.discount_price !== null && usdPricing.discount_price !== undefined 
        ? usdPricing.discount_price 
        : usdPricing.price;

      if (usdPrice === null || usdPrice === undefined || isNaN(Number(usdPrice))) {
        if (category === "Matrimonial") {
          usdPrice = settings.priceMatrimonialUSD !== undefined ? settings.priceMatrimonialUSD : 1.00;
        } else if (category === "Job Resume") {
          usdPrice = settings.priceJobUSD !== undefined ? settings.priceJobUSD : 1.50;
        } else if (category === "Business") {
          usdPrice = settings.priceBusinessUSD !== undefined ? settings.priceBusinessUSD : 2.00;
        } else {
          usdPrice = 1.00;
        }
      }
      finalPrice = Number(usdPrice);
    } else {
      // Default to INR
      let inrPrice = templateRow 
        ? (templateRow.discount_price !== null && templateRow.discount_price !== undefined ? templateRow.discount_price : templateRow.price) 
        : null;

      if (inrPrice === null || inrPrice === undefined || isNaN(Number(inrPrice))) {
        if (category === "Matrimonial") {
          inrPrice = settings.priceMatrimonialINR !== undefined ? settings.priceMatrimonialINR : 50;
        } else if (category === "Job Resume") {
          inrPrice = settings.priceJobINR !== undefined ? settings.priceJobINR : 79;
        } else if (category === "Business") {
          inrPrice = settings.priceBusinessINR !== undefined ? settings.priceBusinessINR : 89;
        } else {
          inrPrice = 50;
        }
      }
      finalPrice = Number(inrPrice);
    }

    // Receipt must be ≤ 40 characters (Razorpay limit).
    // Truncate the recordId to fit: "rcpt_" (5) + 35 chars max.
    const receiptSuffix = String(recordId).slice(0, 35);
    const receipt = `rcpt_${receiptSuffix}`;

    // Amount should be in paise (₹1 = 100 paise)
    const options = {
      amount: Math.round(finalPrice * 100),
      currency: currencyUpper,
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

