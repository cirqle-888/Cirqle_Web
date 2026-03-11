import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowUpRight } from "lucide-react";
import { contentfulAssetUrl, getPortfolio } from "../services/contentService";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog"; // Ensure path is correct

export function HighlightProjects() {
  const [portfolioProjects, setPortfolioProjects] = useState<any[]>([]);
  const [sectionMeta, setSectionMeta] = useState<any | null>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    let cancelled = false;
    getPortfolio().then((items) => {
      if (cancelled || !Array.isArray(items) || !items.length) return;
      const meta = items?.[0]?.fields ?? null;
      const mapped = items.map((entry: any) => {
        const fields = entry?.fields ?? {};
        const rawImage = fields?.image;
        const image = typeof rawImage === "string" ? rawImage : contentfulAssetUrl(rawImage) ?? null;
        if (!fields?.title || !fields?.category || !image) return null;
        return { title: String(fields.title), category: String(fields.category), image };
      }).filter(Boolean);

      if (!cancelled && mapped.length) {
        setSectionMeta(meta);
        setPortfolioProjects(mapped);
      }
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20">
            <span className="text-sm">{sectionMeta?.badgeText ?? "Featured Work"}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">{sectionMeta?.title ?? "Excellence in Every Project"}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {portfolioProjects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative cursor-pointer cursor-hover"
              onClick={() => setSelectedProject(project)} // Triggers the popup
            >
              <div className="relative overflow-hidden rounded-2xl liquid-glass-thumbnail shadow-xl">
                <ImageWithFallback src={project.image} alt={project.title} className="w-full aspect-square object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="px-6 py-2.5 bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex items-center gap-2">
                    <span className="text-white font-medium">View Project</span>
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Popup Logic */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="!bg-transparent !border-none !shadow-none !max-w-[95vw] !w-fit p-0 flex items-center justify-center z-[100]">
          {selectedProject && (
            <div className="relative">
              <ImageWithFallback 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="max-h-[85vh] w-auto max-w-full object-contain rounded-xl shadow-2xl" 
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md p-4 rounded-xl text-white text-center min-w-[200px]">
                <h3 className="text-lg font-bold">{selectedProject.title}</h3>
                <p className="text-sm text-gray-300">{selectedProject.category}</p>
              </div>
            </div>
          )}
          <DialogTitle className="sr-only">{selectedProject?.title ?? "Project View"}</DialogTitle>
        </DialogContent>
      </Dialog>
    </>
  );
}
