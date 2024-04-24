/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['lucide-react'],
    i18n: {
        locales: ['en', 'nl'],
        defaultLocale: 'nl',
    },
};

export default nextConfig;
