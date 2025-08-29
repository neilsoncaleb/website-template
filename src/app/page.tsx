"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { supabase } from "../lib/supabase/client";
import ProjectCard from "../components/ProjectCard";
import NavBar from "../components/NavBar";
import Image from "next/image";
import { ArrowUp } from "lucide-react";

// Example row types (users can adapt these to their own schema)
interface Hero {
  id: string;
  title: string;
  subtitle?: string;
  background_url?: string;
  background_color?: string;
  created_at: string;
}

interface About {
  id: string;
  heading: string;
  content: string;
  avatar_url?: string;
  created_at: string;
}

interface Skill {
  id: string;
  name: string;
  level?: string;
  category?: string;
  created_at: string;
}

interface Project {
  id: string;
  title: string;
  summary?: string;
  cover_url?: string;
  is_archived?: boolean;
  is_featured?: boolean;
  created_at: string;
}

interface Post {
  id: string;
  title?: string;
  content: string;
  tagline?: string;
  created_at: string;
}

export default function HomePage() {
  const [hero, setHero] = useState<Hero | null>(null);
  const [about, setAbout] = useState<About | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [showTop, setShowTop] = useState(false);

  // Loading bounce
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // --- Supabase Fetch Example ---
  // 🔹 For template users: Replace table names with your own schema
  useEffect(() => {
    const fetchData = async () => {
      const { data: heroData } = await supabase
        .from("hero")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      setHero(heroData as Hero);

      const { data: aboutData } = await supabase
        .from("about")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      setAbout(aboutData as About);

      const { data: skillsData } = await supabase
        .from("skills")
        .select("*")
        .order("created_at", { ascending: false });
      setSkills((skillsData as Skill[]) ?? []);

      let { data: projectData } = await supabase
        .from("projects")
        .select("id, title, summary, cover_url, created_at")
        .eq("is_archived", false)
        .eq("is_featured", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (!projectData?.length) {
        const { data: fallback } = await supabase
          .from("projects")
          .select("id, title, summary, cover_url, created_at")
          .eq("is_archived", false)
          .order("created_at", { ascending: false })
          .limit(3);
        projectData = fallback ?? [];
      }
      setProjects(projectData as Project[]);

      const { data: postsData } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(2);
      setPosts((postsData as Post[]) ?? []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- Mobile detection ---
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Scroll Animations ---
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const blogRef = useRef(null);

  const heroScroll = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const aboutScroll = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const skillsScroll = useScroll({ target: skillsRef, offset: ["start end", "end start"] });
  const projectsScroll = useScroll({ target: projectsRef, offset: ["start end", "end start"] });
  const blogScroll = useScroll({ target: blogRef, offset: ["start end", "end start"] });

  const heroY = useSpring(useTransform(heroScroll.scrollYProgress, [0, 1], [0, 100]), { stiffness: 60, damping: 20 });
  const heroScale = useSpring(useTransform(heroScroll.scrollYProgress, [0, 1], [1, 1.15]), { stiffness: 60, damping: 20 });
  const heroOpacity = useSpring(useTransform(heroScroll.scrollYProgress, [0, 1], [1, 0.7]), { stiffness: 60, damping: 20 });
  const aboutY = useSpring(useTransform(aboutScroll.scrollYProgress, isMobile ? [0, 0.7] : [0.1, 0.9], [30, -30]), { stiffness: 60, damping: 20 });
  const skillsY = useSpring(useTransform(skillsScroll.scrollYProgress, isMobile ? [0, 0.7] : [0.1, 0.9], [30, -30]), { stiffness: 60, damping: 20 });
  const projectsX = useSpring(useTransform(projectsScroll.scrollYProgress, isMobile ? [0.05, 0.7] : [0.1, 0.9], [-50, 0]), { stiffness: 60, damping: 20 });
  const blogX = useSpring(useTransform(blogScroll.scrollYProgress, isMobile ? [0.05, 0.7] : [0.1, 0.9], [50, 0]), { stiffness: 60, damping: 20 });

  return (
    <main className="min-h-screen w-full text-white bg-[#06080F] scroll-smooth">
      <NavBar />

      {/* Hero */}
      <section ref={heroRef} className="relative flex h-screen w-full items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-animated opacity-40 z-0"></div>

        {hero?.background_url && (
          <motion.div style={{ y: heroY, scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="relative w-[800px] h-[800px]">
              <Image
                src={hero.background_url || "https://placehold.co/800x800"}
                alt="Hero background"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        )}

        <div className="absolute inset-0 bg-[#06080F]/70 z-20"></div>

        <motion.div className="relative z-30 bg-white/[0.02] p-8" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          {loading ? (
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex justify-center mb-4"
            >
              <Image src="https://placehold.co/80x80" alt="Loading Logo" width={80} height={80} priority />
            </motion.div>
          ) : (
            <h1 className="text-5xl font-bold mb-4">{hero?.title ?? "Your Title"}</h1>
          )}
          <p className="text-lg mb-6">{hero?.subtitle ?? "Your subtitle goes here."}</p>
          <a href="#about" className="px-6 py-3 bg-gradient-to-r from-accent to-accent-dark hover:shadow-glow rounded-full text-white font-semibold transition">
            Learn More ↓
          </a>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" ref={aboutRef} className="py-20 px-6 sm:px-16 bg-[#0B1220] overflow-hidden">
        <motion.div style={{ y: aboutY }} className="max-w-4xl mx-auto text-center">
          {about?.avatar_url && (
            <Image
              src={about.avatar_url || "https://placehold.co/128x128"}
              alt="Avatar"
              width={128}
              height={128}
              loading="lazy"
              className="mx-auto mb-6 h-32 w-32 rounded-full object-cover shadow-md border-4 border-[#06080F]"
            />
          )}
          <h2 className="text-4xl font-bold mb-6">{about?.heading ?? "About Me"}</h2>
          <p className="text-lg leading-relaxed text-gray-400">{about?.content ?? "This is where you can write about yourself."}</p>
        </motion.div>
      </section>

      {/* Skills */}
      <section id="skills" ref={skillsRef} className="py-20 px-6 sm:px-16 bg-[#06080F] overflow-hidden">
        <motion.div style={{ y: skillsY }}>
          <h2 className="text-4xl font-bold mb-10 text-center">Skills</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {skills.length ? (
              skills.map((skill) => (
                <motion.div key={skill.id} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:shadow-glow transition" whileHover={{ scale: 1.05 }}>
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                  {skill.level && <p className="text-sm text-gray-400 mt-1">{skill.level}</p>}
                  {skill.category && <p className="text-xs text-gray-500 mt-2">{skill.category}</p>}
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400 text-center">No skills yet. Add some to your database!</p>
            )}
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" ref={projectsRef} className="py-20 px-6 sm:px-16 bg-[#0B1220] overflow-hidden">
        <h2 className="text-4xl font-bold mb-10 text-center">Featured Projects</h2>
        <motion.ul style={{ x: projectsX }} className="grid gap-6 md:grid-cols-3">
          {projects.length ? (
            projects.map((p) => (
              <li key={p.id}>
                <ProjectCard id={p.id} title={p.title} summary={p.summary ?? ""} coverUrl={p.cover_url ?? "https://placehold.co/400x300"} />
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-3">No projects yet. Add some to your database!</p>
          )}
        </motion.ul>
      </section>

      {/* Blog */}
      <section id="blog" ref={blogRef} className="py-20 px-6 sm:px-16 bg-[#06080F] overflow-hidden">
        <h2 className="text-4xl font-bold mb-10 text-center">Latest Thoughts</h2>
        <motion.ul style={{ x: blogX }} className="grid gap-6 md:grid-cols-2">
          {posts.length ? (
            posts.map((post) => (
              <li key={post.id} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:shadow-glow transition">
                {post.title && <h3 className="text-2xl font-semibold mb-3">{post.title}</h3>}
                <p className="text-gray-400 mb-4 whitespace-pre-line">{post.content}</p>
                {post.tagline && <p className="text-sm text-accent italic">— {post.tagline}</p>}
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-2">No blog posts yet.</p>
          )}
        </motion.ul>
      </section>

      {/* Contact */}
      <footer id="contact" className="py-16 px-6 sm:px-16 bg-[#0B1220] border-t border-white/10 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="mb-6 text-gray-400">This is where you can add your contact links.</p>
        <div className="flex justify-center gap-6">
          <a href="mailto:your@email.com" className="px-6 py-2 rounded-full bg-white/10 border border-white/10 hover:shadow-glow transition">
            ✉️ Email
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full bg-white/10 border border-white/10 hover:shadow-glow transition">
            💼 LinkedIn
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full bg-white/10 border border-white/10 hover:shadow-glow transition">
            🐙 GitHub
          </a>
        </div>
        <p>© {new Date().getFullYear()} Your Name</p>
      </footer>

      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-r from-accent to-accent-dark text-white shadow-lg hover:shadow-glow transition">
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </main>
  );
}
