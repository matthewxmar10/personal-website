// Standard emoji categories for the guestbook picker
export const STANDARD_EMOJIS = [
  // Smileys
  '😀', '😄', '😂', '🥲', '😊', '😇', '🥰', '😍', '😎', '🤩',
  '😏', '😒', '😔', '😢', '😭', '😤', '🤯', '😱', '🥸', '🤔',
  '🤫', '🫡', '🤐', '🥹', '😬', '🫠', '🥴', '😵', '🤩', '🫶',
  // Gestures
  '👋', '🤙', '👍', '👎', '✌️', '🤞', '🖖', '🫰', '👌', '🤌',
  // Hearts
  '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '💔', '❤️‍🔥',
  '💕', '💞', '💓', '💗', '💖', '💘', '💝', '🫀',
  // Objects / misc
  '🎮', '🎵', '🎬', '📸', '💻', '🎨', '✍️', '📝', '🚀', '⭐',
  '🌟', '✨', '💡', '🔥', '💥', '🌙', '☀️', '🌈', '🍕', '🎂',
  '🎉', '🎊', '🎁', '🏆', '🥇', '🎯', '🧩', '🃏', '🎲', '🎸',
  // Animals
  '🐱', '🐶', '🦊', '🐺', '🦝', '🐸', '🦋', '🐙', '🦑', '🐠',
];

// Custom emojis/gifs — drop files in /public/emojis/ and add entries here
export interface CustomEmoji {
  name: string;
  src: string;
  alt: string;
}

export const CUSTOM_EMOJIS: CustomEmoji[] = [
  // Example:
  // { name: ':wave:', src: '/emojis/wave.gif', alt: 'Animated wave' },
];
