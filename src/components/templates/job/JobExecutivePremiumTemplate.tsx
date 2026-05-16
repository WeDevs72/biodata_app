import { JobFormValues } from "@/lib/jobSchema";

export function JobExecutivePremiumTemplate({ data }: { data: Partial<JobFormValues> }) {
  // Helpers for extracting specific custom fields based on keywords
  const getFieldsByKeyword = (keywords: string[]) => {
    return data.customFields?.filter(f => 
      keywords.some(k => f.label.toLowerCase().includes(k))
    ) || [];
  };

  const statFields = getFieldsByKeyword(["metric", "stat", "p&l", "revenue", "budget", "team size", "scale"]);
  const highlightFields = getFieldsByKeyword(["highlight", "achievement", "key result", "award"]);
  const boardFields = getFieldsByKeyword(["board", "advisory", "director"]);
  
  // Find fields that didn't match the above categories
  const usedIds = new Set([
    ...statFields.map(f => f.id),
    ...highlightFields.map(f => f.id),
    ...boardFields.map(f => f.id)
  ]);
  const otherCustomFields = data.customFields?.filter(f => !usedIds.has(f.id)) || [];

  return (
    <div className="bg-[#FFFBF5] w-full min-h-[1056px] text-[#1E293B] font-sans leading-relaxed border-t-[3px] border-[#D97706] p-12 flex flex-col relative">
      
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif text-[#1E293B] uppercase tracking-[0.2em] mb-2 text-left">
          {data.fullName || "YOUR NAME"}
        </h1>
        <hr className="border-t border-[#D97706] w-full mb-4" />
        
        <p className="uppercase text-sm tracking-[0.3em] text-[#1E293B] text-center mb-4">
          {data.jobTitle || "EXECUTIVE TITLE"}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-xs text-[#1E293B] uppercase tracking-wider font-medium">
          {data.phone && <span>{data.phone}</span>}
          {data.phone && data.email && <span className="text-[#D97706] font-bold">|</span>}
          {data.email && <span>{data.email}</span>}
          {((data.phone || data.email) && data.location) && <span className="text-[#D97706] font-bold">|</span>}
          {data.location && <span>{data.location}</span>}
          {((data.phone || data.email || data.location) && data.linkedIn) && <span className="text-[#D97706] font-bold">|</span>}
          {data.linkedIn && <span>{data.linkedIn}</span>}
        </div>
      </div>

      <div className="flex-1 space-y-8">
        
        {/* EXECUTIVE SUMMARY */}
        {data.professionalSummary && (
          <section>
            <h2 className="uppercase tracking-[0.15em] text-sm font-bold text-[#1E293B] border-l-2 border-[#D97706] pl-3 mb-4">
              Executive Summary
            </h2>
            <p className="italic pl-4 text-sm text-[#1E293B]/80 leading-relaxed text-justify mb-4">
              {data.professionalSummary}
            </p>
            
            {/* Stat Boxes */}
            {statFields.length > 0 && (
              <div className="flex flex-wrap gap-4 pl-4 mt-4">
                {statFields.slice(0, 3).map(stat => (
                  <div key={stat.id} className="border border-[#D97706] p-3 min-w-[120px] text-center bg-white shadow-sm">
                    <div className="font-bold text-lg text-[#1E293B]">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-wider text-[#D97706] mt-1 font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* CORE COMPETENCIES */}
        {data.skills && (
          <section>
            <h2 className="uppercase tracking-[0.15em] text-sm font-bold text-[#1E293B] border-l-2 border-[#D97706] pl-3 mb-4">
              Core Competencies
            </h2>
            <div className="grid grid-cols-2 gap-y-2 pl-4 text-xs font-semibold uppercase tracking-wider text-[#1E293B]/90">
              {data.skills.split(',').map((s, i) => s.trim() ? (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[#D97706] text-lg leading-none">•</span>
                  {s.trim()}
                </div>
              ) : null)}
            </div>
          </section>
        )}

        {/* CAREER HIGHLIGHTS */}
        {highlightFields.length > 0 && (
          <section>
            <h2 className="uppercase tracking-[0.15em] text-sm font-bold text-[#1E293B] border-l-2 border-[#D97706] pl-3 mb-4">
              Career Highlights
            </h2>
            <div className="pl-4 space-y-4">
              {highlightFields.map(hl => (
                <div key={hl.id} className="border-l-[3px] border-[#D97706] pl-4 py-1">
                  <p className="font-bold text-sm text-[#1E293B]">{hl.label}</p>
                  <p className="text-sm text-[#1E293B]/80 mt-1">{hl.value}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROFESSIONAL EXPERIENCE */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h2 className="uppercase tracking-[0.15em] text-sm font-bold text-[#1E293B] border-l-2 border-[#D97706] pl-3 mb-5">
              Professional Experience
            </h2>
            <div className="space-y-6 pl-4">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline border-l-2 border-[#D97706] pl-3 mb-1">
                    <h3 className="font-bold text-base text-[#1E293B]">{exp.company || "Company"}</h3>
                    <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider">{exp.duration || "Duration"}</span>
                  </div>
                  <p className="italic text-sm text-[#1E293B]/70 pl-3 mb-2">{exp.role || "Role"}</p>
                  {exp.description && (
                    <div className="text-sm text-[#1E293B]/80 pl-3 space-y-1">
                      {exp.description.split('\n').map((line, i) => {
                        const trimmed = line.trim();
                        if (!trimmed) return null;
                        
                        // Highlight numbers or percentages in gold
                        const highlightedLine = trimmed.replace(/(\$|₹|€)?\d+(\.\d+)?([KkMmBbtT%]|\+)?/g, match => `<span class="text-[#D97706] font-bold">${match}</span>`);
                        
                        return (
                          <div key={i} className="flex gap-2 items-start">
                            <span className="text-[#D97706] font-bold mt-0.5">•</span>
                            <span dangerouslySetInnerHTML={{ __html: highlightedLine }}></span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION & CERTIFICATIONS */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="uppercase tracking-[0.15em] text-sm font-bold text-[#1E293B] border-l-2 border-[#D97706] pl-3 mb-4">
              Education & Certifications
            </h2>
            <div className="pl-4 space-y-2">
              {data.education.map(edu => (
                <div key={edu.id} className="text-sm">
                  <span className="font-bold text-[#1E293B]">{edu.degree || "Degree"}</span>
                  {edu.institute && <span className="text-[#1E293B]/80"> | {edu.institute}</span>}
                  {edu.year && <span className="text-[#D97706] font-bold"> | {edu.year}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BOARD ROLES / ADVISORY */}
        {boardFields.length > 0 && (
          <section>
            <h2 className="uppercase tracking-[0.15em] text-sm font-bold text-[#1E293B] border-l-2 border-[#D97706] pl-3 mb-4">
              Board Roles & Advisory
            </h2>
            <div className="pl-4 space-y-2 text-sm text-[#1E293B]/80">
              {boardFields.map(role => (
                <div key={role.id} className="flex gap-2 items-start">
                  <span className="text-[#D97706] font-bold mt-0.5">•</span>
                  <span><strong className="text-[#1E293B]">{role.label}:</strong> {role.value}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ADDITIONAL INFORMATION */}
        {otherCustomFields.length > 0 && (
          <section>
            <h2 className="uppercase tracking-[0.15em] text-sm font-bold text-[#1E293B] border-l-2 border-[#D97706] pl-3 mb-4">
              Additional Information
            </h2>
            <div className="pl-4 space-y-2 text-sm text-[#1E293B]/80">
              {otherCustomFields.map(field => (
                <div key={field.id} className="flex gap-2 items-start">
                  <span className="text-[#D97706] font-bold mt-0.5">•</span>
                  <span><strong className="text-[#1E293B]">{field.label}:</strong> {field.value}</span>
                </div>
              ))}
              {data.languages && (
                <div className="flex gap-2 items-start">
                  <span className="text-[#D97706] font-bold mt-0.5">•</span>
                  <span><strong className="text-[#1E293B]">Languages:</strong> {data.languages}</span>
                </div>
              )}
            </div>
          </section>
        )}
        
        {/* If no other custom fields but languages exist */}
        {otherCustomFields.length === 0 && data.languages && (
          <section>
            <h2 className="uppercase tracking-[0.15em] text-sm font-bold text-[#1E293B] border-l-2 border-[#D97706] pl-3 mb-4">
              Languages
            </h2>
            <div className="pl-4 text-sm text-[#1E293B]/80">
              {data.languages.split(',').map(l => l.trim()).join(", ")}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
