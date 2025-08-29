"use client";

import { motion } from "framer-motion";

interface PastprojectsnavbarProps {
  projects: { id: string; title: string }[];
  onSelect: (id: string) => void;
  activeId: string | null;
}

export default function Pastprojectsnavbar({
  projects,
  onSelect,
  activeId,
}: PastprojectsnavbarProps) {
  return (
    <nav className="w-full bg-[#06080F]/95 backdrop-blur-md border-b border-white/10 px-6 py-4 sticky top-0 z-50">
      <div className="flex flex-wrap justify-center gap-4">
        {projects.map((p) => (
          <motion.button
            key={p.id}
            onClick={() => onSelect(p.id)}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeId === p.id
                ? "bg-gradient-to-r from-accent to-accent-dark text-white shadow-glow"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {p.title}
          </motion.button>
        ))}
      </div>
    </nav>
  );
}
