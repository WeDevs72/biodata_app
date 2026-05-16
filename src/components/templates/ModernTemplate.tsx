import { BiodataFormValues } from "@/lib/schema";

export function ModernTemplate({ data }: { data: Partial<BiodataFormValues> }) {
  // Theme Color: Elegant Teal / Deep Green indicating modern calm traditional
  const theme = "text-teal-900";
  const borderTheme = "border-teal-800";
  const bgTheme = "bg-[#f2fdfa]"; // very light minty/teal tint

  return (
    <div className={`relative ${bgTheme} w-full h-full min-h-[1056px] text-slate-800 font-sans leading-relaxed px-10 py-12`}>
      {/* Outer borders with double elegant lines */}
      <div className={`absolute inset-4 border-2 ${borderTheme} pointer-events-none rounded-xl opacity-80`}></div>
      <div className={`absolute inset-5 border border-teal-600/30 pointer-events-none rounded-lg`}></div>

      {/* Modern Floral/Abstract subtle background accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="relative z-10 w-full mb-12 text-center">
        <div className={`text-4xl mb-2 font-serif ${theme}`}>{data.religiousSymbol || "ॐ"}</div>
        <h1 className={`text-2xl font-bold tracking-[0.25em] ${theme} ml-2 uppercase flex items-center justify-center gap-4`}>
          <span className="h-px bg-teal-800/30 w-16"></span>
          Biodata
          <span className="h-px bg-teal-800/30 w-16"></span>
        </h1>
      </div>

      <div className="relative z-10 flex gap-8">
        {/* Left Side: Content */}
        <div className="flex-1 pr-4">

          <section className="mb-8">
            <div className="flex items-center mb-5 gap-3">
              <h2 className={`text-lg font-bold ${theme} uppercase tracking-wider`}>Personal Details</h2>
              <div className="h-px bg-teal-200 flex-1 mt-1"></div>
            </div>

            <div className="grid grid-cols-[140px_1fr] gap-y-3.5 text-[15px]">
              <span className="font-semibold text-teal-900/70">Name</span> <span className="font-medium text-slate-800">{data.fullName || "—"}</span>
              <span className="font-semibold text-teal-900/70">Date of Birth</span> <span className="font-medium text-slate-800">{data.dob || "—"}</span>
              <span className="font-semibold text-teal-900/70">Height</span> <span className="font-medium text-slate-800">{data.height || "—"}</span>
              <span className="font-semibold text-teal-900/70">Religion</span> <span className="font-medium text-slate-800">{data.religion || "—"}</span>
              <span className="font-semibold text-teal-900/70">Caste</span> <span className="font-medium text-slate-800">{data.caste || "—"}</span>
              <span className="font-semibold text-teal-900/70">Location</span> <span className="font-medium text-slate-800">{data.location || "—"}</span>
              {data.personalCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-teal-900/70">{f.label}</span>,
                <span key={`v-${f.id}`} className="font-medium text-slate-800">{f.value}</span>
              ])}
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center mb-5 gap-3">
              <h2 className={`text-lg font-bold ${theme} uppercase tracking-wider`}>Professional Details</h2>
              <div className="h-px bg-teal-200 flex-1 mt-1"></div>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-y-3.5 text-[15px]">
              <span className="font-semibold text-teal-900/70">Education</span> <span className="font-medium text-slate-800">{data.education || "—"}</span>
              <span className="font-semibold text-teal-900/70">Occupation</span> <span className="font-medium text-slate-800">{data.occupation || "—"}</span>
              <span className="font-semibold text-teal-900/70">Annual Income</span> <span className="font-medium text-slate-800">{data.income || "—"}</span>
              {data.professionalCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-teal-900/70">{f.label}</span>,
                <span key={`v-${f.id}`} className="font-medium text-slate-800">{f.value}</span>
              ])}
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center mb-5 gap-3">
              <h2 className={`text-lg font-bold ${theme} uppercase tracking-wider`}>Family Details</h2>
              <div className="h-px bg-teal-200 flex-1 mt-1"></div>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-y-3.5 text-[15px]">
              <span className="font-semibold text-teal-900/70">Father's Name</span> <span className="font-medium text-slate-800">{data.fatherName || "—"}</span>
              <span className="font-semibold text-teal-900/70">Mother's Name</span> <span className="font-medium text-slate-800">{data.motherName || "—"}</span>
              <span className="font-semibold text-teal-900/70">Siblings</span> <span className="font-medium text-slate-800">{data.siblings || "—"}</span>
              {data.familyCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-teal-900/70">{f.label}</span>,
                <span key={`v-${f.id}`} className="font-medium text-slate-800">{f.value}</span>
              ])}
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center mb-5 gap-3">
              <h2 className={`text-lg font-bold ${theme} uppercase tracking-wider`}>Preferences</h2>
              <div className="h-px bg-teal-200 flex-1 mt-1"></div>
            </div>
            <div className="grid grid-cols-[140px_1fr] gap-y-3.5 text-[15px]">
              <span className="font-semibold text-teal-900/70">Preferred Age</span> <span className="font-medium text-slate-800">{data.preferredAge || "—"}</span>
              <span className="font-semibold text-teal-900/70">Location</span> <span className="font-medium text-slate-800">{data.preferredLocation || "—"}</span>
              <span className="font-semibold text-teal-900/70">Education/Job</span> <span className="font-medium text-slate-800">{data.preferredEducation || "—"}</span>
              {data.partnerCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-teal-900/70">{f.label}</span>,
                <span key={`v-${f.id}`} className="font-medium text-slate-800">{f.value}</span>
              ])}
            </div>
          </section>

        </div>

        {/* Right Side: Photo */}
        <div className="w-[180px] shrink-0 mt-2">
          <div className={`w-full aspect-[3/4] bg-white rounded-xl shadow-md border border-teal-100 p-1.5 relative overflow-hidden flex items-center justify-center`}>
            {typeof data.photo === 'string' ? (
              <img src={data.photo} className="w-full h-full object-cover rounded-lg" alt="Profile" />
            ) : (
              <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center text-teal-600/50 rounded-lg text-xs font-medium text-center border border-dashed border-teal-200">
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Insert Photo
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
