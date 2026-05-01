import { JobFormValues } from "@/lib/jobSchema";

export function JobProfessionalTemplate({ data }: { data: Partial<JobFormValues> }) {
  return (
    <div className="bg-white w-full min-h-[1056px] text-slate-800 font-sans leading-relaxed flex">
      {/* Left Sidebar */}
      <div className="w-[240px] shrink-0 bg-slate-800 text-white flex flex-col px-6 py-10">
        {/* Photo */}
        <div className="mb-6 flex justify-center">
          <div className="w-28 h-28 rounded-full border-4 border-indigo-400 overflow-hidden bg-slate-700 flex items-center justify-center">
            {typeof data.photo === "string" && data.photo ? (
              <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-14 h-14 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>
        </div>

        {/* Name & Title */}
        <div className="text-center mb-8">
          <h1 className="text-lg font-bold text-white leading-tight">{data.fullName || "Your Name"}</h1>
          <p className="text-indigo-300 text-sm font-medium mt-1">{data.jobTitle || "Job Title"}</p>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-3 border-b border-slate-600 pb-1">Contact</h2>
          <div className="space-y-2 text-xs text-slate-300">
            {data.phone && <div className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">📞</span><span>{data.phone}</span></div>}
            {data.email && <div className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">✉️</span><span className="break-all">{data.email}</span></div>}
            {data.location && <div className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">📍</span><span>{data.location}</span></div>}
            {data.linkedIn && <div className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">🔗</span><span className="break-all">{data.linkedIn}</span></div>}
            {data.portfolio && <div className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">🌐</span><span className="break-all">{data.portfolio}</span></div>}
          </div>
        </div>

        {/* Skills */}
        {data.skills && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-3 border-b border-slate-600 pb-1">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.split(",").map((skill, i) => (
                <span key={i} className="bg-indigo-700/60 text-indigo-200 text-xs px-2 py-0.5 rounded-full">{skill.trim()}</span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-3 border-b border-slate-600 pb-1">Languages</h2>
            <div className="space-y-1">
              {data.languages.split(",").map((lang, i) => (
                <p key={i} className="text-xs text-slate-300">• {lang.trim()}</p>
              ))}
            </div>
          </div>
        )}

        {/* Custom Fields */}
        {data.customFields && data.customFields.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-3 border-b border-slate-600 pb-1">Other</h2>
            <div className="space-y-2">
              {data.customFields.map((f) => (
                <div key={f.id}>
                  <p className="text-xs font-semibold text-indigo-300">{f.label}</p>
                  <p className="text-xs text-slate-300">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 px-8 py-10">
        {/* Professional Summary */}
        {data.professionalSummary && (
          <section className="mb-8">
            <h2 className="text-base font-bold text-slate-800 uppercase tracking-widest mb-2 pb-1 border-b-2 border-indigo-500">Professional Summary</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{data.professionalSummary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-base font-bold text-slate-800 uppercase tracking-widest mb-4 pb-1 border-b-2 border-indigo-500">Work Experience</h2>
            <div className="space-y-5">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-indigo-200">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-indigo-500"></div>
                  <div className="flex justify-between items-start flex-wrap gap-1">
                    <h3 className="text-sm font-bold text-slate-800">{exp.role || "—"}</h3>
                    <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">{exp.duration || ""}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-600">{exp.company || "—"}</p>
                  {exp.description && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-base font-bold text-slate-800 uppercase tracking-widest mb-4 pb-1 border-b-2 border-indigo-500">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="relative pl-4 border-l-2 border-indigo-200">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-indigo-500"></div>
                  <div className="flex justify-between items-start flex-wrap gap-1">
                    <h3 className="text-sm font-bold text-slate-800">{edu.degree || "—"}</h3>
                    {edu.year && <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">{edu.year}</span>}
                  </div>
                  <p className="text-sm text-slate-600">{edu.institute || "—"}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
