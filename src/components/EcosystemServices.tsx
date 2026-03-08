import { motion } from "motion/react";
import { FileText, Palette, Share2, Code, Sparkles, Layout } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Supermarket Campaigns",
    description: "Eye-catching promotional materials designed to captivate and convert.",
  },
  {
    icon: Palette,
    title: "Brand Design",
    description: "Complete visual identities that make lasting impressions.",
  },
  {
    icon: Share2,
    title: "Digital Creatives",
    description: "Engaging content crafted for maximum audience impact.",
  },
  {
    icon: Code,
    title: "Tech Solutions",
    description: "Reliable technical support for seamless operations.",
  },
  {
    icon: Sparkles,
    title: "Future Services",
    description: "Forward-thinking solutions for tomorrow's challenges.",
  },
  {
    icon: Layout,
    title: "UI/UX Design",
    description: "Beautiful, intuitive experiences users love.",
  },
];

export function EcosystemServices() {
  return (
    <section id="services" className="py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
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
            <span className="text-sm">Complete Ecosystem</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            All in One Cirqle
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A complete suite of services, seamlessly connected
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group cursor-hover"
              >
                <div className="relative h-full liquid-glass-card p-9 rounded-3xl hover:shadow-2xl transition-all duration-500 overflow-hidden refraction liquid-ripple edge-glow-hover">
                  {/* Micro liquid movement */}
                  <div className="absolute inset-0 pointer-events-none z-10 micro-liquid">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-40"></div>
                  </div>
                  
                  {/* Gradient accent */}
                  <div className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-r from-[#A259FF]/20 to-[#4CC3FF]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                  
                  <div className="relative z-10">
                    <motion.div
                      className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] flex items-center justify-center shadow-xl edge-glow"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.4, type: "spring" }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl mb-3 tracking-tight">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}