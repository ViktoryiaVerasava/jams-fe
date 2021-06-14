module.exports = {
    async redirects() {
      return [
        {
          source: '/jams',
          destination: '/',
          permanent: true,
        },
      ]
    },
  }