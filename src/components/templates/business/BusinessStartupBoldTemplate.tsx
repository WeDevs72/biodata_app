import { BusinessFormValues } from "@/lib/businessSchema";

export function BusinessStartupBoldTemplate({ data }: { data: Partial<BusinessFormValues> }) {
  // Aggregate facts up to 4 items
  const facts: { label: string; value: string }[] = [];
  if (data.annualTurnover) facts.push({ label: "Revenue", value: data.annualTurnover });
  if (data.established) facts.push({ label: "Since", value: data.established });
  if (data.employees) facts.push({ label: "Team Size", value: data.employees });
  
  // Custom fields handling
  const usedCustomFieldIds = new Set<string>();
  
  // Fill facts with remaining custom fields
  if (data.customFields) {
    for (const field of data.customFields) {
      if (facts.length < 4) {
        if (!field.label.toLowerCase().includes('founder') && !field.label.toLowerCase().includes('bio') && !field.label.toLowerCase().includes('whatsapp')) {
          facts.push({ label: field.label, value: field.value });
          usedCustomFieldIds.add(field.id);
        }
      }
    }
  }

  // Look for founder bio in custom fields
  const bioField = data.customFields?.find(f => 
    f.label.toLowerCase().includes('founder') || 
    f.label.toLowerCase().includes('bio')
  );
  if (bioField) usedCustomFieldIds.add(bioField.id);

  // Look for whatsapp in custom fields
  const whatsappField = data.customFields?.find(f => 
    f.label.toLowerCase().includes('whatsapp')
  );
  if (whatsappField) usedCustomFieldIds.add(whatsappField.id);

  // Unused custom fields for a generic section
  const otherCustomFields = data.customFields?.filter(f => !usedCustomFieldIds.has(f.id)) || [];

  return (
    <div className="bg-white w-full min-h-[1056px] text-slate-900 font-sans flex flex-col relative pb-0">
      
      {/* HEADER SECTION - Dark #0F172A */}
      <div className="bg-[#0F172A] border-l-[6px] border-[#F97316] p-10 flex justify-between items-start relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#F97316] opacity-[0.05] rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex-1 pr-6 z-10">
          {data.industry && (
            <div className="inline-block px-3 py-1 bg-[#F97316] text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-4">
              {data.industry}
            </div>
          )}
          
          <h1 className="font-extrabold text-5xl text-white tracking-tight leading-none mb-3 font-sans">
            {data.businessName || "STARTUP CO."}
          </h1>
          
          {data.tagline && (
            <p className="text-[#F97316] font-bold text-lg tracking-wide mb-6">
              {data.tagline}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/80 font-medium">
            {data.phone && <span className="flex items-center gap-1.5"><span className="text-[#F97316]">📞</span> {data.phone}</span>}
            {data.email && <span className="flex items-center gap-1.5"><span className="text-[#F97316]">✉️</span> {data.email}</span>}
            {data.location && <span className="flex items-center gap-1.5"><span className="text-[#F97316]">📍</span> {data.location}</span>}
            {data.website && <span className="flex items-center gap-1.5"><span className="text-[#F97316]">🌐</span> {data.website}</span>}
          </div>
        </div>

        {/* Logo Placeholder */}
        <div className="w-24 h-24 rounded-2xl border-2 border-[#F97316] overflow-hidden bg-slate-800 flex items-center justify-center shrink-0 z-10 shadow-lg shadow-[#F97316]/10">
          {typeof data.photo === "string" && data.photo ? (
             <img src={data.photo} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            <span className="text-[#F97316] text-sm font-bold">LOGO</span>
          )}
        </div>
      </div>

      {/* STATS SECTION - White */}
      {facts.length > 0 && (
        <div className="bg-white px-10 py-8 relative -mt-4 mx-8 shadow-xl shadow-slate-200/50 rounded-xl border border-slate-100 z-20">
          <div className="grid grid-cols-4 gap-4 text-center divide-x divide-slate-100">
            {facts.map((fact, i) => (
              <div key={i} className="px-2">
                <div className="text-3xl font-black text-[#F97316] tracking-tight">{fact.value}</div>
                <div className="text-xs font-bold uppercase text-slate-500 mt-1">{fact.label}</div>
                <div className="w-8 h-1 bg-[#F97316] mx-auto mt-3 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SERVICES SECTION - Dark #0F172A */}
      {data.offerings && data.offerings.length > 0 && (
        <div className="bg-[#0F172A] px-10 py-10">
          <h2 className="font-extrabold text-2xl text-white tracking-tight mb-8">What We Do</h2>
          <div className="grid grid-cols-2 gap-6">
            {data.offerings.map(offering => (
              <div key={offering.id} className="bg-slate-800/50 border-l-[3px] border-[#F97316] p-5 rounded-r-lg">
                <h3 className="font-bold text-white text-base mb-2">{offering.name}</h3>
                {offering.description && (
                  <p className="text-slate-400 text-xs leading-relaxed font-medium">
                    {offering.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACHIEVEMENTS SECTION - White */}
      {data.achievements && data.achievements.length > 0 && (
        <div className="bg-white px-10 py-10">
          <h2 className="font-extrabold text-2xl text-slate-900 tracking-tight mb-8">Our Journey</h2>
          <div className="border-l-[3px] border-slate-200 ml-2 space-y-6">
            {data.achievements.map((ach) => {
              const yearMatch = ach.text.match(/\b(19|20)\d{2}\b/);
              const year = yearMatch ? yearMatch[0] : null;
              const text = year ? ach.text.replace(year, '') : ach.text;

              return (
                <div key={ach.id} className="relative pl-6">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-[3px] border-[#F97316]"></span>
                  {year && <div className="text-[#F97316] font-black text-lg leading-none mb-1 tracking-tight">{year}</div>}
                  <div className="text-slate-800 font-bold text-sm leading-snug">
                    {text.replace(/^[-:,.\s]+/, '')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TEAM / FOUNDER (Optional Dark) */}
      {(data.ownerName || bioField) && (
        <div className="bg-slate-50 px-10 py-8 border-y border-slate-100 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border-2 border-slate-200 overflow-hidden">
             {/* If we had a founder photo, we'd show it. Otherwise use initials */}
             <span className="text-white font-bold text-xl">{data.ownerName?.charAt(0) || "F"}</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">{data.ownerName || "Founder"}</h3>
            <p className="text-[#F97316] text-xs font-bold uppercase tracking-wider mb-2">Founder</p>
            {bioField && <p className="text-slate-600 text-sm font-medium leading-snug">{bioField.value}</p>}
          </div>
        </div>
      )}

      {/* ADDITIONAL CUSTOM FIELDS */}
      {otherCustomFields.length > 0 && (
        <div className="bg-white px-10 py-8 flex-1">
          <h2 className="font-extrabold text-xl text-slate-900 tracking-tight mb-6">Additional Details</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {otherCustomFields.map(field => (
              <div key={field.id} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="text-[10px] font-bold uppercase text-slate-400 mb-1 tracking-wider">{field.label}</div>
                <div className="font-bold text-slate-800 text-sm">{field.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Spacer to push footer to bottom if content is short */}
      {otherCustomFields.length === 0 && <div className="flex-1 bg-white"></div>}

      {/* CONTACT CTA - Orange #F97316 */}
      <div className="bg-[#F97316] w-full p-10 text-center mt-auto">
        <h2 className="font-black text-3xl text-white tracking-tight mb-6">Ready to Work Together?</h2>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-white font-bold text-sm">
          {data.phone && <span className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-lg">📞 {data.phone}</span>}
          {whatsappField && <span className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-lg">💬 {whatsappField.value}</span>}
          {data.email && <span className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-lg">✉️ {data.email}</span>}
        </div>
        {data.website && (
          <div className="mt-6">
            <a href={`https://${data.website.replace(/^https?:\/\//, '')}`} className="text-white font-bold tracking-wider underline decoration-2 underline-offset-4 hover:text-white/80 transition-colors">
              {data.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
      </div>

    </div>
  );
}
