export interface PortfolioItem {
  id:          string;   // unique slug — e.g. 'brand-refresh-2025'  (no spaces)
  title:       string;   // project title shown on the card and preview
  description: string;   // shown in the preview modal when a project is clicked
  src:         string;   // '/portfolio/filename.jpg' — preview image
  year:        string;   // e.g. '2025'
  tags?:       string[]; // optional — any of: 'Social' | 'Apparel' | 'Events' | 'Other'
}

// ── HOW TO ADD A PROJECT ──────────────────────────────────────────────────────
//
//  1. Drop your preview image into:  public/portfolio/
//     (JPEG preferred — if you have HEIC or PNG, Claude can convert them)
//
//  2. Add an entry to the array below:
//
//       {
//         id:          'project-name-2025',
//         title:       'Project Title',
//         description: 'Short description shown in the preview.',
//         src:         '/portfolio/your-filename.jpg',
//         year:        '2025',
//         tags:        ['Social'],   // optional — omit if none apply
//       },
//
//  3. Save → commit → push.  The portfolio updates automatically.
//     Projects are displayed newest-first (by year, then by order in the array).
//
//  Available tags: 'Social' | 'Apparel' | 'Events' | 'Other'
//
// ─────────────────────────────────────────────────────────────────────────────

const rawItems: PortfolioItem[] = [
  // ↓ Add your projects here

];

// Auto-sorted newest → oldest by year
export const portfolioItems: PortfolioItem[] = [...rawItems].sort(
  (a, b) => Number(b.year) - Number(a.year)
);
