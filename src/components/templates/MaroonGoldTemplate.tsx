import { BiodataFormValues } from "@/lib/schema";

export function MaroonGoldTemplate({ data }: { data: Partial<BiodataFormValues> }) {
  const gold = "#c9a84c";
  const goldLight = "#e8c96d";
  const maroon = "#5c0a14";

  return (
    <div
      style={{
        background: "linear-gradient(160deg, #6b0f1a 0%, #4a0910 40%, #5c0a14 100%)",
        width: "100%",
        minHeight: "1122px",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        position: "relative",
        overflow: "hidden",
        color: "#f5e6c0",
      }}
    >
      {/* ── Outer Gold Border ── */}
      <div
        style={{
          position: "absolute",
          inset: "6px",
          border: `2px solid ${gold}`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "10px",
          border: `1px solid rgba(201,168,76,0.4)`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* ── Top Border Filigree Band ── */}
      <TopBorderFiligree gold={gold} />

      {/* ── Bottom Border Filigree Band ── */}
      <BottomBorderFiligree gold={gold} />

      {/* ── Corner Paisley ── */}
      <TopLeftPaisley gold={gold} />
      <TopRightPaisley gold={gold} />
      <BottomLeftPaisley gold={gold} />
      <BottomRightPaisley gold={gold} />

      {/* ── Background mandala watermark ── */}
      <MandalaWatermark />

      {/* ══════════════════════════════════════════
          CONTENT
      ══════════════════════════════════════════ */}
      <div style={{ position: "relative", zIndex: 5, padding: "28px 36px 28px 36px" }}>

        {/* ── TOP HEADER ROW: Left (Ganesha + Title) + Right (Photo Frame) ── */}
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", marginBottom: "18px" }}>

          {/* Left: Symbol + Title + Blessing */}
          <div style={{ flex: 1, textAlign: "center" }}>
            {/* Ganesha Symbol */}
            <div style={{ fontSize: "32px", lineHeight: 1, marginBottom: "4px", color: gold }}>
              {data.religiousSymbol || "🕉"}
            </div>

            {/* Hindi Script Title */}
            <div
              style={{
                fontSize: "38px",
                fontWeight: "bold",
                color: gold,
                lineHeight: 1.15,
                marginBottom: "4px",
                fontFamily: "'Noto Serif Devanagari', 'Mangal', serif",
                textShadow: `0 2px 8px rgba(201,168,76,0.5)`,
              }}
            >
              श्री गणेशाय नमः
            </div>

            {/* English Subtitle */}
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "3px",
                color: goldLight,
                marginBottom: "12px",
                fontFamily: "Georgia, serif",
              }}
            >
              ॥ SHREE GANESHAYA NAMAH ॥
            </div>

            {/* Gold divider ornament */}
            <GoldDivider gold={gold} />

            {/* Blessing Text */}
            <p
              style={{
                fontSize: "11.5px",
                color: "#f5e6c0",
                lineHeight: 1.7,
                marginTop: "10px",
                fontStyle: "italic",
                maxWidth: "280px",
                margin: "10px auto 0",
              }}
            >
              With the blessings of God Almighty<br />
              and our ancestors, we seek a life partner<br />
              who will be a companion for life.
            </p>
          </div>

          {/* Right: Photo Frame (Mughal Arch style) */}
          <div style={{ width: "190px", flexShrink: 0 }}>
            <MughalArchFrame data={data} gold={gold} goldLight={goldLight} />
          </div>
        </div>

        {/* ── Gold Horizontal Divider ── */}
        <div
          style={{
            height: "1px",
            background: `linear-gradient(to right, transparent, ${gold}, transparent)`,
            margin: "12px 0",
          }}
        />

        {/* ── TWO-COLUMN: Personal Details + Family Details ── */}
        <div style={{ display: "flex", gap: "28px", marginBottom: "16px" }}>

          {/* PERSONAL DETAILS */}
          <div style={{ flex: 1 }}>
            <SectionHeader title="PERSONAL DETAILS" gold={gold} />
            <div style={{ marginTop: "10px" }}>
              <DetailRow label="Name" value={data.fullName} gold={gold} />
              <DetailRow label="Date of Birth" value={data.dob} gold={gold} />
              <DetailRow label="Height" value={data.height} gold={gold} />
              <DetailRow label="Place of Birth" value={data.location} gold={gold} />
              <DetailRow label="Education" value={data.education} gold={gold} />
              <DetailRow label="Profession" value={data.occupation} gold={gold} />
              {data.income && <DetailRow label="Annual Income" value={data.income} gold={gold} />}
              {data.caste && <DetailRow label="Caste" value={data.caste} gold={gold} />}
              {data.religion && <DetailRow label="Gotra / Religion" value={data.religion} gold={gold} />}
              {/* Custom personal fields */}
              {data.personalCustomFields?.map((f) => (
                <DetailRow key={f.id} label={f.label} value={f.value} gold={gold} />
              ))}
              {/* Professional custom fields */}
              {data.professionalCustomFields?.map((f) => (
                <DetailRow key={f.id} label={f.label} value={f.value} gold={gold} />
              ))}
            </div>
          </div>

          {/* FAMILY DETAILS */}
          <div style={{ flex: 1 }}>
            <SectionHeader title="FAMILY DETAILS" gold={gold} />
            <div style={{ marginTop: "10px" }}>
              <DetailRow label="Father's Name" value={data.fatherName} gold={gold} />
              <DetailRow label="Mother's Name" value={data.motherName} gold={gold} />
              {data.siblings && <DetailRow label="Siblings" value={data.siblings} gold={gold} />}
              {/* Custom family fields */}
              {data.familyCustomFields?.map((f) => (
                <DetailRow key={f.id} label={f.label} value={f.value} gold={gold} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Gold Horizontal Divider ── */}
        <div
          style={{
            height: "1px",
            background: `linear-gradient(to right, transparent, ${gold}, transparent)`,
            margin: "12px 0",
          }}
        />

        {/* ── CONTACT DETAILS ── */}
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              textAlign: "center",
              fontSize: "13px",
              letterSpacing: "3px",
              fontWeight: "bold",
              color: gold,
              marginBottom: "12px",
            }}
          >
            CONTACT DETAILS
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {/* Phone */}
            <ContactRow icon="📞" label="Phone" value={data.preferredLocation || "+91 00000 00000"} gold={gold} />
            {/* Email */}
            <ContactRow icon="✉" label="Email" value={(data.personalCustomFields?.find(f => f.label.toLowerCase().includes('email'))?.value) || "your.email@example.com"} gold={gold} />
            {/* Address */}
            <ContactRow icon="📍" label="Address" value={data.location || "—"} gold={gold} />
            {/* Looking For */}
            {data.preferredEducation && (
              <ContactRow icon="💑" label="Looking For" value={data.preferredEducation} gold={gold} />
            )}
            {/* Partner custom fields */}
            {data.partnerCustomFields?.map((f) => (
              <ContactRow key={f.id} icon="★" label={f.label} value={f.value} gold={gold} />
            ))}
          </div>
        </div>

        {/* ── Bottom Quote Box ── */}
        <div
          style={{
            border: `1px solid ${gold}`,
            padding: "10px 20px",
            textAlign: "center",
            margin: "4px 0",
            background: "rgba(201,168,76,0.05)",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              fontStyle: "italic",
              color: "#f5e6c0",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            "A successful marriage requires falling in love many times,<br />
            always with the same person."
          </p>
        </div>

      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SUB-COMPONENTS
════════════════════════════════════════════ */

function SectionHeader({ title, gold }: { title: string; gold: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ fontSize: "14px", color: gold }}>✿</span>
      <span
        style={{
          fontSize: "12px",
          fontWeight: "bold",
          letterSpacing: "2px",
          color: gold,
          fontFamily: "Georgia, serif",
        }}
      >
        {title}
      </span>
    </div>
  );
}

function DetailRow({ label, value, gold }: { label: string; value?: string; gold: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "130px 12px 1fr",
        gap: "2px",
        fontSize: "11px",
        lineHeight: "1.9",
        color: "#f5e6c0",
      }}
    >
      <span style={{ fontWeight: 500, color: "#f0d9a0" }}>{label}</span>
      <span style={{ color: gold }}>:</span>
      <span>{value || "—"}</span>
    </div>
  );
}

