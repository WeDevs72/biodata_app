import { BiodataFormValues } from "@/lib/schema";

export function MinimalTemplate({ data }: { data: Partial<BiodataFormValues> }) {
  // Theme Color: Elegant Gold/Brown
  const theme = "text-amber-900";
  const borderTheme = "border-amber-700";
  const bgTheme = "bg-[#fffdf8]"; // pale warm cream

  return (
    <div className={`relative ${bgTheme} w-full h-full min-h-[1056px] text-slate-800 font-serif leading-relaxed px-12 py-14`}>
      {/* Outer elegant single line border */}
      <div className={`absolute inset-6 border ${borderTheme} pointer-events-none opacity-50`}></div>

      {/* Corner decorative dots */}
      <div className={`absolute top-5 left-5 w-2 h-2 rounded-full bg-amber-700`}></div>
      <div className={`absolute top-5 right-5 w-2 h-2 rounded-full bg-amber-700`}></div>
      <div className={`absolute bottom-5 left-5 w-2 h-2 rounded-full bg-amber-700`}></div>
      <div className={`absolute bottom-5 right-5 w-2 h-2 rounded-full bg-amber-700`}></div>

      <div className="relative z-10 w-full mb-14 text-center flex flex-col items-center">
        <div className={`text-4xl mb-3 font-medium ${theme} opacity-80`}>{data.religiousSymbol || "ॐ"}</div>
        <h1 className={`text-2xl font-bold tracking-[0.4em] ${theme} uppercase`}>Biodata</h1>
        <div className={`w-16 h-0.5 mt-4 bg-amber-700 border-none`}></div>
      </div>

      <div className="relative z-10 flex gap-10">
        {/* Left Side: Content */}
        <div className="flex-1 pr-2">

          <section className="mb-10">
            <h2 className={`text-[15px] font-bold uppercase tracking-widest ${theme} mb-6`}>Personal Details</h2>
            <div className="grid grid-cols-[150px_1fr] gap-y-4 text-[15px]">
              <span className="font-semibold text-amber-900/80">Name</span> <span>{data.fullName || "—"}</span>
              <span className="font-semibold text-amber-900/80">Date of Birth</span> <span>{data.dob || "—"}</span>
              <span className="font-semibold text-amber-900/80">Height</span> <span>{data.height || "—"}</span>
              <span className="font-semibold text-amber-900/80">Religion</span> <span>{data.religion || "—"}</span>
              <span className="font-semibold text-amber-900/80">Caste</span> <span>{data.caste || "—"}</span>
              <span className="font-semibold text-amber-900/80">Location</span> <span>{data.location || "—"}</span>
              {data.personalCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-amber-900/80">{f.label}</span>,
                <span key={`v-${f.id}`}>{f.value}</span>
              ])}
            </div>
          </section>

          <section className="mb-10">
            <h2 className={`text-[15px] font-bold uppercase tracking-widest ${theme} mb-6`}>Professional Details</h2>
            <div className="grid grid-cols-[150px_1fr] gap-y-4 text-[15px]">
              <span className="font-semibold text-amber-900/80">Education</span> <span>{data.education || "—"}</span>
              <span className="font-semibold text-amber-900/80">Occupation</span> <span>{data.occupation || "—"}</span>
              <span className="font-semibold text-amber-900/80">Annual Income</span> <span>{data.income || "—"}</span>
              {data.professionalCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-amber-900/80">{f.label}</span>,
                <span key={`v-${f.id}`}>{f.value}</span>
              ])}
            </div>
          </section>

          <section className="mb-10">
            <h2 className={`text-[15px] font-bold uppercase tracking-widest ${theme} mb-6`}>Family Details</h2>
            <div className="grid grid-cols-[150px_1fr] gap-y-4 text-[15px]">
              <span className="font-semibold text-amber-900/80">Father's Name</span> <span>{data.fatherName || "—"}</span>
              <span className="font-semibold text-amber-900/80">Mother's Name</span> <span>{data.motherName || "—"}</span>
              <span className="font-semibold text-amber-900/80">Siblings</span> <span>{data.siblings || "—"}</span>
              {data.familyCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-amber-900/80">{f.label}</span>,
                <span key={`v-${f.id}`}>{f.value}</span>
              ])}
            </div>
          </section>

          <section className="mb-10">
            <h2 className={`text-[15px] font-bold uppercase tracking-widest ${theme} mb-6`}>Partner Preferences</h2>
            <div className="grid grid-cols-[150px_1fr] gap-y-4 text-[15px]">
              <span className="font-semibold text-amber-900/80">Preferred Age</span> <span>{data.preferredAge || "—"}</span>
              <span className="font-semibold text-amber-900/80">Location</span> <span>{data.preferredLocation || "—"}</span>
              <span className="font-semibold text-amber-900/80">Education/Job</span> <span>{data.preferredEducation || "—"}</span>
              {data.partnerCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-amber-900/80">{f.label}</span>,
                <span key={`v-${f.id}`}>{f.value}</span>
              ])}
            </div>
          </section>

        </div>

        {/* Right Side: Photo */}
        <div className="w-[190px] shrink-0 mt-4">
          <div className={`w-full aspect-[3/4] bg-transparent border-2 border-amber-900/20 p-2 relative flex items-center justify-center`}>
            {typeof data.photo === 'string' ? (
              <img src={data.photo} className="w-full h-full object-cover" alt="Profile" />
            ) : (
              <div className="w-full h-full bg-amber-900/5 flex flex-col items-center justify-center text-amber-900/40 text-xs font-serif uppercase tracking-widest text-center border border-amber-900/10">
                Photo
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
