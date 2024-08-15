const nextConfig = {
    reactStrictMode: true,
    compiler: {
      emotion: true,
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/dashboard',
          permanent: true, // Set to false if you expect this to be temporary
        },
      ];
    },
  
  };
  
  module.exports = nextConfig;
