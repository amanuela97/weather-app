module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_FIREBASE_CONFIG: JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG),
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_WEATHER_API_KEY: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
  },
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com', 'lh3.googleusercontent.com', 'firebasestorage.googleapis.com'],
  },
}