function ContactRow({ icon, label, value, gold }: { icon: string; label: string; value: string; gold: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "28px 110px 12px 1fr",
        alignItems: "center",
        fontSize: "11px",
        lineHeight: 1.7,
        color: "#f5e6c0",
      }}
    >
      <span
        style={{
          width: "22px",
          height: "22px",
          background: gold,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
          color: "#5c0a14",
          fontWeight: "bold",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <span style={{ color: "#f0d9a0", fontWeight: 500, paddingLeft: "6px" }}>{label}</span>
      <span style={{ color: gold }}>:</span>
      <span style={{ paddingLeft: "4px" }}>{value}</span>
    </div>
  );
}

function GoldDivider({ gold }: { gold: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", margin: "4px 0" }}>
      <div style={{ height: "1px", width: "50px", background: `linear-gradient(to right, transparent, ${gold})` }} />
      <span style={{ fontSize: "10px", color: gold }}>❧</span>
      <div style={{ height: "1px", width: "50px", background: `linear-gradient(to left, transparent, ${gold})` }} />
    </div>
  );
}

function MughalArchFrame({ data, gold, goldLight }: { data: Partial<BiodataFormValues>; gold: string; goldLight: string }) {
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Arch SVG outer container */}
      <div
        style={{
          position: "relative",
          width: "190px",
          height: "240px",
        }}
      >
        {/* SVG Arch Border */}
        <svg
          viewBox="0 0 190 240"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer arch path */}
          <path
            d={`
              M 10,240
              L 10,95
              Q 10,10 95,10
              Q 180,10 180,95
              L 180,240
              Z
            `}
            stroke={gold}
            strokeWidth="2"
            fill="rgba(245,230,180,0.06)"
          />
          {/* Inner arch path */}
          <path
            d={`
              M 18,240
              L 18,97
              Q 18,20 95,20
              Q 172,20 172,97
              L 172,240
              Z
            `}
            stroke={gold}
            strokeWidth="1"
            strokeDasharray="4 3"
            fill="none"
            opacity="0.5"
          />
          {/* Corner ornaments */}
          <circle cx="10" cy="240" r="5" fill={gold} opacity="0.7" />
          <circle cx="180" cy="240" r="5" fill={gold} opacity="0.7" />
          {/* Keystone decoration at top */}
          <circle cx="95" cy="12" r="6" fill={gold} opacity="0.8" />
          <circle cx="95" cy="12" r="3" fill="#5c0a14" />
          {/* Side knobs */}
          <circle cx="10" cy="95" r="5" fill={gold} opacity="0.6" />
          <circle cx="180" cy="95" r="5" fill={gold} opacity="0.6" />
        </svg>

        {/* Photo inside the arch */}
        <div
          style={{
            position: "absolute",
            top: "22px",
            left: "20px",
            right: "20px",
            bottom: "10px",
            borderRadius: "78px 78px 4px 4px",
            overflow: "hidden",
            background: "rgba(245,230,180,0.12)",
          }}
        >
          {typeof data.photo === "string" ? (
            <img
              src={data.photo}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: `rgba(201,168,76,0.6)`,
                fontSize: "12px",
                textAlign: "center",
                padding: "10px",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span style={{ marginTop: "6px", fontSize: "10px" }}>Photo</span>
            </div>
          )}
        </div>
      </div>

      {/* Small ornament under arch */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
        <div style={{ height: "1px", width: "30px", background: gold, opacity: 0.5 }} />
        <span style={{ fontSize: "10px", color: gold }}>✦</span>
        <div style={{ height: "1px", width: "30px", background: gold, opacity: 0.5 }} />
      </div>
    </div>
  );
}

