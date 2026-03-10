import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Zap, Award, Clock3 } from "lucide-react";
import { contentfulAssetUrl, getSupermarketFlyers } from "../services/contentService";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

const FALLBACK_FLYERS = [
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=1",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=2",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=3",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=4",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=5",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=6",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=7",
  "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&sig=8",
];

export function SupermarketFlyers() {
  const [flyers, setFlyers] = useState<string[]>(FALLBACK_FLYERS);
  const [sectionMeta, setSectionMeta] = useState<any | null>(null);
  const [selectedFlyer, setSelectedFlyer] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    
    getSupermarketFlyers().then((items) => {
      if (cancelled) return;

      const fields = items?.[0]?.fields ?? null;
      if (!fields) return;

      setSectionMeta(fields);

      const flyersField = fields?.flyers;
      const flyersFromCms = Array.isArray(flyersField)
        ? flyersField
            .map((asset: any) => {
              if (typeof asset === "string") return asset;
              return contentfulAssetUrl(asset);
            })
            .filter(Boolean) as string[]
        : [];

      if (flyersFromCms.length > 0) {
        setFlyers(flyersFromCms);
      }
    }).catch((err) => {
      console.error("Error fetching supermarket flyers:", err);
    });

    return () => {
      cancelled = true;
    };
  }, []);

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
            <span className="text-sm">{sectionMeta?.badgeText ?? "Core Specialty"}</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            {sectionMeta?.title ?? "Supermarket Campaigns"}
            <br />
            <span className="bg-gradient-to-r from-[#A259FF] to-[#4CC3FF] bg-clip-text text-transparent">
              {sectionMeta?.highlight ?? "That Deliver Results"}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {sectionMeta?.subtitle ??
              "Professional promotional designs optimized for maximum impact across digital and print platforms."}
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
          });
        </motion.div>

        {/* Flyer samples - Clean Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-14">
          {flyers.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl liquid-glass-thumbnail shadow-xl hover:shadow-2xl transition-all duration-500 refraction liquid-ripple edge-glow-hover">
                {/* Micro liquid movement */}
                <div className="absolute inset-0 pointer-events-none z-10 micro-liquid">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50"></div>
                </div>
                
                <div className="relative aspect-[3/4] overflow-hidden">
                  <ImageWithFallback
                    src={image}
                    alt={`Supermarket Campaign ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Hover Overlay Background */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 pointer-events-none" />

                  {/* Centered View Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none">
                    <div className="px-6 py-2.5 bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                      <span className="text-white font-medium">View Flyer</span>
                    </div>
                  </div>

                  {/* INVISIBLE CLICK BUTTON (Bulletproof Modal Trigger) */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedFlyer(image);
                    }}
                    className="absolute inset-0 w-full h-full z-20 cursor-hover outline-none"
                    aria-label="View Flyer"
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

      {/* Modal Viewer - Completely stripped of background boundaries to force image visibility */}
      <Dialog 
        open={selectedFlyer !== null} 
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedFlyer(null);
        }}
      >
        <DialogContent className="!bg-transparent !border-none !shadow-none !max-w-[95vw] !w-fit p-0 flex items-center justify-center">
          {selectedFlyer && (
            <ImageWithFallback
              src={selectedFlyer}
              alt="Enlarged Flyer View"
              className="max-h-[90vh] w-auto max-w-full object-contain rounded-xl shadow-2xl ring-1 ring-white/10"
            />
          )}
          <DialogTitle className="sr-only">Enlarged Flyer</DialogTitle>
        </DialogContent>
      </Dialog>
    </section>
  );
}
