import { JobFormValues } from "@/lib/jobSchema";

export function JobClassicProfessionalTemplate({ data }: { data: Partial<JobFormValues> }) {
  return (
    <div className="bg-white w-full min-h-[1056px] text-slate-800 font-sans leading-relaxed p-12 flex flex-col">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#1E293B] uppercase tracking-wide">
          {data.fullName || "Your Name"}
        </h1>
        {data.jobTitle && (
          <p className="text-lg text-slate-500 mt-1">{data.jobTitle}</p>
        )}
        
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mt-3 text-sm text-slate-600">
          {data.phone && (
            <span className="flex items-center gap-1">
              <span>📞</span> {data.phone}
            </span>
          )}
          {data.phone && data.email && <span className="text-slate-300">|</span>}
          {data.email && (
            <span className="flex items-center gap-1">
              <span>✉️</span> {data.email}
            </span>
          )}
          {((data.phone || data.email) && data.location) && <span className="text-slate-300">|</span>}
          {data.location && (
            <span className="flex items-center gap-1">
              <span>📍</span> {data.location}
            </span>
          )}
          {((data.phone || data.email || data.location) && data.linkedIn) && <span className="text-slate-300">|</span>}
          {data.linkedIn && (
            <span className="flex items-center gap-1">
              <span>🔗</span> {data.linkedIn}
            </span>
          )}
        </div>
      </div>

      <hr className="border-t border-slate-200 mb-6" />

      {/* Professional Summary */}
      {data.professionalSummary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-b border-[#F97316] pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            {data.professionalSummary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-b border-[#F97316] pb-1 mb-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <span className="font-bold text-[#1E293B]">{exp.company || "Company Name"}</span>
                    {exp.role && (
                      <span className="italic text-slate-700 ml-1">
                        - {exp.role}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-slate-600 shrink-0 ml-4">
                    {exp.duration || "Duration"}
                  </div>
                </div>
                {exp.description && (
                  <div className="text-sm text-slate-700 mt-1 space-y-1">
                    {exp.description.split('\n').map((line, i) => (
                      line.trim() ? <p key={i}>• {line.trim()}</p> : null
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-b border-[#F97316] pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-[#1E293B]">{edu.degree || "Degree"}</span>
                  {edu.institute && (
                    <span className="text-slate-700">
                      , {edu.institute}
                    </span>
                  )}
                </div>
                <div className="text-sm text-slate-600 shrink-0 ml-4">
                  {edu.year || "Year"}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-b border-[#F97316] pb-1 mb-3">
            Skills
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            {data.skills.split(',').map(s => s.trim()).filter(Boolean).join(", ")}
          </p>
        </section>
      )}

      {/* Certifications / Custom Fields */}
      {data.customFields && data.customFields.length > 0 && (
        <>
          {data.customFields.map((field) => (
            <section key={field.id} className="mb-6">
              <h2 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-b border-[#F97316] pb-1 mb-3">
                {field.label}
              </h2>
              <div className="text-sm text-slate-700 leading-relaxed space-y-1">
                 {field.value.split('\n').map((line, i) => (
                    line.trim() ? <p key={i}>• {line.trim()}</p> : null
                  ))}
              </div>
            </section>
          ))}
        </>
      )}

      {/* Languages */}
      {data.languages && (
        <section className="mb-6">
          <h2 className="text-sm font-bold text-[#1E293B] uppercase tracking-widest border-b border-[#F97316] pb-1 mb-3">
            Languages
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            {data.languages.split(',').map(l => l.trim()).filter(Boolean).join(", ")}
          </p>
        </section>
      )}
    </div>
  );
}
