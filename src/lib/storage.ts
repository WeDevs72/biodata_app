import { BiodataFormValues } from "./schema";
import { JobFormValues } from "./jobSchema";
import { BusinessFormValues } from "./businessSchema";

const STORAGE_KEY = "biodata_draft";
const JOB_STORAGE_KEY = "job_biodata_draft";
const BUSINESS_STORAGE_KEY = "business_biodata_draft";

// ── Matrimonial ──────────────────────────────────────────────────────────────

export function saveBiodata(data: Partial<BiodataFormValues>): void {
  try {
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

// ── Job / Resume ─────────────────────────────────────────────────────────────

export function saveJobBiodata(data: Partial<JobFormValues>): void {
  try {
    const toSave = { ...data };
    if (typeof toSave.photo !== "string") {
      delete toSave.photo;
    }
    localStorage.setItem(JOB_STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // fail silently
  }
}

export function loadJobBiodata(): Partial<JobFormValues> | null {
  try {
    const raw = localStorage.getItem(JOB_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<JobFormValues>;
  } catch {
    return null;
  }
}

export function clearJobBiodata(): void {
  try {
    localStorage.removeItem(JOB_STORAGE_KEY);
  } catch {
    // fail silently
  }
}

// ── Business Profile ─────────────────────────────────────────────────────────

export function saveBusinessBiodata(data: Partial<BusinessFormValues>): void {
  try {
    const toSave = { ...data };
    if (typeof toSave.photo !== "string") {
      delete toSave.photo;
    }
    localStorage.setItem(BUSINESS_STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // fail silently
  }
}

export function loadBusinessBiodata(): Partial<BusinessFormValues> | null {
  try {
    const raw = localStorage.getItem(BUSINESS_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<BusinessFormValues>;
  } catch {
    return null;
  }
}

export function clearBusinessBiodata(): void {
  try {
    localStorage.removeItem(BUSINESS_STORAGE_KEY);
  } catch {
    // fail silently
  }
}
