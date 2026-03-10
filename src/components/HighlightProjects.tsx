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
                className="group relative"
              >

                <div className="relative overflow-hidden rounded-2xl liquid-glass-thumbnail shadow-xl hover:shadow-2xl">

                  <div className="aspect-square overflow-hidden">

                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                  </div>

                  {/* Hover Overlay Background & Text - Added pointer-events-none */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 pointer-events-none">
                    <div className="text-white z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-xs text-white/80 uppercase tracking-wider mb-1">{project.category}</p>
                      <p className="font-medium text-lg">{project.title}</p>
                    </div>
                  </div>

                  {/* Centered View Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none">
                    <div className="px-6 py-2.5 bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                      <span className="text-white font-medium">View Project</span>
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* INVISIBLE CLICK BUTTON (Bulletproof Modal Trigger) */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="absolute inset-0 w-full h-full z-20 cursor-hover outline-none"
                    aria-label={`View ${project.title}`}
                  />

                </div>

              </motion.div>

            ))}

          </div>

        </div>
      </section>

      {/* Modal Viewer - Completely stripped of background boundaries to force image visibility */}
      <Dialog
        open={selectedProject !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedProject(null);
        }}
      >
        <DialogContent className="!bg-transparent !border-none !shadow-none !max-w-[95vw] !w-fit p-0 flex items-center justify-center">
          {selectedProject && (
            <ImageWithFallback
              src={selectedProject.image}
              alt={selectedProject.title}
              className="max-h-[90vh] w-auto max-w-full object-contain rounded-xl shadow-2xl ring-1 ring-white/10"
            />
          )}
          <DialogTitle className="sr-only">
            {selectedProject?.title || "View Project"}
          </DialogTitle>
        </DialogContent>
      </Dialog>

    </>
  );
}
