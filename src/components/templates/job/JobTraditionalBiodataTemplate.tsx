import { JobFormValues } from "@/lib/jobSchema";

export function JobTraditionalBiodataTemplate({ data }: { data: Partial<JobFormValues> }) {
  // Extract custom fields if any for Father's Name, DOB, etc.
  const getCustomFieldValue = (labelPattern: string) => {
    if (!data.customFields) return "";
    const field = data.customFields.find((f) =>
      f.label.toLowerCase().includes(labelPattern.toLowerCase())
    );
    return field ? field.value : "";
  };

  const fathersName = getCustomFieldValue("father") || "Shri R. K. Sharma";
  const dob = getCustomFieldValue("birth") || getCustomFieldValue("dob") || "15th August 1998";
  const gender = getCustomFieldValue("gender") || "Male";
  const maritalStatus = getCustomFieldValue("marital") || "Single";
  const nationality = getCustomFieldValue("nationality") || "Indian";

  return (
    <div className="bg-white w-full min-h-[1056px] text-black font-serif p-10 md:p-14 flex flex-col justify-start leading-relaxed print:p-10">
      {/* Title Header */}
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase underline tracking-widest text-black">
          BIO-DATA
        </h1>
      </header>

      {/* 1. Personal Details Table */}
      <section className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-1 mb-4">
          1. Personal Details
        </h2>
        <table className="w-full text-xs text-black border-collapse">
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-2 font-bold w-1/3 text-left">Full Name</td>
              <td className="py-2 w-4 text-center">:</td>
              <td className="py-2 font-semibold">{data.fullName || "Your Full Name"}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 font-bold text-left">Father's Name</td>
              <td className="py-2 text-center">:</td>
              <td className="py-2">{fathersName}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 font-bold text-left">Date of Birth</td>
              <td className="py-2 text-center">:</td>
              <td className="py-2">{dob}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 font-bold text-left">Gender</td>
              <td className="py-2 text-center">:</td>
              <td className="py-2">{gender}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 font-bold text-left">Marital Status</td>
              <td className="py-2 text-center">:</td>
              <td className="py-2">{maritalStatus}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 font-bold text-left">Nationality</td>
              <td className="py-2 text-center">:</td>
              <td className="py-2">{nationality}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 font-bold text-left">Contact Number</td>
              <td className="py-2 text-center">:</td>
              <td className="py-2">{data.phone || "+91 98765 43210"}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-2 font-bold text-left">Email Address</td>
              <td className="py-2 text-center">:</td>
              <td className="py-2">{data.email || "applicant@example.com"}</td>
            </tr>
            <tr>
              <td className="py-2 font-bold text-left align-top">Permanent Address</td>
              <td className="py-2 text-center align-top">:</td>
              <td className="py-2 align-top">{data.location || "H.No. 124, Sector 15, New Delhi, India - 110001"}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 2. Educational Qualification */}
      <section className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-1 mb-4">
          2. Educational Qualification
        </h2>
        <table className="w-full text-xs text-black border border-black border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 border-b border-black">
              <th className="border-r border-black p-2 font-bold text-center w-12">S.No.</th>
              <th className="border-r border-black p-2 font-bold">Qualification / Degree</th>
              <th className="border-r border-black p-2 font-bold">Board / University</th>
              <th className="p-2 font-bold text-center w-24">Year</th>
            </tr>
          </thead>
          <tbody>
            {data.education && data.education.length > 0 ? (
              data.education.map((edu, index) => (
                <tr key={edu.id} className="border-b border-black last:border-b-0">
                  <td className="border-r border-black p-2 text-center">{index + 1}</td>
                  <td className="border-r border-black p-2 font-semibold">{edu.degree || "Degree Name"}</td>
                  <td className="border-r border-black p-2">{edu.institute || "Board / University"}</td>
                  <td className="p-2 text-center">{edu.year || "—"}</td>
                </tr>
              ))
            ) : (
              <>
                <tr className="border-b border-black">
                  <td className="border-r border-black p-2 text-center">1</td>
                  <td className="border-r border-black p-2 font-semibold">Bachelor of Technology (B.Tech)</td>
                  <td className="border-r border-black p-2">State Technical University</td>
                  <td className="p-2 text-center">2022</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="border-r border-black p-2 text-center">2</td>
                  <td className="border-r border-black p-2 font-semibold">Senior Secondary (12th)</td>
                  <td className="border-r border-black p-2">CBSE Board</td>
                  <td className="p-2 text-center">2018</td>
                </tr>
                <tr className="border-b border-black last:border-b-0">
                  <td className="border-r border-black p-2 text-center">3</td>
                  <td className="border-r border-black p-2 font-semibold">High School (10th)</td>
                  <td className="border-r border-black p-2">CBSE Board</td>
                  <td className="p-2 text-center">2016</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </section>

      {/* 3. Work Experience (Optional) */}
      {((data.experience && data.experience.length > 0) || !data.fullName) && (
        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-1 mb-4">
            3. Work Experience
          </h2>
          <table className="w-full text-xs text-black border border-black border-collapse text-left">
            <thead>
              <tr className="bg-gray-100 border-b border-black">
                <th className="border-r border-black p-2 font-bold text-center w-12">S.No.</th>
                <th className="border-r border-black p-2 font-bold">Designation / Role</th>
                <th className="border-r border-black p-2 font-bold">Organization / Company</th>
                <th className="p-2 font-bold text-center w-32">Duration</th>
              </tr>
            </thead>
            <tbody>
              {data.experience && data.experience.length > 0 ? (
                data.experience.map((exp, index) => (
                  <tr key={exp.id} className="border-b border-black last:border-b-0">
                    <td className="border-r border-black p-2 text-center">{index + 1}</td>
                    <td className="border-r border-black p-2 font-semibold">{exp.role || "Designation"}</td>
                    <td className="border-r border-black p-2">{exp.company || "Organization Name"}</td>
                    <td className="p-2 text-center">{exp.duration || "—"}</td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-black last:border-b-0">
                  <td className="border-r border-black p-2 text-center">1</td>
                  <td className="border-r border-black p-2 font-semibold">Assistant Administrative Officer</td>
                  <td className="border-r border-black p-2">National Development Corp</td>
                  <td className="p-2 text-center">2022 &ndash; Present</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      )}

      {/* 4. Declaration Statement */}
      <section className="mt-4 mb-12">
        <h2 className="text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-1 mb-3">
          4. Declaration
        </h2>
        <p className="text-xs text-black leading-relaxed italic">
          I hereby declare that all the information and details provided above are true, complete, and correct to the best of my knowledge and belief.
        </p>
      </section>

      {/* 5. Signature & Date Area */}
      <footer className="mt-auto pt-6 flex justify-between items-end text-xs text-black">
        <div className="space-y-2">
          <p><span className="font-bold">Date:</span> ___________________</p>
          <p><span className="font-bold">Place:</span> ___________________</p>
        </div>
        <div className="text-center space-y-8">
          <div className="h-8"></div>
          <div className="border-t border-black pt-1 px-8">
            <p className="font-bold uppercase">{data.fullName || "(Signature of Applicant)"}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
