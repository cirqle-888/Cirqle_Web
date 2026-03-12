import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ImageWithFallback from "./figma/ImageWithFallback";
import { ArrowUpRight } from "lucide-react";
import { contentfulAssetUrl, getPortfolio } from "../services/contentService";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

export function HighlightProjects() {
  const [portfolioProjects, setPortfolioProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [sectionMeta, setSectionMeta] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;
    getPortfolio().then((items: any) => {
      if (cancelled || !items || items.length === 0) return;
      
      const meta = items[0]?.fields || null;
      setSectionMeta(meta);

      const mapped = items.map((entry: any) => {
        const fields = entry?.fields;
        const image = fields?.image ? contentfulAssetUrl(fields.image) : null;
        if (!fields?.title || !image) return null;
        return {
          title: String(fields.title),
          category: String(fields.category || ""),
          image: image,
        };
      }).filter(Boolean);

      setPortfolioProjects(mapped);
    });

    return () => { cancelled = true; };
  }, []);

  return (
    <section id="portfolio" className="py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold mb-4">
            {sectionMeta?.title || "Excellence in Every Project"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {sectionMeta?.subtitle || "Crafted with precision, delivered with speed"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((project, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-square">
                <ImageWithFallback 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="text-white font-medium flex items-center gap-2">
                     View Project <ArrowUpRight className="w-4 h-4" />
                   </span>
                </div>
              </div>
              <h3 className="mt-4 font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-500">{project.category}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl">
          <DialogTitle>{selectedProject?.title}</DialogTitle>
          <DialogDescription>{selectedProject?.category}</DialogDescription>
          {selectedProject && (
            <ImageWithFallback src={selectedProject.image} alt={selectedProject.title} className="w-full rounded-lg" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
