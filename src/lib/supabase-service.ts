
import { supabase } from "./supabase";

export type RecordCategory = "Matrimonial" | "Job Resume" | "Business";

export async function recordSubmission(params: {
  name: string;
  category: RecordCategory;
  template: string;
  city: string;
  formData?: any;
}) {
  try {
    const { data, error } = await supabase
      .from('biodata_records')
      .insert([
        {
          name: params.name,
          category: params.category,
          template_used: params.template,
          city: params.city,
          is_downloaded: false,
          is_flagged: false,
          data: params.formData,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error("Error recording submission:", error.message);
      return { success: false, error };
    }
    return { success: true, record: data?.[0] };
  } catch (err) {
    console.error("Submission error:", err);
    return { success: false, error: err };
  }
}

export async function markAsDownloaded(recordId: string | number) {
  try {
    const { error } = await supabase
      .from('biodata_records')
      .update({ is_downloaded: true })
      .eq('id', recordId);

    if (error) {
      console.error("Error marking as downloaded:", error.message);
      return { success: false, error };
    }
    return { success: true };
  } catch (err) {
    console.error("Mark as downloaded error:", err);
    return { success: false, error: err };
  }
}

export async function checkPaymentStatus(recordId: string | number) {
  try {
    const { data, error } = await supabase
      .from('biodata_records')
      .select('data')
      .eq('id', recordId)
      .single();

    if (error) return { paid: false };
    
    // Check if payment info exists in the JSON data field
    const payment = data?.data?.payment;
    return { paid: payment?.status === 'paid' };
  } catch {
    return { paid: false };
  }
}

export async function getTemplatePrice(templateName: string, category: string): Promise<{ price: number; error: any }> {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('price, discount_price')
      .eq('name', templateName)
      .eq('category', category)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      console.error("Error fetching template price:", error);
      return { price: 99, error }; // Default fallback price
    }

    // Use discount price if available, otherwise base price
    const finalPrice = data.discount_price !== null ? data.discount_price : data.price;
    return { price: Number(finalPrice), error: null };
  } catch (err) {
    console.error("Template price fetch error:", err);
    return { price: 99, error: err };
  }
}
