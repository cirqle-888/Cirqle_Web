import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CheckCircle2 } from "lucide-react";

const strengths = [
  "Professional design team",
  "Rapid turnaround",
  "Premium quality standards",
  "Modern technology",
];

export function AboutSection() {
  return (
    <section id="about" className="py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-6 bg-gradient-to-r from-[#A259FF]/15 to-[#4CC3FF]/15 rounded-3xl blur-3xl"></div>
            <motion.div
              className="relative rounded-3xl overflow-hidden shadow-2xl liquid-glass-thumbnail edge-glow-hover refraction"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              {/* Micro liquid movement */}
              <div className="absolute inset-0 pointer-events-none z-20 micro-liquid">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50"></div>
              </div>
              
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1510832758362-af875829efcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjMxNDU2Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Cirqle Creative Space"
                className="w-full aspect-square object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20"
            >
              <span className="text-sm">About Cirqle</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-8 tracking-tight">
              Built on
              <span className="bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent">
                {" "}Excellence
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Cirqle brings together design expertise and modern technology 
              to deliver exceptional results. Every project is crafted with 
              precision and delivered with speed.
            </p>
            
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Specializing in supermarket campaigns while offering comprehensive 
              creative services — from branding to digital solutions. We focus 
              on quality, professionalism, and delivering results that exceed expectations.
            </p>

            {/* Strengths list */}
            <div className="space-y-5">
              {strengths.map((strength, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] flex items-center justify-center flex-shrink-0 shadow-md">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg">{strength}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}