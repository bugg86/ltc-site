import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        color: "#FFF7C2",
        background: "#374426",
        fontFamily: "var(--font-sunlight-dreams)",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>404</h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Page not found</p>
      <Link
        href="/"
        style={{
          color: "#FFF7C2",
          textDecoration: "underline",
          fontSize: "1.2rem",
        }}
      >
        Go home
      </Link>
    </div>
  );
}
