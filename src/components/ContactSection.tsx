import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MessageCircle, Send } from "lucide-react";

export function ContactSection() {

const handleWhatsAppClick = () => {
window.open("https://wa.me/918129534377", "_blank");
};

return ( <section
   id="contact"
   className="py-28 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
 >

```
  {/* Background Gradient Circle */}
  <motion.div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full blur-3xl"
    animate={{
      scale: [1, 1.1, 1],
      opacity: [0.5, 0.7, 0.5],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />

  <div className="max-w-4xl mx-auto relative z-10">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-center mb-16"
    >

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20"
      >
        <span className="text-sm">Get in Touch</span>
      </motion.div>

      <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
        Start Your Project
      </h2>

      <p className="text-xl text-gray-600 leading-relaxed">
        Let's create something exceptional together
      </p>

    </motion.div>

    {/* Form Card */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="liquid-glass-card rounded-3xl shadow-2xl p-10 md:p-14 relative overflow-hidden refra
```
