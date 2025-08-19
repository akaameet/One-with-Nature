import { useEffect, useState } from "react";
import { Leaf, Moon, Sun } from "lucide-react";
import { motion as Motion } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("nature");
  const [dark, setDark] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    // Fall back to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.5 } // 50% visible
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const navLinks = [
    { id: "about", label: "About" },
    { id: "gallery", label: "Gallery" },
    { id: "sounds", label: "Soundscape" },
    { id: "film", label: "Film" },
  ];

  return (
    <Motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md border-b transition-colors duration-500
        ${
          scrolled
            ? "bg-white/30 text-black dark:bg-gray-900/80 dark:text-white"
            : "bg-white/10 border-white/20 text-white dark:bg-gray-900/40"
        }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo + Title */}
        <a
          href="#nature"
          className="flex items-center gap-2 transition-colors duration-500"
        >
          <Leaf className="h-8 w-8" />
          <span className="font-semibold tracking-wide">One With Nature</span>
        </a>

        {/* Navigation */}
        <nav className="hidden sm:flex items-center gap-6 text-sm transition-colors duration-500">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`hover:underline transition-colors ${
                activeSection === link.id
                  ? "font-semibold text-green-600  underline"
                  : ""
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Dark mode toggle button */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </nav>
      </div>
    </Motion.header>
  );
}
