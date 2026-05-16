import React from "react";
import { JobFormValues } from "@/lib/jobSchema";

export function JobElegantSaffronTemplate({ data }: { data: Partial<JobFormValues> }) {
  // Helper to find specific custom fields
  const getCustomField = (keywords: string[]) => {
    return data.customFields?.find(f => 
      keywords.some(k => f.label.toLowerCase().includes(k.toLowerCase()))
    )?.value || "";
  };

  const fathersName = getCustomField(["father", "father's name", "father name"]);
  const dob = getCustomField(["dob", "date of birth", "birth"]);
  const nationality = getCustomField(["nationality"]);

  return (
    <div className="bg-white w-full min-h-[1056px] text-slate-800 font-sans leading-relaxed flex flex-col relative pb-10">
      
      {/* Header Band (Saffron) */}
      <div className="bg-[#F97316] text-white px-8 pt-8 pb-6 relative">
        <div className="pr-24">
          <h1 className="text-3xl font-bold uppercase tracking-wider mb-1">
            {data.fullName || "YOUR NAME"}
          </h1>
          <p className="text-lg font-medium text-orange-100 mb-4">
            {data.jobTitle || "Curriculum Vitae"}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm mt-4 text-orange-50">
            {/* Left Header Col */}
            <div className="space-y-1">
              {fathersName && <p><span className="font-semibold">Father's Name:</span> {fathersName}</p>}
              {dob && <p><span className="font-semibold">Date of Birth:</span> {dob}</p>}
              {nationality && <p><span className="font-semibold">Nationality:</span> {nationality}</p>}
            </div>
            
            {/* Right Header Col */}
            <div className="space-y-1">
              {data.phone && <p>📞 {data.phone}</p>}
              {data.email && <p>✉️ {data.email}</p>}
              {data.location && <p>📍 {data.location}</p>}
              {data.linkedIn && <p>🔗 {data.linkedIn}</p>}
            </div>
          </div>
        </div>

        {/* Circular Photo */}
        <div className="absolute top-8 right-8 w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-orange-200 flex items-center justify-center shadow-md">
          {typeof data.photo === "string" && data.photo ? (
            <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-orange-400 text-xs">Photo</span>
          )}
        </div>
      </div>

      <div className="px-8 py-6 flex-1 space-y-6">
        
        {/* Career Objective */}
        {data.professionalSummary && (
          <section>
            <h2 className="text-base font-bold text-slate-800 uppercase border-b-2 border-[#F97316] pb-1 mb-3 inline-block pr-4">
              Career Objective
            </h2>
            <div className="bg-[#FFF7ED] p-4 rounded border border-orange-100">
              <p className="text-sm italic text-slate-700 leading-relaxed text-justify">
                {data.professionalSummary}
              </p>
            </div>
          </section>
        )}

        {/* Educational Qualifications Table */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="text-base font-bold text-slate-800 uppercase border-b-2 border-[#F97316] pb-1 mb-3 inline-block pr-4">
              Educational Qualifications
            </h2>
            <div className="overflow-hidden border border-slate-200 rounded-sm">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-[#F97316] text-white">
                  <tr>
                    <th className="border border-orange-600 px-3 py-2 font-semibold">Exam / Degree</th>
                    <th className="border border-orange-600 px-3 py-2 font-semibold">Board / University</th>
                    <th className="border border-orange-600 px-3 py-2 font-semibold">Year</th>
                    <th className="border border-orange-600 px-3 py-2 font-semibold text-center">% / CGPA</th>
                  </tr>
                </thead>
                <tbody>
                  {data.education.map((edu, idx) => (
                    <tr key={edu.id} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="border border-slate-200 px-3 py-2 font-medium text-slate-800">{edu.degree || "-"}</td>
                      <td className="border border-slate-200 px-3 py-2 text-slate-700">{edu.institute || "-"}</td>
                      <td className="border border-slate-200 px-3 py-2 text-slate-700">{edu.year || "-"}</td>
                      <td className="border border-slate-200 px-3 py-2 text-slate-700 text-center">-</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Work Experience Table */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h2 className="text-base font-bold text-slate-800 uppercase border-b-2 border-[#F97316] pb-1 mb-3 inline-block pr-4">
              Work Experience
            </h2>
            <div className="overflow-hidden border border-slate-200 rounded-sm">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-[#F97316] text-white">
                  <tr>
                    <th className="border border-orange-600 px-3 py-2 font-semibold">Organization</th>
                    <th className="border border-orange-600 px-3 py-2 font-semibold">Designation</th>
                    <th className="border border-orange-600 px-3 py-2 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {data.experience.map((exp, idx) => (
                    <tr key={exp.id} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="border border-slate-200 px-3 py-2 font-medium text-slate-800">{exp.company || "-"}</td>
                      <td className="border border-slate-200 px-3 py-2 text-slate-700">{exp.role || "-"}</td>
                      <td className="border border-slate-200 px-3 py-2 text-slate-700">{exp.duration || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Render experience descriptions as a list below table if present */}
            {data.experience.some(e => e.description) && (
              <div className="mt-3 space-y-2">
                {data.experience.map(exp => exp.description ? (
                  <div key={`desc-${exp.id}`} className="text-sm">
                    <p className="font-semibold text-slate-800">{exp.company} Responsibilities:</p>
                    <div className="pl-4 mt-1 space-y-1 text-slate-700">
                      {exp.description.split('\n').map((line, i) => line.trim() ? <p key={i}>• {line.trim()}</p> : null)}
                    </div>
                  </div>
                ) : null)}
              </div>
            )}
          </section>
        )}

        {/* Skills & Competencies */}
        {data.skills && (
          <section>
            <h2 className="text-base font-bold text-slate-800 uppercase border-b-2 border-[#F97316] pb-1 mb-3 inline-block pr-4">
              Skills & Competencies
            </h2>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
              {data.skills.split(',').map((s, i) => s.trim() ? (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
                  {s.trim()}
                </div>
              ) : null)}
            </div>
          </section>
        )}

        {/* Personal Details */}
        <section>
          <h2 className="text-base font-bold text-slate-800 uppercase border-b-2 border-[#F97316] pb-1 mb-3 inline-block pr-4">
            Personal Details
          </h2>
          <div className="grid grid-cols-2 gap-y-2 gap-x-8 text-sm">
            {data.languages && (
              <>
                <div className="font-semibold text-slate-700">Languages Known</div>
                <div className="text-slate-600">: {data.languages}</div>
              </>
            )}
            
            {data.customFields?.map(field => (
              <React.Fragment key={field.id}>
                <div className="font-semibold text-slate-700 capitalize">{field.label}</div>
                <div className="text-slate-600">: {field.value}</div>
              </React.Fragment>
            ))}
          </div>
        </section>

      </div>

      {/* Declaration (pushed to bottom if enough space) */}
      <div className="px-8 mt-auto pt-6">
        <h2 className="text-base font-bold text-slate-800 uppercase border-b-2 border-[#F97316] pb-1 mb-3 inline-block pr-4">
          Declaration
        </h2>
        <p className="text-sm text-slate-700 mb-8">
          I hereby declare that the above information furnished is true and correct to the best of my knowledge and belief.
        </p>
        <div className="flex justify-between items-end text-sm text-slate-800 font-medium">
          <div>
            <p className="mb-2">Date: ........................</p>
            <p>Place: ........................</p>
          </div>
          <div className="text-center">
            <p className="border-b border-slate-400 w-40 mb-1"></p>
            <p>(Signature)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
