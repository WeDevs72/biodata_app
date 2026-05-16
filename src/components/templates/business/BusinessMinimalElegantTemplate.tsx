import { BusinessFormValues } from "@/lib/businessSchema";

export function BusinessMinimalElegantTemplate({ data }: { data: Partial<BusinessFormValues> }) {
  // Aggregate facts up to 4 items
  const facts: { label: string; value: string }[] = [];
  if (data.established) facts.push({ label: "Since", value: data.established });
  if (data.employees) facts.push({ label: "Team Size", value: data.employees });
  if (data.annualTurnover) facts.push({ label: "Turnover", value: data.annualTurnover });
  if (data.industry) facts.push({ label: "Industry", value: data.industry });
  
  // Fill the rest with custom fields if available
  const usedCustomFieldIds = new Set<string>();
  if (data.customFields) {
    for (const field of data.customFields) {
      if (facts.length < 4) {
        // Skip testimonial fields for facts
        if (!field.label.toLowerCase().includes('testimonial') && !field.label.toLowerCase().includes('quote')) {
          facts.push({ label: field.label, value: field.value });
          usedCustomFieldIds.add(field.id);
        }
      }
    }
  }

  // Look for testimonial in custom fields
  const testimonialField = data.customFields?.find(f => 
    f.label.toLowerCase().includes('testimonial') || 
    f.label.toLowerCase().includes('review') || 
    f.label.toLowerCase().includes('quote')
  );
  if (testimonialField) usedCustomFieldIds.add(testimonialField.id);

  // Look for whatsapp in custom fields
  const whatsappField = data.customFields?.find(f => 
    f.label.toLowerCase().includes('whatsapp')
  );

  // Unused custom fields for a generic section
  const otherCustomFields = data.customFields?.filter(f => !usedCustomFieldIds.has(f.id)) || [];

  return (
    <div className="bg-[#FAFAF8] w-full min-h-[1056px] text-[#1C1917] font-sans flex flex-col relative">
      
      {/* HEADER SECTION */}
      <div className="bg-white border-t-[3px] border-[#D97706] pt-12 pb-6 px-12 text-center shadow-sm relative z-10">
        <h1 className="font-serif text-4xl text-[#1C1917] tracking-[0.15em] uppercase mb-2">
          {data.businessName || "BUSINESS NAME"}
        </h1>
        {data.tagline && (
          <p className="italic text-[#D97706] text-sm tracking-wide mb-6">
            {data.tagline}
          </p>
        )}
        
        <div className="border-t border-[#D97706]/30 w-1/2 mx-auto mb-4"></div>
        
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-[#1C1917]/80 uppercase tracking-widest font-medium">
          {data.phone && <span>{data.phone}</span>}
          {data.phone && data.email && <span className="text-[#D97706] font-bold">|</span>}
          {data.email && <span>{data.email}</span>}
          {((data.phone || data.email) && data.location) && <span className="text-[#D97706] font-bold">|</span>}
          {data.location && <span>{data.location}</span>}
          {((data.phone || data.email || data.location) && data.website) && <span className="text-[#D97706] font-bold">|</span>}
          {data.website && <span>{data.website}</span>}
        </div>
      </div>

      <div className="flex-1 flex flex-col pt-8">
        {/* ABOUT SECTION */}
        <div className="px-12 mb-10 max-w-[85%] mx-auto text-center">
          <p className="text-[10px] uppercase text-[#D97706] tracking-[0.2em] font-bold mb-2">About Us</p>
          <h2 className="font-serif text-2xl text-[#1C1917] mb-4">Who We Are</h2>
          <p className="text-justify text-[#1C1917]/80 text-sm leading-relaxed">
            {data.ownerName && <span className="font-bold">Founded by {data.ownerName}, </span>}
            {data.businessName || "We"} is a premier provider in the {data.industry || "industry"} sector. We are dedicated to delivering excellence and unparalleled value to our clients through our specialized services and meticulous attention to detail.
          </p>
        </div>

        {/* KEY FACTS STRIP */}
        {facts.length > 0 && (
          <div className="bg-[#FEF3C7] w-full py-8 px-12 mb-10">
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-center">
              {facts.map((fact, i) => (
                <div key={i} className="min-w-[120px]">
                  <div className="text-2xl font-bold text-[#1C1917] mb-1">{fact.value}</div>
                  <div className="text-[10px] uppercase text-[#D97706] tracking-widest font-semibold">{fact.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="px-12 space-y-10 mb-10 flex-1">
          {/* SERVICES SECTION */}
          {data.offerings && data.offerings.length > 0 && (
            <section>
              <p className="text-[10px] uppercase text-[#D97706] tracking-[0.2em] font-bold mb-4 text-center">Our Services</p>
              <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                {data.offerings.map(offering => (
                  <div key={offering.id} className="border-b border-[#D97706]/20 pb-3">
                    <div className="flex items-start gap-2 mb-1">
                      <span className="text-[#D97706] text-xs mt-1">▪</span>
                      <h3 className="font-bold text-[#1C1917] text-sm uppercase tracking-wide">{offering.name}</h3>
                    </div>
                    {offering.description && (
                      <p className="italic text-xs text-[#1C1917]/70 pl-4 leading-relaxed">
                        {offering.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ACHIEVEMENTS / MILESTONES */}
          {data.achievements && data.achievements.length > 0 && (
            <section>
              <p className="text-[10px] uppercase text-[#D97706] tracking-[0.2em] font-bold mb-6 text-center">Milestones</p>
              <div className="max-w-2xl mx-auto border-l-2 border-[#D97706]/30 ml-4">
                {data.achievements.map((ach, i) => {
                  // Attempt to extract a year like 2020, 2023, etc. from the text to highlight it
                  const yearMatch = ach.text.match(/\b(19|20)\d{2}\b/);
                  const year = yearMatch ? yearMatch[0] : null;
                  const text = year ? ach.text.replace(year, '') : ach.text;

                  return (
                    <div key={ach.id} className="relative pl-6 pb-6 last:pb-0">
                      <span className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-[#D97706]"></span>
                      <p className="text-sm text-[#1C1917]">
                        {year && <span className="text-[#D97706] font-bold mr-2">{year}</span>}
                        {text.replace(/^[-:,.\s]+/, '')}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* OTHER CUSTOM FIELDS */}
          {otherCustomFields.length > 0 && (
            <section>
               <p className="text-[10px] uppercase text-[#D97706] tracking-[0.2em] font-bold mb-4 text-center">Additional Details</p>
               <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                {otherCustomFields.map(field => (
                  <div key={field.id} className="border-b border-[#D97706]/20 pb-2 flex justify-between items-end">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#1C1917]/70">{field.label}</span>
                    <span className="text-sm font-medium text-[#1C1917]">{field.value}</span>
                  </div>
                ))}
               </div>
            </section>
          )}

          {/* TESTIMONIAL */}
          {testimonialField && (
            <div className="bg-[#F5F5F4] p-8 rounded-sm relative mt-4">
              <span className="absolute top-4 left-4 text-6xl text-[#D97706]/20 font-serif leading-none">"</span>
              <p className="italic text-sm text-[#1C1917]/80 text-center relative z-10 px-6">
                {testimonialField.value}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="bg-[#1C1917] text-white py-8 px-12 text-center mt-auto">
        <h3 className="font-serif text-2xl mb-4 text-white/90">Let's Work Together</h3>
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs uppercase tracking-widest text-white/70">
          {data.phone && <span className="hover:text-white transition-colors">📞 {data.phone}</span>}
          {whatsappField && <span className="hover:text-white transition-colors">💬 {whatsappField.value}</span>}
          {data.email && <span className="hover:text-white transition-colors">✉️ {data.email}</span>}
          {data.website && <span className="hover:text-white transition-colors">🌐 {data.website}</span>}
        </div>
      </div>
    </div>
  );
}
