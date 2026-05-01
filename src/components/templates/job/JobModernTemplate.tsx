import { JobFormValues } from "@/lib/jobSchema";

export function JobModernTemplate({ data }: { data: Partial<JobFormValues> }) {
  return (
    <div className="bg-white w-full min-h-[1056px] font-sans leading-relaxed">
      {/* Hero Header Band */}
      <div className="bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-700 px-10 py-8">
        <div className="flex items-center gap-6">
          {/* Photo */}
          <div className="w-24 h-24 rounded-xl border-2 border-white/30 overflow-hidden bg-white/20 flex items-center justify-center shrink-0 shadow-lg">
            {typeof data.photo === "string" && data.photo ? (
              <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">{data.fullName || "Your Name"}</h1>
            <p className="text-violet-200 text-sm font-medium mt-0.5">{data.jobTitle || "Job Title"}</p>
            {/* Contact pills */}
            <div className="flex flex-wrap gap-2 mt-3">
              {data.email && <span className="text-xs bg-white/15 text-white px-3 py-0.5 rounded-full">✉ {data.email}</span>}
              {data.phone && <span className="text-xs bg-white/15 text-white px-3 py-0.5 rounded-full">📞 {data.phone}</span>}
              {data.location && <span className="text-xs bg-white/15 text-white px-3 py-0.5 rounded-full">📍 {data.location}</span>}
              {data.linkedIn && <span className="text-xs bg-white/15 text-white px-3 py-0.5 rounded-full">🔗 {data.linkedIn}</span>}
              {data.portfolio && <span className="text-xs bg-white/15 text-white px-3 py-0.5 rounded-full">🌐 {data.portfolio}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-10 py-8 grid grid-cols-[1fr_200px] gap-8">
        {/* Main column */}
        <div>
          {/* Summary */}
          {data.professionalSummary && (
            <section className="mb-7">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 bg-gradient-to-b from-indigo-600 to-violet-600 rounded-full" />
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">About Me</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{data.professionalSummary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section className="mb-7">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 bg-gradient-to-b from-indigo-600 to-violet-600 rounded-full" />
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Experience</h2>
              </div>
              <div className="space-y-5">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-5">
                    <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 shadow" />
                    <div className="absolute left-[3px] top-3.5 bottom-0 w-px bg-indigo-100" />
                    <div className="flex justify-between items-start gap-2 flex-wrap mb-0.5">
                      <p className="text-sm font-bold text-slate-800">{exp.role || "—"}</p>
                      <span className="text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">{exp.duration}</span>
                    </div>
                    <p className="text-xs font-semibold text-violet-700">{exp.company}</p>
                    {exp.description && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 bg-gradient-to-b from-indigo-600 to-violet-600 rounded-full" />
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Education</h2>
              </div>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="bg-indigo-50/60 border border-indigo-100 rounded-lg px-4 py-3">
                    <div className="flex justify-between items-start gap-2 flex-wrap">
                      <p className="text-sm font-bold text-slate-800">{edu.degree || "—"}</p>
                      {edu.year && <span className="text-xs text-indigo-600 font-medium">{edu.year}</span>}
                    </div>
                    <p className="text-xs text-slate-600">{edu.institute}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Side column */}
        <div className="space-y-6">
          {/* Skills */}
          {data.skills && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-gradient-to-b from-indigo-600 to-violet-600 rounded-full" />
                <h2 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.split(",").map((s, i) => (
                  <span key={i} className="text-xs bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded-full font-medium">{s.trim()}</span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-gradient-to-b from-indigo-600 to-violet-600 rounded-full" />
                <h2 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Languages</h2>
              </div>
              <div className="space-y-1.5">
                {data.languages.split(",").map((l, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <p className="text-xs text-slate-600">{l.trim()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Fields */}
          {data.customFields && data.customFields.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-gradient-to-b from-indigo-600 to-violet-600 rounded-full" />
                <h2 className="text-xs font-bold text-slate-700 uppercase tracking-widest">More</h2>
              </div>
              <div className="space-y-2">
                {data.customFields.map((f) => (
                  <div key={f.id} className="text-xs">
                    <p className="font-semibold text-slate-700">{f.label}</p>
                    <p className="text-slate-500">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
