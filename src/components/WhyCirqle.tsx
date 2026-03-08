import { motion } from "motion/react";
import { CircleDot, Link2, Zap } from "lucide-react";

const features = [
  {
    icon: CircleDot,
    title: "Premium Quality",
    description: "Every project crafted with meticulous attention to detail and professional excellence.",
  },
  {
    icon: Link2,
    title: "Seamless Integration",
    description: "All services work together harmoniously to deliver cohesive, impactful results.",
  },
  {
    icon: Zap,
    title: "Rapid Execution",
    description: "Fast turnaround times without compromising on quality or precision.",
  },
];

export function WhyCirqle() {
  return (
    <section className="py-28 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background circles */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-gray-200 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gray-200 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-gray-200 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.2 }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20"
          >
            <span className="text-sm">Why Choose Us</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            The Cirqle Difference
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience excellence at every touchpoint
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="cursor-hover"
              >
                <div className="liquid-glass-card p-8 rounded-3xl text-center shadow-xl hover:shadow-2xl transition-all duration-500 refraction edge-glow-hover">
                  <div className="relative inline-block">
                    <motion.div 
                      className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] flex items-center justify-center shadow-xl edge-glow"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>
                  <h3 className="text-2xl mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}