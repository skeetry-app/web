const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
const {i18n} = require('./next-i18next.config');

module.exports = withBundleAnalyzer({
    i18n,
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    async redirects() {
        return [
            {
                source: '/:path',
                destination: '/:path/want',
                permanent: true,
            },
        ];
    },
});
