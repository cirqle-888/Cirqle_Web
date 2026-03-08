import { useState, useEffect } from "react";
import { motion } from "motion/react";
import cirqleLogo from "figma:asset/a79873ff7b54a9a37128bda14561149e5eeb12b3.png";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = ["Home", "Ecosystem", "Services", "Portfolio", "About", "Contact"];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "liquid-glass-card shadow-2xl edge-glow-hover"
          : "liquid-glass border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center cursor-hover relative z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
          >
            <img 
              src={cirqleLogo} 
              alt="Cirqle Design" 
              className="h-10 w-auto"
            />
          </motion.a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-10 relative z-10">
            {menuItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-sm tracking-wide text-gray-700 hover:text-black transition-colors group cursor-hover"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] origin-left rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                ></motion.span>
              </motion.a>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}