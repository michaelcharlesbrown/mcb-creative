import { projects } from "@/data/projects";

export default function Info() {
  // Get unique clients from projects
  const clients = Array.from(new Set(projects.map((p) => p.client))).sort();

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="max-w-[var(--content-max-width)] mx-auto content-inset py-16 md:py-24">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16">
          About
        </h1>

        {/* Two-Column Layout */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24">
          {/* Left Column - Profile Photo Placeholder */}
          <div className="w-full aspect-square bg-gray-100" />

          {/* Right Column - Name, Bio, Services */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Michael Charles Brown
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Independent Creative specializing in visual design, motion graphics, and brand identity. 
                With a focus on creating meaningful connections between brands and their audiences, 
                I bring a unique perspective to every project.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold mb-3">Services</h3>
              <ul className="space-y-2 text-base md:text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Brand Identity</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Web Design</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>UI/UX Design</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Art Direction</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Motion Graphics</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Creative Direction</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            Say Hello
          </h2>
          <div className="space-y-4 text-base md:text-lg">
            <div>
              <span className="text-gray-600">Location:</span>{" "}
              <span className="text-gray-900">San Francisco / Los Angeles</span>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>{" "}
              <a
                href="mailto:hello@mcb-creative.design"
                className="text-gray-900 hover:underline"
              >
                hello@mcb-creative.design
              </a>
            </div>
            <div>
              <span className="text-gray-600">Phone:</span>{" "}
              <a
                href="tel:+14158281416"
                className="text-gray-900 hover:underline"
              >
                +1 415 828 1416
              </a>
            </div>
            <div>
              <span className="text-gray-600">LinkedIn:</span>{" "}
              <a
                href="https://www.linkedin.com/in/michaelcharlesbrown"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:underline"
              >
                linkedin.com/in/michaelcharlesbrown
              </a>
            </div>
          </div>
        </section>

        {/* Select Clients Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            Select Clients
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {clients.map((client) => (
              <div
                key={client}
                className="text-base md:text-lg text-gray-700"
              >
                {client}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
