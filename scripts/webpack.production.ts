import { CleanWebpackPlugin as CleanPlugin } from 'clean-webpack-plugin';
import InlineCSSPlugin from 'html-inline-css-webpack-plugin';
import HTMLPlugin from 'html-webpack-plugin';
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin';
import InlineChunkPlugin from 'react-dev-utils/InlineChunkHtmlPlugin';
import TerserPlugin from 'terser-webpack-plugin';
import { merge } from 'webpack-merge';
import { DIST_PATH, TEMPLATE_PATH } from './paths';
import configuration from './webpack.base';

export default merge(configuration, {
  mode: 'production',
  devtool: false,
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      '@msgpack/msgpack': require.resolve('@msgpack/msgpack/src'),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ terserOptions: { output: { comments: false } } }),
    ],
  },
  plugins: [
    new CleanPlugin({
      cleanOnceBeforeBuildPatterns: [DIST_PATH],
    }),
    new HTMLPlugin({
      title: 'Maskbook File Service | Arweave',
      inject: 'head',
      template: TEMPLATE_PATH,
      templateParameters: { metadata: '__METADATA__' },
    }),
    new InlineChunkPlugin(HTMLPlugin, [/\.js$/]),
    new InlineCSSPlugin(),
    new OptimizeCSSPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
    }),
  ],
});
