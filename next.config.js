const NextWorkboxPlugin = require('next-workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: "[local]___[hash:base64:5]",
  },
  webpack(config, { isServer, buildId, dev }) {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    if (!isServer) {
      config.module.rules.forEach(rule => {
        if (rule.test.toString().includes('.scss')) {
          rule.rules = rule.use.map(useRule => {
            if (typeof useRule === 'string') {
              return {
                loader: useRule,
              };
            }
            if (useRule.loader.startsWith('css-loader')) {
              return {
                oneOf: [
                  {
                    test: /\.global\.scss$/,
                    loader: useRule.loader,
                    options: {
                      ...useRule.options,
                      modules: false,
                    },
                  },
                  {
                    loader: useRule.loader,
                    options: useRule.options,
                  },
                ],
              };
            }
            return useRule;
          });
          delete rule.use;
        }
      });
    }

    const workboxOptions = {
      clientsClaim: true,
      skipWaiting: true,
      globPatterns: ['.next/static/*', '.next/static/commons/*'],
      modifyUrlPrefix: {
        '.next': '/_next',
      },
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst',
          options: {
            cacheName: 'html-cache',
          },
        },
        {
          urlPattern: /[^3]\/movie\//,
          handler: 'networkFirst',
          options: {
            cacheName: 'html-cache',
          },
        },
        {
          urlPattern: new RegExp('^https://api.themoviedb.org/3/movie'),
          handler: 'staleWhileRevalidate',
          options: {
            cacheName: 'api-cache',
            cacheableResponse: {
              statuses: [200],
            },
          },
        },
        {
          urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'image-cache',
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    };

    if (!isServer && !dev) {
      config.plugins.push(
          new NextWorkboxPlugin({
            buildId,
            ...workboxOptions,
          }),
          new WebpackPwaManifest({
            filename: 'static/manifest.json',
            name: 'Next PWA',
            short_name: 'Next-PWA',
            description: 'A Movie browsing PWA using Next.js and Google Workbox',
            background_color: 'lightblue',
            theme_color: '#5755d9',
            display: 'standalone',
            orientation: 'portrait',
            fingerprints: false,
            inject: true,
            start_url: '/',
            ios: {
              'apple-mobile-web-app-title': 'Next-PWA',
              'apple-mobile-web-app-status-bar-style': '#5755d9',
            },
            icons: [
              {
                src: path.resolve('static/movie.png'),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: '/static',
              },{
                src: path.resolve('static/movie.png'),
                sizes: [120, 152, 167, 180, 1024],
                destination: '/static',
                ios: true
              },{
                src: path.resolve('static/movie.png'),
                size: 1024,
                destination: '/static',
                ios: 'startup'
              },
            ],
            includeDirectory: true,
            publicPath: '..',
          })
      );
    }

    return config;
  },
});