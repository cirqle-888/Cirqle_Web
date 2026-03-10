import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowUpRight } from "lucide-react";
import { contentfulAssetUrl, getPortfolio } from "../services/contentService";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "./ui/dialog";

const projects = [
  {
    title: "Supermarket Campaign",
    category: "Promotional Design",
    image: "https://images.unsplash.com/photo-1747506533184-d58c53ce81e9?w=1200",
  },
];

export function HighlightProjects() {

  const [portfolioProjects, setPortfolioProjects] = useState(projects);
  const [sectionMeta, setSectionMeta] = useState<any | null>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

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
        .filter(Boolean);

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
    <>
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >

            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20">
              <span className="text-sm">
                {sectionMeta?.badgeText ?? "Featured Work"}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
              {sectionMeta?.title ?? "Excellence in Every Project"}
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {sectionMeta?.subtitle ?? "Crafted with precision, delivered with speed"}
            </p>

          </motion.div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {portfolioProjects.map((project, index) => (

              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-hover"
                onClick={() => setSelectedProject(project)}
              >

                <div className="relative overflow-hidden rounded-2xl liquid-glass-thumbnail shadow-xl hover:shadow-2xl">

                  <div className="aspect-square overflow-hidden">

                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-end p-4 opacity-0 group-hover:opacity-100 transition">

                    <div className="text-white">
                      <p className="text-xs">{project.category}</p>
                      <p className="font-medium">{project.title}</p>
                    </div>

                  </div>

                  {/* View Icon */}
                  <div className="absolute top-3 right-3 w-9 h-9 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">

                    <ArrowUpRight className="w-4 h-4 text-white" />

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </div>
      </section>

      {/* Modal Viewer */}

      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >

        <DialogContent className="z-[9999] p-0 bg-black/60 backdrop-blur-xl border border-white/20 max-w-5xl w-[95vw] rounded-3xl overflow-hidden">

          {selectedProject && (

            <div className="flex items-center justify-center max-h-[85vh]">

              <ImageWithFallback
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-auto object-contain"
              />

            </div>

          )}

          <DialogTitle className="sr-only">
            {selectedProject?.title}
          </DialogTitle>

        </DialogContent>

      </Dialog>

    </>
  );
}
