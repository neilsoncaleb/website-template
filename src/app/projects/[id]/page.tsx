import { supabase } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectPage({ params }: { params: { id: string } }) {
  // Example: fetch project info from Supabase
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("id, title, cover_url")
    .eq("id", params.id)
    .single();

  const { data: details, error: detailsError } = await supabase
    .from("project_details")
    .select("*")
    .eq("project_id", params.id)
    .single();

  if (projectError || detailsError || !project || !details) {
    return <div className="p-10 text-center text-gray-400">⚠️ Project not found.</div>;
  }

  return (
    <main className="min-h-screen bg-[#06080F] text-white px-6 py-16 sm:px-16 space-y-16">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/20 hover:shadow-glow transition"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Title / Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
        <div className="relative w-full max-w-4xl mx-auto">
          <Image
            src={project.cover_url || "https://placehold.co/1600x900"}
            alt={project.title}
            width={1600}
            height={900}
            className="rounded-xl object-cover shadow-lg"
          />
        </div>
      </section>

      {/* Description Section */}
      {details.description && (
        <section>
          <h2 className="text-3xl font-semibold mb-4">Overview</h2>
          <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-line">
            {details.description}
          </p>
        </section>
      )}

      {/* Tech Stack Section */}
      {details.tech_stack?.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold mb-4">Tech Stack</h2>
          <ul className="flex flex-wrap gap-3">
            {details.tech_stack.map((tech: string) => (
              <li
                key={tech}
                className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Links Section */}
      {(details.repo_url || details.demo_url) && (
        <section>
          <h2 className="text-3xl font-semibold mb-4">Links</h2>
          <div className="flex gap-4">
            {details.repo_url && (
              <a
                href={details.repo_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full bg-white/10 border border-white/10 hover:shadow-glow transition"
              >
                View Repo
              </a>
            )}
            {details.demo_url && (
              <a
                href={details.demo_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full bg-accent text-white font-semibold hover:shadow-glow transition"
              >
                Live Demo
              </a>
            )}
          </div>
        </section>
      )}

      {/* Screenshots Section */}
      {details.screenshots?.length > 0 && (
        <section>
          <h2 className="text-3xl font-semibold mb-4">Screenshots</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {details.screenshots.map((shot: string, i: number) => (
              <div key={i} className="relative w-full h-64">
                <Image
                  src={shot || "https://placehold.co/600x400"}
                  alt={`Screenshot ${i + 1}`}
                  fill
                  className="rounded-lg object-cover shadow-md"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Another Back Button at the bottom */}
      <div className="pt-10 text-center">
        <Link
          href="/"
          className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-accent to-accent-dark text-white font-semibold hover:shadow-glow transition"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
