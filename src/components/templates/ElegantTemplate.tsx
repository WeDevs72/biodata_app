import { BiodataFormValues } from "@/lib/schema";

export function ElegantTemplate({ data }: { data: Partial<BiodataFormValues> }) {
  // Theme Color: Elegant Emerald & Silver
  const theme = "text-emerald-900";
  const borderTheme = "border-emerald-800/60";
  const bgTheme = "bg-slate-50";

  return (
    <div className={`relative ${bgTheme} w-full h-full min-h-[1122px] text-slate-800 font-sans leading-relaxed px-12 py-10`}>
      {/* Intricate top and bottom borders */}
      <div className={`absolute top-0 left-0 w-full h-4 bg-emerald-800`}></div>
      <div className={`absolute bottom-0 left-0 w-full h-4 bg-emerald-800`}></div>

      <div className="relative z-10 w-full mb-10 text-center flex flex-col items-center pt-4">
        <div className={`text-5xl mb-3 font-serif ${theme}`}>{data.religiousSymbol || "ॐ"}</div>
        <h1 className={`text-3xl font-extrabold tracking-[0.2em] ${theme} uppercase`}>Biodata</h1>
        <div className={`w-32 h-px mt-6 bg-emerald-900/40`}></div>
      </div>

      <div className="relative z-10 flex gap-8">
        <div className="w-[200px] shrink-0 mt-2">
          <div className={`w-full aspect-[3/4] bg-white border border-emerald-900/20 shadow-md p-2 relative flex items-center justify-center`}>
            {typeof data.photo === 'string' ? (
              <img src={data.photo} className="w-full h-full object-cover" alt="Profile" />
            ) : (
              <div className="w-full h-full bg-emerald-900/5 flex items-center justify-center text-emerald-900/40 text-xs">Photo</div>
            )}
          </div>
        </div>

        <div className="flex-1 pl-4">
          <section className="mb-8">
            <h2 className={`text-sm font-bold uppercase tracking-widest ${theme} bg-emerald-100/50 py-1 px-3 mb-4 rounded-sm border-l-4 ${borderTheme}`}>Personal Details</h2>
            <div className="grid grid-cols-[150px_1fr] gap-y-3 px-3 text-[15px]">
              <span className="font-semibold text-emerald-900/80">Name</span> <span>{data.fullName || "—"}</span>
              <span className="font-semibold text-emerald-900/80">Date of Birth</span> <span>{data.dob || "—"}</span>
              <span className="font-semibold text-emerald-900/80">Height</span> <span>{data.height || "—"}</span>
              <span className="font-semibold text-emerald-900/80">Religion & Caste</span> <span>{data.religion || "—"} {data.caste ? `, ${data.caste}` : ""}</span>
              <span className="font-semibold text-emerald-900/80">Location</span> <span>{data.location || "—"}</span>
              {data.personalCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-emerald-900/80">{f.label}</span>,
                <span key={`v-${f.id}`}>{f.value}</span>
              ])}
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-sm font-bold uppercase tracking-widest ${theme} bg-emerald-100/50 py-1 px-3 mb-4 rounded-sm border-l-4 ${borderTheme}`}>Professional Details</h2>
            <div className="grid grid-cols-[150px_1fr] gap-y-3 px-3 text-[15px]">
              <span className="font-semibold text-emerald-900/80">Education</span> <span>{data.education || "—"}</span>
              <span className="font-semibold text-emerald-900/80">Occupation</span> <span>{data.occupation || "—"}</span>
              <span className="font-semibold text-emerald-900/80">Annual Income</span> <span>{data.income || "—"}</span>
              {data.professionalCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-emerald-900/80">{f.label}</span>,
                <span key={`v-${f.id}`}>{f.value}</span>
              ])}
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-sm font-bold uppercase tracking-widest ${theme} bg-emerald-100/50 py-1 px-3 mb-4 rounded-sm border-l-4 ${borderTheme}`}>Family Details</h2>
            <div className="grid grid-cols-[150px_1fr] gap-y-3 px-3 text-[15px]">
              <span className="font-semibold text-emerald-900/80">Father's Name</span> <span>{data.fatherName || "—"}</span>
              {data.fatherOccupation && (
                <>
                  <span className="font-semibold text-emerald-900/80">Father's Occupation</span> <span>{data.fatherOccupation}</span>
                </>
              )}
              <span className="font-semibold text-emerald-900/80">Mother's Name</span> <span>{data.motherName || "—"}</span>
              {data.motherOccupation && (
                <>
                  <span className="font-semibold text-emerald-900/80">Mother's Occupation</span> <span>{data.motherOccupation}</span>
                </>
              )}
              <span className="font-semibold text-emerald-900/80">Siblings</span> <span>{data.siblings || "—"}</span>
              {data.familyCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-emerald-900/80">{f.label}</span>,
                <span key={`v-${f.id}`}>{f.value}</span>
              ])}
            </div>
          </section>

          <section className="mb-8">
            <h2 className={`text-sm font-bold uppercase tracking-widest ${theme} bg-emerald-100/50 py-1 px-3 mb-4 rounded-sm border-l-4 ${borderTheme}`}>Partner Preferences</h2>
            <div className="grid grid-cols-[150px_1fr] gap-y-3 px-3 text-[15px]">
              <span className="font-semibold text-emerald-900/80">Preferred Age</span> <span>{data.preferredAge || "—"}</span>
              <span className="font-semibold text-emerald-900/80">Location</span> <span>{data.preferredLocation || "—"}</span>
              <span className="font-semibold text-emerald-900/80">Education/Job</span> <span>{data.preferredEducation || "—"}</span>
              {data.partnerCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-emerald-900/80">{f.label}</span>,
                <span key={`v-${f.id}`}>{f.value}</span>
              ])}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
