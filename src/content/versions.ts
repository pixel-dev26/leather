// Every homepage version, in the order the version list (src/app/(home)/page.tsx) shows them, numbered 01–06.
// The list shows only the number, the name and a View button; the other fields are kept as notes.
export type Version = {
  id: string; // the route: /v1/ … /v6/
  name: string;
  reference: string;
  secondary?: string;
  summary: string;
  type: string;
  swatches: string[];
};

export const versions: Version[] = [
  {
    id: "v5", // Heritage editorial, moved here from morucha-next (where it was /v1/); listed first, as before
    name: "Heritage editorial",
    reference: "soletrader.co.uk",
    secondary: "nappadori.co.uk",
    summary: "Ivory paper with oxblood and the logo red, a full-screen slideshow with split-text animation, a vertical leather guide carousel and a stitched, leather-textured footer.",
    type: "Jost · Bodoni Moda",
    swatches: ["#F6F1E9", "#1B1714", "#C1000A", "#5B1A1E", "#A0673A"],
  },
  {
    id: "v1",
    name: "Quiet editorial luxury",
    reference: "spica-inc.jp",
    secondary: "hidesign.com, olivercompanylondon.com, dailyobjects.com",
    summary: "Warm off-white paper with a fine grain, EB Garamond display type, gold labels and maroon from the bull logo. Layered, staggered photography with generous, calm spacing.",
    type: "EB Garamond · Montserrat",
    swatches: ["#F7F4F0", "#2A1718", "#A8020C", "#A88B58", "#5C0A10"],
  },
  {
    id: "v2",
    name: "Modern Nordic craft",
    reference: "craftory.com",
    secondary: "septiemelargeur.fr",
    summary: "One geometric sans on warm greige, flat colour-blocked bands, edge-to-edge imagery with 10px gutters and oversized stitched letterforms.",
    type: "Jost · Instrument Serif",
    swatches: ["#E4DFD9", "#363636", "#5A87B1", "#888A6E", "#3B1E2B"],
  },
  {
    id: "v3",
    name: "Clean modern retail",
    reference: "dailyobjects.com",
    summary: "Pure white pages, bold condensed uppercase headings, products on pale grey wells, full-bleed campaign banners and one green action colour.",
    type: "Roboto Condensed · Inter",
    swatches: ["#FFFFFF", "#000000", "#F7F7F7", "#20A87E", "#E66B55"],
  },
  {
    id: "v4",
    name: "Industrial monochrome",
    reference: "supertannery.com",
    summary: "Greige and black, light display type against heavy statements, a tannery video seen through a halftone burst, and brown leather glows that follow the cursor.",
    type: "Plus Jakarta Sans · Jost",
    swatches: ["#E9E9E7", "#000000", "#5F6567", "#A8602C", "#F2C58C"],
  },
  {
    id: "v6",
    name: "Urban everyday carry",
    reference: "chromeindustries.com",
    secondary: "adidas.co.in",
    summary: "Bold condensed uppercase type, black label tags and arrow buttons, a product-led hero on soft colour stages, tabbed product rails and the full 31-product range with live names and prices.",
    type: "Barlow Condensed · Barlow",
    swatches: ["#FFFFFF", "#111111", "#C1000A", "#ECE5DA", "#F1F0EE"],
  },
];
