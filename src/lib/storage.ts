import { BiodataFormValues } from "./schema";

const STORAGE_KEY = "biodata_draft";

export function saveBiodata(data: Partial<BiodataFormValues>): void {
  try {
    // Don't store the photo blob in localStorage — it can be very large.
    // We store it separately only if it's a data URL string.
    const toSave = { ...data };
    if (typeof toSave.photo !== "string") {
      delete toSave.photo;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // localStorage might be unavailable or full — fail silently
  }
}

export function loadBiodata(): Partial<BiodataFormValues> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<BiodataFormValues>;
  } catch {
    return null;
  }
}

export function clearBiodata(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // fail silently
  }
}
