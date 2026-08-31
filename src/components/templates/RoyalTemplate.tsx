import { BiodataFormValues } from "@/lib/schema";

export function RoyalTemplate({ data }: { data: Partial<BiodataFormValues> }) {
  // Theme Color: Deep Royal Purple & Gold
  const theme = "text-fuchsia-950";
  const bgTheme = "bg-[#fffafa]";

  return (
    <div className={`relative ${bgTheme} w-full h-full min-h-[1122px] text-slate-800 font-serif px-12 py-12 border-[12px] border-double border-fuchsia-900/30`}>
      <div className="absolute inset-2 border border-fuchsia-900/20"></div>

      <div className="relative z-10 w-full mb-12 text-center">
        <div className="flex justify-center items-center gap-6 mb-4">
          <div className="h-px bg-fuchsia-900/30 w-16"></div>
          <div className={`text-5xl font-medium ${theme}`}>{data.religiousSymbol || "ॐ"}</div>
          <div className="h-px bg-fuchsia-900/30 w-16"></div>
        </div>
        <h1 className={`text-2xl font-black tracking-[0.5em] ${theme} uppercase mt-4`}>Biodata</h1>
      </div>

      <div className="relative z-10 flex gap-8">
        <div className="flex-1 pr-6 border-r border-fuchsia-900/10">
          <section className="mb-10 text-center">
            <h2 className={`text-lg italic ${theme} mb-6 border-b border-fuchsia-900/10 pb-2 inline-block px-8`}>Personal Profile</h2>
            <div className="grid grid-cols-2 gap-y-4 text-[15px] text-left">
              <span className="font-semibold text-fuchsia-950/70">Name :</span> <span>{data.fullName || "—"}</span>
              <span className="font-semibold text-fuchsia-950/70">Birth Date :</span> <span>{data.dob || "—"}</span>
              <span className="font-semibold text-fuchsia-950/70">Height :</span> <span>{data.height || "—"}</span>
              <span className="font-semibold text-fuchsia-950/70">Faith/Caste :</span> <span>{data.religion || "—"} {data.caste ? `(${data.caste})` : ""}</span>
              <span className="font-semibold text-fuchsia-950/70">Resident Of :</span> <span>{data.location || "—"}</span>
              {data.personalCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-fuchsia-950/70">{f.label} :</span>,
                <span key={`v-${f.id}`}>{f.value}</span>
              ])}
            </div>
          </section>

          <section className="mb-10 text-center">
            <h2 className={`text-lg italic ${theme} mb-6 border-b border-fuchsia-900/10 pb-2 inline-block px-8`}>Education & Career</h2>
            <div className="grid grid-cols-2 gap-y-4 text-[15px] text-left">
              <span className="font-semibold text-fuchsia-950/70">Qualifications :</span> <span>{data.education || "—"}</span>
              <span className="font-semibold text-fuchsia-950/70">Profession :</span> <span>{data.occupation || "—"}</span>
              <span className="font-semibold text-fuchsia-950/70">Annual Salary :</span> <span>{data.income || "—"}</span>
              {data.professionalCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-fuchsia-950/70">{f.label} :</span>,
                <span key={`v-${f.id}`}>{f.value}</span>
              ])}
            </div>
          </section>

          <section className="mb-10 text-center">
            <h2 className={`text-lg italic ${theme} mb-6 border-b border-fuchsia-900/10 pb-2 inline-block px-8`}>Family & Preferences</h2>
            <div className="grid grid-cols-2 gap-y-4 text-[15px] text-left">
              <span className="font-semibold text-fuchsia-950/70">Father :</span> <span>{data.fatherName || "—"}</span>
              {data.fatherOccupation && [
                <span key="father-occ-lbl" className="font-semibold text-fuchsia-950/70">Father's Occupation :</span>,
                <span key="father-occ-val">{data.fatherOccupation}</span>
              ]}
              <span className="font-semibold text-fuchsia-950/70">Mother :</span> <span>{data.motherName || "—"}</span>
              {data.motherOccupation && [
                <span key="mother-occ-lbl" className="font-semibold text-fuchsia-950/70">Mother's Occupation :</span>,
                <span key="mother-occ-val">{data.motherOccupation}</span>
              ]}
              <span className="font-semibold text-fuchsia-950/70">Siblings :</span> <span>{data.siblings || "—"}</span>
              {data.familyCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-fuchsia-950/70">{f.label} :</span>,
                <span key={`v-${f.id}`}>{f.value}</span>
              ])}

              <span className="font-semibold text-fuchsia-950/70 mt-4">Partner Age :</span> <span className="mt-4">{data.preferredAge || "—"}</span>
              <span className="font-semibold text-fuchsia-950/70">Pref. Location :</span> <span>{data.preferredLocation || "—"}</span>
              <span className="font-semibold text-fuchsia-950/70">Expectation :</span> <span>{data.preferredEducation || "—"}</span>
              {data.partnerCustomFields?.map(f => [
                <span key={`l-${f.id}`} className="font-semibold text-fuchsia-950/70">{f.label} :</span>,
                <span key={`v-${f.id}`}>{f.value}</span>
              ])}
            </div>
          </section>

        </div>

        <div className="w-[180px] shrink-0 pt-10">
          <div className={`w-full aspect-[3/4] p-1 border-2 border-fuchsia-900 bg-transparent rounded-t-full shadow-lg overflow-hidden flex items-center justify-center`}>
            <div className="w-full h-full rounded-t-full overflow-hidden bg-fuchsia-50">
              {typeof data.photo === 'string' ? (
                <img src={data.photo} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-fuchsia-900/40 text-xs">Photo</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
