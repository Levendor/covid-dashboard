module.exports = {
  plugins: [
    require('autoprefixer'),
    require('css-mqpacker'),
    require('cssnano')({
      preset: [
        'default', {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
    {
      'postcss-preset-env': {
        browsers: 'last 2 versions',
      },
    },
  ],
};