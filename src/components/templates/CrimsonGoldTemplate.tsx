import { BiodataFormValues } from "@/lib/schema";

export function CrimsonGoldTemplate({ data }: { data: Partial<BiodataFormValues> }) {
  // Theme Colors
  const crimsonText = "text-[#991b1b]";
  const crimsonBorder = "border-[#991b1b]";
  const goldText = "text-[#d97706]";
  const goldBorder = "border-[#d97706]";

  const headline = [data.occupation, data.location].filter(Boolean).join(" • ");

  return (
    <div className="relative bg-[#fffdf9] w-full h-full min-h-[1122px] text-slate-800 font-serif leading-relaxed px-10 py-12 border-[12px] border-double border-[#991b1b]/20">
      {/* Inner thin gold border */}
      <div className="absolute inset-2 border border-[#d97706]/35 pointer-events-none"></div>

      {/* ── Header Section ────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full mb-8 text-center flex flex-col items-center">
        {/* Religious Icon / Symbol placeholder */}
        <div className={`text-4xl font-normal ${goldText} mb-2 w-12 h-12 flex items-center justify-center border border-[#d97706]/30 rounded-full bg-amber-50/50`}>
          {data.religiousSymbol || "ॐ"}
        </div>
        
        {/* Main Name */}
        <h1 className={`text-3xl font-extrabold tracking-wider ${crimsonText} uppercase`}>
          {data.fullName || "Full Name"}
        </h1>

        {/* Occupation & Location Headline */}
        {headline && (
          <p className={`text-xs tracking-widest uppercase font-sans font-semibold mt-1 ${goldText}`}>
            {headline}
          </p>
        )}

        {/* Section separation line */}
        <div className="flex items-center justify-center w-36 mt-4">
          <div className="h-[1px] bg-[#d97706]/40 flex-1"></div>
          <div className={`mx-2 text-[8px] ${crimsonText}`}>◆</div>
          <div className="h-[1px] bg-[#d97706]/40 flex-1"></div>
        </div>
      </div>

      {/* ── Main 2-Column Grid ────────────────────────────────────────────── */}
      <div className="relative z-10 flex gap-8">
        
        {/* ── Left Column: Profile Picture & Vital Personal Metrics ─────────── */}
        <div className="w-[230px] shrink-0 flex flex-col items-center border-r border-[#d97706]/20 pr-6">
          
          {/* Profile Photo with Stylized Gold Frame */}
          <div className={`w-full aspect-[3/4] p-1 border border-[#d97706]/50 bg-white shadow-md rounded-t-[3rem] overflow-hidden flex items-center justify-center mb-6`}>
            <div className="w-full h-full rounded-t-[3rem] overflow-hidden bg-amber-50/20">
              {typeof data.photo === 'string' ? (
                <img src={data.photo} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <div className={`w-full h-full flex flex-col items-center justify-center ${crimsonText}/40 text-xs text-center p-4`}>
                  <svg className="w-8 h-8 mb-1 opacity-55 text-[#991b1b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span>Profile Photo</span>
                </div>
              )}
            </div>
          </div>

          {/* Personal Metrics Section */}
          <div className="w-full">
            <h3 className={`text-sm font-bold uppercase tracking-wider ${crimsonText} border-b border-[#d97706]/30 pb-1.5 mb-4 text-center`}>
              Personal Profile
            </h3>
            
            <div className="flex flex-col gap-3 text-xs">
              <div>
                <span className="font-semibold text-slate-500 block uppercase tracking-wider text-[10px]">Date of Birth</span>
                <span className="text-slate-800 font-medium text-sm">{data.dob || "—"}</span>
              </div>
              
              <div>
                <span className="font-semibold text-slate-500 block uppercase tracking-wider text-[10px]">Height</span>
                <span className="text-slate-800 font-medium text-sm">{data.height || "—"}</span>
              </div>
              
              <div>
                <span className="font-semibold text-slate-500 block uppercase tracking-wider text-[10px]">Religion</span>
                <span className="text-slate-800 font-medium text-sm">{data.religion || "—"}</span>
              </div>

              {data.caste && (
                <div>
                  <span className="font-semibold text-slate-500 block uppercase tracking-wider text-[10px]">Caste / Gotra</span>
                  <span className="text-slate-800 font-medium text-sm">{data.caste}</span>
                </div>
              )}

              <div>
                <span className="font-semibold text-slate-500 block uppercase tracking-wider text-[10px]">Current Location</span>
                <span className="text-slate-800 font-medium text-sm">{data.location || "—"}</span>
              </div>

              {/* Custom Personal Fields */}
              {data.personalCustomFields?.map((f) => (
                <div key={f.id}>
                  <span className="font-semibold text-slate-500 block uppercase tracking-wider text-[10px]">{f.label}</span>
                  <span className="text-slate-800 font-medium text-sm">{f.value || "—"}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Right Column: Career, Family & Preferences ───────────────────── */}
        <div className="flex-1">

          {/* 1. Education & Career Section */}
          <section className="mb-2">
            <h3 className={`text-base font-extrabold uppercase tracking-wide ${crimsonText} flex items-center gap-2 mb-4`}>
              <span className={`w-1.5 h-3 bg-[#d97706]`}></span>
              Education & Career
            </h3>
            
            <div className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-3 text-sm">
              <span className="font-bold text-slate-700">Education</span>
              <span>: {data.education || "—"}</span>

              <span className="font-bold text-slate-700">Occupation</span>
              <span>: {data.occupation || "—"}</span>

              {data.income && (
                <>
                  <span className="font-bold text-slate-700">Annual Income</span>
                  <span>: {data.income}</span>
                </>
              )}

              {/* Custom Professional Fields */}
              {data.professionalCustomFields?.map((f) => (
                <span key={f.id} className="contents">
                  <span className="font-bold text-slate-700">{f.label}</span>
                  <span>: {f.value || "—"}</span>
                </span>
              ))}
            </div>
          </section>

          {/* Beautiful Gold-accent separation line */}
          <SectionDivider />

          {/* 2. Family Details Section */}
          <section className="mb-2">
            <h3 className={`text-base font-extrabold uppercase tracking-wide ${crimsonText} flex items-center gap-2 mb-4`}>
              <span className={`w-1.5 h-3 bg-[#d97706]`}></span>
              Family Background
            </h3>
            
            <div className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-3 text-sm">
              <span className="font-bold text-slate-700">Father's Name</span>
              <span>: {data.fatherName || "—"}</span>

              <span className="font-bold text-slate-700">Mother's Name</span>
              <span>: {data.motherName || "—"}</span>

              {data.siblings && (
                <>
                  <span className="font-bold text-slate-700">Siblings</span>
                  <span>: {data.siblings}</span>
                </>
              )}

              {/* Custom Family Fields */}
              {data.familyCustomFields?.map((f) => (
                <span key={f.id} className="contents">
                  <span className="font-bold text-slate-700">{f.label}</span>
                  <span>: {f.value || "—"}</span>
                </span>
              ))}
            </div>
          </section>

          {/* Beautiful Gold-accent separation line */}
          <SectionDivider />

          {/* 3. Partner Preferences Section */}
          <section className="mb-2">
            <h3 className={`text-base font-extrabold uppercase tracking-wide ${crimsonText} flex items-center gap-2 mb-4`}>
              <span className={`w-1.5 h-3 bg-[#d97706]`}></span>
              Partner Preferences
            </h3>
            
            <div className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-3 text-sm">
              <span className="font-bold text-slate-700">Age Bracket</span>
              <span>: {data.preferredAge || "—"}</span>

              <span className="font-bold text-slate-700">Preferred Location</span>
              <span>: {data.preferredLocation || "—"}</span>

              <span className="font-bold text-slate-700">Education & Status</span>
              <span>: {data.preferredEducation || "—"}</span>

              {/* Custom Partner Fields */}
              {data.partnerCustomFields?.map((f) => (
                <span key={f.id} className="contents">
                  <span className="font-bold text-slate-700">{f.label}</span>
                  <span>: {f.value || "—"}</span>
                </span>
              ))}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}

// Helper divider component with gold-crimson elegant accents
function SectionDivider() {
  return (
    <div className="flex items-center justify-center my-6">
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d97706]/40 to-transparent flex-1"></div>
      <div className="mx-3 text-[#d97706] text-[10px] transform rotate-45 border border-[#d97706]/35 p-[2px] w-2.5 h-2.5 flex items-center justify-center bg-[#fffdf9]">
        <div className="w-[4px] h-[4px] bg-[#991b1b]"></div>
      </div>
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d97706]/40 to-transparent flex-1"></div>
    </div>
  );
}