/* ════════════════════
   DECORATIVE ELEMENTS
════════════════════ */

function TopBorderFiligree({ gold }: { gold: string }) {
  return (
    <svg
      style={{ position: "absolute", top: 0, left: 0, width: "100%", pointerEvents: "none", zIndex: 3 }}
      viewBox="0 0 794 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {/* Base horizontal lines */}
      <line x1="0" y1="6" x2="794" y2="6" stroke={gold} strokeWidth="1" opacity="0.9" />
      <line x1="0" y1="10" x2="794" y2="10" stroke={gold} strokeWidth="0.5" opacity="0.5" />
      {/* Repeating diamond motifs */}
      {Array.from({ length: 24 }).map((_, i) => {
        const x = 16 + i * 33;
        return (
          <g key={i} transform={`translate(${x}, 6)`}>
            <polygon points="0,-5 5,0 0,5 -5,0" fill={gold} opacity="0.8" />
            <polygon points="0,-3 3,0 0,3 -3,0" fill="#5c0a14" />
            {i % 3 === 1 && (
              <g>
                <line x1="0" y1="-5" x2="0" y2="-18" stroke={gold} strokeWidth="0.8" opacity="0.7" />
                <circle cx="0" cy="-20" r="3" fill={gold} opacity="0.7" />
                <line x1="-8" y1="-12" x2="8" y2="-12" stroke={gold} strokeWidth="0.6" opacity="0.5" />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function BottomBorderFiligree({ gold }: { gold: string }) {
  return (
    <svg
      style={{ position: "absolute", bottom: 0, left: 0, width: "100%", pointerEvents: "none", zIndex: 3 }}
      viewBox="0 0 794 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <line x1="0" y1="46" x2="794" y2="46" stroke={gold} strokeWidth="1" opacity="0.9" />
      <line x1="0" y1="42" x2="794" y2="42" stroke={gold} strokeWidth="0.5" opacity="0.5" />
      {Array.from({ length: 24 }).map((_, i) => {
        const x = 16 + i * 33;
        return (
          <g key={i} transform={`translate(${x}, 46)`}>
            <polygon points="0,-5 5,0 0,5 -5,0" fill={gold} opacity="0.8" />
            <polygon points="0,-3 3,0 0,3 -3,0" fill="#5c0a14" />
          </g>
        );
      })}
    </svg>
  );
}

function TopLeftPaisley({ gold }: { gold: string }) {
  return (
    <svg
      style={{ position: "absolute", top: 0, left: 0, width: "130px", height: "160px", pointerEvents: "none", zIndex: 1 }}
      viewBox="0 0 130 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main paisley teardrop */}
      <path
        d="M10,155 C10,100 40,50 80,20 C90,12 95,5 80,2 C50,-3 15,30 8,80 C4,110 6,140 10,155 Z"
        fill={gold}
        fillOpacity="0.18"
        stroke={gold}
        strokeWidth="0.8"
        strokeOpacity="0.5"
      />
      <path
        d="M18,150 C18,105 45,62 78,35 C86,28 90,22 78,20 C55,17 22,46 14,88 C10,114 13,140 18,150 Z"
        fill={gold}
        fillOpacity="0.1"
      />
      {/* Decorative inner swirl */}
      <path
        d="M25,130 Q30,100 50,75 Q65,55 75,40"
        stroke={gold}
        strokeWidth="0.8"
        strokeOpacity="0.6"
        fill="none"
      />
      {/* Small circles/dots */}
      <circle cx="55" cy="72" r="3" fill={gold} fillOpacity="0.5" />
      <circle cx="40" cy="95" r="2.5" fill={gold} fillOpacity="0.4" />
      <circle cx="30" cy="118" r="2" fill={gold} fillOpacity="0.4" />
    </svg>
  );
}

function TopRightPaisley({ gold }: { gold: string }) {
  return (
    <svg
      style={{ position: "absolute", top: 0, right: 0, width: "130px", height: "160px", pointerEvents: "none", zIndex: 1, transform: "scaleX(-1)" }}
      viewBox="0 0 130 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10,155 C10,100 40,50 80,20 C90,12 95,5 80,2 C50,-3 15,30 8,80 C4,110 6,140 10,155 Z"
        fill={gold}
        fillOpacity="0.18"
        stroke={gold}
        strokeWidth="0.8"
        strokeOpacity="0.5"
      />
      <path
        d="M18,150 C18,105 45,62 78,35 C86,28 90,22 78,20 C55,17 22,46 14,88 C10,114 13,140 18,150 Z"
        fill={gold}
        fillOpacity="0.1"
      />
      <path d="M25,130 Q30,100 50,75 Q65,55 75,40" stroke={gold} strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
      <circle cx="55" cy="72" r="3" fill={gold} fillOpacity="0.5" />
      <circle cx="40" cy="95" r="2.5" fill={gold} fillOpacity="0.4" />
      <circle cx="30" cy="118" r="2" fill={gold} fillOpacity="0.4" />
    </svg>
  );
}

function BottomLeftPaisley({ gold }: { gold: string }) {
  return (
    <svg
      style={{ position: "absolute", bottom: 0, left: 0, width: "130px", height: "160px", pointerEvents: "none", zIndex: 1, transform: "scaleY(-1)" }}
      viewBox="0 0 130 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10,155 C10,100 40,50 80,20 C90,12 95,5 80,2 C50,-3 15,30 8,80 C4,110 6,140 10,155 Z"
        fill={gold}
        fillOpacity="0.18"
        stroke={gold}
        strokeWidth="0.8"
        strokeOpacity="0.5"
      />
      <path
        d="M18,150 C18,105 45,62 78,35 C86,28 90,22 78,20 C55,17 22,46 14,88 C10,114 13,140 18,150 Z"
        fill={gold}
        fillOpacity="0.1"
      />
      <path d="M25,130 Q30,100 50,75 Q65,55 75,40" stroke={gold} strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
      <circle cx="55" cy="72" r="3" fill={gold} fillOpacity="0.5" />
      <circle cx="40" cy="95" r="2.5" fill={gold} fillOpacity="0.4" />
      <circle cx="30" cy="118" r="2" fill={gold} fillOpacity="0.4" />
    </svg>
  );
}

function BottomRightPaisley({ gold }: { gold: string }) {
  return (
    <svg
      style={{ position: "absolute", bottom: 0, right: 0, width: "130px", height: "160px", pointerEvents: "none", zIndex: 1, transform: "scale(-1,-1)" }}
      viewBox="0 0 130 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10,155 C10,100 40,50 80,20 C90,12 95,5 80,2 C50,-3 15,30 8,80 C4,110 6,140 10,155 Z"
        fill={gold}
        fillOpacity="0.18"
        stroke={gold}
        strokeWidth="0.8"
        strokeOpacity="0.5"
      />
      <path
        d="M18,150 C18,105 45,62 78,35 C86,28 90,22 78,20 C55,17 22,46 14,88 C10,114 13,140 18,150 Z"
        fill={gold}
        fillOpacity="0.1"
      />
      <path d="M25,130 Q30,100 50,75 Q65,55 75,40" stroke={gold} strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
      <circle cx="55" cy="72" r="3" fill={gold} fillOpacity="0.5" />
      <circle cx="40" cy="95" r="2.5" fill={gold} fillOpacity="0.4" />
      <circle cx="30" cy="118" r="2" fill={gold} fillOpacity="0.4" />
    </svg>
  );
}

function MandalaWatermark() {
  return (
    <svg
      style={{
        position: "absolute",
        top: "50%",
        left: "20%",
        transform: "translate(-50%, -50%)",
        width: "260px",
        height: "260px",
        opacity: 0.04,
        pointerEvents: "none",
        zIndex: 0,
      }}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="48" stroke="#c9a84c" strokeWidth="0.8" fill="none" />
      <circle cx="50" cy="50" r="40" stroke="#c9a84c" strokeWidth="0.5" fill="none" />
      <circle cx="50" cy="50" r="30" stroke="#c9a84c" strokeWidth="0.5" fill="none" />
      <circle cx="50" cy="50" r="20" stroke="#c9a84c" strokeWidth="0.5" fill="none" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 50 + 20 * Math.cos(angle);
        const y1 = 50 + 20 * Math.sin(angle);
        const x2 = 50 + 48 * Math.cos(angle);
        const y2 = 50 + 48 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c9a84c" strokeWidth="0.4" />;
      })}
    </svg>
  );
}
