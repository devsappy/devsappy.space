export default function manifest() {
  return {
    name: 'Sappy — Saptarshi Chattopadhyay',
    short_name: 'Sappy',
    description: 'Full-stack engineer and video editor in Kolkata, India.',
    start_url: '/',
    display: 'browser',
    background_color: '#D6E3F2',
    theme_color: '#D6E3F2',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/icon1.png', sizes: '192x192', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
