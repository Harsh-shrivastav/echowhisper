/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['i.ibb.co'],
    unoptimized: true
  },
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'AIzaSyAlV6TrFf-Uy2zP9S0pMOLdB-kYcVruOKA'
  }
}

export default nextConfig
