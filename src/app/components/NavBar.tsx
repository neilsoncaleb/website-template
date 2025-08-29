"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <header className="absolute top-0 right-0 z-50 p-4">
      {/* Hamburger button */}
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="p-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition"
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Dropdown menu with animation */}
      <AnimatePresence>
        {open && (
          <motion.nav
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute right-4 mt-2 w-44 rounded-lg bg-[#0B1220]/95 backdrop-blur-md border border-white/10 shadow-lg"
          >
            <ul className="flex flex-col text-gray-200">
              <li><a href="#hero" className="block px-4 py-2 hover:bg-white/10">Home</a></li>
              <li><a href="#about" className="block px-4 py-2 hover:bg-white/10">About</a></li>
              <li><a href="#skills" className="block px-4 py-2 hover:bg-white/10">Skills</a></li>
              <li><a href="#projects" className="block px-4 py-2 hover:bg-white/10">Projects</a></li>
              <li><a href="#blog" className="block px-4 py-2 hover:bg-white/10">Thoughts</a></li>
              <li><a href="#contact" className="block px-4 py-2 hover:bg-white/10">Contact</a></li>
              {/* Example static CV link for template users */}
              <li>
                <a
                  href="https://example.com/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-white/10"
                >
                  CV
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
