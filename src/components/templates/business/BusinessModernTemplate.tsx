import { BusinessFormValues } from "@/lib/businessSchema";

export function BusinessModernTemplate({ data }: { data: Partial<BusinessFormValues> }) {
  return (
    <div className="bg-white w-full min-h-[1056px] font-sans leading-relaxed flex">
      {/* Dark Teal Sidebar */}
      <div className="w-[230px] shrink-0 bg-gradient-to-b from-teal-800 to-teal-900 text-white flex flex-col px-6 py-10">
        {/* Photo / Logo */}
        <div className="flex justify-center mb-5">
          <div className="w-28 h-28 rounded-2xl border-4 border-teal-400/50 overflow-hidden bg-teal-700/50 flex items-center justify-center shadow-lg">
            {typeof data.photo === "string" && data.photo ? (
              <img src={data.photo} alt="Business" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-14 h-14 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            )}
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-lg font-extrabold text-white leading-tight">{data.businessName || "Business Name"}</h1>
          {data.tagline && <p className="text-teal-300 text-xs italic mt-1">"{data.tagline}"</p>}
          <p className="text-teal-200 text-xs mt-2">by {data.ownerName || "—"}</p>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-teal-300 mb-3 border-b border-teal-700 pb-1">Contact</h2>
          <div className="space-y-2.5 text-xs text-teal-100">
            {data.phone && <div className="flex items-center gap-2"><span className="text-teal-400">📞</span>{data.phone}</div>}
            {data.email && <div className="flex items-start gap-2"><span className="text-teal-400">✉</span><span className="break-all">{data.email}</span></div>}
            {data.location && <div className="flex items-start gap-2"><span className="text-teal-400">📍</span>{data.location}</div>}
            {data.website && <div className="flex items-start gap-2"><span className="text-teal-400">🌐</span><span className="break-all">{data.website}</span></div>}
          </div>
        </div>

        {/* Business Quick Facts */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-teal-300 mb-3 border-b border-teal-700 pb-1">Quick Facts</h2>
          <div className="space-y-2 text-xs">
            {data.industry && <div><p className="text-teal-400 font-semibold">Industry</p><p className="text-teal-100">{data.industry}</p></div>}
            {data.established && <div><p className="text-teal-400 font-semibold">Since</p><p className="text-teal-100">{data.established}</p></div>}
            {data.employees && <div><p className="text-teal-400 font-semibold">Team Size</p><p className="text-teal-100">{data.employees}</p></div>}
            {data.annualTurnover && <div><p className="text-teal-400 font-semibold">Turnover</p><p className="text-teal-100">{data.annualTurnover}</p></div>}
            {data.gstNumber && <div><p className="text-teal-400 font-semibold">GST</p><p className="text-teal-100">{data.gstNumber}</p></div>}
          </div>
        </div>

        {/* Custom Fields */}
        {data.customFields && data.customFields.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-300 mb-3 border-b border-teal-700 pb-1">More</h2>
            <div className="space-y-2 text-xs">
              {data.customFields.map((f) => (
                <div key={f.id}>
                  <p className="text-teal-400 font-semibold">{f.label}</p>
                  <p className="text-teal-100">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 py-10">
        {/* Offerings */}
        {data.offerings && data.offerings.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-teal-700 rounded-full" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Products & Services</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {data.offerings.map((o) => (
                <div key={o.id} className="bg-teal-50 border border-teal-100 rounded-xl p-4">
                  <p className="text-sm font-bold text-teal-800">{o.name}</p>
                  {o.description && <p className="text-xs text-slate-600 mt-1">{o.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {data.achievements && data.achievements.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-gradient-to-b from-teal-500 to-teal-700 rounded-full" />
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Milestones & Achievements</h2>
            </div>
            <div className="space-y-3">
              {data.achievements.map((a, idx) => (
                <div key={a.id} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow">
                    {idx + 1}
                  </div>
                  <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg px-4 py-2.5">
                    <p className="text-sm text-slate-700 leading-relaxed">{a.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tagline banner (if no offerings/achievements) */}
        {(!data.offerings || data.offerings.length === 0) && (!data.achievements || data.achievements.length === 0) && (
          <div className="flex flex-col items-center justify-center h-64 text-slate-300">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm">Add services and achievements to see them here</p>
          </div>
        )}
      </div>
    </div>
  );
}
