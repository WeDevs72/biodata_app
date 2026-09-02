import { JobFormValues } from "@/lib/jobSchema";

export function JobAtsMinimalTemplate({ data }: { data: Partial<JobFormValues> }) {
  const contactItems: string[] = [];
  if (data.phone) contactItems.push(data.phone);
  if (data.email) contactItems.push(data.email);
  if (data.location) contactItems.push(data.location);
  if (data.linkedIn) contactItems.push(data.linkedIn);
  if (data.portfolio) contactItems.push(data.portfolio);

  return (
    <div className="bg-white w-full min-h-[1056px] text-slate-800 font-sans p-8 md:p-12 flex flex-col justify-start max-w-[800px] mx-auto shadow-sm">
      {/* Top Header: Full Name & Contact Info */}
      <header className="border-b-2 border-teal-600 pb-5 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {data.fullName || "Alex Morgan"}
            </h1>
            <p className="text-sm font-semibold text-teal-700 tracking-wide uppercase mt-1">
              {data.jobTitle || "Computer Science Graduate / Software Engineer Trainee"}
            </p>
          </div>
        </div>

        {contactItems.length > 0 ? (
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100 font-medium">
            {contactItems.map((item, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                {idx > 0 && <span className="text-slate-300 mr-2">•</span>}
                {item}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100 font-medium">
            <span>+1 (555) 019-2834</span>
            <span>•</span>
            <span>alex.morgan@email.com</span>
            <span>•</span>
            <span>San Francisco, CA</span>
            <span>•</span>
            <span>linkedin.com/in/alexmorgan</span>
          </div>
        )}
      </header>

      {/* Career Objective */}
      <section className="mb-6">
        <h2 className="text-xs font-bold text-teal-800 uppercase tracking-widest border-b border-teal-200 pb-1 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-600 inline-block"></span>
          Career Objective
        </h2>
        <p className="text-xs text-slate-700 leading-relaxed font-normal">
          {data.professionalSummary ||
            "Motivated Computer Science graduate with a strong foundation in software engineering principles, web development, and algorithms. Eager to apply problem-solving skills and technical hands-on experience in a dynamic engineering team to build scalable, high-impact web applications."}
        </p>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xs font-bold text-teal-800 uppercase tracking-widest border-b border-teal-200 pb-1 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-600 inline-block"></span>
          Education
        </h2>
        {data.education && data.education.length > 0 ? (
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xs text-slate-900">{edu.degree}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">{edu.institute}</p>
                </div>
                {edu.year && (
                  <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded shrink-0">
                    {edu.year}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-xs text-slate-900">B.S. in Computer Science & Engineering</h3>
                <p className="text-xs text-slate-600 mt-0.5">State University of Technology • <span className="font-semibold text-slate-700">GPA: 3.8 / 4.0 (88%)</span></p>
              </div>
              <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded shrink-0">2020 – 2024</span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-xs text-slate-900">Higher Secondary Education (PCM)</h3>
                <p className="text-xs text-slate-600 mt-0.5">Central High School • <span className="font-semibold text-slate-700">Percentage: 92%</span></p>
              </div>
              <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded shrink-0">2018 – 2020</span>
            </div>
          </div>
        )}
      </section>

      {/* Academic Projects */}
      <section className="mb-6">
        <h2 className="text-xs font-bold text-teal-800 uppercase tracking-widest border-b border-teal-200 pb-1 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-600 inline-block"></span>
          Academic Projects
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-xs text-slate-900">Smart Campus Portal & Course Manager</h3>
              <span className="text-xs text-teal-700 font-medium">Cap Stone Project</span>
            </div>
            <p className="text-xs text-slate-600 mb-1">
              Architected a web app for managing student course registration, attendance tracking, and internal communications.
            </p>
            <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 mb-1.5 pl-1">
              <li>Designed RESTful API endpoints handling role-based access for students and faculty.</li>
              <li>Reduced load times by 35% through query optimization and cached sessions.</li>
            </ul>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"].map((tech) => (
                <span key={tech} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-xs text-slate-900">Real-time Task & Analytics Dashboard</h3>
              <span className="text-xs text-teal-700 font-medium">Independent Project</span>
            </div>
            <p className="text-xs text-slate-600 mb-1">
              Built a real-time analytics dashboard displaying live metric updates with interactive data visualizations.
            </p>
            <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 mb-1.5 pl-1">
              <li>Integrated WebSockets for live telemetry data streams and Chart.js graphics.</li>
            </ul>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {["TypeScript", "Next.js", "Tailwind CSS", "WebSocket"].map((tech) => (
                <span key={tech} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Internships (Optional) */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold text-teal-800 uppercase tracking-widest border-b border-teal-200 pb-1 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-600 inline-block"></span>
            Internships & Experience
          </h2>
          <div className="space-y-3">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-xs text-slate-900">{exp.role}</span>
                    <span className="text-xs text-slate-600"> — {exp.company}</span>
                  </div>
                  <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                    {exp.duration}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-xs font-bold text-teal-800 uppercase tracking-widest border-b border-teal-200 pb-1 mb-2.5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-600 inline-block"></span>
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="font-bold text-slate-900 block mb-1">Technical Skills:</span>
            <p className="text-slate-700 leading-relaxed">
              {data.skills || "JavaScript (ES6+), TypeScript, HTML5, CSS3, React, Node.js, Python, SQL, Git & GitHub, Tailwind CSS"}
            </p>
          </div>
          <div>
            <span className="font-bold text-slate-900 block mb-1">Soft Skills:</span>
            <p className="text-slate-700 leading-relaxed">
              Problem Solving, Team Collaboration, Adaptability, Time Management, Clear Communication
            </p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-2">
        <h2 className="text-xs font-bold text-teal-800 uppercase tracking-widest border-b border-teal-200 pb-1 mb-2.5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-600 inline-block"></span>
          Certifications
        </h2>
        <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pl-1">
          <li><span className="font-semibold text-slate-900">AWS Certified Cloud Practitioner</span> — Amazon Web Services (2023)</li>
          <li><span className="font-semibold text-slate-900">Meta Front-End Developer Professional Certificate</span> — Coursera (2023)</li>
        </ul>
      </section>
    </div>
  );
}
