import { BiodataFormValues } from "@/lib/schema";

export function ClassicTemplate({ data }: { data: Partial<BiodataFormValues> }) {
  // Theme Color: Deep Red
  const theme = "text-red-900";
  const borderTheme = "border-red-900";

  return (
    <div className={`relative bg-white w-full h-full min-h-[1056px] text-slate-800 font-serif leading-relaxed px-10 py-12`}>
      {/* Outer borders with Corner accents */}
      <div className={`absolute inset-4 border border-red-900/40 pointer-events-none`}></div>
      <div className={`absolute inset-5 border-2 ${borderTheme} pointer-events-none`}>
        <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 ${borderTheme} bg-white`}></div>
        <div className={`absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 ${borderTheme} bg-white`}></div>
        <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 ${borderTheme} bg-white`}></div>
        <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 ${borderTheme} bg-white`}></div>
      </div>

      <div className="relative z-10 w-full mb-10 text-center">
        <div className={`text-5xl mb-2 font-light ${theme}`}>{data.religiousSymbol || "ॐ"}</div>
        <h1 className={`text-xl font-bold tracking-[0.3em] ${theme} ml-2 uppercase`}>Biodata</h1>
      </div>

      <div className="relative z-10 flex gap-8">
        {/* Left Side: Content */}
        <div className="flex-1 pr-4">

          <section className="mb-8">
            <h2 className={`text-base font-bold underline decoration-2 underline-offset-4 mb-5 ${theme}`}>Personal Details</h2>
            <div className="grid grid-cols-[140px_1fr] gap-y-3 text-sm">
              <span className="font-semibold text-slate-700">Name</span> <span><span className="mr-2">:</span> {data.fullName || "—"}</span>
              <span className="font-semibold text-slate-700">Date of Birth</span> <span><span className="mr-2">:</span> {data.dob || "—"}</span>
              <span className="font-semibold text-slate-700">Height</span> <span><span className="mr-2">:</span> {data.height || "—"}</span>
              <span className="font-semibold text-slate-700">Religion</span> <span><span className="mr-2">:</span> {data.religion || "—"}</span>
              <span className="font-semibold text-slate-700">Caste</span> <span><span className="mr-2">:</span> {data.caste || "—"}</span>
              <span className="font-semibold text-slate-700">Location</span> <span><span className="mr-2">:</span> {data.location || "—"}</span>
              {data.personalCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-slate-700">{f.label}</span>,
                <span key={`v-${f.id}`}><span><span className="mr-2">:</span> {f.value}</span></span>
              ])}
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-base font-bold underline decoration-2 underline-offset-4 mb-5 ${theme}`}>Professional Details</h2>
            <div className="grid grid-cols-[140px_1fr] gap-y-3 text-sm">
              <span className="font-semibold text-slate-700">Education</span> <span><span className="mr-2">:</span> {data.education || "—"}</span>
              <span className="font-semibold text-slate-700">Occupation</span> <span><span className="mr-2">:</span> {data.occupation || "—"}</span>
              <span className="font-semibold text-slate-700">Annual Income</span> <span><span className="mr-2">:</span> {data.income || "—"}</span>
              {data.professionalCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-slate-700">{f.label}</span>,
                <span key={`v-${f.id}`}><span><span className="mr-2">:</span> {f.value}</span></span>
              ])}
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-base font-bold underline decoration-2 underline-offset-4 mb-5 ${theme}`}>Family Details</h2>
            <div className="grid grid-cols-[140px_1fr] gap-y-3 text-sm">
              <span className="font-semibold text-slate-700">Father's Name</span> <span><span className="mr-2">:</span> {data.fatherName || "—"}</span>
              {data.fatherOccupation && (
                <>
                  <span className="font-semibold text-slate-700">Father's Occupation</span> <span><span className="mr-2">:</span> {data.fatherOccupation}</span>
                </>
              )}
              <span className="font-semibold text-slate-700">Mother's Name</span> <span><span className="mr-2">:</span> {data.motherName || "—"}</span>
              {data.motherOccupation && (
                <>
                  <span className="font-semibold text-slate-700">Mother's Occupation</span> <span><span className="mr-2">:</span> {data.motherOccupation}</span>
                </>
              )}
              <span className="font-semibold text-slate-700">Siblings</span> <span><span className="mr-2">:</span> {data.siblings || "—"}</span>
              {data.familyCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-slate-700">{f.label}</span>,
                <span key={`v-${f.id}`}><span><span className="mr-2">:</span> {f.value}</span></span>
              ])}
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-base font-bold underline decoration-2 underline-offset-4 mb-5 ${theme}`}>Partner Preferences</h2>
            <div className="grid grid-cols-[140px_1fr] gap-y-3 text-sm">
              <span className="font-semibold text-slate-700">Preferred Age</span> <span><span className="mr-2">:</span> {data.preferredAge || "—"}</span>
              <span className="font-semibold text-slate-700">Pref. Location</span> <span><span className="mr-2">:</span> {data.preferredLocation || "—"}</span>
              <span className="font-semibold text-slate-700">Education/Job</span> <span><span className="mr-2">:</span> {data.preferredEducation || "—"}</span>
              {data.partnerCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-slate-700">{f.label}</span>,
                <span key={`v-${f.id}`}><span><span className="mr-2">:</span> {f.value}</span></span>
              ])}
            </div>
          </section>

        </div>

        {/* Right Side: Photo */}
        <div className="w-[180px] shrink-0">
          <div className={`w-full aspect-[3/4] bg-red-50 border border-red-200 p-2 shadow-sm relative overflow-hidden flex items-center justify-center`}>
            {typeof data.photo === 'string' ? (
              <img src={data.photo} className="w-full h-full object-cover border border-red-300" alt="Profile" />
            ) : (
              <div className="w-full h-full bg-red-100/50 flex flex-col items-center justify-center text-red-900/40 text-xs text-center border border-dashed border-red-300">
                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                Photo
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
