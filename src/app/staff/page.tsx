"use client";
import { DesktopNavbar } from "@/components/common/NavBar";
import { useEffect, useState } from "react";

interface StaffMember {
  _id: string;
  osuName: string;
  position: string;
  discordName: string;
  role: string;
  country: string;
  profilePicture: string;
  profileLink: string;
}

const POSITIONS = [
  "HOST",
  "ADMIN",
  "POOLERS",
  "MAPPOOL QA",
  "MAPPERS",
  "GFX",
  "STREAMERS",
  "COMMENTATORS",
  "PLAYTESTERS",
  "SHEETERS",
  "WEBSITE DEVELOPERS",
  "Referees",
];

export default function StaffPage() {
  const [staffByPosition, setStaffByPosition] = useState<
    Record<string, StaffMember[]>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/staff")
      .then((res) => res.json())
      .then((data: StaffMember[]) => {
        const grouped: Record<string, StaffMember[]> = {};
        for (const member of data) {
          const pos = member.position;
          if (!grouped[pos]) grouped[pos] = [];
          grouped[pos].push(member);
        }
        setStaffByPosition(grouped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div
      style={{
        width: "1950px",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          top: "-25vh",
          backgroundImage: "url(/staff/bg.webp)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "",
          backgroundSize: "100% auto",
          opacity: 1,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <DesktopNavbar />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "48vh",
          paddingLeft: "10vw",
          paddingRight: "10vw",
          paddingBottom: "10vh",
          color: "#FFF7C2",
          fontFamily: "var(--font-sunlight-dreams)",
        }}
      >
        {loading ? (
          <p style={{ fontSize: "24px" }}>Loading staff...</p>
        ) : (
          POSITIONS.map((position) => {
            const members = staffByPosition[position];
            if (!members || members.length === 0) return null;
            return (
              <section key={position} style={{ marginBottom: "8vh" }}>
                <h2
                  style={{
                    fontSize: "36px",
                    marginBottom: "24px",
                    borderBottom: "2px solid #FFF7C2",
                    paddingBottom: "8px",
                  }}
                >
                  {position}
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "24px",
                  }}
                >
                  {members.map((member) => (
                    <a
                      key={member._id}
                      href={member.profileLink || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "160px",
                        padding: "16px",
                        borderRadius: "12px",
                        backgroundColor: "rgba(255, 247, 194, 0.08)",
                        border: "1px solid rgba(255, 247, 194, 0.2)",
                        textDecoration: "none",
                        color: "#FFF7C2",
                      }}
                    >
                      {member.profilePicture && (
                        <img
                          src={member.profilePicture}
                          alt={member.osuName}
                          style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginBottom: "8px",
                          }}
                        />
                      )}
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {member.osuName}
                      </span>
                      {member.country && (
                        <img
                          src={member.country}
                          alt="flag"
                          style={{
                            width: "24px",
                            height: "24px",
                            marginTop: "4px",
                          }}
                        />
                      )}
                      {member.role && (
                        <span
                          style={{
                            fontSize: "12px",
                            marginTop: "4px",
                            opacity: 0.7,
                          }}
                        >
                          {member.role}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>
      <div
        style={{
          position: "absolute",
          top: "42vh",
          left: "-10vw",
          width: "120vw",
          bottom: 0,
          backgroundColor: "#374426",
          border: "6px solid #FFF7C2",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
