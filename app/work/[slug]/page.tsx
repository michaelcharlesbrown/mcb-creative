import Image from "next/image";
import { projects } from "@/data/projects";

export async function generateStaticParams() {
  try {
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    return [];
  }
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-white text-black p-4">
        <h1>Project not found</h1>
      </div>
    );
  }

  // Get media sequence for this project (images and videos)
  const getMediaSequence = (slug: string) => {
    const sequences: Record<string, Array<{ 
      type: "full" | "half"; 
      media: Array<{ mediaType: "image" | "video"; src: string }> 
    }>> = {
      bittorrent: [
        { type: "full", media: [{ mediaType: "image", src: "bit-sign.jpg" }] },
        { type: "half", media: [{ mediaType: "image", src: "bit-user.jpg" }, { mediaType: "image", src: "bt-color.jpg" }] },
        { type: "full", media: [{ mediaType: "image", src: "bt-crowd.jpg" }] },
        { type: "half", media: [{ mediaType: "image", src: "bt-mobile.jpg" }, { mediaType: "image", src: "bt-screen.jpg" }] },
        { type: "full", media: [{ mediaType: "image", src: "bt-square.jpg" }] },
        { type: "half", media: [{ mediaType: "image", src: "bt-style-guide.jpg" }, { mediaType: "image", src: "bt-type.jpg" }] },
      ],
      shiftdrink: [
        { type: "full", media: [{ mediaType: "video", src: "sd-hero.mp4" }] },
        { type: "half", media: [{ mediaType: "image", src: "shiftdrink-logo.jpg" }, { mediaType: "image", src: "shiftdrink-app-icon.jpg" }] },
        { type: "full", media: [{ mediaType: "image", src: "shiftdrink-signage.jpg" }] },
        { type: "half", media: [{ mediaType: "image", src: "shiftdrink-ui-screens.jpg" }, { mediaType: "image", src: "shiftdrink-social-screens.jpg" }] },
        { type: "full", media: [{ mediaType: "video", src: "sd-lifestyle.mp4" }] },
        { type: "half", media: [{ mediaType: "image", src: "shiftdrink-type.jpg" }, { mediaType: "image", src: "shiftdrink-color-palette.jpg" }] },
        { type: "full", media: [{ mediaType: "image", src: "shiftdrink-style-guide.jpg" }] },
        { type: "half", media: [{ mediaType: "video", src: "sd-iphone-mock.mp4" }, { mediaType: "video", src: "sd-people.mp4" }] },
        { type: "full", media: [{ mediaType: "image", src: "shiftdrink-app-icon-mockup.jpg" }] },
        { type: "half", media: [{ mediaType: "image", src: "sd-tagline.jpg" }, { mediaType: "image", src: "sd-style-guide.jpg" }] },
      ],
    };
    return sequences[slug] || [];
  };

  const mediaSequence = getMediaSequence(slug);

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="p-4">
        {/* Project Info */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg mb-4">{project.tagline}</p>
          <div className="flex gap-4 text-sm">
            <span>{project.year}</span>
            <span>•</span>
            <span>{project.services.join(", ")}</span>
          </div>
        </div>

        {/* Media Grid */}
        <div className="flex flex-col gap-4">
          {mediaSequence.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Images coming soon</p>
            </div>
          ) : (
            mediaSequence.map((row, rowIndex) => {
            if (row.type === "full") {
              const mediaItem = row.media[0];
              return (
                <div key={rowIndex} className="w-full">
                  <div className="relative w-full aspect-video">
                    {mediaItem.mediaType === "image" ? (
                      <Image
                        src={`/images/work/${project.slug}/${mediaItem.src}`}
                        alt={`${project.title} - ${mediaItem.src}`}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    ) : (
                      <video
                        src={`/video/work/${project.slug}/${mediaItem.src}`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={rowIndex} className="flex gap-4 w-full">
                  {row.media.map((mediaItem, mediaIndex) => (
                    <div key={mediaIndex} className="flex-1">
                      <div className="relative w-full aspect-square">
                        {mediaItem.mediaType === "image" ? (
                          <Image
                            src={`/images/work/${project.slug}/${mediaItem.src}`}
                            alt={`${project.title} - ${mediaItem.src}`}
                            fill
                            sizes="50vw"
                            className="object-cover"
                          />
                        ) : (
                          <video
                            src={`/video/work/${project.slug}/${mediaItem.src}`}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="object-cover w-full h-full"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            }
          })
          )}
        </div>
      </main>
    </div>
  );
}
