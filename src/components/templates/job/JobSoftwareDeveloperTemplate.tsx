import { JobFormValues } from "@/lib/jobSchema";
import { Phone, Mail, MapPin, Globe, Terminal, ExternalLink, Code2, Briefcase, GraduationCap } from "lucide-react";

const GithubIcon = ({ className = "w-3.5 h-3.5 text-indigo-600 shrink-0" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-3.5 h-3.5 text-indigo-600 shrink-0" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function JobSoftwareDeveloperTemplate({ data }: { data: Partial<JobFormValues> }) {
  const contactItems: { icon: any; text: string; isLink?: boolean; href?: string }[] = [];
  if (data.email) contactItems.push({ icon: Mail, text: data.email, isLink: true, href: `mailto:${data.email}` });
  if (data.phone) contactItems.push({ icon: Phone, text: data.phone });
  if (data.location) contactItems.push({ icon: MapPin, text: data.location });
  if (data.linkedIn) {
    const href = data.linkedIn.startsWith("http") ? data.linkedIn : `https://${data.linkedIn}`;
    contactItems.push({ icon: LinkedinIcon, text: data.linkedIn.replace(/^https?:\/\/(www\.)?/, ""), isLink: true, href });
  }
  if (data.portfolio) {
    const href = data.portfolio.startsWith("http") ? data.portfolio : `https://${data.portfolio}`;
    const isGithub = data.portfolio.includes("github.com");
    contactItems.push({ 
      icon: isGithub ? GithubIcon : Globe, 
      text: data.portfolio.replace(/^https?:\/\/(www\.)?/, ""), 
      isLink: true, 
      href 
    });
  }

  const techStack = data.skills
    ? data.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="bg-slate-50/50 w-full min-h-[1056px] text-slate-800 font-sans p-8 md:p-12 flex flex-col justify-start leading-relaxed print:p-8">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 md:p-10 flex flex-col gap-6 print:border-none print:shadow-none print:p-0">
        {/* Header */}
        <header className="border-b border-slate-200 pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Terminal className="w-6 h-6 text-indigo-600 shrink-0" />
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                  {data.fullName || "Alex Morgan"}
                </h1>
              </div>
              <p className="text-sm font-semibold text-indigo-600 font-mono tracking-wide uppercase">
                {data.jobTitle || "Full Stack Engineer & Freelancer"}
              </p>
            </div>
          </div>

          {/* Contact & Links */}
          {contactItems.length > 0 ? (
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600 mt-4 pt-4 border-t border-slate-100 font-medium">
              {contactItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <span key={idx} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-md text-slate-700">
                    <Icon className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    {item.isLink && item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className="hover:text-indigo-600 hover:underline flex items-center gap-1">
                        {item.text}
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </span>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 text-xs text-slate-600 mt-4 pt-4 border-t border-slate-100 font-medium">
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
                <Mail className="w-3.5 h-3.5 text-indigo-600" /> alex.dev@example.com
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
                <Phone className="w-3.5 h-3.5 text-indigo-600" /> +1 (555) 234-5678
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
                <GithubIcon className="w-3.5 h-3.5 text-indigo-600" /> github.com/alexmorgan-dev
              </span>
              <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
                <Globe className="w-3.5 h-3.5 text-indigo-600" /> alexmorgan.dev
              </span>
            </div>
          )}
        </header>

        {/* Professional Summary */}
        {data.professionalSummary && (
          <section>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-2.5 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-600" />
              Professional Summary
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              {data.professionalSummary}
            </p>
          </section>
        )}

        {/* Tech Stack */}
        <section>
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-600" />
            Tech Stack & Tools
          </h2>
          {techStack.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs font-semibold bg-indigo-50/80 text-indigo-700 border border-indigo-200/80 px-2.5 py-1 rounded-md shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {["TypeScript", "React", "Next.js", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "Docker", "AWS", "GraphQL", "Redis", "Git"].map((tech, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs font-semibold bg-indigo-50/80 text-indigo-700 border border-indigo-200/80 px-2.5 py-1 rounded-md shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Featured Projects */}
        <section>
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-2">
            <GithubIcon className="w-4 h-4 text-indigo-600" />
            Key Projects & Freelance Works
          </h2>
          {data.customFields && data.customFields.length > 0 ? (
            <div className="space-y-4">
              {data.customFields.map((field) => (
                <div key={field.id} className="p-3.5 bg-slate-50/70 rounded-lg border border-slate-200/70">
                  <h3 className="font-bold text-xs text-slate-900 mb-1 flex items-center gap-1.5">
                    <span>{field.label}</span>
                  </h3>
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pl-1">
                    {field.value.split("\n").map((line, i) =>
                      line.trim() ? (
                        <li key={i} className="leading-relaxed">
                          <span>{line.trim().replace(/^[•\-\*]\s*/, "")}</span>
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3.5">
              <div className="p-3.5 bg-slate-50/80 rounded-lg border border-slate-200/80">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-xs text-slate-900 flex items-center gap-2">
                    Distributed Task Queue & Telemetry Platform
                  </h3>
                  <a href="https://github.com/example/task-queue" target="_blank" rel="noreferrer" className="text-[11px] font-mono font-semibold text-indigo-600 hover:underline flex items-center gap-1">
                    github.com/example/task-queue <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
                <p className="text-xs text-slate-600 mb-2">
                  Built a high-throughput background worker system processing 10M+ daily events with real-time analytics.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Node.js", "Redis", "TypeScript", "PostgreSQL", "Docker"].map((tech) => (
                    <span key={tech} className="font-mono text-[10px] bg-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-slate-50/80 rounded-lg border border-slate-200/80">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-xs text-slate-900 flex items-center gap-2">
                    SaaS Commerce & Billing Dashboard
                  </h3>
                  <a href="https://github.com/example/saas-dashboard" target="_blank" rel="noreferrer" className="text-[11px] font-mono font-semibold text-indigo-600 hover:underline flex items-center gap-1">
                    github.com/example/saas-dashboard <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
                <p className="text-xs text-slate-600 mb-2">
                  Developed full-stack multi-tenant subscription portal integrated with Stripe API and automated invoice generation.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Next.js", "React", "Stripe API", "Tailwind CSS", "Prisma"].map((tech) => (
                    <span key={tech} className="font-mono text-[10px] bg-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              Work Experience & Client Engagements
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <span className="font-bold text-xs text-slate-900">{exp.role || "Developer Role"}</span>
                      {exp.company && (
                        <span className="text-xs text-slate-600 ml-1.5">&mdash; <span className="font-semibold text-slate-800">{exp.company}</span></span>
                      )}
                    </div>
                    {exp.duration && (
                      <span className="text-xs font-mono font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded shrink-0">
                        {exp.duration}
                      </span>
                    )}
                  </div>
                  {exp.description && (
                    <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pl-1">
                      {exp.description.split("\n").map((line, i) =>
                        line.trim() ? (
                          <li key={i} className="leading-relaxed">
                            <span>{line.trim().replace(/^[•\-\*]\s*/, "")}</span>
                          </li>
                        ) : null
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              Education
            </h2>
            <div className="space-y-2.5">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-xs text-slate-900">{edu.degree || "Degree"}</span>
                    {edu.institute && (
                      <span className="text-xs text-slate-600 ml-1.5">, {edu.institute}</span>
                    )}
                  </div>
                  {edu.year && (
                    <span className="text-xs font-mono font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded shrink-0">
                      {edu.year}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
