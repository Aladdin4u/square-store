module.exports = {
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'square-catalog-sandbox.s3.amazonaws.com',
          port: '',
          pathname: '/files/**',
        },
      ],
    },
  };