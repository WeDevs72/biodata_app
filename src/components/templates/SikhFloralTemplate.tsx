import { BiodataFormValues } from "@/lib/schema";

export function SikhFloralTemplate({ data }: { data: Partial<BiodataFormValues> }) {
  // Sikh / Traditional Accent Palette
  const navyText = "text-[#0c2340]";
  const goldText = "text-[#d97706]";
  const saffronBg = "bg-[#ea580c]";

  return (
    <div className="relative bg-[#fffdf5] w-full h-full min-h-[1122px] text-slate-800 font-serif leading-relaxed px-12 py-12 border-[8px] border-double border-[#d97706]/30 overflow-hidden flex flex-col">

      {/* ── Background Floral Vector Overlays (watercolor-like, extremely fast & local) ── */}
      <TopLeftFloral />
      <BottomRightFloral />

      {/* Inner fine gold boundary */}
      <div className="absolute inset-2 border border-[#d97706]/20 pointer-events-none z-10"></div>

      <div className="relative z-10 flex flex-col flex-1">

        {/* ── Header Section ────────────────────────────────────────────────── */}
        <div className="w-full text-center flex flex-col items-center mb-8">
          {/* Centered Religious symbol */}
          <div className={`text-4xl ${goldText} mb-1 w-12 h-12 flex items-center justify-center border border-[#d97706]/25 rounded-full bg-white/70 shadow-sm z-20`}>
            {data.religiousSymbol || "ੴ"}
          </div>

          {/* Main Title "Biodata" */}
          <h1 className={`text-xl font-bold tracking-[0.3em] uppercase ${navyText} border-y border-[#d97706]/20 py-1 px-8 inline-block mt-2`}>
            Biodata
          </h1>
        </div>

        {/* ── Main content grid ────────────────────────────────────────────── */}
        <div className="flex gap-8 items-start mb-6">

          {/* Left Block: Text details (Personal, Family, Contacts) */}
          <div className="flex-1 space-y-8 pr-2">

            {/* 1. PERSONAL DETAILS */}
            <section>
              <h2 className={`text-sm font-extrabold tracking-widest uppercase border-b border-[#d97706]/30 pb-1 mb-4 ${navyText} flex items-center gap-1.5`}>
                <span className="w-1 h-3 bg-[#d97706]"></span>
                Personal Details
              </h2>

              <div className="grid grid-cols-[140px_1fr] gap-x-2 gap-y-2 text-xs">
                <span className="font-bold text-slate-600">Name</span>
                <span>: {data.fullName || "—"}</span>

                <span className="font-bold text-slate-600">Date of Birth</span>
                <span>: {data.dob || "—"}</span>

                <span className="font-bold text-slate-600">Height</span>
                <span>: {data.height || "—"}</span>

                <span className="font-bold text-slate-600">Religion / Faith</span>
                <span>: {data.religion || "—"}</span>

                {data.caste && (
                  <>
                    <span className="font-bold text-slate-600">Caste / Gotra</span>
                    <span>: {data.caste}</span>
                  </>
                )}

                <span className="font-bold text-slate-600">Location</span>
                <span>: {data.location || "—"}</span>

                <span className="font-bold text-slate-600">Highest Education</span>
                <span>: {data.education || "—"}</span>

                <span className="font-bold text-slate-600">Occupation</span>
                <span>: {data.occupation || "—"}</span>

                {data.income && (
                  <>
                    <span className="font-bold text-slate-600">Annual Income</span>
                    <span>: {data.income}</span>
                  </>
                )}

                {/* Render custom personal fields */}
                {data.personalCustomFields?.map((f) => (
                  <span key={f.id} className="contents">
                    <span className="font-bold text-slate-600">{f.label}</span>
                    <span>: {f.value || "—"}</span>
                  </span>
                ))}
              </div>
            </section>

            {/* 2. FAMILY DETAILS */}
            <section>
              <h2 className={`text-sm font-extrabold tracking-widest uppercase border-b border-[#d97706]/30 pb-1 mb-4 ${navyText} flex items-center gap-1.5`}>
                <span className="w-1 h-3 bg-[#d97706]"></span>
                Family Details
              </h2>

              <div className="grid grid-cols-[140px_1fr] gap-x-2 gap-y-2 text-xs">
                <span className="font-bold text-slate-600">Father's Name</span>
                <span>: {data.fatherName || "—"}</span>

                <span className="font-bold text-slate-600">Mother's Name</span>
                <span>: {data.motherName || "—"}</span>

                {data.siblings && (
                  <>
                    <span className="font-bold text-slate-600">Siblings</span>
                    <span>: {data.siblings}</span>
                  </>
                )}

                {/* Render custom family fields */}
                {data.familyCustomFields?.map((f) => (
                  <span key={f.id} className="contents">
                    <span className="font-bold text-slate-600">{f.label}</span>
                    <span>: {f.value || "—"}</span>
                  </span>
                ))}
              </div>
            </section>

            {/* 3. CONTACT & PREFERENCES */}
            <section>
              <h2 className={`text-sm font-extrabold tracking-widest uppercase border-b border-[#d97706]/30 pb-1 mb-4 ${navyText} flex items-center gap-1.5`}>
                <span className="w-1 h-3 bg-[#d97706]"></span>
                Contact & Preferences
              </h2>

              <div className="grid grid-cols-[140px_1fr] gap-x-2 gap-y-2 text-xs">
                <span className="font-bold text-slate-600">Preferred Partner</span>
                <span>: {data.preferredEducation || "Well settled professional"}</span>

                {data.preferredAge && (
                  <>
                    <span className="font-bold text-slate-600">Preferred Age</span>
                    <span>: {data.preferredAge}</span>
                  </>
                )}

                {data.preferredLocation && (
                  <>
                    <span className="font-bold text-slate-600">Pref. Location</span>
                    <span>: {data.preferredLocation}</span>
                  </>
                )}

                {/* Render custom partner fields */}
                {data.partnerCustomFields?.map((f) => (
                  <span key={f.id} className="contents">
                    <span className="font-bold text-slate-600">{f.label}</span>
                    <span>: {f.value || "—"}</span>
                  </span>
                ))}
              </div>
            </section>

          </div>

          {/* Right Block: Photo frame aligned next to Personal details */}
          <div className="w-[190px] shrink-0 pt-6">
            <div className="w-full aspect-[3/4] p-1.5 border-2 border-[#d97706]/55 bg-[#fffdfa] shadow-md rounded-[1.5rem] relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0.5 border border-dashed border-[#d97706]/30 rounded-[1.3rem] pointer-events-none"></div>
              <div className="w-full h-full rounded-[1.3rem] overflow-hidden bg-amber-50/10">
                {typeof data.photo === 'string' ? (
                  <img src={data.photo} className="w-full h-full object-cover" alt="Profile" />
                ) : (
                  <div className={`w-full h-full flex flex-col items-center justify-center ${navyText}/40 text-xs text-center p-4`}>
                    <svg className="w-10 h-10 mb-2 opacity-40 text-[#0c2340]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span>Profile Photo</span>
                  </div>
                )}
              </div>
            </div>

            {/* Small Gold Diamond decorative motif below photo */}
            <div className="flex items-center justify-center mt-4">
              <div className="h-[1px] bg-[#d97706]/30 w-8"></div>
              <div className={`mx-2 text-[8px] ${navyText}`}>✦</div>
              <div className="h-[1px] bg-[#d97706]/30 w-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Top-Left Elegant Vector Leaves & Flower Overlay (local & high-performance)
function TopLeftFloral() {
  return (
    <svg className="absolute top-0 left-0 w-44 h-44 opacity-[0.85] pointer-events-none z-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 C20,8 35,25 38,45 C32,40 25,38 18,40 C10,42 5,55 0,65 Z" fill="#6d7a64" fillOpacity="0.22" />
      <path d="M0,0 C12,18 20,38 16,50 C12,42 6,35 0,32 Z" fill="#88997a" fillOpacity="0.25" />
      {/* Decorative floral circles resembling warm pastel roses */}
      <circle cx="16" cy="16" r="9" fill="#db7a76" fillOpacity="0.2" />
      <circle cx="27" cy="18" r="6" fill="#e89c99" fillOpacity="0.18" />
      <circle cx="12" cy="26" r="7.5" fill="#db7a76" fillOpacity="0.18" />
      <circle cx="8" cy="10" r="5" fill="#f2c4b6" fillOpacity="0.15" />
      {/* Fine gold lines */}
      <path d="M0,35 C10,35 25,28 32,0" stroke="#d97706" strokeWidth="0.4" strokeDasharray="1 1.5" opacity="0.35" />
      <path d="M0,45 C18,45 38,38 42,0" stroke="#d97706" strokeWidth="0.4" opacity="0.25" />
    </svg>
  );
}

// Bottom-Right elegant matching watercolor overlay (rotated 180deg)
function BottomRightFloral() {
  return (
    <svg className="absolute bottom-0 right-0 w-44 h-44 opacity-[0.85] pointer-events-none z-0 transform rotate-180" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 C20,8 35,25 38,45 C32,40 25,38 18,40 C10,42 5,55 0,65 Z" fill="#6d7a64" fillOpacity="0.22" />
      <path d="M0,0 C12,18 20,38 16,50 C12,42 6,35 0,32 Z" fill="#88997a" fillOpacity="0.25" />
      <circle cx="16" cy="16" r="9" fill="#db7a76" fillOpacity="0.2" />
      <circle cx="27" cy="18" r="6" fill="#e89c99" fillOpacity="0.18" />
      <circle cx="12" cy="26" r="7.5" fill="#db7a76" fillOpacity="0.18" />
      <circle cx="8" cy="10" r="5" fill="#f2c4b6" fillOpacity="0.15" />
      <path d="M0,35 C10,35 25,28 32,0" stroke="#d97706" strokeWidth="0.4" strokeDasharray="1 1.5" opacity="0.35" />
      <path d="M0,45 C18,45 38,38 42,0" stroke="#d97706" strokeWidth="0.4" opacity="0.25" />
    </svg>
  );
}
