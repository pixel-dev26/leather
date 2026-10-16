// MORUCHA PRODUCTS — every product in the live store's men's and women's collections
// (morucha.co.uk/collections/mens-collection and /womens-collection), with all product photos
// downloaded to /public/images/products/<handle>/. Data lives in ./products.json; re-run the
// download script to refresh it when the store changes.

import data from "./products.json";

export type ProductImage = {
  id: number;
  src: string; // local path, e.g. "/images/products/<handle>/01.webp"
  alt: string;
  width: number;
  height: number | null;
  variantIds: number[];
  original: string; // source URL on the Shopify CDN
};

export type ProductVariant = {
  id: number;
  title: string;
  sku: string | null;
  price: number;
  compareAtPrice: number | null;
  available: boolean;
  options: string[];
  image: string | null; // local path of this variant's photo, if it has one
};

export type Product = {
  id: number;
  handle: string;
  title: string;
  collections: ("men" | "women")[];
  vendor: string;
  productType: string;
  tags: string[];
  url: string;
  price: number;
  priceMax: number;
  compareAtPrice: number | null;
  currency: "GBP";
  available: boolean;
  options: { name: string; values: string[] }[];
  variants: ProductVariant[];
  images: ProductImage[];
  image: string | null;
  description: string;
  descriptionHtml: string;
  createdAt: string;
  updatedAt: string;
};

export const products = data.products as Product[];

const byHandle = new Map(products.map((p) => [p.handle, p]));

export const getProduct = (handle: string) => byHandle.get(handle);

export const menProducts = data.collections.men.map((h) => byHandle.get(h)!);
export const womenProducts = data.collections.women.map((h) => byHandle.get(h)!);

export const formatPrice = (value: number) => `£${value.toFixed(2)}`;
