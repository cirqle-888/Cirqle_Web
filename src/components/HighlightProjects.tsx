import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowUpRight } from "lucide-react";
import { contentfulAssetUrl, getPortfolio } from "../services/contentService";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

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
        const image = typeof fields?.image === "string" ? fields.image : contentfulAssetUrl(fields?.image);
        if (!fields?.title || !image) return null;
        return { title: fields.title, category: fields.category, image };
      }).filter(Boolean);
      if (!cancelled) {
        setSectionMeta(meta);
        setPortfolioProjects(mapped);
      }
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <section id="portfolio" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#A259FF]/10 to-[#4CC3FF]/10 rounded-full mb-6 border border-[#A259FF]/20">
              <span className="text-sm">{sectionMeta?.badgeText ?? "Featured Work"}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">{sectionMeta?.title ?? "Excellence in Every Project"}</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {portfolioProjects.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative cursor-pointer cursor-hover"
                onClick={() => setSelectedProject(project)} // Activates popup
              >
                <div className="relative overflow-hidden rounded-2xl liquid-glass-thumbnail shadow-xl">
                  <div className="aspect-square overflow-hidden">
                    <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="px-6 py-2.5 bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex items-center gap-2">
                      <span className="text-white font-medium">View Project</span>
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="!bg-transparent !border-none !shadow-none !max-w-[95vw] !w-fit p-0 flex items-center justify-center z-[10000]">
          {selectedProject && (
            <div className="relative flex flex-col items-center group animate-in fade-in zoom-in-95 duration-300">
              <ImageWithFallback src={selectedProject.image} alt={selectedProject.title} className="max-h-[85vh] w-auto max-w-full object-contain rounded-xl shadow-2xl" />
              <div className="mt-4 liquid-glass-card bg-black/40 border border-white/20 p-4 rounded-2xl text-white text-center">
                <h3 className="text-xl font-semibold">{selectedProject.title}</h3>
                <p className="text-gray-300 text-sm">{selectedProject.category}</p>
              </div>
            </div>
          )}
          <DialogTitle className="sr-only">Project View</DialogTitle>
        </DialogContent>
      </Dialog>
    </>
  );
}
