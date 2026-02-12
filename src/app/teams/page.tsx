import { DesktopNavbar } from "@/components/common/NavBar";

export default function TeamsPage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/teams/bg.webp)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "100% auto",
          opacity: 0.7,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <DesktopNavbar />
      <div
        style={{
          position: "absolute",
          top: "30vh",
          left: "-10vw",
          width: "120vw",
          height: "109%",
          backgroundColor: "#374426",
          border: "6px solid #FFF7C2",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
