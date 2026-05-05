
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { supabase } from "@/lib/supabase";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret",
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
      .eq('name', templateName)
      .eq('category', category)
      .eq('is_active', true)
      .single();

    let finalPrice = 99; // Default fallback
    if (!templateError && template) {
      finalPrice = template.discount_price !== null ? template.discount_price : template.price;
    }

    // Amount should be in paise (₹1 = 100 paise)
    const options = {
      amount: finalPrice * 100, 
      currency: "INR",
      receipt: `receipt_${recordId}`,
      notes: {
        recordId,
        category,
        template: templateName
      }
    };

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
