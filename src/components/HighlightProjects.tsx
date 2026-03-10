import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowUpRight } from "lucide-react";
import { contentfulAssetUrl, getPortfolio } from "../services/contentService";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "./ui/dialog";

const projects = [
  {
    title: "Supermarket Campaign",
    category: "Promotional Design",
    image: "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGZseWVyJTIwcHJvbW90aW9uYWx8ZW58MXx8fHwxNzYzMTkyODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Festival Promo",
    category: "Cultural Design",
    image: "https://images.unsplash.com/photo-1553443236-e031f8bb39ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMHBvc3RlciUyMGRlc2lnbnxlbnwxfHx8fDE3NjMxOTI4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Brand Identity",
    category: "Visual System",
    image: "https://images.unsplash.com/photo-1762787863004-767d5d7eac07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWdufGVufDF8fHx8MTc2MzEwMDQ3OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Digital Experience",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1676793894040-b6dd72276620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwdWl8ZW58MXx8fHwxNzYzMTkyODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Social Media Kit",
    category: "Digital Creatives",
    image: "https://images.unsplash.com/photo-1611926653670-1ea63b810d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGRlc2lnbnxlbnwxfHx8fDE3NjMxOTI4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Package Design",
    category: "Product Design",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNrYWdpbmclMjBkZXNpZ258ZW58MXx8fHwxNzYzMTkyODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Marketing Collateral",
    category: "Print Design",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBtYXRlcmlhbHxlbnwxfHx8fDE3NjMxOTI4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "Event Branding",
    category: "Brand Experience",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMGJyYW5kaW5nfGVufDF8fHx8MTc2MzE5Mjg0OXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function HighlightProjects() {
  const [portfolioProjects, setPortfolioProjects] = useState(projects);
  const [sectionMeta, setSectionMeta] = useState<any | null>(null);

  useEffect(() => {
    let cancelled = false;
    getPortfolio().then((items) => {
      if (cancelled || !Array.isArray(items) || !items.length) return;

      const meta = items?.[0]?.fields ?? null;
      const mapped = items
        .map((entry: any) => {
          const fields = entry?.fields ?? {};
          const rawImage = fields?.image;
          const image =
            typeof rawImage === "string"
              ? rawImage
              : contentfulAssetUrl(rawImage) ?? null;
          if (!fields?.title || !fields?.category || !image) return null;
          return {
            title: String(fields.title),
            category: String(fields.category),
            image,
          };
        })
        .filter(Boolean) as typeof projects;

      if (!cancelled && mapped.length) {
        setSectionMeta(meta);
        setPortfolioProjects(mapped);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-28 px-6 bg-white">
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
            <span className="text-sm">{sectionMeta?.badgeText ?? "Featured Work"}</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            {sectionMeta?.title ?? "Excellence in Every Project"}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {sectionMeta?.subtitle ?? "Crafted with precision, delivered with speed"}
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {portfolioProjects.map((project, index) => (
            <Dialog key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
              >
                {/* We wrap the entire card in the DialogTrigger so clicking anywhere opens the image */}
                <DialogTrigger asChild>
                  <div className="relative overflow-hidden rounded-2xl liquid-glass-thumbnail shadow-xl hover:shadow-2xl transition-all duration-500 refraction liquid-ripple edge-glow-hover w-full text-left outline-none">
                    
                    {/* Micro liquid movement */}
                    <div className="absolute inset-0 pointer-events-none z-20 micro-liquid">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-50"></div>
                    </div>
                    
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Glass overlay on hover using Tailwind instead of Framer Motion to prevent event blocking */}
                      <div className="absolute inset-0 liquid-glass-dark flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="text-white relative z-10 w-full">
                          <p className="text-xs text-gray-300 mb-1">{project.category}</p>
                          <p className="font-medium">{project.title}</p>
                        </div>
                      </div>

                      {/* View Button Overlay (Now acts as a visual element, entire card is the button) */}
                      <div className="absolute inset-0 m-auto w-24 h-10 bg-white/10 backdrop-blur-md border border-white/30 group-hover:bg-white/20 rounded-full flex items-center justify-center text-white font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 z-30 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                        View
                      </div>
                      
                      {/* Glass Icon */}
                      <div className="absolute top-3 right-3 w-9 h-9 liquid-glass-card rounded-full flex items-center justify-center edge-glow pointer-events-none opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-45 transition-all duration-300 z-30">
                        <ArrowUpRight className="w-4 h-4 text-black" />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
              </motion.div>

              {/* Glass Modal Content */}
              <DialogContent className="p-2 border border-white/20 bg-black/40 backdrop-blur-2xl shadow-2xl sm:max-w-4xl w-[95vw] rounded-2xl overflow-hidden">
                <DialogTitle className="sr-only">{project.title}</DialogTitle>
                <div className="relative w-full h-[80vh] flex items-center justify-center rounded-xl overflow-hidden bg-black/20">
                  <ImageWithFallback
                    src={project.image}
                    alt={`Full view of ${project.title}`}
                    className="max-w-full max-h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
