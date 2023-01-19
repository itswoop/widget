/** @type {import('@craco/types').CracoConfig} */
module.exports = {
  style: {
    postcss: {
      loaderOptions: postcssLoaderOptions => {
        postcssLoaderOptions.postcssOptions.plugins = [
          require('postcss-custom-media')({
            importFrom: './src/css/variables/dimensions.css',
          }),
          require('postcss-nested'),
          ...postcssLoaderOptions.postcssOptions.plugins,
        ]
        return postcssLoaderOptions
      },
    },
  },
}
