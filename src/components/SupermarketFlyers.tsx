import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Zap, Award, Clock3 } from "lucide-react";

export function SupermarketFlyers() {
  return (
    <section className="py-28 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full blur-3xl"></div>
      
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
            <span className="text-sm">Core Specialty</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            Supermarket Campaigns
            <br />
            <span className="bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent">
              That Deliver Results
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional promotional designs optimized for maximum impact 
            across digital and print platforms.
          </p>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-20"
        >
          {[
            { icon: Award, label: "Premium Quality" },
            { icon: Zap, label: "High Impact" },
            { icon: Clock3, label: "Rapid Delivery" },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="flex items-center gap-3 liquid-glass-card px-7 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all cursor-hover edge-glow-hover refraction"
              >
                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] flex items-center justify-center shadow-lg">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">{item.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Flyer samples - Clean Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-14">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-hover"
            >
              <div className="relative overflow-hidden rounded-2xl liquid-glass-thumbnail shadow-xl hover:shadow-2xl transition-all duration-500 refraction liquid-ripple edge-glow-hover">
                {/* Micro liquid movement */}
                <div className="absolute inset-0 pointer-events-none z-20 micro-liquid">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50"></div>
                </div>
                
                <div className="relative aspect-[3/4] overflow-hidden">
                  <ImageWithFallback
                    src={`https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=${i}`}
                    alt={`Supermarket Campaign ${i}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <motion.div 
                    className="absolute inset-0 liquid-glass-dark"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] text-white hover:opacity-90 transition-opacity px-10 py-7 text-lg rounded-full shadow-lg shadow-[#A259FF]/25 cursor-hover"
            >
              View Full Portfolio
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}