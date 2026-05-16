import { BusinessFormValues } from "@/lib/businessSchema";

export function BusinessRoyalIndianTemplate({ data }: { data: Partial<BusinessFormValues> }) {
  // Aggregate facts
  const facts: { label: string; value: string }[] = [];
  if (data.industry) facts.push({ label: "Industry", value: data.industry });
  if (data.established) facts.push({ label: "Since", value: data.established });
  if (data.employees) facts.push({ label: "Team Size", value: data.employees });
  if (data.annualTurnover) facts.push({ label: "Turnover", value: data.annualTurnover });
  
  // Custom fields handling
  const usedCustomFieldIds = new Set<string>();
  
  // Fill facts with remaining custom fields if less than 4
  if (data.customFields) {
    for (const field of data.customFields) {
      if (facts.length < 4) {
        if (!field.label.toLowerCase().includes('whatsapp') && !field.label.toLowerCase().includes('iso') && !field.label.toLowerCase().includes('msme')) {
          facts.push({ label: field.label, value: field.value });
          usedCustomFieldIds.add(field.id);
        }
      }
    }
  }

  // Look for whatsapp
  const whatsappField = data.customFields?.find(f => 
    f.label.toLowerCase().includes('whatsapp')
  );
  if (whatsappField) usedCustomFieldIds.add(whatsappField.id);

  // Trust badges
  const trustBadges: string[] = [];
  if (data.gstNumber) trustBadges.push(`GST Registered`);
  if (data.customFields) {
    for (const field of data.customFields) {
      if (field.label.toLowerCase().includes('iso') || field.label.toLowerCase().includes('msme') || field.value.toLowerCase().includes('certified') || field.value.toLowerCase().includes('registered')) {
         trustBadges.push(field.value);
         usedCustomFieldIds.add(field.id);
      }
    }
  }

  // Years of trust calculation
  const currentYear = new Date().getFullYear();
  const estYear = data.established ? parseInt(data.established.replace(/[^0-9]/g, '')) : null;
  const yearsOfTrust = estYear ? (currentYear - estYear) : null;

  // Diamond pattern SVG as data URI
  const diamondPattern = `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2L22 12L12 22L2 12L12 2Z' fill='%23D97706' fill-opacity='0.4'/%3E%3Cpath d='M12 5L19 12L12 19L5 12L12 5Z' fill='%23F97316' fill-opacity='1'/%3E%3C/svg%3E")`;

  return (
    <div className="bg-white w-full min-h-[1056px] text-slate-900 font-sans flex flex-col relative pb-0">
      
      {/* HEADER SECTION - Saffron with pattern */}
      <div 
        className="pt-10 pb-6 px-10 text-center relative border-b-4 border-[#9B1C1C]"
        style={{ backgroundColor: '#F97316', backgroundImage: diamondPattern }}
      >
        <div className="bg-[#F97316]/90 absolute inset-0 mix-blend-multiply"></div>
        <div className="relative z-10">
          <h1 className="font-serif font-black text-4xl text-white tracking-wide uppercase mb-2" style={{ textShadow: '2px 2px 0px #9B1C1C' }}>
            {data.businessName || "SHRI ROYAL ENTERPRISES"}
          </h1>
          {data.tagline && (
             <p className="text-[#FEF3C7] italic font-serif text-lg mb-4 drop-shadow-md">
               "{data.tagline}"
             </p>
          )}
          {data.established && (
            <div className="inline-block px-4 py-1 border border-[#FEF3C7] text-[#FEF3C7] text-xs font-bold uppercase tracking-widest rounded-full shadow-sm bg-[#F97316]/50 backdrop-blur-sm">
              Est. {data.established}
            </div>
          )}
        </div>
      </div>

      {/* OWNER INFO ROW */}
      <div className="bg-white py-6 flex flex-col items-center border-b border-slate-200 shadow-sm relative z-20 -mt-2 rounded-t-xl mx-4">
        {/* Logo Placeholder */}
        <div className="w-20 h-20 rounded-full border-[3px] border-[#D97706] overflow-hidden bg-white flex items-center justify-center -mt-12 mb-3 shadow-md">
          {typeof data.photo === "string" && data.photo ? (
             <img src={data.photo} alt="Logo" className="w-full h-full object-cover" />
          ) : (
            <span className="text-[#9B1C1C] text-xs font-bold font-serif">LOGO</span>
          )}
        </div>
        <h2 className="font-bold text-lg text-slate-800">
          Proprietor: <span className="text-[#9B1C1C]">{data.ownerName || "Owner Name"}</span>
        </h2>
      </div>

      {/* CONTACT STRIP */}
      <div className="bg-[#F97316] w-full py-2.5 px-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-1 text-white text-[11px] font-medium tracking-wide">
        {data.phone && <span className="flex items-center gap-1.5"><span className="text-[#FEF3C7]">📞</span> {data.phone}</span>}
        {whatsappField && <span className="flex items-center gap-1.5"><span className="text-[#FEF3C7]">💬</span> {whatsappField.value}</span>}
        {data.email && <span className="flex items-center gap-1.5"><span className="text-[#FEF3C7]">✉️</span> {data.email}</span>}
        {data.location && <span className="flex items-center gap-1.5"><span className="text-[#FEF3C7]">📍</span> {data.location}</span>}
        {data.website && <span className="flex items-center gap-1.5"><span className="text-[#FEF3C7]">🌐</span> {data.website.replace(/^https?:\/\//, '')}</span>}
      </div>

      <div className="px-10 flex-1 space-y-8 mt-8 mb-8">
        
        {/* ABOUT BUSINESS */}
        {yearsOfTrust && yearsOfTrust > 0 && (
          <div className="text-center">
             <div className="inline-block bg-[#F97316] text-white px-5 py-1.5 rounded-full text-xs font-bold shadow-sm border border-[#D97706]">
               Serving since {estYear} — {yearsOfTrust} Years of Trust
             </div>
          </div>
        )}

        {/* QUICK FACTS STRIP */}
        {facts.length > 0 && (
          <div className="bg-[#FEF3C7] rounded-lg border border-[#D97706]/30 py-5 px-6 shadow-inner mx-auto max-w-3xl">
            <div className="flex flex-wrap justify-center divide-x-2 divide-[#D97706]/40 text-center">
              {facts.map((fact, i) => (
                <div key={i} className="px-6 flex-1 min-w-[100px]">
                  <div className="text-xl font-bold text-[#9B1C1C] mb-0.5">{fact.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#D97706]">{fact.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTS & SERVICES */}
        {data.offerings && data.offerings.length > 0 && (
          <div className="mx-auto max-w-3xl">
            <h3 className="font-serif font-bold text-2xl text-[#9B1C1C] uppercase tracking-wide text-center">Our Products & Services</h3>
            <div className="w-10 h-0.5 bg-[#D97706] mx-auto mt-1 mb-5"></div>
            
            <div className="overflow-hidden rounded-md border border-[#D97706]/50 shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#D97706] text-white">
                  <tr>
                    <th className="px-4 py-2 font-bold w-1/3 border-r border-white/20">Product / Service</th>
                    <th className="px-4 py-2 font-bold w-2/3">Description</th>
                  </tr>
                </thead>
                <tbody className="text-slate-800">
                  {data.offerings.map((offering, idx) => (
                    <tr key={offering.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FFF7ED]'}>
                      <td className="px-4 py-2.5 border-r border-[#D97706]/20 font-bold text-[#9B1C1C]">{offering.name}</td>
                      <td className="px-4 py-2.5 font-medium">{offering.description || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ACHIEVEMENTS / MILESTONES */}
        {data.achievements && data.achievements.length > 0 && (
          <div className="mx-auto max-w-3xl">
            <h3 className="font-serif font-bold text-2xl text-[#9B1C1C] uppercase tracking-wide text-center">Our Achievements</h3>
            <div className="w-10 h-0.5 bg-[#D97706] mx-auto mt-1 mb-6"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.achievements.map((ach, i) => (
                <div key={ach.id} className="flex gap-3 items-start bg-slate-50 p-3 rounded border border-slate-100">
                   <div className="w-6 h-6 shrink-0 rounded-full bg-[#F97316] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                     {i + 1}
                   </div>
                   <div className="pt-0.5">
                     <p className="font-bold text-[#9B1C1C] text-sm leading-tight">{ach.text}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TRUST BADGES */}
        {trustBadges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {trustBadges.map((badge, i) => (
              <span key={i} className="px-3 py-1 border border-[#9B1C1C] text-[#9B1C1C] text-xs font-bold uppercase rounded-full bg-white shadow-sm">
                ✓ {badge}
              </span>
            ))}
          </div>
        )}

      </div>

      {/* FOOTER CTA */}
      <div 
        className="mt-auto border-t-4 border-[#F97316] flex flex-col"
      >
        <div className="bg-[#7F1D1D] w-full pt-8 pb-6 px-10 text-center relative z-10">
          <h2 className="font-serif font-bold text-2xl text-white tracking-widest uppercase mb-4">Visit Us / Contact Us</h2>
          
          <div className="text-white/90 text-sm font-medium space-y-2 mb-6">
            {data.location && <p className="text-base font-bold text-[#FEF3C7]">📍 {data.location}</p>}
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-3">
              {data.phone && <span>📞 {data.phone}</span>}
              {whatsappField && <span>💬 {whatsappField.value}</span>}
              {data.email && <span>✉️ {data.email}</span>}
            </div>
            {data.website && (
              <div className="mt-2 text-[#FEF3C7] underline decoration-[#FEF3C7]/50 underline-offset-4">
                🌐 {data.website.replace(/^https?:\/\//, '')}
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom Ornamental Border */}
        <div 
          className="h-6 w-full"
          style={{ backgroundColor: '#F97316', backgroundImage: diamondPattern }}
        >
          <div className="w-full h-full bg-[#F97316]/90 mix-blend-multiply"></div>
        </div>
      </div>

    </div>
  );
}
