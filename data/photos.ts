export interface Photo {
  id: string;
  date: string; // YYYY-MM-DD
  src: string;
  description: string;
  alt: string;
}

// Add new photos here — sorted newest-to-oldest automatically
// To add a photo:
// 1. Drop the image in /public/photos/
// 2. Add an entry to this array (will auto-sort by date)
const rawPhotos: Photo[] = [
  {
    id: 'placeholder-1',
    date: '2024-12-25',
    src: '/photos/placeholder.jpg',
    description: 'A winter moment — placeholder photo.',
    alt: 'Placeholder photo 1',
  },
  {
    id: 'placeholder-2',
    date: '2024-10-31',
    src: '/photos/placeholder.jpg',
    description: 'October vibes — placeholder photo.',
    alt: 'Placeholder photo 2',
  },
  {
    id: 'placeholder-3',
    date: '2024-07-04',
    src: '/photos/placeholder.jpg',
    description: 'Summer day — placeholder photo.',
    alt: 'Placeholder photo 3',
  },
  {
    id: 'placeholder-4',
    date: '2024-03-15',
    src: '/photos/placeholder.jpg',
    description: 'Spring light — placeholder photo.',
    alt: 'Placeholder photo 4',
  },
];

// Auto-sort newest first
export const photos: Photo[] = [...rawPhotos].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
