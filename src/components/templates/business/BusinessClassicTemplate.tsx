import { BusinessFormValues } from "@/lib/businessSchema";

export function BusinessClassicTemplate({ data }: { data: Partial<BusinessFormValues> }) {
  const gold = "text-amber-700";
  const goldBorder = "border-amber-600";

  return (
    <div className="bg-white w-full min-h-[1056px] font-serif leading-relaxed px-10 py-12 relative">
      {/* Decorative border */}
      <div className="absolute inset-4 border border-amber-300/60 pointer-events-none" />
      <div className={`absolute inset-5 border-2 ${goldBorder} pointer-events-none`}>
        <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 ${goldBorder} bg-white`} />
        <div className={`absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 ${goldBorder} bg-white`} />
        <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 ${goldBorder} bg-white`} />
        <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 ${goldBorder} bg-white`} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b-2 border-amber-200">
          {/* Logo / Photo */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full border-4 border-amber-400 overflow-hidden bg-amber-50 flex items-center justify-center shadow-md">
              {typeof data.photo === "string" && data.photo ? (
                <img src={data.photo} alt="Business" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )}
            </div>
          </div>
          <h1 className={`text-3xl font-bold ${gold} tracking-wide`}>{data.businessName || "Business Name"}</h1>
          {data.tagline && <p className="text-slate-500 italic text-sm mt-1">"{data.tagline}"</p>}
          <p className="text-sm text-slate-600 mt-2">Proprietor: {data.ownerName || "—"}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Left column */}
          <div>
            <h2 className={`text-sm font-bold uppercase tracking-widest ${gold} mb-3 underline underline-offset-4 decoration-amber-400`}>Business Information</h2>
            <div className="grid grid-cols-[130px_1fr] gap-y-2 text-sm">
              <span className="font-semibold text-slate-700">Industry</span><span>: {data.industry || "—"}</span>
              <span className="font-semibold text-slate-700">Established</span><span>: {data.established || "—"}</span>
              <span className="font-semibold text-slate-700">Employees</span><span>: {data.employees || "—"}</span>
              <span className="font-semibold text-slate-700">Annual Turnover</span><span>: {data.annualTurnover || "—"}</span>
              {data.gstNumber && <><span className="font-semibold text-slate-700">GST No.</span><span>: {data.gstNumber}</span></>}
            </div>
          </div>

          {/* Right column */}
          <div>
            <h2 className={`text-sm font-bold uppercase tracking-widest ${gold} mb-3 underline underline-offset-4 decoration-amber-400`}>Contact Details</h2>
            <div className="grid grid-cols-[100px_1fr] gap-y-2 text-sm">
              <span className="font-semibold text-slate-700">Phone</span><span>: {data.phone || "—"}</span>
              <span className="font-semibold text-slate-700">Email</span><span>: {data.email || "—"}</span>
              <span className="font-semibold text-slate-700">Location</span><span>: {data.location || "—"}</span>
              {data.website && <><span className="font-semibold text-slate-700">Website</span><span>: {data.website}</span></>}
            </div>
          </div>
        </div>

        {/* Products / Services */}
        {data.offerings && data.offerings.length > 0 && (
          <div className="mb-8">
            <h2 className={`text-sm font-bold uppercase tracking-widest ${gold} mb-4 underline underline-offset-4 decoration-amber-400`}>Products & Services</h2>
            <div className="grid grid-cols-2 gap-3">
              {data.offerings.map((o) => (
                <div key={o.id} className="border border-amber-200 bg-amber-50/50 rounded p-3">
                  <p className="text-sm font-bold text-amber-800">{o.name}</p>
                  {o.description && <p className="text-xs text-slate-600 mt-0.5">{o.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {data.achievements && data.achievements.length > 0 && (
          <div className="mb-8">
            <h2 className={`text-sm font-bold uppercase tracking-widest ${gold} mb-4 underline underline-offset-4 decoration-amber-400`}>Milestones & Achievements</h2>
            <ul className="space-y-2">
              {data.achievements.map((a) => (
                <li key={a.id} className="flex items-start gap-2 text-sm">
                  <span className="text-amber-500 font-bold mt-0.5">★</span>
                  <span className="text-slate-700">{a.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Custom Fields */}
        {data.customFields && data.customFields.length > 0 && (
          <div>
            <h2 className={`text-sm font-bold uppercase tracking-widest ${gold} mb-3 underline underline-offset-4 decoration-amber-400`}>Additional Information</h2>
            <div className="grid grid-cols-[160px_1fr] gap-y-2 text-sm">
              {data.customFields.map((f) => (
                <>
                  <span key={`l-${f.id}`} className="font-semibold text-slate-700">{f.label}</span>
                  <span key={`v-${f.id}`}>: {f.value}</span>
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
