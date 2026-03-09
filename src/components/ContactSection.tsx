import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import cursorImage from "../assets/cursor.png";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-hover")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      {/* Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovering ? 1.15 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src={cursorImage}
          alt=""
          className="w-8 h-auto object-contain"
          style={{
            filter: isHovering
              ? "drop-shadow(0 4px 16px rgba(162, 89, 255, 0.6)) drop-shadow(0 8px 32px rgba(162, 89, 255, 0.4))"
              : "drop-shadow(0 2px 8px rgba(162, 89, 255, 0.4)) drop-shadow(0 4px 16px rgba(162, 89, 255, 0.2))",
            transition: "filter 0.3s ease",
          }}
        />
      </motion.div>

      {isHovering && (
        <>
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
            initial={{
              x: mousePosition.x - 24,
              y: mousePosition.y - 24,
              scale: 0.8,
              opacity: 0.6,
            }}
            animate={{
              x: mousePosition.x - 24,
              y: mousePosition.y - 24,
              scale: 1.5,
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
            style={{
              width: "48px",
              height: "48px",
              border: "2px solid rgba(162, 89, 255, 0.6)",
              background:
                "radial-gradient(circle, rgba(162, 89, 255, 0.2), transparent 70%)",
            }}
          />

          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full"
            animate={{
              x: mousePosition.x - 20,
              y: mousePosition.y - 20,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              mass: 0.5,
            }}
            style={{
              width: "40px",
              height: "40px",
              border: "2px solid rgba(76, 195, 255, 0.5)",
              backdropFilter: "blur(8px)",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)",
              boxShadow:
                "0 0 20px rgba(162,89,255,0.4), inset 0 0 10px rgba(76,195,255,0.3)",
            }}
          />
        </>
      )}
    </>
  );
}
