import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { contentfulAssetUrl, getSupermarketFlyers } from "../services/contentService";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

export function SupermarketFlyers() {
  const [flyers, setFlyers] = useState<string[]>([]);
  const [selectedFlyer, setSelectedFlyer] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getSupermarketFlyers().then((items) => {
      if (cancelled) return;
      const fields = items?.[0]?.fields ?? null;
      if (!fields) return;
      const flyersField = fields?.flyers;
      const flyersFromCms = Array.isArray(flyersField)
        ? flyersField.map((asset: any) => typeof asset === "string" ? asset : contentfulAssetUrl(asset)).filter(Boolean) as string[]
        : [];
      if (flyersFromCms.length > 0) setFlyers(flyersFromCms);
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="py-28 px-6 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {flyers.map((image, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative cursor-pointer cursor-hover"
            onClick={() => setSelectedFlyer(image)} // Triggers the popup
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg">
              <ImageWithFallback src={image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="text-white font-medium px-4 py-2 border border-white/40 rounded-full bg-white/20 backdrop-blur-sm">
                  View Flyer
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* The Popup Logic */}
      <Dialog open={!!selectedFlyer} onOpenChange={(open) => !open && setSelectedFlyer(null)}>
        <DialogContent className="!bg-transparent !border-none !shadow-none !max-w-[95vw] !w-fit p-0 flex items-center justify-center z-[100]">
          {selectedFlyer && (
            <ImageWithFallback 
              src={selectedFlyer} 
              alt="Enlarged Flyer" 
              className="max-h-[90vh] w-auto max-w-full object-contain rounded-xl shadow-2xl" 
            />
          )}
          <DialogTitle className="sr-only">Flyer Image</DialogTitle>
        </DialogContent>
      </Dialog>
    </section>
  );
}
