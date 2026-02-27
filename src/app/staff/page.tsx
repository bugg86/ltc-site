"use client";
import { DesktopNavbar } from "@/components/common/NavBar";
import Image from "next/image";
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
  "GRANDS TB",
  "COLLAB",
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
        width: "100%",
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
      <h1
        style={{
          position: "absolute",
          top: "19vh",
          left: "4vw",
          zIndex: 3,
          color: "#FFF7C2",
          fontFamily: "var(--font-sunlight-dreams)",
          fontSize: "4vw",
          margin: 0,
        }}
      >
        Staff
      </h1>
      <div
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "25vh",
          paddingLeft: "2vw",
          paddingRight: "2vw",
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
              <section key={position} style={{ marginBottom: "4vh" }}>
                <h2
                  style={{
                    fontSize: "3.3vw",
                    marginBottom: "2vw",
                    fontFamily: "var(--font-sunlight-dreams)",
                  }}
                >
                  {position}
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1.2vw",
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
                        flexDirection: "row",
                        alignItems: "center",
                        width: "30.6vw",
                        height: "17vh",
                        borderRadius: "0 1vw 1vw 1vw",
                        overflow: "hidden",
                        backgroundColor: "#D1DFD5",
                        textDecoration: "none",
                        color: "#070905",
                        boxShadow: "0 .3vh 1vh rgba(0, 0, 0, 0.3)",
                        position: "relative",
                      }}
                    >
                      {member.profilePicture && (
                        <img
                          src={member.profilePicture}
                          alt={member.osuName}
                          referrerPolicy="no-referrer"
                          style={{
                            width: "auto",
                            height: "100%",
                            aspectRatio: "1",
                            objectFit: "cover",
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: "1vw" }}>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.6vw" }}>
                          <span
                            style={{
                              fontSize: "3.8vh",
                              fontWeight: "500",
                              fontFamily: "var(--font-josefin-sans)",
                            }}
                          >
                            {member.osuName}
                          </span>
                          {member.country && (
                            <img
                              src={member.country}
                              alt="flag"
                              style={{
                                width: "2.1vw",
                                height: "3.8vh",
                              }}
                            />
                          )}
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.4vw", marginTop: "0.3vw" }}>
                          {member.discordName && (
                            <>
                              <img src="/staff/discord.png" alt="discord" style={{ width: "3vh", height: "3vh" }} />
                              <span style={{ fontSize: "1.9vh", opacity: 0.7, fontFamily: "var(--font-josefin-sans)", fontStyle: "normal", letterSpacing: "0%", lineHeight: "36px" }}>
                                {member.discordName}
                              </span>
                            </>
                          )}
                          {member.role && (
                            <span style={{ fontSize: "1.9vh", opacity: 0.7, fontFamily: "var(--font-josefin-sans)", fontStyle: "normal", letterSpacing: "0%", lineHeight: "36px" }}>
                              {member.role}
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{ position: "absolute", bottom: ".8vh", left: "63%", width: "2.5vw", height: "2vh" }}>
                        <Image src="/staff/design.svg" alt="design" fill style={{ objectFit: "contain" }} />
                      </div>
                    </a>
                  ))}
                </div>
                <div style={{ position: "relative", width: "100%", height: "4.6vh", margin: "6vh 0" }}>
                  <Image src="/staff/separator.svg" alt="separator" fill />
                </div>
              </section>
            );
          })
        )}
      </div>
      <div
        style={{
          position: "absolute",
          top: "30vh",
          left: "-10vw",
          width: "120vw",
          bottom: 0,
          background: "linear-gradient(0deg, #374426 0%, #37622A 50%, #9FB878 100%)",
          border: ".6vh solid #FFF7C2",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
