import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ImageWithFallback from "./figma/ImageWithFallback";
import { Zap, Award, Clock3 } from "lucide-react";
import { getSupermarketFlyers, contentfulAssetUrl } from "../services/contentService";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

export function SupermarketFlyers() {
  const [flyers, setFlyers] = useState<string[]>([]);
  const [selectedFlyer, setSelectedFlyer] = useState<string | null>(null);
  const [sectionMeta, setSectionMeta] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;
    getSupermarketFlyers().then((items: any) => {
      if (cancelled || !items) return;
      
      const fields = items[0]?.fields;
      if (fields) setSectionMeta(fields);

      const flyersField = fields?.flyers;
      if (Array.isArray(flyersField)) {
        const urls = flyersField.map((asset: any) => 
          typeof asset === "string" ? asset : contentfulAssetUrl(asset)
        ).filter(Boolean);
        setFlyers(urls);
      }
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="py-28 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* ... (component render logic based on [cite: 5, 6]) */}
    </section>
  );
}
