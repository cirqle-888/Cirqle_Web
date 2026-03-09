import { contentfulClient } from "../lib/contentful";

async function safeGetEntries(query: Record<string, unknown>) {
  try {
    const res = await contentfulClient.getEntries(query);
    return res?.items ?? [];
  } catch (err) {
    console.error("Contentful fetch failed:", err);
    return [];
  }
}

export async function getHeroContent() {
  return await safeGetEntries({
    content_type: "heroSection",
  });
}

export async function getServices() {
  return await safeGetEntries({
    content_type: "services",
  });
}

export async function getPortfolio() {
  return await safeGetEntries({
    content_type: "portfolio",
  });
}

export async function getAbout() {
  return await safeGetEntries({
    content_type: "about",
  });
}

export async function getContact() {
  return await safeGetEntries({
    content_type: "contact",
  });
}

export async function getSupermarketFlyers() {
  return await safeGetEntries({
    content_type: "supermarketFlyers",
  });
}

export function contentfulAssetUrl(asset: any): string | null {
  const url = asset?.fields?.file?.url;
  if (typeof url !== "string" || !url.length) return null;
  return url.startsWith("//") ? `https:${url}` : url;
}

