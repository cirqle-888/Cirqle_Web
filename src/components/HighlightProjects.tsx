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

// ... (logic for projects and component as seen in commit [cite: 1, 3])

export function HighlightProjects() {
  const [portfolioProjects, setPortfolioProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [sectionMeta, setSectionMeta] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;
    getPortfolio().then((items: any) => {
      if (cancelled || !items || items.length === 0) return;
      
      const meta = items[0]?.fields;
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
      {/* ... (render logic based on [cite: 2, 3]) */}
    </section>
  );
}
