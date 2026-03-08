export interface Photo {
  id:          string;   // unique slug — e.g. 'concert-2026-03-08'  (no spaces)
  date:        string;   // YYYY-MM-DD
  src:         string;   // '/photos/album/filename.jpg'
  description: string;   // caption shown in the lightbox when photo is clicked
  alt:         string;   // screen-reader description of what's in the photo
}

// ── HOW TO ADD A PHOTO ────────────────────────────────────────────────────────
//
//  1. Drop your image into:  public/photos/album/
//     (JPEG preferred — if you have HEIC or PNG, Claude can convert them)
//
//  2. Add an entry to the array below:
//
//       {
//         id:          'short-name-YYYY-MM-DD',
//         date:        'YYYY-MM-DD',
//         src:         '/photos/album/your-filename.jpg',
//         description: 'Short caption shown when this photo is clicked.',
//         alt:         'Describe what is in the photo for screen readers.',
//       },
//
//  3. Save → commit → push.  The album updates automatically.
//     Photos are displayed newest-first.
//
// ─────────────────────────────────────────────────────────────────────────────

const rawPhotos: Photo[] = [
  // ↓ Add your photos here

];

// Auto-sorted newest → oldest
export const photos: Photo[] = [...rawPhotos].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
