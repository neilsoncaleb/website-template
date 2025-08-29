"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase/client";
import { motion } from "framer-motion";
import Pastprojectsnavbar from "../../components/Pastprojectsnavbar";

interface PastProject {
  id: string;
  title: string;
  description: string;
  tech_stack?: string[];
  repo_url?: string;
  demo_url?: string;
  screenshots?: string[];
  created_at: string;
}

export default function PastProjectsPage() {
  const [projects, setProjects] = useState<PastProject[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // 🔹 Example Supabase fetch — replace with your own schema/tables
  useEffect(() => {
    const fetchPastProjects = async () => {
      const { data, error } = await supabase
        .from("past_projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setProjects(data || []);
    };

    fetchPastProjects();
  }, []);

  const activeProject = projects.find((p) => p.id === activeId);

  return (
    <main className="min-h-screen w-full bg-[#06080F] text-white">
      {/* 🔹 Back to Home button */}
      <div className="w-full px-6 py-4 border-b border-white/10 bg-[#06080F]/90 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center">
        <Link
          href="/"
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 text-sm transition"
        >
          ← Back to Home
        </Link>
      </div>

      {/* ✅ Navbar with project titles */}
      <Pastprojectsnavbar
        projects={projects.map((p) => ({ id: p.id, title: p.title }))}
        onSelect={(id) => setActiveId(id)}
        activeId={activeId}
      />

      <section className="py-20 px-6 sm:px-16">
        {!activeProject && (
          <>
            <motion.h1
              className="text-5xl font-bold mb-6 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Past Projects 📂
            </motion.h1>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
              A collection of older projects — experiments, builds, and examples to learn from.
            </p>

            {/* Grid of project previews */}
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <li
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:shadow-glow transition cursor-pointer"
                >
                  <h3 className="text-2xl font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-400">
                    {new Date(p.created_at).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Full-page view of a single project */}
        {activeProject && (
          <article className="max-w-4xl mx-auto">
            {/* Back to all projects */}
            <button
              onClick={() => setActiveId(null)}
              className="mb-6 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 text-sm transition"
            >
              ← Back to All Projects
            </button>

            <h2 className="text-4xl font-bold mb-4">{activeProject.title}</h2>
            <p className="text-sm text-gray-400 mb-6">
              {new Date(activeProject.created_at).toLocaleDateString()}
            </p>

            <p className="text-gray-300 whitespace-pre-line mb-6">
              {activeProject.description ?? "No description provided."}
            </p>

            {/* Tech stack */}
            {activeProject.tech_stack && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeProject.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-accent/20 border border-accent/40 text-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Screenshots */}
            {activeProject.screenshots && activeProject.screenshots.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {activeProject.screenshots.map((src, i) => (
                  <img
                    key={i}
                    src={src || "https://placehold.co/400x300"}
                    alt={`Project screenshot ${i + 1}`}
                    className="rounded-lg object-cover"
                  />
                ))}
              </div>
            )}

            {/* Links */}
            <div className="flex gap-6">
              {activeProject.repo_url && (
                <a
                  href={activeProject.repo_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  View Repo →
                </a>
              )}
              {activeProject.demo_url && (
                <a
                  href={activeProject.demo_url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Live Demo →
                </a>
              )}
            </div>
          </article>
        )}
      </section>
    </main>
  );
}
