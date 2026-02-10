import { DesktopNavbar } from "@/components/common/NavBar";

export default function StaffPage() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/bg1.png)" }}
    >
      <DesktopNavbar />
      <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <img
          src="/sleep.gif"
          alt="Sleeping animation"
          className="h-auto w-[320px]"
        />
        <p
          className="mt-4 text-3xl text-[#FFFCEA] drop-shadow"
          style={{ fontFamily: "var(--font-sunlight-dreams)" }}
        >
          Page under construction!!
        </p>
      </div>
    </div>
  );
}
