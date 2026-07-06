import { INFO_PEEL_VIDEO_SRC } from "@/lib/infoPeelVideo";

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preload" href={INFO_PEEL_VIDEO_SRC} as="fetch" crossOrigin="anonymous" />
      {children}
    </>
  );
}
